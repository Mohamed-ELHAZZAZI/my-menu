import { createRouter, createWebHistory } from "vue-router";
import store from "../store";
//view
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import Dashboard from "../views/Dashboard.vue";
import PageNotFound from "../views/PageNotFound.vue";
import Contact from "../views/Contact.vue";
//components
import DefaultLayout from "../components/Layout/DefaultLayout.vue";
import AuthLayout from "../components/Layout/AuthLayout.vue";
import Menu from "../views/Menu.vue";
const routes = [
    { path: "/:pathMatch(.*)*", redirect: "/404" },
    { path: "/404", name: "404", component: PageNotFound },
    {
        path: "/",
        redirect: "/dashboard",
        meta: { RequiresAuth: true },
        component: DefaultLayout,
        children: [
            { path: "/dashboard", name: "Dashboard", component: Dashboard },
            { path: "/Contact", name: "Contact", component: Contact },
        ],
    },
    {
        path: "/auth",
        redirect: "/login",
        component: AuthLayout,
        meta: { RequiresGuest: true },
        children: [
            {
                path: "/login",
                name: "Login",
                component: Login,
            },
            {
                path: "/register",
                name: "Register",
                component: Register,
            },
        ],
    },
    {
        path: "/menu/:slug",
        name: "Menu",
        component: Menu,
        props: true,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    if (to.meta.RequiresAuth && !store.state.user.token) {
        next({ name: "Login" });
    } else if (store.state.user.token && to.meta.RequiresGuest) {
        next({ name: "Dashboard" });
    } else {
        next();
    }
});

export default router;
