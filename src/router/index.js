import { createRouter, createWebHistory } from 'vue-router';
import DashboardView from '../views/DashboardView.vue';
import HistoryView from '../views/HistoryView.vue';
import MeasurementsView from '../views/MeasurementsView.vue';
import SettingsView from '../views/SettingsView.vue';
import LoginView from '../views/LoginView.vue';

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'login',
			component: LoginView,
		},
		{
			path: '/dashboard',
			name: 'dashboard',
			component: DashboardView,
			meta: { requiresAuth: true }
		},
		{
			path: '/history',
			name: 'history',
			component: HistoryView,
			meta: { requiresAuth: true }
		},
		{
			path: '/measurements',
			name: 'measurements',
			component: MeasurementsView,
			meta: { requiresAuth: true }
		},
		{
			path: '/settings',
			name: 'settings',
			component: SettingsView,
			meta: { requiresAuth: true }
		},
	],
});

router.beforeEach((to, from, next) => {
	const token = localStorage.getItem('token');

	if (to.meta.requiresAuth && !token) {
		next({ name: 'login' });
	} else {
		next();
	}
});

export default router;
