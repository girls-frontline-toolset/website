<template>
        <v-container grid-list-md pt-0>
            <v-layout row wrap>
                <v-flex md4 sm4 xs12>
                    <v-layout row wrap>
                        <v-flex xs12>
                            <gl-ui-title text="Android App-資料" h1></gl-ui-title>
                        </v-flex>
                        <v-flex xs12 text-xs-center>
                            <v-avatar class="avatar-d">
                                <img src="/common/img/touch-icon-ipad-retina.png" alt="android icon">
                            </v-avatar>
                        </v-flex>
                        <v-flex xs12 text-xs-center>
                            <span class="left-text">少女前線 時間查詢</span>
                        </v-flex>
                        <v-flex xs12 text-xs-center>
                            版本:V{{version}}
                        </v-flex>
                        <v-flex xs12 text-xs-center>
                            <v-btn @click="open(0)" color="primary">下載</v-btn>
                            <v-btn @click="open(1)" color="primary" outline>Google 雲載點</v-btn>
                        </v-flex>
                        <gl-ui-android-about v-if="show" :ver="version"></gl-ui-android-about>
                    </v-layout>
                </v-flex>
                <v-flex md8 sm8 xs12>
                    <v-layout row wrap>
                        <v-flex xs12>
                            <gl-ui-card-left :content="prompt" icon="notifications"></gl-ui-card-left>
                            <gl-ui-title text="預覽圖" h2></gl-ui-title>
                        </v-flex>
                        <v-flex sm6 md4 xs12 class="android-img" v-for="item,key in img" :key="key">
                            <img :src="item" >
                        </v-flex>
                        <gl-ui-android-about v-if="!show" :ver="version"></gl-ui-android-about>
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

    export default {
        components: {GlUiCardLeft, GlUiAndroidAbout, GlUiTitle},
        name: 'gl-ui-android',
        mixins: [mPrompt],
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
            open: function (num) {
                this.$ga.event('android', 'download');
                switch (num) {
                    case 0:
                        window.open(this.link);
                        break;
                    case 1:
                        window.open(this.googleLink);
                        break;
                }

            }

        }, created: function () {
            this.show = !this.$s.less600();
        },
        mounted: function () {
            var _this = this;
            $.getJSON('/common/apk/version.json', function (json) {
                _this.version = json.version;
                _this.link = json.link;
                _this.googleLink = json.googleLink;
            });

            $.getJSON('/common/data/android-img.json', function (json) {
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
