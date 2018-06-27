<template>
    <v-container grid-list-md pt-0>
        <v-layout row wrap>
            <v-flex xs12>
                <gl-ui-card-left :content="prompt" icon="notifications"></gl-ui-card-left>
                <gl-ui-title text="關於" h1></gl-ui-title>
            </v-flex>
            <v-flex md4 sm4 xs12>
                <v-layout row wrap>
                    <v-flex xs12 text-xs-center>
                        <v-avatar class="avatar-d w-100">
                            <img src="/common/img/about-icon.jpg" alt="line icon">
                        </v-avatar>
                    </v-flex>
                    <v-flex xs12 text-xs-center>
                        <span class="left-text">andy19974a22</span>
                    </v-flex>
                    <v-flex xs12 text-xs-center>
                    </v-flex>
                </v-layout>
            </v-flex>
            <v-flex md8 sm8 xs12>
                <v-layout row wrap>
                    <v-flex xs12 class="f-18">
                        <span style="font-size: 50px">少女前線很休閒!</span> <br>
                        <br>
                        歡迎加入本LINE群啊
                        <router-link to="/more/line">>>點這<<</router-link>
                        <br>
                        使用LINE 機械人很方便喔
                        <router-link to="/more/line">>>點這<<</router-link>
                        <br>
                        如有任何問題回報及建議
                        <router-link to="/more/feedback">>>點這<<</router-link>
                        <br>
                        本人的網頁: <a href="http://kurumichan.com/">http://kurumichan.com/</a><br>
                        Email: admin@ntw-20.com
                        <gl-ui-title text="少前名片" h1></gl-ui-title>
                        <img src="/common/img/gl-card.png" style="width: 100%">
                    </v-flex>
              </v-layout>
          </v-flex>
      </v-layout>
  </v-container>
</template>

<script>
    import mPrompt from "../../mixin/mPrompt.js";
    import GlUiTitle from "../../components-ui/title";
    import GlUiCardLeft from "../../components-ui/cardLeft";
    export default {
        mixins: [mPrompt],
        components: {GlUiCardLeft, GlUiTitle},
        props: ['promptData'],
        name: 'gl-ui-about',
        data() {
            return {}
        }
    }
</script>
