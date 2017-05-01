// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Vuex from 'vuex';
import Router from 'vue-router';
import App from './App.vue';
//
import Home from './pages/home.vue';
import Scoreboard from './pages/scoreboard.vue';
import Games from './pages/games.vue';
import Players from './pages/players.vue';
//
const routes = [{
    path: '/',
    component: Home
}, {
    path: '/scoreboard',
    component: Scoreboard
}, {
    path: '/games',
    component: Games
}, {
    path: '/players',
    component: Players
}];
Vue.use(Router);
const router = new Router({
    routes,
    mode: 'history',
    saveScrollPosition: true,
});
const app = new Vue({
    router,
    render: h => h(App),
}).$mount('#app');
