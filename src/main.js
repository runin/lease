// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import vueTap from 'v-tap'
import VueRouter from 'vue-router'

import App from './App.vue'
import Index from './components/index.vue'
import Login from './components/login.vue'
import LookHousingMap from './components/lookHousingMap.vue'

Vue.config.productionTip = false;

Vue.use(vueTap);
Vue.use(VueRouter);

const routes = [
    { path: '/', name: 'index', component: Index },
    { path: '/login', name: 'login', component: Login },
    { path: '/lookHousingMap', name: 'LookHousingMap', component: LookHousingMap }
];
const router = new VueRouter({
    routes: routes
});


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
