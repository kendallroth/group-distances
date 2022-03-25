import { createApp } from "vue";

// Components
import App from "./App.vue";

// Utilities
import router from "./router";
import { rootPiniaStore } from "./store";
import vuetify from "./plugins/vuetify";
// import { loadFonts } from "./plugins/webfontloader";

// Styles
import "@fontsource/mulish/400.css";
import "@fontsource/mulish/500.css";
import "@fontsource/mulish/600.css";
import "@styles/app.scss";

// TODO: Determine whether this makes sense???
// loadFonts();

const app = createApp(App);

app.use(router).use(rootPiniaStore).use(vuetify);

app.mount("#app");
