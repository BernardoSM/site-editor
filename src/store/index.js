import Vue from 'vue'
import Vuex from 'vuex'
import site from '@/store/modules/site'
import auth from '@/store/modules/auth'

Vue.use(Vuex)

export default new Vuex.Store({
	modules: {
		site,
		auth
	}
})
