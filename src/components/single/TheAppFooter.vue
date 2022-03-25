<template>
  <v-footer app class="footer">
    <div class="footer__message">
      <span>
        Created with
        <v-icon color="pink" size="18">{{ mdiHeart }}</v-icon>
      </span>
      &ensp;|&ensp;
      <a :href="config.links.gitHub" class="footer__link" target="_blank">
        View at
        <v-icon color="black" size="18">{{ mdiGithub }}</v-icon>
      </a>
    </div>
  </v-footer>
</template>

<script lang="ts" setup>
import { mdiHeart, mdiGithub } from "@mdi/js";

// Utilities
import config from "@config";
</script>

<style lang="scss" scoped>
.footer {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.footer__message {
  display: flex;
  align-items: center;
}

.footer__link {
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
}
</style>
