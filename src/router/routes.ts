import { RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/orders",
  },
  {
    path: "/login",
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/LoginView.vue"),
  },
  {
    path: "/registration",
    name: "Registration",
    component: () =>
      import(
        /* webpackChunkName: "registration" */ "../views/RegistrationView.vue"
      ),
  },
  {
    path: "/orders",
    name: "orders",
    component: () =>
      import(/* webpackChunkName: "orders" */ "../views/OrdersView.vue"),
  },
  {
    path: "/users",
    name: "users",
    component: () =>
      import(/* webpackChunkName: "users" */ "../views/UsersView.vue"),
  },
  {
    path: "/customers",
    name: "customers",
    component: () =>
      import(/* webpackChunkName: "customers" */ "../views/CustomersView.vue"),
  },
  {
    path: "/products",
    name: "products",
    component: () =>
      import(/* webpackChunkName: "products" */ "../views/ProductsView.vue"),
  },
  {
    path: "/reports",
    name: "reports",
    component: () =>
      import(/* webpackChunkName: "reports" */ "../views/ReportsView.vue"),
  },
  {
    path: "/organizations",
    name: "organizations",
    component: () =>
      import(
        /* webpackChunkName: "organizations" */ "../views/OrganizationsView.vue"
      ),
  },
  {
    path: "/groups",
    name: "groups",
    component: () =>
      import(/* webpackChunkName: "groups" */ "../views/GroupsView.vue"),
  },
  {
    path: "/task-center",
    name: "task-center",
    component: () =>
      import(
        /* webpackChunkName: "task-center" */ "../views/TaskCenterView.vue"
      ),
  },
];

export default routes;
