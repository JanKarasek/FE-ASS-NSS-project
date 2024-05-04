import { defineStore } from 'pinia';
import axios from 'axios';
import config from '../config';

export const useMeasurementsStore = defineStore('measurements', {
	state: () => ({
		measurementInfo: {
			lastBackup: '',
			lastMeasurement: '',
			plannedMeasurement: '',
			latestMeasurement: [],
		},
		measurementHistory: [],
		measurementConfig: {},
		error: null,
	}),
	getters: {},

	actions: {
		async fetchLatestMeasurements() {
			try {
				const response = await axios.get(
					config.backendUrl + '/measurements/latest',
				);
				this.measurementInfo = {
					...this.measurementInfo,
					lastBackup: response.data.lastBackup,
					lastMeasurement: response.data.lastMeasurement,
					plannedMeasurement: response.data.plannedMeasurement,
					latestMeasurement: response.data.latestMeasurement,
				};
				this.error = null;
			} catch (error) {
				this.error = 'Cannot get latest measurements ' + error;
			}
		},
		async fetchMeasurementHistory(startDate, endDate) {
			try {
				const response = await axios.get(
					config.backendUrl + '/measurements/history',
					{
						params: { startDate, endDate },
					},
				);
				this.measurementHistory = response.data;
				this.error = null;
			} catch (error) {
				this.error = 'Cannot get measurement history ' + error;
			}
		},
		async fetchMeasurementConfig() {
			try {
				const response = await axios.get(
					config.backendUrl + '/settings/measurementConfig',
				);
				this.measurementConfig = response.data;
				console.log('Data načtena:', response.data);
				console.log('Data ulozena:', this.measurementConfig);
				this.error = null;
			} catch (error) {
				this.error = 'Cannot get measurement configuration ' + error;
			}
		},
		async updateMeasurementConfig(data) {
			try {
				const response = await axios.put(
					config.backendUrl + '/settings/measurementConfig',
					data,
				);
				this.measurementConfig = response.data;
				this.error = null;
			} catch (error) {
				this.error = 'Cannot update measurement configuration ' + error;
			}
		},
		clearError() {
			this.error = null;
		},
	},
});
