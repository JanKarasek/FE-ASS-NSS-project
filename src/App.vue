<template>
	<v-app>
		<Sidebar />
		<v-main>
			<v-container>
				<router-view />
			</v-container>
		</v-main>
	</v-app>
</template>

<script setup>
import { Icon } from '@iconify/vue';
import Sidebar from '@/components/Sidebar.vue';
//import { useUserStore } from './stores/UserStore';
import { useRouter } from 'vue-router';

defineExpose({ Sidebar, Icon });
const router = useRouter();
/*
const userStore = useUserStore();

const router = useRouter();

const login = () => {
	router.push({ name: 'login' });
};

const logout = () => {
	userStore.logout();
	router.push({ name: 'home' });
};

defineExpose({ login, logout });
*/
</script>

<style>
/*GLOBAL STYLES*/

h1 {
    font-size: 24px;
}

nav {
	margin-bottom: 1em;
}
</style>
