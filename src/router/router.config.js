import Vue from 'vue'
import VueRouter from 'vue-router'
import GlIndexContent from '../page-vuetifly/index.vue';
import inquire from '../page-vuetifly/inquire-content.vue';
import breadcrumbList from '../page-vuetifly/breadcrumbList-content.vue';
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
import dailyTask from '../page-vuetifly/admin/daily-task.vue';
import updateLogAdmin from '../page-vuetifly/admin/update-log.vue';

//referrer
import referrer from '../page-vuetifly/referrer.vue';

//404
import pageNotFound from '../page-vuetifly/error/page-not-found-content.vue';

//magical-tool
import soAppetizing from "../page-vuetifly/magical-tool/so-appetizing-content.vue";

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


import tw from '../lang/tw.json';
import ja from '../lang/ja.json';
import cn from '../lang/cn.json';


let metaData = {
  default:{
    title: '',
    description:"一個專為指揮官而設的工具集。包括圖片庫、製造時間 (人形，裝備，妖精)、圖鑑 (人形，妖精，晶片，重裝)、模擬製作 (人形，裝備，晶片組合)、Line bot 教學頁面及好友專區。",
    image:{url:"/common/SEO/main.jpg",width:"1200",height:"1200"}
  },
  time:{
    girl:{
      title:{"cn":cn.title.h1.time.girl,"tw":tw.title.h1.time.girl,"ja":ja.title.h1.time.girl},
      description:"人型製造時間查詢 點名稱或圖片可了解更多!! 7:55 3:55 8:10 1:10 3:58 2:35 8:5 3:30 2:5 1:0",
      image:{url:"/common/girl/girl_96.jpg",width:"242",height:"429"},
    },
    fairy:{
      title: {"cn":cn.title.h1.time.fairy,"tw":tw.title.h1.time.fairy,"ja":ja.title.h1.time.fairy},
      description:"裝備製造時間查詢 屬性上有細微的差異 45 55 52 51 50 49 48 42 5 38",
      image:{url:"/common/device/ty_012.png",width:"240",height:"240"},
    },
    device:{
      title: {"cn":cn.title.h1.time.device,"tw":tw.title.h1.time.device,"ja":ja.title.h1.time.device},
      description:"妖精製造時間查詢 歡迎補上圖片!! 5:10 4:35 3:35 4:30 3:0 3:5 3:30 5:40 5:5 4:5",
      image:{url:"/common/fairy/fairy_2.jpg",width:"246",height:"432"},
    },

  },
  list:{
    girl:{
      title: {"cn":cn.title.h1.list.girl,"tw":tw.title.h1.list.girl,"ja":ja.title.h1.list.girl},
      description:"00:20:00 M1911 納甘 左輪 P38 00:22:00 PPK 00:25:00 FNP-9MP-446 00:28:00 USP compactBren Ten 00:30:00 P08C96 00:35:00 92式P99 00:40:00 阿斯特拉M9馬卡洛夫 00:45:00 托卡列夫 00:49:00 杰里科 00:50:00 柯爾特左輪Mk23 00:52:00 Spitfire 00:53:00 K5 00:55:00 P7斯捷奇金 01:00:00 維爾德Mark2 01:02:00 競爭者 01:04:00 Px4 風暴 01:05:00 M950ANZ75 01:10:00 灰熊MKVIDWPP-2000 01:20:00 Spectre M4M45 01:25:00 64式 01:30:00 MP-40伯萊塔38型M3 01:40:00 司登 Mk ll微型烏茲 01:50:00 PPSh-41F1 02:00:00 MAC10蠍式 02:05:00 Z-62 02:10:00 PPS-43 02:15:00 UMP45UMP9 02:18:00 希普卡PP-19-01 02:19:00 一〇〇式 02:20:00 MP5PP-90 02:25:00 索米KP31 02:28:00 C-MS 02:29:00 P90 02:30:00 湯姆森G36C 02:33:00 SR-3MP 02:35:00 VECTOR79式 02:40:00 加利爾SIG-510 02:45:00 F200063式 02:50:00 L85A1G3 03:00:00 StG44 03:10:00 OTs-12G43FN-49 03:15:00 ARX-160 03:20:00 AK-47FNCBM59 03:25:00 56沖XM8SAR-21 03:30:00 AS VALFAMASTAR-21SVT-38西蒙諾夫 03:35:00 9A-91 03:40:00 G36利貝羅勒M14SV-98 03:45:00 FAL 03:48:00 T91 03:50:00 95式97式漢陽造88式OTs-44 03:52:00 K2 03:53:00 MDR 03:55:00 HK416 03:58:00 RFB 04:00:00 M1加蘭德 04:04:00 G11 04:05:00 G41Zas M21 04:06:00 64式自 04:09:00 AN-94 04:10:00 莫辛納甘T-5000 04:11:00 K11 04:12:00 AK-12 04:15:00 SVDSPR A3GK31 04:20:00 PSG-1G28 04:25:00 春田 04:30:00 PTRDPzB39 04:38:00 卡爾卡諾M1891 04:40:00 Kar98k 04:42:00 卡爾卡諾M91/38 04:45:00 NTW-20 04:50:00 WA2000AAT-52FG42 04:52:00 IWS 2000 04:55:00 M99 05:00:00 李-恩菲爾德MG34DP28 05:10:00 LWMMG 05:20:00 布倫 05:30:00 RPD 05:40:00 M1919 A4 05:50:00 MG42 06:10:00 M60M2HB 06:15:00 80式 06:20:00 Mk48AEK-999 06:25:00 M1918阿梅利 06:28:00 88式 06:30:00 PKMG3 06:35:00 內格夫 06:40:00 MG4 06:45:00 MG5 06:50:00 PKP 07:14:00 M1014 07:15:00 NS2000 07:20:00 M500 07:25:00 KS-23 07:30:00 RMB-93M1897 07:40:00 M590SPAS-12 07:45:00 M37 07:50:00 Super-Shorty 07:55:00 USAS-12 08:00:00 KSG 08:05:00 Saiga-12 08:06:00 FP-6 08:10:00 S.A.T.8 08:12:00 AA-12 ",
      image:{url:"/common/girl/girl_188.jpg",width:"242",height:"429"},
    },
    fairy:{
      title: {"cn":cn.title.h1.list.fairy,"tw":tw.title.h1.list.fairy,"ja":ja.title.h1.list.fairy},
      description:"03:00:00 盾甲妖精 03:05:00 護盾妖精 03:10:00 嘲諷妖精 03:30:00 狙擊妖精 03:35:00 炮擊妖精 03:40:00 空襲妖精 04:00:00 增援妖精 04:05:00 空降妖精 04:10:00 防禦妖精 04:30:00 勇士妖精 04:35:00 暴怒妖精 05:00:00 指揮妖精 05:05:00 搜救妖精 05:10:00 照明妖精  05:30:00 佈雷妖精 05:35:00 火箭妖精 05:40:00 工事妖精",
      image:{url:"/common/fairy/fairy_11.jpg",width:"246",height:"432"},
    },
    wafer:{
      title: {"cn":cn.title.h1.list.wafer,"tw":tw.title.h1.list.wafer,"ja":ja.title.h1.list.wafer},
      description:"一個齊全的 少前前線 晶片圖鑑",
      image:{url:"/common/cell/6/010000-111000-110000-000000-000000-000000-0.png",width:"241",height:"156"},
    },
    support_unit:{
      title: {"cn":cn.title.h1.list["support-unit"],"tw":tw.title.h1.list["support-unit"],"ja":ja.title.h1.list["support-unit"]},
      description:"一個齊全的 少前前線 重裝圖鑑 AGS-30 2B14 BFM-71",
      image:{url:"/common/supportUnit/3/5.png",width:"420",height:"420"},
    },
    doc:{
      title: {"cn":cn.title.h1.list.doc,"tw":tw.title.h1.list.doc,"ja":ja.title.h1.list.doc},
    }
  },
  tool:{
    android:{
      title: {"cn":cn.nav["other-platform"].android,"tw":tw.nav["other-platform"].android,"ja":ja.nav["other-platform"].android},
      description:"少女前線-工具集 版本:V1.3.3 google play下載，要是喜歡可以下載來用喔W",
      image:{url:"/common/img/touch-icon-ipad-retina.png",width:"152",height:"152"},
    },
    chrome:{
      title: {"cn":cn.nav["other-platform"].chrome,"tw":tw.nav["other-platform"].chrome,"ja":ja.nav["other-platform"].chrome},
      description:"Chrome 插件-資料 少女前線 時間查詢 Chrome 的插件!!在電腦上更易查詢到時間!!",
      image:{url:"/common/img/chrome-icon.png",width:"152",height:"152"},
    },
  },
  bot:{
    line:{
      title: {"cn":cn.line.command,"tw":tw.line.command,"ja":ja.line.command},
      description:"這是同好寫的line 機械人喔!可以加入群組 版本:V1.1 **禁止用作商業用途**",
      image:{url:"/common/img/line-bot.jpg",width:"500",height:"500"},
      img:{
        title: {"cn":cn.line.img,"tw":tw.line.img,"ja":ja.line.img},
        description:"這是同好寫的line 機械人喔!可以加入群組 版本:V1.1 **禁止用作商業用途**",
        image:{url:"/common/img/line-bot.jpg",width:"500",height:"500"},
      }
    }
  },
  more:{
    line:{
      title: {"cn":cn.nav["line-group"],"tw":tw.nav["line-group"],"ja":ja.nav["line-group"]},
      description:"少前同好群，歡迎加入LINE群 歡迎各位新手,大佬和萌新",
      image:{url:"/common/img/group.jpg",width:"500",height:"500"},
    },
    about:{
      title: {"cn":cn.footer.about,"tw":tw.footer.about,"ja":ja.footer.about},
      description:"少女前線很休閒! 歡迎加入本LINE群啊 >>點這<<  使用LINE 機械人很方便喔 >>點這<<  如有任何問題回報及建議 >>點這<< ",
      image:{url:"/common/img/about-icon.jpg",width:"221",height:"221"},
    },
    link:{
      title: {"cn":cn.footer.link,"tw":tw.footer.link,"ja":ja.footer.link},
    },
    feedback:{
      title: {"cn":cn.footer.feedback,"tw":tw.footer.feedback,"ja":ja.footer.feedback},
    },
    privacy_policy:{
      title: {"cn":cn.footer["privacy-policy"],"tw":tw.footer["privacy-policy"],"ja":ja.footer["privacy-policy"]},
    }
  },
  fb:{
    list:{
      title: {"cn":cn.title.h1.fb.list,"tw":tw.title.h1.fb.list,"ja":ja.title.h1.fb.list},
      description:"好友招募區域 招募少女前線的好友",
    }
  },
  log:{
    update:{
      title: {"cn":cn.footer["update-log"],"tw":tw.footer["update-log"],"ja":ja.footer["update-log"]},
    }
  },
  like:{
    list:{
      title: {"cn":cn.nav["friends-list"]["like-list"],"tw":tw.nav["friends-list"]["like-list"],"ja":ja.nav["friends-list"]["like-list"]},
      description:"讚友招募區域 規則 參觀者需對登記者按讚 登記者將會回讚 登記者需對其他玩家開放宿舍 登記者需對所有到訪者按讚",
    }
  },
  make:{
    girl:{
      title: {"cn":cn.title.h1.make.girl,"tw":tw.title.h1.make.girl,"ja":ja.title.h1.make.girl},
      description:"又是MP5嗎? 模擬造槍 能為你平息心癮，保留資源及國籍測試 只是玩樂用途 與遊戲未必相同",
      image:{url:"/common/girl/girl_26.jpg",width:"242",height:"429"},
    },
    device:{
      title: {"cn":cn.title.h1.make.device,"tw":tw.title.h1.make.device,"ja":ja.title.h1.make.device},
      description:"模擬造裝 只是玩樂用途 與遊戲未必相同",
      image:{url:"/common/fairy/fairy_17.jpg",width:"246",height:"432"},
    },
    hGirl:{
      title: {"cn":cn.title.h1.make.hGirl,"tw":tw.title.h1.make.hGirl,"ja":ja.title.h1.make.hGirl},
      description:"又是MP5嗎? 模擬重造-槍 能為你平息心癮，保留資源及國籍測試。 只是玩樂用途 與遊戲未必相同 !!本頁閾和遊戲不相同!!",
      image:{url:"/common/girl/girl_188.jpg",width:"242",height:"429"},
    },
    hDevice:{
      title: {"cn":cn.title.h1.make.hDevice,"tw":tw.title.h1.make.hDevice,"ja":ja.title.h1.make.hDevice},
      description:"模擬重造-裝 只是玩樂用途 與遊戲未必相同 !!本頁閾和遊戲不相同!!",
      image:{url:"/common/fairy/fairy_17.jpg",width:"246",height:"432"},
    },
    wafer:{
      title: {"cn":cn.title.h1.make.wafer,"tw":tw.title.h1.make.wafer,"ja":ja.title.h1.make.wafer},
      description:"模擬組合-晶片 測試版 網上組合晶片，晶片最佳排列及下載。",
      image:{url:"/common/SEO/www.ntw-20.com-17-11-2018-23-46-8.png",width:"496",height:"496"},
    }
  },
  image:{
    add:{
      title: {"cn":cn.footer["add-image"],"tw":tw.footer["add-image"],"ja":ja.footer["add-image"]},
    },
    name:{
      title: {"cn":cn.title.h1.img,"tw":tw.title.h1.img,"ja":ja.title.h1.img},
      description:"少前前線圖片庫 WA2000 IDW MP5 春田 雷電 TMP",
    }
  },
  admin:{
    image:{
      title: {"cn":"圖片管理","tw":'圖片管理',"ja":"圖片管理"}
    },
    errorImg:{
      title: {"cn":"問題圖片","tw":'問題圖片',"ja":"問題圖片"}
    },
    setting:{
      title: {"cn":"設定","tw":'設定',"ja":"設定"}
    },
    doc:{
      title: {"cn":"實用文庫管理","tw":'實用文庫管理',"ja":"實用文庫管理"}
    },
    schedule:{
      title: {"cn":"增加時間表活動","tw":'增加時間表活動',"ja":"增加時間表活動"}
    },
    girl:{
      title: {"cn":"人型編輯","tw":'人型編輯',"ja":"人型編輯"}
    },
    login:{
      title: {"cn":"登入","tw":'登入',"ja":"登入"}
    },
    logout:{
      title: {"cn":"登出","tw":'登出',"ja":"登出"}
    },
    referrer:{
      title: {"cn":"url","tw":'url',"ja":"url"}
    },
    event:{
      schedule:{
        title: {"cn":"活动时间表(繁中版)","tw":'活動時間表(繁中版)',"ja":"活動スケジュール(台湾版)"}
      }
    }
  },
  magical_tool:{
    so_appetizing:{
      title: {"cn":cn.nav["magical-tool"]["so-appetizing"],"tw":tw.nav["magical-tool"]["so-appetizing"],"ja":ja.nav["magical-tool"]["so-appetizing"]},
      description:"一個TMP真香生成器! 真香!!",
      image:{url:"/api/line/ImgCool.php?str=真香",width:"960",height:"655"}
    }
  },
  breadcrumbList:{
    title: {"cn":cn.title.h1.breadcrumbList,"tw":tw.title.h1.breadcrumbList,"ja":ja.title.h1.breadcrumbList},
  }
};

