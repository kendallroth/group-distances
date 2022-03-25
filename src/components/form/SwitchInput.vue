<template>
  <v-switch
    color="primary"
    density="compact"
    v-bind="$attrs"
    :error="Boolean(error)"
    :model-value="value"
    @blur="handleBlur"
    @update:model-value="handleChange"
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

const { errorMessage: rawError, handleBlur, handleChange, meta, value } = useField(name);

const error = computed(() => (meta.touched ? rawError.value : ""));
</script>
