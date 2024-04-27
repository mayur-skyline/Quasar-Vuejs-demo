// src/boot/vuex.js

import { boot } from "quasar/wrappers";
import store from "../router/store"; // Import the Vuex store from the correct path

export default boot(({ app }) => {
  app.use(store);
});
