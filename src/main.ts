import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
// customized style
import './style.scss'
// customized components
import components from '@/components'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(Antd)
app.use(createPinia())
app.use(router)

if (Array.isArray(components) && components.length > 0) {
  components.forEach((c: any) => app.component(c.name. c.component))
}

app.mount('#app')
