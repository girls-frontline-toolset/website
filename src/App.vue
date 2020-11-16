<template>
        <v-app id="app" class="transparent">
            <gl-ui-resource/>
            <gl-ui-dialog/>
            <gl-ui-nav v-if="isShow"/>
        <div v-resize="onResize" :style="'height:' + height" v-if="isShow"/>
            <v-container fluid style="background: hsla(0,0%,100%,.7);" pa-0>
                <v-layout style="width: 100%;max-width: 1344px;" class="mx-auto">
                    <v-container fluid pa-0 mt-1 mb-1>
                        <v-layout row wrap >
                            <v-flex xs12 sm12 md9 pa-1 mt-0>
                                <router-view :style="'margin-top:' + mt"/>
                            </v-flex>
                            <gl-ui-right-content v-if="isShow && isSim"/>
                        </v-layout>
                    </v-container>
                </v-layout>
        </v-container>
        <gl-ui-footer v-if="isShow && isSim"/>
        <div class="topButton" >
                <v-icon @click="toTop()" size="50" class="white--text" >keyboard_arrow_up</v-icon>
        </div>
            <gl-ui-cookies/>
            <gl-ui-load/>
        </v-app>
</template>

<script>
    import GlUiNav from "./components-ui/nav";
    import GlUiFooter from "./components-ui/footer";
    import GlUiTitle from "./components-ui/title";
    import GlUiRightContent from "./components-ui/rightContent";
    import GlUiDialog from "./components-ui/dialog";
    import GlUiCookies from "./components-ui/cookies";
    import GlUiLoad from "./components-ui/load";
    import GlUiResource from "./components-ui/resource";

    export default {
        components: {
            GlUiResource,
            GlUiLoad,
            GlUiCookies,
            GlUiDialog,
            GlUiRightContent,
            GlUiTitle,
            GlUiFooter,
            GlUiNav,
        },
        name: 'app',
        data() {
            return {
                define: null,
                isShow: true,
                height: "53px",
                mt:"10px",
                isSim:true,
                languages: [{t: '简体中文', i: 'cn'}, {t: '繁體中文', i: 'tw'}, {t: '日本語', i: 'ja'},{t:'English',i:'en'}]
            }
        },
        methods: {
            onResize(){
                this.height = (this.$s.less960())? "35px" : "50px";
                this.mt =  (this.$s.less960())?'5px':'10px';
            },
            toTop () {
              this.$vuetify.goTo(0,{duration:10,easing:'easeInOutCubic'});
            },
            lan(data) {
                this.language = data;
                this.$i18n.locale = data.i;
                this.$router.locale = data.i;
            },
            updateTitle(){
              this.$nextTick(function(){
                this.$vuetify.goTo(0,{duration:10,easing:'easeInOutCubic'});
              });
              let title = "少女前線 工具集";
              let title2 = this.$route.meta.title['tw'];
              title = this.$t('title.s');
              title2 = this.$route.meta.title[this.$i18n.locale];
              document.title = (!title2 )? title : title2 + "-"+  title;

              let count_num = document.getElementById("count_num");
              count_num.setAttribute("src","//counter1.fc2.com/counter_img.php?id=89451780");
            }
        },
        beforeCreate() {
            let  _this = this;
            window.pushPush = function (path) {
                _this.$router.push({path: path});
            };

            window.goBack = function(){
                _this.$router.go(-1);
            };
            window.__pixiv__ = [];
        }, created() {
            if (this.$route.query.fn !== undefined) {
                if (this.$route.query.fn === "nbar") {
                    this.isShow = false;
                    this.$ga.event('android', 'use_in_app');
                    this.$s.app = true;
                }
            }

        if (this.$route.query.type !== undefined) {
          if (this.$route.query.type === "webapp") {
            this.$ga.event('webapp', 'use_in_app');
          }
        }

         },
      mounted() {
        let _this = this;

        this.$router.afterEach((to, route) => {
          _this.updateTitle();
        });
        this.$s.appVue = this;

        if (this.$route.query.lang !== undefined || this.$route.params.lang !== undefined) {
          if (this.$route.query.lang === "tw" || this.$route.query.lang === "cn" || this.$route.query.lang === "ja" || this.$route.query.lang === "en" ||
            this.$route.params.lang === "tw" || this.$route.params.lang === "cn" || this.$route.params.lang === "ja" || this.$route.params.lang === "en") {
            let lang = this.$route.query.lang || this.$route.params.lang;
            for (let i = 0; i < this.languages.length; i++) {
              if (this.languages[i].i === lang) {
                this.lan(this.languages[i]);
              }
            }

          }
        }
        this.updateTitle();
      }
    }
</script>

<style>
    .gl-main-color {
        background-color: hsla(42, 100%, 50%, 1) !important;
        border-color: hsla(42, 100%, 50%, 1) !important;
    }

    .toRight{
        float: right;
    }

    .is-load {
        background-color: hsla(42, 100%, 50%, 0.5);
    }


    .w-100 {
        width: 100%;
    }

    .d-b{
        display: block;
    }

    .c-p , .c-p span{
        cursor: pointer !important;
    }

    .m-center{
        margin: 0 auto;
    }

    .f-18{
        font-size: 18px !important;
    }

    body {
        background-repeat: repeat;
        background-image: url("/common/img/bg.jpg");
        background-size: 200px 200px;
    }

    body {
        margin: 0;
        font-family: "微軟正黑體";
    }

    .glScrollbar::-webkit-scrollbar-track {
        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
        background-color: #F5F5F5;
    }

    .glScrollbar::-webkit-scrollbar {
        width: 5px;
        background-color: #F5F5F5;
    }

    .glScrollbar::-webkit-scrollbar-thumb {
        background-color: #F90;
    }

    .topButton {
        position: fixed;
        right: 0;
        bottom: 0;
        margin: 0 5px 5px 0;
        width: 50px;
        height: 50px;
        background: hsla(42, 100%, 50%, 0.8);
        color: #fff;
        cursor: pointer;
        z-index: 15;
    }

    .topButton span {
        margin: 5px;
        font-size: 40px;
    }

    .no-select {
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    ::-moz-selection {
        background: rgba(255, 200, 0, 0.68);
    }

    ::selection {
        background: rgba(255, 200, 0, 0.68);
    }


    .unLine{
        text-decoration: unset;
    }
</style>
