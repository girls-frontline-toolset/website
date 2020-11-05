<template>
  <v-container grid-list-md pa-0 mt-1>
    <v-layout row wrap>
      <v-flex xs12>
        <gl-ui-card-left :content="prompt" icon="notifications"/>
        <gl-ui-title :text="$t('title.h1.more.about')" h1/>
      </v-flex>
      <gl-ui-avatar-card icon-img="gl-girls-frontline-toolset" title="GitHub"
                         name="girls-frontline-toolset">
        <span style="font-size: 30px">一個少女前線工具集的組織</span> <br><br>
        <a href="https://github.com/girls-frontline-toolset" TARGET="_blank">
          <gl-ui-img name="gl-GitHub-logo" alt="girls-frontline-toolset" avatar="true"/>
        </a>
      </gl-ui-avatar-card>
      <gl-ui-avatar-card icon-img="gl-about-icon" :title="$t('about.webmaster')" name="bell-rabbit">
        <span style="font-size: 50px">少女前線很休閒!</span> <br>
        <br>
        歡迎加入本LINE群啊
        <router-link :to="langUrl() + '/more/line'">>>點這<<</router-link>
        <br>
        本人的網頁: <a href="https://andypang.dev/">https://andypang.dev/</a><br>
        Email: admin@ntw-20.com
      </gl-ui-avatar-card>
      <v-flex xs12>
        <gl-ui-title :text="'圖片庫'  +$t('about.contributor')" h2/>
      </v-flex>
      <v-flex xs3 v-for="item in contributor.img" style="text-align: center;" :key="item.id">
          <v-badge color="primary" bottom overlap class="gl-v-badge">
            <span slot="badge" >{{item.id}}</span>
            <v-avatar size="100px">
              <img v-if="item.icon !== ''" :src="item.icon" alt="icon">
              <img v-else src="/common/contributor/default.png" alt="icon">
            </v-avatar>
          </v-badge><br>
        <span style="margin: 0 auto">{{item.username }}</span>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  /** @typedef contributor.img
   * @property {string} id
   * @property {string} username
   * @property {string} email
   * @property {string} icon
   * @property {string} key
    **/

  import mPrompt from "../../mixin/mPrompt.js";
  import GlUiTitle from "../../components-ui/title";
  import GlUiCardLeft from "../../components-ui/cardLeft";
  import mMeta from "../../mixin/mMeta.js";
  import GlUiAvatarCard from "../../components-ui/avatar-card";
  import GlUiImg from "../../components-ui/img";

  export default {
    mixins: [mPrompt, mMeta],
    components: {GlUiImg, GlUiAvatarCard, GlUiCardLeft, GlUiTitle},
    props: ['promptData'],
    name: 'gl-ui-about',
    data() {
      return {
        contributor:{
          /** @type {contributor.img[]}**/
          img:[]}
      }
    }, beforeCreate() {
      let _this = this;
      this.$s.getJSON('/api/inquiry/contributor/getImgList', function (json) {
        if (json.status === "success") {
          _this.contributor.img = json.data;
        }
      });

    }
  }
</script>

<style>
  .gl-v-badge .v-badge__badge{
    width: 33px;
    height: 33px;
    bottom: -2px !important;
  }
</style>
