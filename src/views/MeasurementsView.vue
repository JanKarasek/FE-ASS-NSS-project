<template>
	<h1 class="d-flex align-center mb-4">Measurements</h1>
</template>

<script setup>
import { ref } from 'vue';

// Dummy data array
const measurements = ref([
	{ date: '19.3.2024 14:00', sensors: 6, rgb: 'Ano', multispectral: 'Ano' },
	{ date: '19.3.2024 16:00', sensors: 5, rgb: 'Ne', multispectral: 'Ano' },
	{ date: '19.3.2024 16:00', sensors: 5, rgb: 'Ne', multispectral: 'Ano' },
	{ date: '19.3.2024 16:00', sensors: 5, rgb: 'Ne', multispectral: 'Ano' },
	{ date: '19.3.2024 16:00', sensors: 5, rgb: 'Ne', multispectral: 'Ano' },
	{ date: '19.3.2024 16:00', sensors: 5, rgb: 'Ne', multispectral: 'Ano' },
	{ date: '19.3.2024 16:00', sensors: 5, rgb: 'Ne', multispectral: 'Ano' },
	{ date: '19.3.2024 16:00', sensors: 5, rgb: 'Ne', multispectral: 'Ano' },
]);

const headers = [
	{ text: 'Datum a čas', value: 'date' },
	{ text: 'Počet senzorů', value: 'sensors' },
	{ text: 'RGB', value: 'rgb' },
	{ text: 'Multispectral', value: 'multispectral' },
	{ text: 'Stáhnout data', value: 'actions', sortable: false },
];

const downloadData = (item) => {
	console.log('Downloading data for', item.date);
};
</script>

<style scoped></style>
