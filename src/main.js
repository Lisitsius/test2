import { createApp } from 'vue'         
import { createPinia } from 'pinia'       
import App from './App.vue'               
import './assets/main.css'                

// Создаём экземпляр Vue-приложения
const app = createApp(App)

// Подключаем Pinia (глобальное хранилище данных)
app.use(createPinia())

// Монтируем приложение в DOM (ищем элемент с id="app" в index.html)
app.mount('#app')