function GetMetaData(strPath){
   let data = strPath.split(".");

   if( data.length > 0 ){
     let text = metaData;
     for (const key in data) {

       text = text[data[key]];

       if (!text){
         return metaData.default;
       }
     }

     if(!text.title){
       text.title = metaData.default.title;
     }

     if(!text.description){
       text.description = metaData.default.description;
     }

     if(!text.image){
       text.image = metaData.default.image;
     }

     return text;
   }else{
     return metaData.default;
   }
}


let childrenRoutes = [
  {path: 'time', component: inquire,children:[
      {path: 'girl', component: girl,props:{promptData:glCardLeftData.time_girl},meta: GetMetaData("time.girl"),children:[
          {path: ':HH',meta: GetMetaData("time.girl"),
            children:[{path: ':MM',meta: GetMetaData("time.girl")}]
          },
        ]},
      {path: 'fairy', component: fairy,props:{promptData:glCardLeftData.time_fairy},meta: GetMetaData("time.fairy"),children:[
          {path: ':HH/:MM',meta: GetMetaData("time.fairy")},
        ]},
      {path: 'device',  component: device,props:{promptData:glCardLeftData.time_device},meta:GetMetaData("time.device") ,children:[
          {path: ':MM',meta: GetMetaData("time.fairy")},
        ]},
      {path: '/',  component: breadcrumbList,meta:GetMetaData("breadcrumbList")}]},
    {path: 'list', component: inquire,children:[
      {path: 'girl', component: list,props:{promptData:glCardLeftData.time_list},meta: GetMetaData("list.girl") },
      {path: 'fairy', component: listFairy ,props:{promptData:glCardLeftData.list_fairy},meta: GetMetaData("list.fairy")},
      {path: 'wafer', component: listWafer ,props:{promptData:glCardLeftData.list_wafer},meta: GetMetaData("list.wafer")},
      {path: 'support_unit', component: listSupportUnit ,props:{promptData:glCardLeftData.list_support_unit},meta: GetMetaData("list.support_unit")},
      {path: 'doc' ,  component: listDoc ,props:{promptData:glCardLeftData.doc},meta: GetMetaData("list.doc"),children:[
          {path: '/',component:listIndex , meta: GetMetaData("list.doc")},
          {path: 'search',component:listSearch , meta: GetMetaData("list.doc")},
          {path: 'add',component:listAdd , meta: GetMetaData("list.doc")},
        ],},
      {path: '/',  component: breadcrumbList,meta:GetMetaData("breadcrumbList")}
      ]},
  {path: 'tool', component: inquire,children:[
      {path: 'android', component:android, props:{promptData:glCardLeftData.cAndroid},meta: GetMetaData("tool.android")},
      {path: 'chrome', component:chrome, props:{promptData:glCardLeftData.cChrome},meta: GetMetaData("tool.chrome")},
      {path: '/',  component: breadcrumbList,meta:GetMetaData("breadcrumbList")}
    ]},
  {path: 'bot', component: inquire,children:[
      {path: 'line', component:lineBot, props:{promptData:glCardLeftData.line_bot},meta:  GetMetaData("bot.line") ,children:[
          {path: 'img',component:lineImg , meta:  GetMetaData("bot.img")},
          {path: '/',component:lineCommand ,meta:  GetMetaData("bot.line")},
        ]},
      {path: '/',  component: breadcrumbList,meta:GetMetaData("breadcrumbList")}
    ]},
  {path:'more', component: inquire,children:[
      {path: 'line', component:line, props:{promptData:glCardLeftData.line},meta: GetMetaData("more.line")},
      {path: 'about', component:about,props:{promptData:glCardLeftData.about},meta: GetMetaData("more.about")},
      {path: 'link', component:link,props:{promptData:glCardLeftData.link},meta: GetMetaData("more.link")},
      {path: 'feedback', component:feedback, props:{promptData:glCardLeftData.feedback},meta: GetMetaData("more.feedback")},
      {path: 'privacy_policy', component:privacy_policy,meta: GetMetaData("more.privacy_policy")},
      {path: '/',  component: breadcrumbList,meta:GetMetaData("breadcrumbList")}
    ]},
  {path:'fb',component: inquire,children:[
      {path: 'list', component: fbList,props:{promptData:glCardLeftData.fb_list},meta:GetMetaData("fb.list")},
      {path: '/',  component: breadcrumbList,meta:GetMetaData("breadcrumbList")}
    ]},
  {path:'log',component:inquire,children:[
      {path: 'update', component: updateLog,meta: GetMetaData("log.update"),props:{promptData:glCardLeftData.log_update}},
      {path: '/',  component: breadcrumbList,meta:GetMetaData("breadcrumbList")}
    ]},
  {path:'like',component:inquire,children:[
      {path: 'list', component: likeList,props:{promptData:glCardLeftData.like_list},meta: GetMetaData("like.list")},
      {path: '/',  component: breadcrumbList,meta:GetMetaData("breadcrumbList")}
    ]},
  {path:'make',component:inquire,children:[
      {path: 'girl', component: makeGirl,props:{promptData:glCardLeftData.time_make},meta: GetMetaData("make.girl")},
      {path: 'device', component:makeDevice, props:{promptData:glCardLeftData.device_make},meta: GetMetaData("make.device")},
      {path: 'hGirl', component:hMake, props:{promptData:glCardLeftData.hMake},meta: GetMetaData("make.hGirl")},
      {path: 'hDevice', component:hMakeDevice, props:{promptData:glCardLeftData.hDevice_make},meta: GetMetaData("make.hDevice")},
      {path: 'wafer', component:makeWafer, props:{promptData:glCardLeftData.wafer_make},meta: GetMetaData("make.wafer")},
      {path: '/',  component: breadcrumbList,meta:GetMetaData("breadcrumbList")}
    ]},
  {path:'image',component:inquire,children:[
      {path: 'add', component:imageAdd, props:{promptData:glCardLeftData.addImage}, meta: GetMetaData("image.add")},
      {path: ':name', component:image, props:{promptData:glCardLeftData.image},meta: GetMetaData("image.name")},
      {path: '/',  component: breadcrumbList,meta:GetMetaData("breadcrumbList")}
    ]},
  {path:'event',component:inquire,children:[
      {path: 'schedule', component:schedule,meta: GetMetaData("event.schedule")},
      {path: '/',  component: breadcrumbList,meta:GetMetaData("breadcrumbList")}
    ]},
  {path: 'magical-tool',component:inquire,children:[
      {path: 'so-appetizing', component:soAppetizing,meta: GetMetaData("magical_tool.so_appetizing")},
      {path: '/',  component: breadcrumbList,meta:GetMetaData("breadcrumbList")}
    ]},
  {path: '/',component: GlIndexContent,meta: GetMetaData("/")}
];


