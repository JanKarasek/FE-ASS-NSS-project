<template>
	<v-app>
		<v-main>
			<error
				v-if="store.error"
				:text="store.error"
				@hide="store.clearError()"
			></error>

			<v-container>
				<v-row>
					<v-col>
						<div class="tw-text-2xl">Dobré ráno, Jan.</div>
					</v-col>
				</v-row>
				<v-row align="start" justify="start">
					<v-col cols="auto">
						<MeasurementWidget
							title="Poslední záloha"
							:datetime="store.measurementInfo.lastBackup"
						/>
					</v-col>
					<v-col cols="auto">
						<MeasurementWidget
							title="Poslední měření"
							:datetime="store.measurementInfo.lastMeasurement"
						/>
					</v-col>
					<v-col cols="auto">
						<MeasurementWidget
							title="Plánované měření"
							:datetime="store.measurementInfo.plannedMeasurement"
						/>
					</v-col>
				</v-row>

				<v-row>
					<v-col>
						<v-card class="pa-4">
							<v-row class="tw-flex tw-justify-between tw-items-center">
								<v-col>
									<v-card-title class="tw-pl-1">Nové měření</v-card-title>
									<v-card-text
										@click="toggleSettings"
										class="tw-cursor-pointer tw-pl-1"
									>
										{{ showSettings ? 'Zobrazit méně' : 'Upravit nastavení' }}
										<v-icon>{{
											showSettings ? 'mdi-chevron-up' : 'mdi-chevron-down'
										}}</v-icon>
									</v-card-text>
								</v-col>

								<v-col class="tw-flex tw-justify-end">
									<LoadingButton
										text="Zahájit měření"
										loading-text="Probíhá měření"
										size="large"
										@click="updateConfig()"
									/>
								</v-col>
							</v-row>

							<v-expand-transition>
								<div v-show="showSettings" class="pt-4">
									<MeasurementSettings
										:multispectral="multispectral"
										:rgb="rgb"
										:numberOfSensors="numberOfSensors"
										:measurementLength="measurementLength"
										@update:multispectral="handleMultispectralUpdate"
										@update:rgb="handleRgbUpdate"
										@update:numberOfSensors="handleNumberOfSensorsUpdate"
										@update:measurementLength="handleMeasurementLengthUpdate"
									/>
								</div>
							</v-expand-transition>
						</v-card>
					</v-col>
				</v-row>

				<v-row>
					<v-col>
						<v-data-table
							:headers="headers"
							:items="measurements"
							title="Poslední měření"
							class="elevation-1"
						>
							<template v-slot:top>
								<v-toolbar flat dense class="tw-bg-white">
									<v-toolbar-title>Poslední měření </v-toolbar-title>
								</v-toolbar>
							</template>
							<thead>
								<tr>
									<th v-for="header in headers" :key="header.text">
										{{ header.text }}
									</th>
								</tr>
							</thead>
							<tbody>
								<tr v-for="item in displayedMeasurements" :key="item.name">
									<td>{{ item.dateTime }}</td>
									<td>{{ item.numberOfSensors }}</td>
									<td>{{ item.rgbCamera ? 'Ano' : 'Ne' }}</td>
									<td>{{ item.multispectralCamera ? 'Ano' : 'Ne' }}</td>
									<td>
										<PrimaryButton
											text="Stáhnout"
											@click="downloadData(item.dateTime)"
										/>
									</td>
								</tr>
							</tbody>
							<template v-slot:bottom> </template>
						</v-data-table>
					</v-col>
				</v-row>
			</v-container>
		</v-main>
	</v-app>
</template>

<script setup>
import { onMounted, computed, ref } from 'vue';
import { useMeasurementsStore } from '@/stores/MeasurementsStore.js';
import PrimaryButton from '@/components/button/PrimaryButton.vue';
import LoadingButton from '@/components/button/LoadingButton.vue';
import MeasurementWidget from '@/components/measurements/MeasurementWidget.vue';
import MeasurementSettings from '@/components/measurements/MeasurementSettings.vue';
import Error from '../components/Error.vue';
import { formatDateMinutes } from '../utils';

const store = useMeasurementsStore();

onMounted(() => {
	store.fetchLatestMeasurements();
	store.fetchMeasurementConfig();
});

const headers = [
	{ text: 'Datum a čas', value: 'date' },
	{ text: 'Počet senzorů', value: 'sensors' },
	{ text: 'RGB', value: 'rgb' },
	{ text: 'Multispektrální', value: 'multispectral' },
	{ text: 'Stáhnout data', value: 'actions', sortable: false },
];

const measurements = computed(() => store.measurementInfo.latestMeasurement);
const measurementsConfig = computed(() => store.measurementConfig);

const multispectral = ref(
	store.measurementConfig?.multispectralCamera ?? false,
);
const rgb = ref(store.measurementConfig?.rgbCamera ?? false);
const numberOfSensors = ref(store.measurementConfig?.numberOfSensors ?? 0);
const measurementLength = ref(store.measurementConfig?.lengthOfAE ?? 0);

const showSettings = ref(false);
function returnToConsole() {
	const currentTime = new Date().toISOString();
	console.log('Zahájení měření:', currentTime);
	console.log('Multispektrální kamera:', multispectral.value);
	console.log('RGB kamera:', rgb.value);
	console.log('Počet senzorů:', numberOfSensors.value);
	console.log('Délka měření:', measurementLength.value);
}

function updateConfig() {
	try {
		const currentTime = new Date().toISOString();
		const data = {
			measurementFrequency: 60,
			firstMeasurement: currentTime,
			rgbCamera: rgb.value,
			multispectralCamera: multispectral.value,
			numberOfSensors: numberOfSensors.value,
			lengthOfAE: measurementLength.value,
		};
		store.updateMeasurementConfig(data);
	} catch (error) {
		store.error = error.message;
	}
}

function handleMultispectralUpdate(value) {
	multispectral.value = value;
}

function handleRgbUpdate(value) {
	rgb.value = value;
}

function handleNumberOfSensorsUpdate(value) {
	numberOfSensors.value = value;
}

function handleMeasurementLengthUpdate(value) {
	measurementLength.value = value;
}

function toggleSettings() {
	showSettings.value = !showSettings.value;
}

const downloadData = (item) => {
	console.log('Stahuji data pro', item);
};

const displayedMeasurements = computed(() => {
	return measurements.value.slice(0, 5).map((item) => ({
		...item,
		dateTime: formatDateMinutes(item.dateTime),
	}));
});
</script>

<style scoped></style>
