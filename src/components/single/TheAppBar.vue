<template>
  <v-app-bar app color="primary">
    <div class="app-bar__logo elevation-4">
      <v-img :aspect-ratio="1 / 1" :src="logo" :width="40" />
    </div>
    <v-app-bar-title>Group Distances</v-app-bar-title>
    <span class="app-bar__version">{{ config.version }}</span>
    <div id="teleportCalculateBtn" class="app-bar__calculate" />
  </v-app-bar>
</template>

<script lang="ts" setup>
import config from "@config";

// Utilities
import logo from "@assets/icon.png";
</script>

<style lang="scss" scoped>
.app-bar__version {
  font-family: monospace;
  font-size: 0.9rem;
  opacity: 0.8;
}

.app-bar__logo {
  margin-right: 16px;
  background-color: white;
  border-radius: 50%;

  .v-img {
    // NOTE: Production fix to resolve image not aligning properly with image container!
    position: relative;
  }
}

.app-bar__calculate {
  display: flex;
  align-items: center;
  margin-left: 16px;
}
</style>
