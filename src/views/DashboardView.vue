<template>
	<h1 class="tw-text-3xl tw-font-bold tw-underline">Dashboard</h1>
</template>

<script>
import { mapStores } from 'pinia/dist/pinia';
import Error from '../components/Error.vue';
import Sidebar from '@/App.vue';

export default {
	name: 'Dashboard',

	components: {
		Sidebar,
		Error,
	},
	data() {
		return {};
	},
	created() {},
	computed: {
		...mapStores(),
	},

	methods: {},
};
</script>

<style scoped></style>