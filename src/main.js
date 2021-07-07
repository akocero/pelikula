import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/sass/index.scss'
import { projectAuth } from './firebase/config'


let app 

projectAuth.onAuthStateChanged(() => {
   if(!app) {
      app = createApp(App).use(store).use(router).mount('#app')
   }
})

