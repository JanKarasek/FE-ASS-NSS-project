import { defineStore } from 'pinia';
import axios from 'axios';
import config from "@/config.js";

export const useUserStore = defineStore('user', {

	state: () => ({
		token: null,
		error: null,
		afterLoginRoute: null,
		isLoggedIn: null,
	}),
	/*const oldToken = localStorage.getItem('token');

		if (oldToken) {
			axios.defaults.headers.common['Authorization'] = 'Bearer ' + oldToken;
		}
*/

	getters: {
		//isAuthenticated: (state) => state.token !== null,
		/*	user: (state) => jwtDecode(state.token),*/
	},

	actions: {
		async login(userName, password) {
			try {
				const data = { userName, password };
				const response = await axios.post(
					config.backendUrl + '/users/login',
					data,
				);
				this.token = response.data.accessToken;
				// nastavení hlavičky Authorization pro všechny HTTP požadavky odeslané pomocí Axios
				// axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.token;
				localStorage.setItem('token', this.token);

				this.error = null;
				this.isLoggedIn = true;
			} catch (e) {
				this.error = 'Cannot log in! ' + e;
				this.isLoggedIn = false;
			}
		},

		logout() {
			this.token = null;
			delete axios.defaults.headers.common['Authorization'];
			localStorage.removeItem('token');
		},

		/*
		setLoginMessage(message) {
			this.loginMessage = message;
		},

		clearError() {
			this.error = null;
		},*/
	},
});
