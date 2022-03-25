<template>
  <v-app>
    <TheAppBar />
    <v-main>
      <v-container>
        <router-view />
      </v-container>
    </v-main>
    <TheAppFooter />
    <TheAppSnackbar />
    <!-- NOTE: Currently need to manually render any wrapped Vuetify components, as they will not
                 be detected automatically by Vite autoloader! -->
    <div class="hide-manual-render">
      <v-text-field disabled />
      <v-switch disabled />
    </div>
  </v-app>
</template>

<script lang="ts" setup>
// Components
import { TheAppBar, TheAppFooter, TheAppSnackbar } from "@components/single";
</script>

<style lang="scss" scoped>
.hide-manual-render {
  display: none;
}
</style>
