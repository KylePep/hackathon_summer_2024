import '@mdi/font/css/materialdesignicons.css'
import 'bootstrap'
import App from './App.vue';
import { registerGlobalComponents } from './registerGlobalComponents'
import { router } from './router.js'
import './utils/SocketProvider.js'
import { createApp } from 'vue';

const root = createApp(App)
async function init() {
  await registerGlobalComponents(root)
  root
    .use(router)
    .mount('#app')
}
init()
