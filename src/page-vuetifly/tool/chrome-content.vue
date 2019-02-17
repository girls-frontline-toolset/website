<template>
        <v-container grid-list-md pa-0 mt-1>
            <v-layout row wrap>
                <v-flex md4 sm4 xs12>
                    <v-layout row wrap>
                        <v-flex xs12>
                            <gl-ui-title text="Chrome 插件-資料" h1></gl-ui-title>
                        </v-flex>
                        <v-flex xs12 text-xs-center>
                            <v-avatar class="avatar-d">
                                <img src="/common/img/chrome-icon.png" alt="chrome icon">
                            </v-avatar>
                        </v-flex>
                        <v-flex xs12 text-xs-center>
                            <span class="left-text">少女前線 時間查詢</span>
                        </v-flex>
                        <v-flex xs12 text-xs-center>
                            版本:V{{version}}
                        </v-flex>
                        <v-flex xs12 text-xs-center>
                            <v-btn :href="link" target="_blank" color="primary">下載</v-btn>
                        </v-flex>
                        <gl-ui-chrome-about v-if="show" :ver="version"></gl-ui-chrome-about>
                        <!-- <gl-ui-android-about v-if="show" :ver="version"></gl-ui-android-about> -->
                    </v-layout>
                </v-flex>
                <v-flex md8 sm8 xs12>
                    <v-layout row wrap>
                        <v-flex xs12>
                            <gl-ui-card-left :content="prompt" icon="notifications"></gl-ui-card-left>
                        </v-flex>
                        <v-flex xs12>
                            <gl-ui-title text="預覽圖" h2></gl-ui-title>
                            <v-carousel>
                                <v-carousel-item v-for="(item,i) in carousel" :src="item" :key="i"></v-carousel-item>
                            </v-carousel>
                        </v-flex>
                        <v-flex xs12>
                            <gl-ui-title text="預覽片" h2></gl-ui-title>
                            <div class="videoWrapper" style="width: 100%">
                                <iframe  src="https://www.youtube.com/embed/N_4v0ww20Lw" frameborder="0" allow="encrypted-media" allowfullscreen></iframe>
                            </div>
                        </v-flex>
                        <gl-ui-chrome-about v-if="!show" :ver="version"></gl-ui-chrome-about>
                  </v-layout>
                </v-flex>
            </v-layout>
        </v-container>
</template>

<script>
    import GlUiTitle from "../../components-ui/title";
    import GlUiCardLeft from "../../components-ui/cardLeft";
    import mPrompt from "../../mixin/mPrompt.js";
    import GlUiChromeAbout from "../../components-ui/tool/chromeAbout";
    import mMeta from "../../mixin/mMeta.js";
    export default {
        components: {GlUiChromeAbout, GlUiCardLeft, GlUiTitle},
        name: 'gl-ui-chrome',
        mixins: [mPrompt,mMeta],
        data() {
            return {
                show:true,
                version:"",
                link:"",
                carousel: ["/common/img/chrome-img-1.jpg","/common/img/chrome-img-2.jpg","/common/img/chrome-img-3.jpg"]
            }
        }, created: function () {
                this.show = !this.$s.less600();
        },
        beforeCreate: function () {
            let _this = this;
            $.getJSON('/common/data/chrome-version.json',
                function(json){
                    _this.version = json.version;
                    _this.link = json.link
                });
        }
    }
</script>

<style>
  .videoWrapper iframe {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }

    .videoWrapper {
        position: relative;
        padding-bottom: 56.25%;
        padding-top: 25px;
        height: 0;
    }
</style>
