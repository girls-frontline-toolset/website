import Vue from 'vue'
import VueRouter from 'vue-router'
import GlIndexContent from '../page-vuetifly/index.vue';
import inquire from '../page-vuetifly/inquire-content.vue';
//time
import girl from '../page-vuetifly/time/girl-content.vue';
import fairy from '../page-vuetifly/time/fairy-content.vue';
import device from '../page-vuetifly/time/device-content.vue'
//list
import list from '../page-vuetifly/list/list-girl-content';
import listFairy from '../page-vuetifly/list/list-fairy-content.vue';
//tool
import android from '../page-vuetifly/tool/android-content.vue';
import chrome from '../page-vuetifly/tool/chrome-content.vue';
//bot
import lineBot from '../page-vuetifly/bot/line-content.vue';
//more
import line from '../page-vuetifly/more/line-content.vue';
import about from '../page-vuetifly/more/about-content.vue';
import link from '../page-vuetifly/more/link-content.vue';
import feedback from '../page-vuetifly/more/feedback-content.vue';
//fb
import fbList from '../page-vuetifly/fb/list-content.vue';
//log
import updateLog from '../page-vuetifly/log/update-content.vue';
//like
import likeList from '../page-vuetifly/like/list-content.vue';
//make
import makeGirl from '../page-vuetifly/make/make-content.vue';
import makeDevice from '../page-vuetifly/make/device-content.vue';
import hMake from '../page-vuetifly/make/h-make-content.vue';
import hMakeDevice from '../page-vuetifly/make/h-device-make.vue';
//image
import image from '../page-vuetifly/img/image-content.vue';
import imageAdd from '../page-vuetifly/img/image-add-content.vue';
//admin
import adminIndex from '../page-vuetifly/admin/index-content.vue';
import login from '../page-vuetifly/admin/login-content.vue';
import adminImage from '../page-vuetifly/admin/image-content.vue';
import logout from '../page-vuetifly/admin/logout.vue'
import errorImg from '../page-vuetifly/admin/errorImage-content.vue'

//404
import pageNotFound from '../page-vuetifly/error/page-not-found-content.vue';

import 'jquery/src/jquery';

import VueAnalytics from 'vue-analytics';

Vue.use(VueRouter);

let glCardLeftData = {
    "time_girl":["! 點名稱或圖片可了解更多!!","! 歡迎補上圖片"],
    "time_device":["屬性上有細微的差異"],
    "time_fairy":["! 歡迎補上圖片"],
    "time_make":["! 此列表只供參考!","右下角的圖示可製作喔"],
    "time_list":["! 可選擇種類喔!", "! 可選擇星數喔!","! 一定要選擇編號","! 可篩選人型在列表上喔"],
    "fb_list":["! 可只選擇種類喔~","! 可只選擇星數喔~","! 可只選擇角色喔~","! 不選擇角色為任意"],
    "like_list":["! 列表是隨機喔~","! 第一個是站長喔~"],
    "list_fairy":["! 可選擇種類喔!","! 可篩選妖精在列表上喔"],
    "device_make":["! 此列表只供參考!","右下角的圖示可製作喔"],
    "line":["歡迎加入LINE群"],
    "line_bot":["可加入群喔","加入好友就可使用喔"],
    "feedback":["歡迎提交回報或建議"],
    "link":["如有推薦! 可以在建議中提出"],
    "about":["這是站長"],
    "hMake":["! 此列表只供參考!","右下角的圖示可製作喔","!!本頁閾和遊戲不相同!!"],
    "cGirl":["可以匯出成圖片喔","可以用連結來保存"],
    "cAndroid":["一個方便使用的APP版"],
    "cChrome":["Chrome 插件!"],
    "image":["歡迎加入作品","點作品tag可以單獨瀏覽"],
    "addImage":["支援 pixiv 及 twitter","可以不加上tag"],
    "hDevice_make":["! 此列表只供參考!","右下角的圖示可製作喔","!!本頁閾和遊戲不相同!!"],
    "log_update":["最近的更新!"],
};


