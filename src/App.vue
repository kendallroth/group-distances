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
  </v-app>
</template>

<script lang="ts" setup>
// Components
import { TheAppBar, TheAppFooter, TheAppSnackbar } from "@components/single";
</script>
