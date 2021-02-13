<template>
        <v-container grid-list-md pa-0 mt-1>
            <v-layout row wrap>
                <v-flex md4 sm4 xs12>
                    <v-layout row wrap>
                        <v-flex xs12>
                            <gl-ui-title :text="$t('other-platform.android-web-app.title')" h1/>
                        </v-flex>
                        <v-flex xs12 text-xs-center>
                            <v-avatar class="avatar-d">
                              <gl-ui-img name="gl-touch-icon-iphone-retina"  alt="android icon" avatar="true"/>
                            </v-avatar>
                        </v-flex>
                        <v-flex xs12 text-xs-center>
                            <span class="left-text">少女前線-工具集</span>
                        </v-flex>
                    </v-layout>
                </v-flex>
                <v-flex md8 sm8 xs12>
                    <v-layout row wrap>
                      <v-flex xs12>
                        <gl-ui-card-left :content="prompt" icon="notifications"/>
                        <gl-ui-title :text="$t('other-platform.android-web-app.how-to-install')" h2/>
                      </v-flex>
                        <v-flex sm6 md4 xs12 class="android-img" v-for="(item,key) in howToInstallImg" :key="'HowToInstall-'+ key">
                          <img :src="item.img" :alt="$t(item.text)" :title="$t(item.text)">
                          {{$t(item.text)}}
                        </v-flex>
                        <v-flex xs12>
                            <gl-ui-title :text="$t('other-platform.android-web-app.preview')" h2/>
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
                img: ["/common/img/android_web_app/android-web-app-preview-1.jpg","/common/img/android_web_app/android-web-app-preview-2.jpg",
                  "/common/img/android_web_app/android-web-app-preview-3.jpg","/common/img/android_web_app/android-web-app-preview-4.jpg",
                  "/common/img/android_web_app/android-web-app-preview-5.jpg","/common/img/android_web_app/android-web-app-preview-6.jpg"
                ],
                howToInstallImg: [{img:"/common/img/android_web_app/android-web-app-1.jpg",text:"other-platform.android-web-app.How-to-install-step-1"},
                  {img:"/common/img/android_web_app/android-web-app-2.jpg",text:"other-platform.android-web-app.How-to-install-step-2"},
                  {img:"/common/img/android_web_app/android-web-app-3.jpg",text:"other-platform.android-web-app.How-to-install-step-3"}
                ],
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