const routes = [
    {path: '/', component: GlIndexContent,meta: {title: ''}},
    {path: '/index.html', redirect:'/'},
    {path: '/time', component: inquire,children:[
            {path: 'girl', component: girl,props:{promptData:glCardLeftData.time_girl},meta: {title: '人形製造時間查詢'}},
            {path: 'fairy', component: fairy,props:{promptData:glCardLeftData.time_fairy},meta: {title: '妖精製造時間查詢'}},
            {path: 'device',  component: device,props:{promptData:glCardLeftData.time_device},meta: {title: '裝備製造時間查詢'}},
            {path: '/time/list',redirect: '/list/girl'},
            {path: '/time/list_fairy',redirect: '/list/fairy'},
            {path: '/time/make',redirect: '/make/girl'},
            {path: '/time/make_device',redirect: '/make/device'},
            {path:'/time/h_make',redirect: '/make/hGirl'},
            {path:'/time/h_make_device',redirect: '/make/hDevice'},
            {path: '*', redirect: '/'},
        ]},
    {path: '/list', component: inquire,children:[
            {path: 'girl', component: list,props:{promptData:glCardLeftData.time_list},meta: {title: '人形圖鑑'}},
            {path: 'fairy', component: listFairy ,props:{promptData:glCardLeftData.list_fairy},meta: {title: '妖精圖鑑'}},
            {path: '*', redirect: '/'},
        ]},
    {path: '/tool', component: inquire,children:[
            {path: 'android', component:android, props:{promptData:glCardLeftData.cAndroid},meta: {title: 'Android版'}},
            {path: 'chrome', component:chrome, props:{promptData:glCardLeftData.cChrome},meta: {title: 'Chrome版'}},
            {path: '/tool/image/all',redirect: '/image/all'},
            {path: '/tool/image_add',redirect: '/image/add'},
            {path: '*', redirect: '/'},
        ]},
    {path: '/bot', component: inquire,children:[
            {path: 'line', component:lineBot, props:{promptData:glCardLeftData.line_bot},meta: {title: 'LINE機械人'}},
            {path: '*', redirect: '/'},
        ]},
    {path:'/more', component: inquire,children:[
            {path: 'line', component:line, props:{promptData:glCardLeftData.line},meta: {title: 'LINE群'}},
            {path: 'about', component:about,props:{promptData:glCardLeftData.about},meta: {title: '關於'}},
            {path: 'link', component:link,props:{promptData:glCardLeftData.link},meta: {title: '相關網址'}},
            {path: 'feedback', component:feedback, props:{promptData:glCardLeftData.feedback},meta: {title: '問題回報或建議'}},
            {path: '*', redirect: '/'},
        ]},
    {path:'/fb',component: inquire,children:[
            {path: 'list', component: fbList,props:{promptData:glCardLeftData.fb_list},meta: {title: '好友招募'}},
            {path: '*', redirect: '/'},
        ]},
    {path:'/log',component:inquire,children:[
            {path: 'update', component: updateLog,meta: {title: '更新記錄'},props:{promptData:glCardLeftData.log_update}},
            {path: '*', redirect: '/'},
        ]},
    {path:'/like',component:inquire,children:[
            {path: 'list', component: likeList,props:{promptData:glCardLeftData.like_list},meta: {title: '讚友招募'}},
            {path: '*', redirect: '/'},
        ]},
    {path:'/make',component:inquire,children:[
            {path: 'girl', component: makeGirl,props:{promptData:glCardLeftData.time_make},meta: {title: '模擬造槍'}},
            {path: 'device', component:makeDevice, props:{promptData:glCardLeftData.device_make},meta: {title: '模擬造裝'}},
            {path: 'hGirl', component:hMake, props:{promptData:glCardLeftData.hMake},meta: {title: '模擬重造-槍'}},
            {path: 'hDevice', component:hMakeDevice, props:{promptData:glCardLeftData.hDevice_make},meta: {title: '模擬重造-裝'}},
            {path: '*', redirect: '/'},
        ]},
    {path:'/image',component:inquire,children:[
            {path: 'add', component:imageAdd, props:{promptData:glCardLeftData.addImage}, meta: {title: '圖片庫'}},
            {path: ':name', component:image, props:{promptData:glCardLeftData.image},meta: {title: '圖片庫'}},
            {path: '*', redirect: '/'},
        ]},
    {path:'/admin',component:adminIndex,meta: {title: '管理面板'},children:[
            {path: 'image', component: adminImage,meta: {title: '圖片管理'}},
            {path:'errorImg',component: errorImg,meta: {title: '問題圖片'}},
            {path: '*', redirect: '/'},
        ]},
    {path: '/login', component: login,meta: {title: '登入'}},
    {path: '/logout', component: logout,meta: {title: '登出'}},
    { path: "*", component: pageNotFound ,meta: {title: '404'}},
];

const app = new Vue({
    routes
}).$mount('#app');

const router = new VueRouter({mode: 'history', routes});

Vue.use(VueAnalytics, {
  id: 'UA-108349832-1',
    router
});

export default router;

router.afterEach(route => {
    document.title = (!route.meta.title )? '少女前線工具集' : route.meta.title + "-少女前線工具集";
    $("#count_num").attr("src","//counter1.fc2.com/counter_img.php?id=89451780")
    $('html,body').animate({scrollTop: 0});
});