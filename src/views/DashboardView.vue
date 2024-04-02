<template>
	<v-app>
		<v-main>
			<v-container>
				<v-row>
					<v-col>
						<div class="tw-text-2xl">Dobré ráno, Jan.</div>
					</v-col>
				</v-row>
				<v-row align="start" justify="start">
					<v-col cols="auto">
						<v-card
							variant="flat"
							class="mx-auto tw-bg-light-grey"
							max-width="auto"
						>
							<v-card-item>
								<div>
									<div class="text-overline mb-1">Poslední záloha</div>
									<div class="text-h6 mb-1">19.3.2024 13:30</div>
								</div>
							</v-card-item>
						</v-card>
					</v-col>
					<v-col cols="auto">
						<v-card
							variant="flat"
							class="mx-auto tw-bg-light-grey"
							max-width="auto"
						>
							<v-card-item>
								<div>
									<div class="text-overline mb-1">Poslední měření</div>
									<div class="text-h6 mb-1">19.3.2024 11:30</div>
								</div>
							</v-card-item>
						</v-card>
					</v-col>
					<v-col cols="auto">
						<v-card
							variant="flat"
							class="mx-auto tw-bg-light-grey"
							max-width="auto"
						>
							<v-card-item>
								<div>
									<div class="text-overline mb-1">Plánované měření</div>
									<div class="text-h6 mb-1">30.3.2024 13:30</div>
								</div>
							</v-card-item>
						</v-card>
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
									<PrimaryButton text="Zahájit měření" size="large" />
								</v-col>
							</v-row>

							<v-expand-transition>
								<div v-show="showSettings" class="pt-4">
									<v-row>
										<v-col cols="4">
											<v-checkbox
												label="Multispektrální kamera"
												color="#77BE13"
											></v-checkbox>
											<v-text-field
												class="tw-pl-3"
												label="Délka měření akustické emise"
												placeholder="Zadejte délku v minutách"
												variant="underlined"
											></v-text-field>
										</v-col>
										<v-col cols="4" offset="2">
											<v-checkbox
												label="RGB kamera"
												color="#77BE13"
											></v-checkbox>
											<v-select
												variant="underlined"
												label="Počet senzorů"
												:items="['1', '2', '3', '4', '5', '6']"
												placeholder="Vyberte počet"
											></v-select>
										</v-col>
									</v-row>
								</div>
							</v-expand-transition>
						</v-card>
					</v-col>
				</v-row>

				<v-row>
					<v-col>
						<v-data-table
							v-model:page="page"
							:items-per-page="itemsPerPage"
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
									<td>{{ item.date }}</td>
									<td>{{ item.sensors }}</td>
									<td>{{ item.rgb }}</td>
									<td>{{ item.multispectral }}</td>
									<td>
										<PrimaryButton text="Stáhnout" />
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
import { computed, ref } from 'vue';
import PrimaryButton from '@/components/button/PrimaryButton.vue';

const page = 1;
const itemsPerPage = 5;

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

const showSettings = ref(false);

function toggleSettings() {
	showSettings.value = !showSettings.value;
}
const downloadData = (item) => {
	console.log('Downloading data for', item.date);
};

const displayedMeasurements = computed(() => {
	return measurements.value.slice(0, itemsPerPage);
});

function pageCount() {
	return Math.ceil(measurements.value.length / itemsPerPage);
}
</script>

<style scoped></style>
