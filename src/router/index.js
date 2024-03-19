import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import DashboardView from "../views/DashboardView.vue";
import HistoryView from "../views/HistoryView.vue";
import MeasurementsView from "../views/MeasurementsView.vue";
import SettingsView from "../views/SettingsView.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "home",
            component: HomeView,
        },
        {
            path: "/dashboard",
            name: "dashboard",
            component: DashboardView,
        },
        {
            path: "/history",
            name: "history",
            component: HistoryView,
        },
        {
            path: "/measurements",
            name: "measurements",
            component: MeasurementsView,
        },
        {
            path: "/settings",
            name: "settings",
            component: SettingsView,
        },
    ],
});

function checkAuthentication(to, from, next) {

}

export default router;
