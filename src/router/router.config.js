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
import listDoc from '../page-vuetifly/list/doc-content.vue';
import listSearch from '../page-vuetifly/list/doc-search.vue';
import listAdd from '../page-vuetifly/list/listAdd.vue';
import listIndex from '../page-vuetifly/list/doc-index.vue';
import listWafer from '../page-vuetifly/list/list-wafer-content.vue';
import listSupportUnit from '../page-vuetifly/list/list-support-unit.vue';
//tool
import android from '../page-vuetifly/tool/android-content.vue';
import chrome from '../page-vuetifly/tool/chrome-content.vue';
//bot
import lineBot from '../page-vuetifly/bot/line-content.vue';
import lineCommand from '../components-ui/bot/command.vue';
import lineImg from '../components-ui/bot/image.vue';
//more
import line from '../page-vuetifly/more/line-content.vue';
import about from '../page-vuetifly/more/about-content.vue';
import link from '../page-vuetifly/more/link-content.vue';
import feedback from '../page-vuetifly/more/feedback-content.vue';
import privacy_policy from '../page-vuetifly/more/privacy-policy-content.vue';

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
import makeWafer from '../page-vuetifly/make/wafer-content.vue';
//image
import image from '../page-vuetifly/img/image-content.vue';
import imageAdd from '../page-vuetifly/img/image-add-content.vue';
//event
import schedule from '../page-vuetifly/event/schedule-content.vue';
//admin
import adminIndex from '../page-vuetifly/admin/index-content.vue';
import login from '../page-vuetifly/admin/login-content.vue';
import adminImage from '../page-vuetifly/admin/image-content.vue';
import logout from '../page-vuetifly/admin/logout.vue';
import errorImg from '../page-vuetifly/admin/errorImage-content.vue';
import setting from '../page-vuetifly/admin/setting.vue';
import docSetting from '../page-vuetifly/admin/doc-content.vue';
import scheduleSetting from '../page-vuetifly/admin/schedule-content.vue'
import girlSetting from '../page-vuetifly/admin/girl-setting-content.vue';


//referrer
import referrer from '../page-vuetifly/referrer.vue';


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
    "list_wafer":["總共有74種喔!","點擊可轉向喔"],
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
    "doc":['歡迎加入新的文章','可搜尋喔!!'],
    "list_support_unit":["各星的重裝格數"],
    "wafer_make":["桌面版可以用拉來加入晶片","如有問題歡迎回報","可以下截圖片喔","連點可以轉動晶片"]
};


