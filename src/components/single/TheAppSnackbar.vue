<template>
  <v-snackbar v-model="snackbar.visible" :color="snackbar.type" bottom left>
    {{ snackbar.text }}
  </v-snackbar>
</template>

<script lang="ts" setup>
// Utilities
import { useSnackbar } from "@composables/snackbar";

const { snackbar } = useSnackbar();
</script>

<style lang="scss" scoped></style>
