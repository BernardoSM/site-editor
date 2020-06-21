import Vue from 'vue'

export default {
	state: {
		token: localStorage.getItem('user-token') || '',
		id: localStorage.getItem('user-id') || '',
  		status: ''
	},
	getters: {
		isAuthenticated: state => state.token.length > 0 ? true : false,
  		authStatus: state => state.status,
  		getUserId: state => state.id
	},
	mutations: {
		setId: (state, id) => {
			state.id = id
		},
		authSuccess: (state, token) => {
			state.status = 'success'
			state.token = token
		},
		resetToken(state){
			state.token = ''
		}
	},
	actions: {
		authRequest({commit, dispatch}, user) {
			return new Promise((resolve, reject) => {
				Vue.prototype.$http.post('/user/login', user)
					.then(resp => {
						console.log(resp)
						const token = resp.data.token
						const id = resp.data.id
						localStorage.setItem('user-token', token)
						localStorage.setItem('user-id', id)
						commit('authSuccess', token)
						commit('setId', id)
						resolve(resp)
					})
					.catch(err => {
						localStorage.removeItem('user-token') 
						reject(err)
					})
			})
		},
		registerRequest({commit, dispatch}, user) {
			return new Promise((resolve, reject) => {
				Vue.prototype.$http.post('/user/register', user)
					.then(resp => {
						console.log(resp)
						resolve(resp)
					})
					.catch(err => {
						reject(err)
					})
			})
		},
		authLogout({commit, dispatch}) {
			return new Promise((resolve, reject) => {
				const firebaseToken = localStorage.getItem('firebase-token')
				localStorage.clear()
				localStorage.setItem('firebase-token', firebaseToken)
				commit('resetToken')
				delete Vue.prototype.$http.defaults.headers.common['token']
				resolve()
			})
		}
	}
}