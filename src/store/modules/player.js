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
	}
}

const actions = {
	collected ({ commit }, memory) {
		commit('collected', memory)
	}
}

export default {
	namespaced: true,
	state,
	mutations,
	actions
}
