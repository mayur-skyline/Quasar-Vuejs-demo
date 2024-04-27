import { route } from "quasar/wrappers";
import {
  createRouter,
  createWebHistory,
  createWebHashHistory,
} from "vue-router";
import routes from "./routes"; // Import routes
import store from "./store"; // Import Vuex store

// Define createHistory function based on the environment
const createHistory = process.env.SERVER
  ? createMemoryHistory
  : process.env.VUE_ROUTER_MODE === "history"
  ? createWebHistory
  : createWebHashHistory;

// Create the router instance using createRouter function
const router = createRouter({
  scrollBehavior: () => ({ left: 0, top: 0 }),
  routes,
  history: createHistory(
    process.env.MODE === "ssr" ? void 0 : process.env.VUE_ROUTER_BASE
  ),
});

router.beforeEach((to, from, next) => {
  // Check if the route requires authentication
  if (to.meta.requiresAuth && !store.state.isAuthenticated) {
    // If the route requires authentication but there's no token, redirect to login
    next({ name: "Login" });
  } else if (!to.meta.requiresAuth && store.state.isAuthenticated) {
    // If the route does not require authentication but there's a token, redirect to home
    next({ name: "Dashboard" });
  } else {
    // Continue navigation
    next();
  }
});

// Export the router wrapped by the route function
export default route(function (/* { store, ssrContext } */) {
  return router;
});
