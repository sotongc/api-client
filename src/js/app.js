import "../scss/main.scss";

import Vue from 'vue';

import store from './store.js';
import router from './router.js';

import app from "./app.vue";

new Vue({
	el:"#app",
	store,
	router,
	render:h=>h(app)
});