<template>
  <div class="comparison-input">
    <TextInput
      v-bind="textProps"
      :disabled="!coordinateEnabled"
      :name="`${labelPrefix}label`"
      label="Label"
    />
    <TextInput
      v-bind="textProps"
      :disabled="!coordinateEnabled"
      :name="`${labelPrefix}latitude`"
      label="Latitude"
      @paste="handlePaste"
    />
    <TextInput
      v-bind="textProps"
      :disabled="!coordinateEnabled"
      :name="`${labelPrefix}longitude`"
      label="Longitude"
      @paste="handlePaste"
    />
    <SwitchInput :name="`${labelPrefix}enabled`" label="" />
    <v-btn
      :disabled="coordinateEnabled"
      class="ml-auto"
      icon
      size="small"
      variant="text"
      @click="$emit('delete')"
    >
      <v-icon>{{ mdiDelete }}</v-icon>
    </v-btn>
  </div>
</template>

<script lang="ts" setup>
import { mdiDelete } from "@mdi/js";
import { useField } from "vee-validate";
import { computed } from "vue";

// Components
import { TextInput, SwitchInput } from "@components/form";

// Utilities
import { validateCoordinate } from "@utilites/coordinate.util";

// Types
import type { ICoordinateInput } from "@typings/comparison.types";

/** Custom text field props declaration to allow binding a props object */
type VTextFieldProps = Partial<{
  density: "default" | "compact" | "comfortable" | null;
  variant: "filled" | "outlined" | "plain" | "contained" | "underlined";
  persistentHint: boolean;
}>;

interface IProps {
  /** VeeValidate label prefix (if used in field array!) */
  labelPrefix: string;
}

const props = defineProps<IProps>();

const emit = defineEmits<{
  (e: "delete"): void;
  (e: "paste", coordinates: ICoordinateInput): void;
}>();

const textProps: VTextFieldProps = {
  density: "compact",
  persistentHint: false,
  variant: "outlined",
};

// Disable coordinate input if not enabled for calculations
const coordinateEnabledLabel = computed(() => `${props.labelPrefix}enabled`);
const coordinateEnabledField = useField(coordinateEnabledLabel);
const coordinateEnabled = computed(() => Boolean(coordinateEnabledField.value.value));

/** Check if pasted text can be converted to valid lat/lng */
const handlePaste = (event: ClipboardEvent) => {
  let text = event.clipboardData?.getData("text");
  if (!text) return;

  text = text.replace(/[^\d.,-]/, "");

  const coordinates = text.split(",");
  if (coordinates.length === 2 && !coordinates.every((c) => validateCoordinate(c))) return;

  emit("paste", {
    latitude: coordinates[0],
    longitude: coordinates[1],
  });
};
</script>

<style lang="scss" scoped>
.comparison-input {
  display: flex;
  align-items: center;

  > *:not(:first-child) {
    margin-left: 12px;
  }

  :deep(.v-field__input) {
    padding-inline-start: 12px;
    padding-inline-end: 12px;
  }

  :deep(.v-input__details) {
    // Hide input details (validation will be displayed elsewhere)
    display: none;
  }

  .v-text-field,
  .v-switch {
    flex-grow: 0;
  }

  .v-text-field {
    min-width: 125px;

    &:first-of-type {
      min-width: 150px;
    }
  }
}
</style>
