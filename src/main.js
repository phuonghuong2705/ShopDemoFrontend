import './assets/main.css'

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import dayjs from 'dayjs';
import 'dayjs/locale/vi'; // import ngôn ngữ

import App from './App.vue';
import router from './router';
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';
import locale from 'ant-design-vue/es/locale/vi_VN'; // import locale cho Ant

import { ConfigProvider } from 'ant-design-vue';
dayjs.locale('vi');

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(Antd)

app.mount('#app')
