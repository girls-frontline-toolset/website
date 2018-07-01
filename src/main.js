import 'babel-polyfill';
import Vue from 'vue'
import App from './App.vue'
import Vuetify from 'vuetify'
import routes from './router/router.config.js'
import colors from 'vuetify/es5/util/colors'

//import 'bootstrap/dist/css/bootstrap.min.css'
//import 'bootstrap/dist/js/bootstrap.min.js'

import 'jquery/src/jquery';

import 'vuetify/dist/vuetify.min.css'
import 'babel-polyfill';

import setting from  './setting.js';
import global from './global';
import nav from  './nav.js';

setting.install = function () {
    Object.defineProperty(Vue.prototype, '$s', {
        get () {
            return setting
        }
    })
};

global.install = function () {
    Object.defineProperty(Vue.prototype, '$g', {
        get () {
            return global
        }
    })
};

nav.install = function () {
    Object.defineProperty(Vue.prototype, '$nav', {
        get () {
            return nav
        }
    })
};
Vue.use(global);
Vue.use(setting);
Vue.use(nav);

Vue.use(Vuetify, {
    theme: {
        primary: colors.orange.darken1, // #E53935
        secondary: colors.orange.lighten1, // #FFCDD2
        accent: colors.indigo.base // #3F51B5
    }
});


new Vue({
    el: '#app',
    router: routes,
    render: h => h(App)
});





