import { createApp } from 'vue'
import App from './App.vue'
import '@fortawesome/fontawesome-free/css/all.css';
// Plugins
import { registerPlugins } from './plugins'

const app = createApp(App)
registerPlugins(app)
app.mount('#app')
