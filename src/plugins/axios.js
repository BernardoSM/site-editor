import Vue from 'vue'
import axios from 'axios'

Vue.use({
	install(Vue) {
		Vue.prototype.$http = axios.create({
			baseURL: 'http://localhost:3000/api/',
			headers: {
				'Content-Type': 'application/json'
			}
		})

		Vue.prototype.$http.interceptors.request.use(
			config => {
				const token = localStorage.getItem('user-token')

				if (token) {
					config.headers.Authorization = `Bearer ${token}`
				}
				return config
			},
			error => Promise.reject(error)
		)
	}
})