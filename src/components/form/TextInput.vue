<template>
  <v-text-field
    color="primary"
    density="compact"
    variant="outlined"
    v-bind="$attrs"
    v-model="value"
    :error="Boolean(error)"
    @blur="handleBlur"
  />
</template>

<script lang="ts" setup>
import { useField } from "vee-validate";
import { computed, toRef } from "vue";

interface IProps {
  name: string;
}

const props = defineProps<IProps>();

const name = toRef(props, "name");

const { errorMessage: rawError, handleBlur, meta, value } = useField(name);

const error = computed(() => (meta.touched ? rawError.value : ""));
</script>
