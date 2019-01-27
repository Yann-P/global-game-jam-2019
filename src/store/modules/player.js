const state = {
	goodMemories: 0,
	badMemories: 0
}

const mutations = {
	collected (state, memory) {
		if (memory.good === true) {
			state.goodMemories += memory.value
		} else {
			state.badMemories += memory.value
		}
	},
	reset (state) {
		state.goodMemories = 0
		state.badMemories = 0
	}
}

const actions = {
	collected ({ commit }, memory) {
		commit('collected', memory)
	},
	reset ({ commit }) {
		commit('reset')
	}
}

export default {
	namespaced: true,
	state,
	mutations,
	actions
}
