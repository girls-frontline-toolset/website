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

// lang
import VueI18n from 'vue-i18n'
Vue.use( VueI18n );

import MetaInfo from 'vue-meta-info'
Vue.use(MetaInfo);

import cn from './lang/cn.json';
import ja from './lang/ja.json';
import tw from './lang/tw.json';

const messages = {
    cn,
    tw,
    ja
};

const i18n = new VueI18n({
    locale:"tw",
    fallbackLocale:"tw",
    messages ,
});

import setting from  './setting.js';
import global from './global';
import nav from  './nav.js';
import router from "./router/router.config";

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

routes.$i18n = i18n;

Vue.prototype.langUrl = function(){
  let lang = this.$route.params.lang;
  if(!lang){
    return '';
  }
  return "/" + lang;
};


let v = new Vue({
  el: '#app',
  router: routes,
  render: h => h(App),
  i18n,
});



v.t = function(text) {
    return this.$i18n.t(text);
};
//console.log(v);
Vue.config.fallbackLang = 'tw';




