<template>
    <v-container grid-list-md pa-0 mt-1>
        <v-layout row wrap>
            <v-flex md4 sm4 xs12>
                <v-layout row wrap v-if="showInfo">
                    <v-flex xs12>
                        <gl-ui-title text="好友資料" h1/>
                    </v-flex>
                    <v-flex xs12 text-xs-center>
                        <v-avatar class="avatar-d">
                          <gl-ui-img name="gl-line-bot-icon" avatar="true"/>
                        </v-avatar>
                    </v-flex>
                    <v-flex xs12 text-xs-center>
                        <span class="left-text">少女前線 時間查詢</span>
                        @bnj2321p<br>
                        <a href="https://line.me/R/ti/p/%40bnj2321p">
                          <gl-ui-img name="gl-zh-Hant"  alt="加入好友"/>
                        </a>
                    </v-flex>
                    <v-flex xs12 hidden-xs-only >
                      <gl-ui-title text="QR CODE" h2/>
                      <gl-ui-img v-if="show" name="gl-line-bot" alt="line icon"/>
                    </v-flex>
                    <gl-ui-line-bot-about v-if="show"/>
                </v-layout>
            </v-flex>
            <v-flex md8 sm8 xs12>
                <v-layout row wrap>
                    <v-flex xs12>
                        <gl-ui-card-left v-if="showInfo" :content="prompt" icon="notifications"/>
                        <div style="height: 48px">
                            <v-tabs  slot="extension" v-model="model" centered slider-color="gl-main-color">
                                <v-tab v-for="(item , key) in items" :key="key" :href="`#tab-${key}`" :to="langUrl() + item.to">
                                    {{$t(item.t)}}
                                    <v-icon >{{item.i}}</v-icon>
                                </v-tab>
                            </v-tabs>
                        </div>
                        <gl-ui-title text="教學" h2/>
                    </v-flex>
                    <router-view/>
                    <gl-ui-line-bot-about v-if="!show"/>
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
    import mMeta from "../../mixin/mMeta.js";
    import GlUiImg from "../../components-ui/img";
    export default {
        mixins: [mPrompt,mMeta],
        components: {
          GlUiImg,
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
                showInfo: true
            }
        }, created() {
            this.showMenuButton = (window.innerWidth < 768);
            this.show = !this.$s.less600();

        if (this.$route.query.text !== undefined) {
            this.showInfo = false;
            this.$ga.event('line', 'Liff_help');
        }

        }
    }
</script>