let routes = [
    {path: '/', component:inquire,meta: GetMetaData("/"),
      children:childrenRoutes},
    {path: '/index.html', redirect:'/'},
    {path: '/login', component: login,meta: GetMetaData("login")},
    {path: '/logout', component: logout,meta: GetMetaData("logout")},
    {path: '/referrer', component: referrer ,meta: GetMetaData("referrer")},
    {path:'/admin',component:adminIndex,meta: GetMetaData("admin.name"),children:[
      {path: 'image', component: adminImage,meta: GetMetaData("admin.image")},
      {path: 'errorImg',component: errorImg,meta: GetMetaData("admin.errorImg")},
      {path: 'setting',component: setting,meta: GetMetaData("admin.setting")},
      {path: 'doc',component: docSetting,meta: GetMetaData("admin.doc")},
      {path: 'schedule' ,component: scheduleSetting,meta: GetMetaData("admin.schedule")},
      {path: 'girl' ,component: girlSetting,meta: GetMetaData("admin.girl")},
      {path: 'dailyTask' ,component: dailyTask,meta: GetMetaData("admin.dailyTask")},
      {path: 'updateLog' ,component: updateLogAdmin,meta: GetMetaData("admin.updateLog")},
      {path: '*', redirect: '/'},
    ]},
    {path: "/:lang",component:inquire,children:childrenRoutes},
    {path: '/time/list',redirect: '/list/girl'},
    {path: '/time/list_fairy',redirect: '/list/fairy'},
    {path: '/time/make',redirect: '/make/girl'},
    {path: '/time/make.html',redirect: '/make/girl'},
    {path: '/time/make_device',redirect: '/make/device'},
    {path: '/time/h_make',redirect: '/make/hGirl'},
    {path: '/time/h_make_device',redirect: '/make/hDevice'},
    {path: "*", component: pageNotFound ,meta: {title: {"cn":"404","tw":'404',"ja":"404"}}}
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

  //console.log(route);
  let title = "少女前線 工具集";
    let title2 = route.meta.title['tw'];
    if(this.a.app.t !== undefined){
        title = this.a.app.t('title.s');
        title2 = route.meta.title[this.a.locale];
    }else{
        this.a.meta = route.meta;
    }

    document.title = (!title2 )? title : title2 + "-"+  title;
    this.a.meta.pageTitle =  document.title;
    $("#count_num").attr("src","//counter1.fc2.com/counter_img.php?id=89451780");
    $('html,body').animate({scrollTop: 0});
});
