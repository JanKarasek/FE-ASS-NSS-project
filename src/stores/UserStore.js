import { defineStore } from 'pinia';
import axios from 'axios';
import config from "@/config.js";

export const useUserStore = defineStore('user', {
	state() {
		/*const oldToken = localStorage.getItem('token');

		if (oldToken) {
			axios.defaults.headers.common['Authorization'] = 'Bearer ' + oldToken;
		}
*/
		return {
			token: null,
			error: null,
			isLoggingIn: false,
			loginMessage: null,
			afterLoginRoute: null,
		};
	},

	getters: {
/*		isAuthenticated: (state) => state.token !== null,
		user: (state) => jwtDecode(state.token),*/
	},

	actions: {
		async login(userName, password) {
			try {
				this.isLoggingIn = true;

				const data = { userName, password };
				const response = await axios.post(
					config.backendUrl + '/users/login',
					data,
				);
				this.token = response.data.token;
				// axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.token;
				localStorage.setItem('token', this.token);

				this.error = null;
				this.loginMessage = null;
				this.isLoggingIn = false;
			} catch (e) {
				this.error = 'Cannot log in! ' + e;
			}
		},
		/*
		setLoginMessage(message) {
			this.loginMessage = message;
		},

		setAfterLoginRoute(route) {
			this.afterLoginRoute = route;
		},

		logout() {
			this.token = null;
			delete axios.defaults.headers.common['Authorization'];
			localStorage.removeItem('token');
		},

		clearError() {
			this.error = null;
		},*/
	},
});
