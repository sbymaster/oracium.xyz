import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import session from './session'

export default new Vuex.Store({
  modules: { session },
  plugins: [
    createPersistedState({
      key: 'OraciumSession',
      storage: window.sessionStorage,
      paths: ['session'],
      getState: (key, storage) => {
        const state = JSON.parse(storage.getItem(key))
        if (state && state.session.auth && state.session.auth.expiresAt) {
          const now = new Date().getTime()
          if (now > state.session.auth.expiresAt) {
            storage.removeItem(key)
            return undefined
          }
        }
        return state
      }
    })
  ]
})
