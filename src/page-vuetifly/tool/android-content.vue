<template>
        <v-container grid-list-md pa-0 mt-1>
            <v-layout row wrap>
                <v-flex md4 sm4 xs12>
                    <v-layout row wrap>
                        <v-flex xs12>
                            <gl-ui-title text="Android App-資料" h1/>
                        </v-flex>
                        <v-flex xs12 text-xs-center>
                            <v-avatar class="avatar-d">
                              <gl-ui-img name="gl-touch-icon-iphone-retina"  alt="android icon" avatar="true"/>
                            </v-avatar>
                        </v-flex>
                        <v-flex xs12 text-xs-center>
                            <span class="left-text">少女前線-工具集</span>
                        </v-flex>
                        <v-flex xs12 text-xs-center>
                            版本:V{{version}}
                        </v-flex>
                        <v-flex xs12 text-xs-center>
<!--                            <v-btn @click="open(0)" color="primary">Google play下載</v-btn>-->
                            <v-btn @click="open(1)" color="primary">下載</v-btn>
                            <v-btn @click="open(2)" color="primary" outline>Google 雲載點</v-btn>
                        </v-flex>
                        <gl-ui-android-about v-if="show" :ver="version"/>
                    </v-layout>
                </v-flex>
                <v-flex md8 sm8 xs12>
                    <v-layout row wrap>
                        <v-flex xs12>
                          <v-alert
                            :value="true"
                            color="info"
                            icon="priority_high"
                            outline
                          >
                            This app was obsolete!! You can find a new web app in <router-link :to="langUrl() + '/tool/android-web-app'" style="color: red;">Here</router-link>.<br>
                            Also, you can download the APK to using this app.<br>
                            這應用程式已過時!! 你可以使用新的Web App <router-link :to="langUrl() + '/tool/android-web-app'" style="color: red;">在這</router-link>.<br>
                            或者, 你可以下載APK版本來使用。
                          </v-alert>
                        </v-flex>
                        <v-flex xs12>
                            <gl-ui-card-left :content="prompt" icon="notifications"/>
                            <gl-ui-title text="預覽圖" h2/>
                        </v-flex>
                        <v-flex sm6 md4 xs12 class="android-img" v-for="(item,key) in img" :key="key">
                            <img :src="item" >
                        </v-flex>
                        <gl-ui-android-about v-if="!show" :ver="version"/>
                    </v-layout>
                </v-flex>
            </v-layout>
        </v-container>
</template>

<script>
    import GlUiTitle from "../../components-ui/title";
    import GlUiAndroidAbout from "../../components-ui/tool/androidAbout";
    import GlUiCardLeft from "../../components-ui/cardLeft";
    import mPrompt from "../../mixin/mPrompt.js";
    import mMeta from "../../mixin/mMeta.js";
    import GlUiImg from "../../components-ui/img";
    export default {
        components: {GlUiImg, GlUiCardLeft, GlUiAndroidAbout, GlUiTitle},
        name: 'gl-ui-android',
        mixins: [mPrompt,mMeta],
        data() {
            return {
                show: true,
                version: "1.0",
                link: "",
                googleLink: "",
                prompt: "",
                img: [],
                PoClass:null,
                block:{"width":0}
            }
        }, methods: {
            open(num) {
                this.$ga.event('android', 'download');
                switch (num) {
                    case 0:
                        window.open("https://play.google.com/store/apps/details?id=com.ntw_20.girlsfronttime.release");
                        break;
                    case 1:
                        window.open(this.link);
                        break;
                    case 2:
                        window.open(this.googleLink);
                        break;
                }

            }

        }, created() {
            this.show = !this.$s.less600();
        },
        mounted() {
            var _this = this;
          this.$s.getJSON('/common/apk/version.json', function (json) {
                _this.version = json.version;
                _this.link = json.link;
                _this.googleLink = json.googleLink;
            });

          this.$s.getJSON('/common/data/android-img.json', function (json) {
                _this.img = json.img;
            });
        }
    }
</script>

<style>
    .avatar-d {
        height: unset !important;
        width: unset !important;
    }

    .left-text {
        display: block;
        color: rgba(255, 179, 0, .8);
        font-size: 28px;
    }

    .android-img img{
        width: 100%;
        margin-top: 10px;
    }


</style>
