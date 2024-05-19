<template>
	<v-app>
		<v-main>
			<error v-if="store.error" :text="store.error" @hide="store.clearError()"></error>
			<v-container>
				<v-row>
					<v-col>
						<div class="tw-text-2xl">History</div>
					</v-col>
				</v-row>
				<v-row>
					<v-col>
						<DateTimePickerRange v-model:startDate="defaultStartDate" v-model:endDate="defaultEndDate" />
					</v-col>
				</v-row>

				<v-row>
					<v-col>
						<v-data-table :headers="headers" class="elevation-1" title="Poslední měření">
							<template v-slot:top>
								<v-toolbar flat dense class="tw-bg-white">
									<v-toolbar-title>Měření v intervalu
										{{ moment(defaultStartDate).format('DD.MM.YYYY HH:mm:ss') }}
										- {{ moment(defaultEndDate).format('DD.MM.YYYY HH:mm:ss') }}
									</v-toolbar-title>
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
								<tr v-for="item in pagedMeasurements" :key="item.name">
									<td>{{ formatDateMinutes(item.dateTime) }}</td>
									<td>{{ item.numberOfSensors }}</td>
									<td>{{ item.lengthOfAE }}</td>
									<td>{{ item.rgbCamera ? 'Ano' : 'Ne' }}</td>
									<td>{{ item.multispectralCamera ? 'Ano' : 'Ne' }}</td>
									<td>{{ item.scheduled ? 'Ano' : 'Ne' }}</td>
									<td>
										<PrimaryButton text="Stáhnout"
											@click="downloadData(item)" />
									</td>
								</tr>
							</tbody>
							<template v-slot:bottom> </template>
						</v-data-table>
						<div class="text-center pt-2">
							<v-pagination v-model="page" :length="pageCount" :total-visible="totalVisible"
								prev-icon="mdi-chevron-left" next-icon="mdi-chevron-right"></v-pagination>
							<div class="tw-text-dark-grey tw-text-xs">{{ rangeText }}</div>
						</div>
					</v-col>
				</v-row>
			</v-container>
		</v-main>
	</v-app>
</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue';
import PrimaryButton from '@/components/button/PrimaryButton.vue';
import DateTimePickerRange from '@/components/datepickers/DateTimePickerRange.vue';
import moment from 'moment';
import { useMeasurementsStore } from '@/stores/MeasurementsStore.js';
import { formatDateMinutes } from '../utils';
import Error from '@/components/Error.vue';

const store = useMeasurementsStore();

onMounted(() => {
	store.fetchMeasurementHistory(defaultStartDate.value, defaultEndDate.value);
});

const measurements = computed(() => store.measurementHistory);

const headers = [
	{ text: 'Datum a čas', value: 'date' },
	{ text: 'Počet senzorů', value: 'sensors' },
	{ text: 'Délka AE', value: 'lengthOfAE' },
	{ text: 'RGB', value: 'rgb' },
	{ text: 'Multispektrální', value: 'multispectral' },
	{ text: 'Plánované měření', value: 'scheduled' },
	{ text: 'Stáhnout data', value: 'actions', sortable: false },
];

const page = ref(1);
const itemsPerPage = 15;
const totalVisible = 4;

const totalItems = computed(() => measurements.value.length);
const pageCount = computed(() => Math.ceil(totalItems.value / itemsPerPage));

const pagedMeasurements = computed(() => {
	const startIndex = (page.value - 1) * itemsPerPage;
	return measurements.value.slice(startIndex, startIndex + itemsPerPage);
});

const rangeText = computed(() => {
	const startIndex = (page.value - 1) * itemsPerPage + 1;
	const endIndex = Math.min(page.value * itemsPerPage, totalItems.value);
	return `${startIndex}-${endIndex} z ${totalItems.value}`;
});

// start date is 7 days ago
const defaultStartDate = ref(new Date());
defaultStartDate.value.setDate(defaultStartDate.value.getDate() - 7);

// end date is now
const defaultEndDate = ref(new Date());

watch([defaultStartDate, defaultEndDate], () => {
	const formattedStartDate = moment(
		defaultStartDate.value,
		'DD.MM.YYYY HH:mm:ss',
	).format('YYYY-MM-DDTHH:mm:ss');
	const formattedEndDate = moment(
		defaultEndDate.value,
		'DD.MM.YYYY HH:mm:ss',
	).format('YYYY-MM-DDTHH:mm:ss');
	store.fetchMeasurementHistory(formattedStartDate, formattedEndDate);
});

const downloadData = (item) => {
	const data = JSON.stringify(item)
	const blob = new Blob([data], { type: 'text/plain' })
	const e = document.createEvent('MouseEvents'),
		a = document.createElement('a');
	a.download = Date.now().toString() + ".json";
	a.href = window.URL.createObjectURL(blob);
	a.dataset.downloadurl = ['text/json', a.download, a.href].join(':');
	e.initEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
	a.dispatchEvent(e);
	console.log('Stahuji data pro', item);
};
</script>

<style scoped></style>
