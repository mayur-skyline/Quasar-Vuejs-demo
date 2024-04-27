import LoginPage from "pages/LoginPage.vue";
import MainLayout from "layouts/MainLayout.vue";
import IndexPage from "pages/IndexPage.vue";
import UserPage from "pages/UserPage.vue";
import UserForm from "pages/UserForm.vue";
import ErrorNotFound from "pages/ErrorNotFound.vue";

const routes = [
  { path: "/", component: LoginPage, name: "Login" },
  {
    path: "/user-form/:id?", // Adjust the route to accept an optional user ID
    component: MainLayout,
    meta: { requiresAuth: true },
    children: [{ path: "", component: UserForm, name: "UserForm" }],
  },
  {
    path: "/dashboard",
    component: MainLayout,
    meta: { requiresAuth: true },
    children: [{ path: "", component: IndexPage, name: "Dashboard" }],
  },
  {
    path: "/user",
    component: MainLayout,
    meta: { requiresAuth: true },
    children: [{ path: "", component: UserPage, name: "User" }],
  },
  { path: "/:catchAll(.*)*", component: ErrorNotFound },
];

export default routes;