const routes = [
    {path: '/', component: GlIndexContent,meta: {title: ''}},
    {path: '/index.html', redirect:'/'},
    {path: '/time', component: inquire,children:[
            {path: 'girl', component: girl,props:{promptData:glCardLeftData.time_girl},meta: {title: {"cn":"人形制造时间查询","tw":'人形製造時間查詢',"ja":"人形製造時間問合せ"}}},
            {path: 'fairy', component: fairy,props:{promptData:glCardLeftData.time_fairy},meta: {title: {"cn":"妖精制造时间查询","tw":'妖精製造時間查詢',"ja":"妖精製造時間問合せ"}}},
            {path: 'device',  component: device,props:{promptData:glCardLeftData.time_device},meta: {title: {"cn":"装备制造时间查询","tw":'裝備製造時間查詢',"ja":"裝備製造時間問合せ"}}},
            {path: '/time/list',redirect: '/list/girl'},
            {path: '/time/list_fairy',redirect: '/list/fairy'},
            {path: '/time/make',redirect: '/make/girl'},
            {path: '/time/make.html',redirect: '/make/girl'},
            {path: '/time/make_device',redirect: '/make/device'},
            {path:'/time/h_make',redirect: '/make/hGirl'},
            {path:'/time/h_make_device',redirect: '/make/hDevice'},
        ]},
    {path: '/list', component: inquire,children:[
            {path: 'girl', component: list,props:{promptData:glCardLeftData.time_list},meta: {title: {"cn":"人形图鉴","tw":'人形圖鑑',"ja":"人形図鑑"}}},
            {path: 'fairy', component: listFairy ,props:{promptData:glCardLeftData.list_fairy},meta: {title: {"cn":"妖精图鉴","tw":'妖精圖鑑',"ja":"妖精図鑑"}}},
            {path: 'wafer', component: listWafer ,props:{promptData:glCardLeftData.list_wafer},meta: {title: {"cn":"晶片图鉴","tw":'晶片圖鑑',"ja":"晶片図鑑"}}},
            {path: 'support_unit', component: listSupportUnit ,props:{promptData:glCardLeftData.list_support_unit},meta: {title: {"cn":"晶片图鉴","tw":'晶片圖鑑',"ja":"晶片図鑑"}}},
            {path: 'doc' ,  component: listDoc ,props:{promptData:glCardLeftData.doc},meta: {title: {"cn":"实用文集","tw":'實用文集',"ja":"エッセンスセット"}},children:[
                    {path: '/',component:listIndex , meta: {title: {"cn":"实用文集","tw":'實用文集',"ja":"エッセンスセット"}}},
                    {path: 'search',component:listSearch , meta: {title: {"cn":"实用文集","tw":'實用文集',"ja":"エッセンスセット"}}},
                    {path: 'add',component:listAdd , meta: {title: {"cn":"实用文集","tw":'實用文集',"ja":"エッセンスセット"}}},
                ],}
        ]},
    {path: '/tool', component: inquire,children:[
            {path: 'android', component:android, props:{promptData:glCardLeftData.cAndroid},meta: {title: {"cn":"Android版","tw":'Android版',"ja":"Android App"}}},
            {path: 'chrome', component:chrome, props:{promptData:glCardLeftData.cChrome},meta: {title: {"cn":"Chrome版","tw":'Chrome版',"ja":"Chrome App"}}},
            {path: 'image/all',redirect: '/image/all'},
            {path: 'image_add',redirect: '/image/add'},
            {path: 'image',redirect: '/image/all'},
        ]},
    {path: '/bot', component: inquire,children:[
            {path: 'line', component:lineBot, props:{promptData:glCardLeftData.line_bot},meta: {title: {"cn":"LINE机械人","tw":'LINE機械人',"ja":"Line ロボット"}},children:[
                    {path: 'img',component:lineImg , meta: {title: {"cn":"梗图表-LINE机械人","tw":'梗图表-LINE機械人',"ja":"Line ロボット"}}},
                    {path: '/',component:lineCommand ,meta: {title: {"cn":"指令表-LINE机械人","tw":'指令表-LINE機械人',"ja":"指令表-Line ロボット"}}},
                ]},
        ]},

    {path:'/more', component: inquire,children:[
            {path: 'line', component:line, props:{promptData:glCardLeftData.line},meta: {title: {"cn":"LINE群","tw":'LINE群',"ja":"LINEグループ(台湾語)"}}},
            {path: 'about', component:about,props:{promptData:glCardLeftData.about},meta: {title: {"cn":"关于","tw":'關於',"ja":"について"}}},
            {path: 'link', component:link,props:{promptData:glCardLeftData.link},meta: {title: {"cn":"相关网址","tw":'相關網址',"ja":"関連URL"}}},
            {path: 'feedback', component:feedback, props:{promptData:glCardLeftData.feedback},meta: {title: {"cn":"问题回报或建议","tw":'問題回報或建議',"ja":"報告や提案"}}},
            {path: 'privacy_policy', component:privacy_policy,meta: {title: {"cn":"隐私政策","tw":'隱私政策',"ja":"プライバシーポリシー"}}},
        ]},
    {path:'/fb',component: inquire,children:[
            {path: 'list', component: fbList,props:{promptData:glCardLeftData.fb_list},meta: {title: {"cn":"好友招募","tw":'好友招募',"ja":"友人の募集エリア"}}},
        ]},
    {path:'/log',component:inquire,children:[
            {path: 'update', component: updateLog,meta: {title: {"cn":"更新记录","tw":'更新記錄',"ja":"レコードを更新"}},props:{promptData:glCardLeftData.log_update}},
        ]},
    {path:'/like',component:inquire,children:[
            {path: 'list', component: likeList,props:{promptData:glCardLeftData.like_list},meta: {title: {"cn":"赞友招募","tw":'讚友招募',"ja":"讚友の募集エリア"}}},
        ]},
    {path:'/make',component:inquire,children:[
            {path: 'girl', component: makeGirl,props:{promptData:glCardLeftData.time_make},meta: {title: {"cn":"模拟造枪","tw":'模擬造槍',"ja":"模擬造銃"}}},
            {path: 'device', component:makeDevice, props:{promptData:glCardLeftData.device_make},meta: {title: {"cn":"模拟造装","tw":'模擬造裝',"ja":"模擬造裝備"}}},
            {path: 'hGirl', component:hMake, props:{promptData:glCardLeftData.hMake},meta: {title: {"cn":"模拟重造-枪","tw":'模擬重造-槍',"ja":"模擬大型製作-銃"}}},
            {path: 'hDevice', component:hMakeDevice, props:{promptData:glCardLeftData.hDevice_make},meta: {title: {"cn":"模拟重造-装","tw":'模擬重造-裝',"ja":"模擬大型製作-裝備"}}},
            {path: 'wafer', component:makeWafer, props:{promptData:glCardLeftData.wafer_make},meta: {title: {"cn":"模拟重造-装","tw":'模擬重造-裝',"ja":"模擬大型製作-裝備"}}},
      ]},
    {path:'/image',component:inquire,children:[
            {path: 'add', component:imageAdd, props:{promptData:glCardLeftData.addImage}, meta: {title: {"cn":"图片库","tw":'圖片庫',"ja":"フォトギャラリー"}}},
            {path: ':name', component:image, props:{promptData:glCardLeftData.image},meta: {title: {"cn":"图片库","tw":'圖片庫',"ja":"フォトギャラリー"}}},
        ]},
    {path:'/admin',component:adminIndex,meta: {title: {"cn":"管理面板","tw":'管理面板',"ja":"管理面板"}},children:[
            {path: 'image', component: adminImage,meta: {title: {"cn":"圖片管理","tw":'圖片管理',"ja":"圖片管理"}}},
            {path:'errorImg',component: errorImg,meta: {title: {"cn":"問題圖片","tw":'問題圖片',"ja":"問題圖片"}}},
            {path:'setting',component: setting,meta: {title: {"cn":"設定","tw":'設定',"ja":"設定"}}},
            {path:'doc',component: docSetting,meta: {title: {"cn":"實用文庫管理","tw":'實用文庫管理',"ja":"實用文庫管理"}}},
            {path: 'schedule' ,component: scheduleSetting,meta: {title: {"cn":"增加時間表活動","tw":'增加時間表活動',"ja":"增加時間表活動"}}},
            {path: 'girl' ,component: girlSetting,meta: {title: {"cn":"人型編輯","tw":'人型編輯',"ja":"人型編輯"}}},
            {path: '*', redirect: '/'},
        ]},
    {path: '/login', component: login,meta: {title: {"cn":"登入","tw":'登入',"ja":"登入"}}},
    {path: '/logout', component: logout,meta: {title: {"cn":"登出","tw":'登出',"ja":"登出"}}},
    {path: '/referrer', component: referrer ,meta: {title: {"cn":"url","tw":'url',"ja":"url"}}},
    {path:'/event',component:inquire,children:[
            {path: 'schedule', component:schedule,meta: {title: {"cn":"活动时间表(繁中版)","tw":'活動時間表(繁中版)',"ja":"活動スケジュール(台湾版)"}}},
        ]},
    {path: "*", component: pageNotFound ,meta: {title: {"cn":"404","tw":'404',"ja":"404"}}},
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
    let title = "少女前線 工具集";
    let title2 = route.meta.title['tw'];
    if(this.a.app.t !== undefined){
        title = this.a.app.t('title.s');
        title2 = route.meta.title[this.a.locale];
    }else{
        this.a.meta = route.meta;
    }
    document.title = (!title2 )? title : title2 + "-"+  title;
    $("#count_num").attr("src","//counter1.fc2.com/counter_img.php?id=89451780");
    $('html,body').animate({scrollTop: 0});
});
