// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Vuex from 'vuex';
import Router from 'vue-router';
import App from './App.vue';
//
import Home from './pages/home.vue';
import Play from './pages/play.vue';
import Game from './pages/game.vue';
import Tally from './pages/tally.vue';
import Gamelist from './pages/gamelist.vue';
import Players from './pages/players.vue';
//
const routes = [{
    path: '/',
    component: Home
}, {
    path: '/play',
    component: Play
}, {
    path: '/gamelist',
    component: Gamelist
}, {
    path: '/game/:id',
    component: Game
}, {
    path: '/tally/:id',
    component: Tally
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
