<template>
        <v-app id="app" class="transparent">
            <gl-ui-dialog></gl-ui-dialog>
            <gl-ui-nav v-if="isShow"></gl-ui-nav>
        <v-layout v-resize="onResize" :style="'height:' + height" v-if="isShow"></v-layout>
            <v-container fluid style="background: hsla(0,0%,100%,.7);" pa-0>
                <v-layout style="width: 100%;max-width: 1344px;" class="mx-auto">
                    <v-container fluid pa-0 mt-1 mb-1>
                        <v-layout row wrap >
                            <v-flex xs12 sm12 md9 pa-1 mt-0>
                                <router-view :style="'margin-top:' + mt"></router-view>
                            </v-flex>
                            <gl-ui-right-content v-if="isShow && isSim"></gl-ui-right-content>
                        </v-layout>
                    </v-container>
                </v-layout>
        </v-container>
        <gl-ui-footer v-if="isShow && isSim"></gl-ui-footer>
        <div class="topButton" >
                <v-icon @click="toTop()" size="50">keyboard_arrow_up</v-icon>
        </div>
        </v-app>
</template>

<script>
    import GlUiNav from "./components-ui/nav";
    import GlUiFooter from "./components-ui/footer";
    import GlUiEventSchedule from "./components-ui/eventSchedule";
    import GlUiTitle from "./components-ui/title";
    import GlUiFacebook from "./components-ui/facebook";
    import GlUiRightContent from "./components-ui/rightContent";
    import GlUiDialog from "./components-ui/dialog";

    export default {
        components: {
            GlUiDialog,
            GlUiRightContent,
            GlUiFacebook,
            GlUiTitle,
            GlUiEventSchedule,
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
                languages: [{t: '简体中文', i: 'cn'}, {t: '繁體中文', i: 'tw'}, {t: '日本語', i: 'ja'}]
            }
        },
        methods: {
            onResize:function(){
                this.height = (this.$s.less960())? "35px" : "50px";
                this.mt =  (this.$s.less960())?'5px':'10px';
            },
            toTop: function () {
                $('html,body').animate({scrollTop: 0}, 'slow');
            },
            lan(data) {
                this.language = data;
                this.$i18n.locale = data.i;
                this.$router.locale = data.i;
            }
        },
        beforeCreate: function () {
            let  _this = this;
            window.pushPush = function (path) {
                _this.$router.push({path: path});
            };

            window.goBack = function(){
                _this.$router.go(-1);
            };
            window.__pixiv__ = [];
        }, created: function () {
           //console.log(this.$route.query);
            if (this.$route.query.fn !== undefined) {
                if (this.$route.query.fn === "nbar") {
                    this.isShow = false;
                    this.$ga.event('android', 'use_in_app');
                    this.$s.app = true;
                }
            }

            if (this.$route.query.lang !== undefined) {
                if (this.$route.query.lang === "tw" || this.$route.query.lang === "cn" || this.$route.query.lang === "ja") {
                    for (let i = 0; i < this.languages.length; i++) {
                        if (this.languages[i].i === this.$route.query.lang) {
                            this.lan(this.languages[i]);
                            let title = this.$t('title.s');
                            document.title = (!this.$router.meta.title[this.$route.query.lang])? title : this.$router.meta.title[this.$route.query.lang] + "-"+  title;
                        }
                    }

                }
            }

         }, mounted: function () {
                this.$s.appVue = this;

                //console.log(this);
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
        font-size: 18px;
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