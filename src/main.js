import { createApp } from 'vue'
import '@/assets/theme/css/style'
import '@/assets/theme/css/custom'
import '@/assets/theme/css/oracium'
import '@/assets/theme/css/responsive'
import { initScripts } from '@/assets/theme/script'
import VueLazyload from 'vue3-lazyload';

// Route
import Layout from '@/components/Layout'
import store from '@/configs/store'
import router from '@/configs/router'

const app = createApp(Layout)
app.use(store)
app.use(router)

app.use(VueLazyload, {
    loading: '/assets/img/lazy.jpg',
    error: '/assets/img/lazy.jpg',
});

app.mount('#app')

initScripts()

store.dispatch('checkAuthExpiration')
