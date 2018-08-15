<template>
    <v-container grid-list-md pt-0>
        <v-layout row wrap>
            <v-flex md4 sm4 xs12>
                <v-layout row wrap>
                    <v-flex xs12>
                        <gl-ui-title text="好友資料" h1></gl-ui-title>
                    </v-flex>
                    <v-flex xs12 text-xs-center>
                        <v-avatar class="avatar-d">
                            <img src="/common/img/line-bot-icon.jpg" alt="line icon">
                        </v-avatar>
                    </v-flex>
                    <v-flex xs12 text-xs-center>
                        <span class="left-text">少女前線 時間查詢</span>
                        @bnj2321p<br>
                        <a href="https://line.me/R/ti/p/%40bnj2321p">
                            <img style="height:36px;border: 0;" alt="加入好友"
                                 src="/common/img/zh-Hant.png"></a>
                    </v-flex>
                    <v-flex xs12 hidden-xs-only>
                        <gl-ui-title text="QR CODE" h2></gl-ui-title>
                        <img v-if="show" src="/common/img/line-bot.jpg" alt="line icon" style="width: 100%">
                    </v-flex>
                    <gl-ui-line-bot-about v-if="show"></gl-ui-line-bot-about>
                </v-layout>
            </v-flex>
            <v-flex md8 sm8 xs12>
                <v-layout row wrap>
                    <v-flex xs12>
                        <gl-ui-card-left :content="prompt" icon="notifications"></gl-ui-card-left>
                        <div style="height: 48px">
                            <v-tabs  slot="extension" v-model="model" centered slider-color="gl-main-color">
                                <v-tab v-for="item , key in items" :key="key" :href="`#tab-${key}`" :to="item.to">
                                    {{$t(item.t)}}
                                    <v-icon >{{item.i}}</v-icon>
                                </v-tab>
                            </v-tabs>
                        </div>
                        <gl-ui-title text="教學" h2></gl-ui-title>
                    </v-flex>
                    <router-view></router-view>
                    <gl-ui-line-bot-about v-if="!show"></gl-ui-line-bot-about>
                </v-layout>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    import GlUiCardLeft from "../../components-ui/cardLeft";
    import GlUiTitle from "../../components-ui/title";
    import mPrompt from "../../mixin/mPrompt.js";
    import GlUiLineBotAbout from "../../components-ui/bot/lineBotAbout";

    export default {
        mixins: [mPrompt],
        components: {
            GlUiLineBotAbout,
            GlUiTitle,
            GlUiCardLeft,
        },
        name: 'gl-ui-bot-line',
        data() {
            return {
                show: false,
                showMenuButton: false,
                model:"tab-0",
                items:[{"t":"line.command","to":"/bot/line","i":"access_time"},{"t":"line.img","to":"/bot/line/img","i":"list"}],

            }
        }, methods: {
            clicked: function () {
                let showLog = this.$refs.showLog.classList;
                if (showLog.contains("glyphicon-triangle-bottom")) {
                    showLog.remove("glyphicon-triangle-bottom");
                    showLog.add("glyphicon-triangle-top");
                    this.show = true;
                } else {
                    showLog.add("glyphicon-triangle-bottom");
                    showLog.remove("glyphicon-triangle-top");
                    this.show = false;
                }

            }

        }, created: function () {
            this.showMenuButton = (window.innerWidth < 768);
            this.show = !this.$s.less600();
        }
    }
</script>

<style>
    .line-help {
        font-size: 18px;
        margin-bottom: 5px;
    }

    .line-help span {
        font-weight: bolder;
        display: block;
    }

    .line-help .high {
        font-size: 15px;
        color: #ac2925;
        margin-top: 5px;
    }

    .line-help hr {
        border: 1px hsla(42, 100%, 50%, 0.8) solid;
    }

    .line-help .code {
        margin-left: 20px;
        margin-top: 5px;
        background-color: #f7f7f9;
        padding: 5px;
        border: 1px solid #eee;
        border-radius: .25rem;
    }

    .line-help .example {
        border: 1px solid hsla(42, 100%, 50%, 0.8);
        margin-left: 20px;
        margin-top: 5px;
        background-color: #ffab4073;
        padding: 5px;
        border-radius: .25rem;

    }
</style>