<template>
    <v-container grid-list-md pt-0>
        <v-layout row wrap>
            <v-flex xs12>
                <gl-ui-card-left :content="prompt" icon="notifications"></gl-ui-card-left>
                <gl-ui-title :text="$t('title.h1.more.about')" h1></gl-ui-title>
            </v-flex>
          <gl-ui-avatar-card icon-img="/common/img/girls-frontline-toolset.jpg" title="GitHub" name="girls-frontline-toolset">
            <span style="font-size: 30px">一個少女前線工具集的組織</span> <br><br>
            <a href="https://github.com/girls-frontline-toolset" TARGET="_blank">
              <img class="no-select" alt="girls-frontline-toolset" style="width: 50%" src="/common/img/GitHub-logo.png">
            </a>
          </gl-ui-avatar-card>
          <gl-ui-avatar-card icon-img="/common/img/about-icon.jpg" :title="$t('about.webmaster')" name="andy19974z22">
            <span style="font-size: 50px">少女前線很休閒!</span> <br>
            <br>
            歡迎加入本LINE群啊
            <router-link :to="langUrl() + '/more/line'">>>點這<<</router-link>
            <br>
            本人的網頁: <a href="http://kurumichan.com/">http://kurumichan.com/</a><br>
            Email: admin@ntw-20.com
          </gl-ui-avatar-card>
          <v-flex xs12>
            <gl-ui-title :text="$t('about.contributor')" h2></gl-ui-title>
          </v-flex>
      </v-layout>
  </v-container>
</template>

<script>
  import mPrompt from "../../mixin/mPrompt.js";
  import GlUiTitle from "../../components-ui/title";
  import GlUiCardLeft from "../../components-ui/cardLeft";
  import mMeta from "../../mixin/mMeta.js";
  import GlUiAvatarCard from "../../components-ui/avatar-card";

  export default {
        mixins: [mPrompt,mMeta],
        components: {GlUiAvatarCard, GlUiCardLeft, GlUiTitle},
        props: ['promptData'],
        name: 'gl-ui-about',
        data() {
            return {}
        }
    }
</script>
