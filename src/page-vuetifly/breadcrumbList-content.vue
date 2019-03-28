<template>
    <v-container grid-list-md pt-0>
      <v-layout row wrap>
        <v-flex xs12>
          <gl-ui-title :text="urlName + ' - ' + $t('title.h1.breadcrumbList')" h1 ></gl-ui-title>
        </v-flex>
        <v-flex xs12 v-for="item in urlList" :key="item.url">
          <router-link :to="item.url" class="f-18" >{{item.title}}</router-link>
        </v-flex>
      </v-layout>
    </v-container>
</template>

<script>
  import mMeta from "../mixin/mMeta.js";
  import GlUiTitle from "../components-ui/title";
  /** @typedef urlList
   *  @property {string} url
   *  @property {string} title
   */

  export default {
    components: {GlUiTitle},
    mixins: [mMeta],
    name: 'gl-ui-breadcrumbList',
    data() {
      return {
        /** @type {urlList[]} */
        urlList: [],
        urlName:"",
        isWaitMeta:true
      }
    }, methods: {
    }, beforeCreate() {
    }, created() {
    }, beforeMount() {
    }, mounted() {
      //console.log(this.$router.options.routes[0].children);
    let childrenList = this.$router.options.routes[0].children;

    for (let i = 0; i < childrenList.length; i++) {

      const path = this.$route.path.replace("/cn","").replace("/tw","").replace("/ja","").replace("/en","");

      if(childrenList[i].path === path.replace(/\//g,"")){

        this.urlName =  childrenList[i].path;

        const pathList = childrenList[i].children;

        for (let j = 0; j < pathList.length; j++) {
          if(pathList[j].path === "/") continue;

          const lang = (!this.$route.params.lang) ? "tw" : this.$route.params.lang;
          this.urlList.push({"url": pathList[j].path.replace(":name","all")  + "/","title":pathList[j].meta.title[lang]});
        }

        this.$nextTick(function () {
          this.metaTitle = this.urlName + ' - ' + this.$t('title.h1.breadcrumbList');
          document.title = this.metaTitle;
          document.dispatchEvent(new Event('render-event'));
        });
        break;
      }
    }

    }, beforeUpdate() {
    }, updated() {
    }, render() {
    }
  }
</script>

