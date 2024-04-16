<template>
	<v-app>
		<v-main>
			<v-container>
				<v-row>
					<v-col>
						<div class="tw-text-2xl">Measurements</div>
					</v-col>
				</v-row>
				<v-row align="start" justify="start">
					<v-col cols="auto">
						<MeasurementWidget title="Poslední záloha" :datetime=firstDate />
					</v-col>
					<v-col cols="auto">
						<MeasurementWidget title="Poslední měření" :datetime=firstDate />
					</v-col>
				</v-row>
				<v-row>
					<v-col>
						<div class="tw-text-xl">Frekvence měření</div>
					</v-col>
				</v-row>
				<v-row>
					<v-col cols="4">
						<v-text-field type="number" min="0" class="tw-pl-3" label="Doba mezi dvěma měřeními"
							placeholder="Zadejte délku v minutách" variant="underlined"></v-text-field>
					</v-col>
					<v-col cols="4" offset="2">
						<p>Datum a čas prvního měření</p>
						<DateTimePickerSingle />
					</v-col>
				</v-row>
				<v-row>
					<v-col>
						<div class="tw-text-xl">Specifikace měření</div>
					</v-col>
				</v-row>
				<MeasurementSettings />
			</v-container>
		</v-main>
	</v-app>
</template>

<script setup>
import { ref } from 'vue';
import MeasurementWidget from '@/components/measurements/MeasurementWidget.vue';
import moment from 'moment';
import MeasurementSettings from '@/components/measurements/MeasurementSettings.vue';
import DateTimePickerSingle from '@/components/datepickers/DateTimePickerSingle.vue';

const firstDate = moment('19.3.2024 13:30', 'DD.MM.YYYY HH:mm');

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
