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
                            <v-row class="tw-flex tw-justify-center tw-items-center">
                                <v-col>
							        <v-card-title>Nové měření</v-card-title>
                                </v-col>
                                <v-spacer></v-spacer>
                                <v-col class="tw-flex tw-justify-end">
                                    <PrimaryButton text="Zahájit měření" size="large"/>
                                </v-col>
                            </v-row>
						</v-card>
					</v-col>
				</v-row>

				<v-row>
					<v-col>
						<v-data-table
							:headers="headers"
							:items="measurements"
							class="elevation-1"
							title="Poslední měření"
						>
							<thead>
								<tr>
									<th v-for="header in headers" :key="header.text">
										{{ header.text }}
									</th>
								</tr>
							</thead>
							<tbody>
								<tr v-for="item in measurements" :key="item.name">
									<td>{{ item.date }}</td>
									<td>{{ item.sensors }}</td>
									<td>{{ item.rgb }}</td>
									<td>{{ item.multispectral }}</td>
									<td>
										<PrimaryButton text="Stáhnout" icon="mdi-download"/>
									</td>
								</tr>
							</tbody>
						</v-data-table>
					</v-col>
				</v-row>
			</v-container>
		</v-main>
	</v-app>
</template>

<script setup>
import { ref } from 'vue';
import PrimaryButton from "@/components/button/PrimaryButton.vue";

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
