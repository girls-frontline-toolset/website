<template>
    <v-container grid-list-md pa-0 mt-1>
        <v-layout row wrap>
            <v-flex xs12>
                <gl-ui-title :text="$t('title.h1.more.sitemap')" h1/>
            </v-flex>
          <v-flex xs12 md6 sm6>
            <div style="margin-top: 10px">
              <gl-ui-title text="image" h2/>
              <v-layout row wrap>
                <v-flex  v-for="item in dataList.image" :key="item.name" xs4 style="padding: 0">
                  <router-link :to="langUrl()  + item.url">
                    <v-icon>navigate_next</v-icon>
                    {{item.name}}</router-link>
                </v-flex>
              </v-layout>
            </div>
          </v-flex>
          <v-flex xs12 md3 sm6 v-for=" index in 2" :key="index">
            <div v-for="(items, key,dataIndex) in dataList" :key="key" v-if="(dataIndex % 3 === index - 1) && key !=='image' " style="margin-top: 10px">
            <gl-ui-title :text="key" h2/>
              <v-layout row wrap>
                <v-flex  v-for="item in  items" :key="item.name" :class="(key === 'device time' || key === 'girl time') ? 'xs4':'xs12'">
                  <router-link :to="langUrl()  + item.url" >
                    <v-icon>navigate_next</v-icon>
                    {{item.name}}</router-link>
                </v-flex>
              </v-layout>
            </div>
          </v-flex>
      </v-layout>
  </v-container>
</template>

<script>
  import GlUiTitle from "../../components-ui/title";
  import GlUiCardLeft from "../../components-ui/cardLeft";
  import mMeta from "../../mixin/mMeta.js";
  import GlUiAvatarCard from "../../components-ui/avatar-card";

  export default {
        mixins: [mMeta],
        components: {GlUiAvatarCard, GlUiCardLeft, GlUiTitle},
        props: ['promptData'],
        name: 'gl-ui-sitemap',
        data() {
            return {
              dataList: {}
            }
        },methods:{
            getChildren(object,routerPath){
              let lang =  this.$route.params.lang || this.$i18n.locale   || 'tw';

              for (let i = 0; i < routerPath.length; i++) {

                if (object[routerPath[i].path] === undefined) {
                  let title = "";
                  if(routerPath[i].meta !== undefined && routerPath[i].meta.title.tw !== ""){
                      title = routerPath[i].meta.title[lang];
                  }

                  object[routerPath[i].path] = {text:title};
                }else{
                  object.push({text:routerPath[i].path});
                }
                if (routerPath[i].children !== undefined) {
                  this.getChildren(object[routerPath[i].path], routerPath[i].children);
                }

              }
            }
        },

    mounted() {
      let _this = this;
      let path = [];
      let routerPath = this.$router.options.routes;

      for (let i = 0; i < routerPath.length ; i++) {
          if (routerPath[i].path === "/"){
            routerPath = routerPath[i].children;
            break;
          }
      }

      this.getChildren(path,routerPath);

      this.$s.getTxtFile("/sitemap.xml",
        function(text) {

          let parser = new DOMParser();
          text = parser.parseFromString(text, "text/xml");

          let dataList = {};

          function pushUrl(title, name, url, callback) {
            if (!dataList[title]) {
              dataList[title] = (title !== 'time') ? [] : {};
            }
            if (callback) {
              callback({dataList: dataList[title], name, url});
            } else {
              dataList[title].push({name: name, url: url});
            }

          }

          let urlList = text.getElementsByTagName("url");
          for (let i = 0; i < urlList.length; i++) {
            let url = urlList[i].getElementsByTagName("loc")[0].textContent.replace("https://www.ntw-20.com", "");
            let urlObject = url.split(/\//g);

            switch (urlObject[1]) {
              case "":
                pushUrl("home", "/", url);
                break;
              case "time":
                switch (urlObject[2]) {
                  case "fairy":
                    pushUrl("fairy " + urlObject[1], (urlObject[3] === undefined || urlObject[3] === "") ? '/' : urlObject[3] + ":" + urlObject[4], url);
                    break;
                  case "girl":
                    pushUrl("girl " + urlObject[1], (urlObject[3] === undefined || urlObject[3] === "") ? '/' : (urlObject[4] === undefined || urlObject[4] === "") ? urlObject[3] : urlObject[3] + ":" + urlObject[4], url);
                    break;
                  case "device":
                    pushUrl("device " + urlObject[1], (urlObject[3] === undefined || urlObject[3] === "") ? '/' : urlObject[3], url);
                    break;
                }
                break;
              case "image":
                pushUrl(urlObject[1], urlObject[2], url);
                break;

              default:
                let text = "";
                if (urlObject[3] !== undefined && urlObject[3] !== "") {
                  text = path[urlObject[1]][urlObject[2]][urlObject[3]].text
                } else {
                  text = path[urlObject[1]][urlObject[2]].text
                }
                pushUrl(urlObject[1], text, url);
                break;
            }
          }
          _this.$set(_this, 'dataList', dataList);
        });
    }
  }
</script>
