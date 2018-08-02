const state = {
	coins: 0
}

const mutations = {
	add (state, value) {
		state.coins += value
	}
}

const actions = {
	add ({ commit }, value) {
		commit('add', value)
	}
}

export default {
	namespaced: true,
	state,
	mutations,
	actions
}