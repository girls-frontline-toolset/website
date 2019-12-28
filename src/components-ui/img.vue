<template>
  <img :alt="getAlt()" :style="getCss()" :title="getAlt()" src="/common/img/img_trans.gif" :class="name + ' gl-ui-img'"/>
</template>

<script>
  export default {
    name: "gl-ui-img",
    props: {'name': String, 'zoom': {type:String,default: "0"},'alt':{type:String,default: ""},'avatar':{type:String,default: ""}},
    data() {
      return {
        getCss(){
          let css = {zoom:  this.zoom};
          if(this.avatar !== ""){
            css = {border: "4px solid transparent",zoom: this.zoom}
          }
          return css;
        },
        getAlt() {
          if (this.alt !== ""){
            return this.alt;
          }

          switch (this.name) {
            case "gl-equipment-contract":
              return this.$t("prop.equipment-contract");
            case "gl-quick-production-contract":
              return this.$t("prop.quick-production-contract");
            case "gl-quick-repair-contract":
              return this.$t("prop.quick-repair-contract");
            case "gl-t-doll-contract":
              return this.$t("prop.t-doll-contract");
            case "gl-token":
              return this.$t("prop.token");
          }
        }
      }
    }
  }
</script>

<style scoped>
  .gl-ui-img {
    background: url('/common/img/sprites-1.png') no-repeat;
  }

  .gl-about-icon { background-position:  -5px -5px; height: 88px; width: 88px; }
  .gl-chrome-icon { background-position:  -5px -98px; height: 120px; width: 120px; }
  .gl-equipment-contract { background-position:  -130px -98px; height: 125px; width: 128px; }
  .gl-girls-frontline-toolset { background-position:  -98px -5px; height: 88px; width: 88px; }
  .gl-GitHub-logo { background-position:  -263px -98px; height: 98px; width: 294px; }
  .gl-group-icon { background-position:  -5px -223px; height: 120px; width: 120px; }
  .gl-line-bot-icon { background-position:  -5px -348px; height: 120px; width: 120px; }
  .gl-line-bot { background-position:  -130px -228px; height: 200px; width: 200px; }
  .gl-line-register-1 { background-position:  -5px -473px; height: 139px; width: 120px; }
  .gl-nucleus { background-position:  -5px -617px; height: 96px; width: 98px; }
  .gl-pixiv_logo { background-position:  -191px -5px; height: 24px; width: 60px; }
  .gl-quick-Production-contract { background-position:  -5px -718px; height: 125px; width: 119px; }
  .gl-quick-repair-contract { background-position:  -5px -848px; height: 125px; width: 119px; }
  .gl-t-doll-contract { background-position:  -562px -98px; height: 125px; width: 119px; }
  .gl-token { background-position:  -686px -98px; height: 125px; width: 128px; }
  .gl-touch-icon-iphone-retina { background-position:  -819px -98px; height: 120px; width: 120px; }
  .gl-zh-Hant { background-position:  -256px -5px; height: 28px; width: 84px; }
</style>
