storePlaceloadPlace
<template>
  <div class="form">
    <Teleport to="#teleportCalculateBtn">
      <v-badge :model-value="formMeta.dirty" bordered color="warning" dot>
        <v-btn :prepend-icon="mdiCheck" color="pink-darken-1" @click="onSubmit"> Calculate </v-btn>
      </v-badge>
    </Teleport>
    <v-container>
      <v-row>
        <v-col>
          <ActionBar>
            <template v-slot:left>
              <v-btn :prepend-icon="mdiSave" color="primary" variant="outlined" @click="handleSave">
                Save
              </v-btn>
              <v-btn :prepend-icon="mdiLoad" color="primary" variant="outlined" @click="handleLoad">
                Load
              </v-btn>
            </template>
            <template v-slot:right>
              <v-btn :disabled="!formMeta.dirty" color="error" variant="text" @click="resetForm()">
                Reset
              </v-btn>
            </template>
          </ActionBar>
          <v-divider class="mt-4" />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <h3 class="form__header">Locations</h3>
          <div class="form__items">
            <ComparisonInput
              v-for="(field, idx) in locationFields"
              :key="field.value.id"
              :label-prefix="`locations[${idx}].`"
              @delete="removePlaceItem('locations', idx)"
              @paste="(coordinate) => handlePaste('locations', idx, coordinate)"
            />
          </div>
          <ActionBar class="mt-4" right>
            <v-btn :prepend-icon="mdiAdd" color="primary" @click="addLocationItem">Add</v-btn>
          </ActionBar>
        </v-col>
        <v-col>
          <h3 class="form__header">Destinations</h3>
          <div class="form__items">
            <ComparisonInput
              v-for="(field, idx) in destinationFields"
              :key="field.value.id"
              :label-prefix="`destinations[${idx}].`"
              @delete="removePlaceItem('destinations', idx)"
              @paste="(coordinate) => handlePaste('destinations', idx, coordinate)"
            />
          </div>
          <ActionBar class="mt-4" right>
            <v-btn :prepend-icon="mdiAdd" color="primary" @click="addDestinationItem">Add</v-btn>
          </ActionBar>
        </v-col>
      </v-row>
      <v-divider class="my-6" />
      <v-row>
        <v-col>
          <h3 class="form__header">Statistics</h3>
          <v-table v-if="stats.length">
            <thead>
              <tr>
                <th>Destination</th>
                <th>Average</th>
                <th>Max</th>
                <th>Min</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in stats" :key="item.destination">
                <td>{{ item.destination }}</td>
                <td>{{ item.average.toFixed(2) }} km</td>
                <td>
                  {{ item.max.distance.toFixed(2) }} km
                  <small>({{ item.max.location }})</small>
                </td>
                <td>
                  {{ item.min.distance.toFixed(2) }} km
                  <small>({{ item.min.location }})</small>
                </td>
                <td>{{ item.total.toFixed(2) }} km</td>
              </tr>
            </tbody>
          </v-table>
          <div v-else class="stats--empty">No stats to display</div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts" setup>
import { mdiCheck, mdiPlus as mdiAdd, mdiFloppy as mdiSave, mdiFolder as mdiLoad } from "@mdi/js";
import { v4 as uuid } from "uuid";
import { useFieldArray, useForm } from "vee-validate";
import * as yup from "yup";
import { ref } from "vue";

// Components
import { ActionBar } from "@components/layout";
import { ComparisonInput } from "./components";

// Utilities
import { useSnackbar } from "@composables";
import { calculateStats } from "@utilites/comparison.util";
import { COORDINATE_REGEX } from "@utilites/coordinate.util";
import { loadPlace, storePlace } from "@utilites/storage.util";

// Types
import type {
  IComparisonForm,
  IComparisonItemInput,
  ICoordinateInput,
  IDestinationStats,
} from "@typings/comparison.types";

type FormKey = keyof IComparisonForm;

const snackbar = useSnackbar();

const comparisonItemSchema = yup.object({
  enabled: yup.boolean().required(),
  id: yup.string().required(),
  latitude: yup.string().required().matches(COORDINATE_REGEX, "Invalid coordinate"),
  longitude: yup.string().required().matches(COORDINATE_REGEX, "Invalid coordinate"),
  label: yup.string().required(),
});

const validation = yup.object({
  destinations: yup.array().of(comparisonItemSchema),
  locations: yup.array().of(comparisonItemSchema),
});

