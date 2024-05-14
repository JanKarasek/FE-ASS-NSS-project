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
						<div class="tw-text-xl">Frekvence měření</div>
					</v-col>
				</v-row>
				<v-row>
					<v-col cols="4">
						<v-text-field
							v-model="measurementFrequency"
							type="number"
							min="0"
							class="tw-pl-3"
							label="Doba mezi dvěma měřeními"
							placeholder="Zadejte délku v minutách"
							variant="underlined"
						></v-text-field>
					</v-col>
					<v-col cols="4" offset="2">
						<p>Datum a čas prvního měření</p>
						<DateTimePickerSingle v-model:date="measurementDate" />
					</v-col>
				</v-row>
				<v-row>
					<v-col>
						<div class="tw-text-xl">Specifikace měření</div>
					</v-col>
				</v-row>
				<MeasurementSettings
					:multispectralCameraChecked="multispectralCameraChecked"
					@update:multispectralCameraChecked="updateMultispectralCameraChecked"
					:measurementDuration="measurementDuration"
					@update:measurementDuration="updateMeasurementDuration"
					:rgbCameraChecked="rgbCameraChecked"
					@update:rgbCameraChecked="updateRgbCameraChecked"
					:selectedSensorCount="selectedSensorCount"
					@update:selectedSensorCount="updateSelectedSensorCount"
					:rgbCameraSensors="rgbCameraSensors"
				/>
			</v-container>
			<PrimaryButton text="Uložit nastavení" @click="updateConfig()" />
		</v-main>
	</v-app>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import MeasurementWidget from '@/components/measurements/MeasurementWidget.vue';
import moment from 'moment';
import MeasurementSettings from '@/components/measurements/MeasurementSettings.vue';
import DateTimePickerSingle from '@/components/datepickers/DateTimePickerSingle.vue';
import PrimaryButton from '@/components/button/PrimaryButton.vue';
import { useMeasurementsStore } from '@/stores/MeasurementsStore';
import { onMounted } from 'vue';

const emits = defineEmits(['update:measurementFrequency']);

const firstDate = moment('19.3.2024 13:30', 'DD.MM.YYYY HH:mm');

const store = useMeasurementsStore();
const loading = ref(true);

const measurements = computed(() => store.measurementInfo.latestMeasurement);
const measurementsConfig = computed(() => store.measurementConfig);

const multispectralCameraChecked = ref(
	measurementsConfig.value.multispectralCamera,
);
const measurementDuration = ref(measurementsConfig.value.lengthOfAE);
const rgbCameraChecked = ref(measurementsConfig.value.rgbCamera);
const selectedSensorCount = ref(measurementsConfig.value.numberOfSensors);
const rgbCameraSensors = ref([1, 2, 3, 4, 5, 6]);
const measurementFrequency = ref(measurementsConfig.value.measurementFrequency);
const measurementDate = ref(
	measurementsConfig?.value?.firstMeasurement ?? Date.now(),
);

onMounted(async () => {
	store.fetchLatestMeasurements();
	loading.value = true;
	await store.fetchMeasurementConfig();

	measurementDuration.value = store.measurementConfig.lengthOfAE;
	console.log(measurementDuration.value);
	multispectralCameraChecked.value =
		store.measurementConfig.multispectralCamera;
	rgbCameraChecked.value = store.measurementConfig.rgbCamera;
	selectedSensorCount.value = store.measurementConfig.numberOfSensors;
	measurementFrequency.value = store.measurementConfig.measurementFrequency;
	measurementDate.value = store.measurementConfig.firstMeasurement;
	loading.value = false;
});

function updateConfig() {
	try {
		const data = {
			measurementFrequency: measurementFrequency.value,
			firstMeasurement: measurementDate.value,
			rgbCamera: rgbCameraChecked.value,
			multispectralCamera: multispectralCameraChecked.value,
			numberOfSensors: selectedSensorCount.value,
			lengthOfAE: Number(measurementDuration.value),
		};
		store.updateMeasurementConfig(data);
	} catch (error) {
		store.error = error.message;
	}
}

watch(measurementFrequency, (newValue) => {
	emits('update:measurementFrequency', newValue);
});

function updateMultispectralCameraChecked(value) {
	multispectralCameraChecked.value = value;
}

function updateMeasurementDuration(value) {
	measurementDuration.value = Number(value);
}

function updateRgbCameraChecked(value) {
	rgbCameraChecked.value = value;
}

function updateSelectedSensorCount(value) {
	selectedSensorCount.value = value;
}

function toggleSettings() {
	showSettings.value = !showSettings.value;
}
</script>

<style scoped></style>
