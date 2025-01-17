const EXPIRATION_TIME = 24 * 60 * 60 * 1000 // 24 jam dalam milidetik
const EXPIRATION_TIME_MONTH = 30 * 24 * 60 * 60 * 1000; // 1 bulan dalam milidetik
const EXPIRATION_TIME_YEAR = 365 * 24 * 60 * 60 * 1000; // 1 tahun dalam milidetik

const state = { auth: null, data: {}, chat_history: [] }

const getters = {
  authenticated: (state) => !!state.auth,
  stateAuth: (state) => state.auth,
  stateData: (state) => state.data,
  stateChatHistory: (state) => state.chat_history || []
}

const actions = {
  async login({ commit }, auth) {
    const expiresAt = new Date().getTime() + EXPIRATION_TIME_YEAR
    await commit('setAuth', { ...auth, expiresAt })
  },
  async logout({ commit }) {
    commit('destroyAuth')
  },
  async setSession({ commit }, data) {
    await commit('addSession', data)
  },
  async delSession({ commit }, key) {
    commit('removeSession', key)
  },
  async clearSession({ commit }) {
    commit('destroySession')
  },
  async setChatHistory({ commit }, history) {
    await commit('addChatHistory', history)
  },
  async upChatMessageHistory({ commit }, history) {
    await commit('updateChatMessageHistory', history)
  },
  async delChatMessageHistory({ commit }, history) {
    await commit('removeChatMessageHistory', history)
  },
  async upChattitleHistory({ commit }, history) {
    await commit('updateChatTitleHistory', history)
  },
  async delChatHistory({ commit }, key) {
    commit('removeChatHistory', key)
  },
  async clearChatHistory({ commit }) {
    commit('destroyChatHistory')
  },
  checkAuthExpiration({ commit, state }) {
    const now = new Date().getTime()
    if (state.auth && state.auth.expiresAt && now > state.auth.expiresAt) {
      commit('destroySession')
      commit('destroyAuth')
    }
  }
}

const mutations = {
  setAuth(state, auth) {
    state.auth = auth
  },
  destroyAuth(state) {
    state.auth = null
  },
  addSession(state, data) {
    state.data[`${data.key}`] = data.value
  },
  removeSession(state, key) {
    delete state.data[`${key}`]
  },
  destroySession(state) {
    state.data = {}
  },
  addChatHistory(state, history) {
    let currentHistory = state.chat_history;
    currentHistory.push(history);
    state.chat_history = currentHistory;
  },
  updateChatMessageHistory(state, history) {
    let currentHistory = state.chat_history;
    if(currentHistory[history.key]){
      currentHistory[history.key].messages = history.messages;
      state.chat_history = currentHistory;
    }
  },
  removeChatMessageHistory(state, history) {
    let currentHistory = state.chat_history;
    if(currentHistory[history.key] && currentHistory[history.key].messages[history.message_key]){
      currentHistory[history.key].messages.splice(history.message_key, 1);
      state.chat_history = currentHistory;
    }
  },
  updateChatTitleHistory(state, history) {
    let currentHistory = state.chat_history;
    if(currentHistory[history.key]){
      currentHistory[history.key].title = history.title;
      state.chat_history = currentHistory;
    }
  },
  removeChatHistory(state, key) {
    let currentHistory = state.chat_history;
    if(currentHistory[key]){
      currentHistory.splice(key, 1);
      state.chat_history = currentHistory;
    }
  },
  destroyChatHistory(state) {
    state.chat_history = []
  }
}

export default { state, getters, actions, mutations }
