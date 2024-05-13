import { defineStore } from 'pinia';
import axios from 'axios';
import config from '@/config.js';

export const useUserStore = defineStore('user', {
	state: () => ({
		token: null,
		error: null,
		afterLoginRoute: null,
		isLoggedIn: null,
		users: [],
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
				sessionStorage.setItem('first_name', response.data.firstName);
				sessionStorage.setItem('last_name', response.data.lastName);

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

		async fetchUsers() {
			try {
				const response = await axios.get(config.backendUrl + '/users');
				this.users = response.data;
				this.error = null;
			} catch (error) {
				this.error = 'Cannot get users ' + error;
			}
		},

		async addUser(data) {
			try {
				const response = await axios.post(config.backendUrl + '/users', data);
				this.user = response.data;
				this.error = null;
			} catch (error) {
				this.error = 'Cannot add user ' + error;
			}
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
