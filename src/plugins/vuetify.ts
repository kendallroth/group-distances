import { createVuetify } from "vuetify";
import { aliases, mdi } from "vuetify/lib/iconsets/mdi-svg";

// NOTE: Importing 'vuetify/styles' will prevent overrides from working!
import "@styles/vuetify.scss";

export default createVuetify({
  defaults: {
    VBtn: {
      rounded: "pill",
    },
  },
  icons: {
    aliases,
    defaultSet: "mdi",
    sets: {
      mdi,
    },
  },
});
