import { defineStore } from 'pinia';
import axios from 'axios';
import config from '@/config.js';

export const useMeasurementsStore = defineStore('measurements', {
	state: () => ({
		lastBackup: '',
		lastMeasurement: '',
		plannedMeasurement: '',
		latestMeasurement: [],
		measurementHistory: [],
	}),
	actions: {
		async fetchLatestMeasurements() {
			const response = await axios.get(
				`${config.backendUrl}/measurements/latest`,
			);
			console.log(response.data);
		},
		async fetchMeasurementHistory(startDate, endDate) {
			try {
				const response = await axios.get(
					`${config.backendUrl}/measurements/history`,
					{
						params: { startDate, endDate },
					},
				);
				this.measurementHistory = response.data;
			} catch (error) {
				console.error('Error fetching measurement history:', error);
			}
		},
	},
});
