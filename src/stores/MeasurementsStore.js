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
			try {
				const response = await axios.get(
					`${config.backendUrl}/measurements/latest`,
				);
				if (response.data) {
					this.lastBackup = response.data.lastBackup;
					this.lastMeasurement = response.data.lastMeasurement;
					this.plannedMeasurement = response.data.plannedMeasurement;
					this.latestMeasurement = response.data.latestMeasurement;
				}
			} catch (error) {
				console.error('Error fetching latest measurements:', error);
			}
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