const blankItem: IComparisonItemInput = {
  id: uuid(),
  enabled: true,
  latitude: "",
  label: "",
  longitude: "",
};

const {
  meta: formMeta,
  handleSubmit,
  resetForm,
  setValues,
  values: formValues,
  validate,
} = useForm<IComparisonForm>({
  initialValues: {
    destinations: [{ ...blankItem }],
    locations: [{ ...blankItem }],
  },
  validationSchema: validation,
});

const { fields: destinationFields, ...destinationFieldArray } =
  useFieldArray<IComparisonItemInput>("destinations");
const { fields: locationFields, ...locationFieldArray } =
  useFieldArray<IComparisonItemInput>("locations");

/** Add a blank destination coordinate item */
const addDestinationItem = () => destinationFieldArray.push({ ...blankItem, id: uuid() });
/** Add a blank location coordinate item */
const addLocationItem = () => locationFieldArray.push({ ...blankItem, id: uuid() });

/**
 * Remove a destination/location coordinate item
 *
 * @param form       - Form name
 * @param idx        - Coordinate index (for array helpers)
 */
const removePlaceItem = (form: FormKey, idx: number) => {
  const _fieldArray = form === "destinations" ? destinationFieldArray : locationFieldArray;
  const _fields = form === "destinations" ? destinationFields : locationFields;

  // TODO: Prompt for confirmation???
  _fieldArray.remove(idx);

  // Removing the last item should create another empty item
  if (!_fields.value.length) {
    _fieldArray.push({ ...blankItem, id: uuid() });
  }
};

/**
 * Handle pasting a full coordinate into either latitude/longitude field,
 *   parsing and setting the individual coordinate fields.
 *
 * @param form       - Form name
 * @param idx        - Coordinate index (for array helpers)
 * @param coordinate - Pasted coordinate
 */
const handlePaste = (form: FormKey, idx: number, coordinate: ICoordinateInput) => {
  const _fieldArray = form === "destinations" ? destinationFieldArray : locationFieldArray;
  const _fields = form === "destinations" ? destinationFields : locationFields;

  // NOTE: Need to wait until next frame to avoid conflicts writing to form data
  setTimeout(() => {
    _fieldArray.update(idx, {
      ..._fields.value[idx].value,
      ...coordinate,
    });
  }, 0);
};

////////////////////////////////////////////////////////////////////////////////
// Save / load
////////////////////////////////////////////////////////////////////////////////

/** Loaded previously entered values */
const handleLoad = () => {
  // TODO: Support loading additional saves/keys

  let places: IComparisonForm | null = null;
  try {
    places = loadPlace("default");
  } catch {
    // TODO: Determine if this should clean up previous save?
    snackbar.notifyError("Error retrieving saved locations");
    return;
  }

  if (!places) {
    snackbar.notifyWarning("No saved location");
    return;
  }

  setValues({
    destinations: places.destinations,
    locations: places.locations,
  });

  onSubmit();
};

/** Save entered values */
const handleSave = async () => {
  // Prevent saving with invalid values
  const { valid } = await validate();
  if (!valid) {
    snackbar.notifyWarning("Some fields are invalid!");
    return;
  }

  // TODO: Support saving with a custom save key
  storePlace("default", formValues);

  snackbar.notify("Locations saved successfully");
};

////////////////////////////////////////////////////////////////////////////////
// Calculate stats
////////////////////////////////////////////////////////////////////////////////

const stats = ref<IDestinationStats[]>([]);

/** Validation error callback */
const onSubmitErrors = () => {
  snackbar.notifyError("Some fields are invalid");
};

/** Calculate comparisons (after validation) */
const onSubmit = handleSubmit((values) => {
  // Filter out disabled destinations/locations
  const destinations = values.destinations?.filter((d) => d.enabled) ?? [];
  const locations = values.locations?.filter((d) => d.enabled) ?? [];
  if (!destinations?.length || !locations?.length) {
    snackbar.notifyWarning("Missing destinations or locations");
    return;
  }

  stats.value = calculateStats(locations, destinations);

  resetForm({
    values: { ...values },
  });

  snackbar.notify("Distance stats calculated");
}, onSubmitErrors);
</script>

<style lang="scss" scoped>
.form {
  display: flex;
  flex-direction: column;
}

.form__items {
  > :not(:first-child) {
    margin-top: 12px;
  }
}

.form__header {
  margin-bottom: 12px;
}

.stats--empty {
  padding: 0 16px;
  color: grey;
}
</style>
