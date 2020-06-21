import Vue from 'vue'
import {getters} from '@/store/modules/site'

export default {
	state: {
		sites: JSON.parse(localStorage.getItem('sites')) || []
	},
	getters: {
		getSites: state => state.sites.reverse()
	},
	mutations: {
		setSites(state) {
			state.sites = JSON.parse(localStorage.getItem('sites'))
		},
	},
	actions: {
		sitesRequest({commit, getters}) {

			const userId = getters.getUserId

			return new Promise((resolve, reject) => {
				Vue.prototype.$http.get(`/site/${userId}`)
					.then(resp => {
						const sites = resp.data

						localStorage.setItem(
							'sites', 
							JSON.stringify(sites)
						)

						commit('setSites', sites)
						resolve(resp)
					}, err => {

						reject(err)
					})
			})
		},
		sendSiteRequest({commit, getters}, site) {

			const userId = getters.getUserId

			return new Promise((resolve, reject) => {

				Vue.prototype.$http.post(`/site`, {
					'text': site,
					'user': userId
				})
					.then(resp => {
						console.log(resp)

						resolve(resp)
					}, err => {

						reject(err)
					})

			})
		},
		editSiteRequest({commit, getters}, payload) {

			const userId = getters.getUserId

			return new Promise((resolve, reject) => {

				Vue.prototype.$http.put(`/site`, {
					'_id': payload._id,
					'text': payload.text,
					'user': userId,
				})
					.then(resp => {
						console.log(resp)

						resolve(resp)
					}, err => {

						reject(err)
					})

			})
		},
		deletesiteRequest({commit, getters}, siteid) {

			return new Promise((resolve, reject) => {

				Vue.prototype.$http.delete(`/site/${siteid}`)
					.then(resp => {
						console.log(resp)

						resolve(resp)
					}, err => {

						reject(err)
					})

			})
		},
	}
}