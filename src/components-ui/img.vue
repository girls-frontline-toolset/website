<template>
  <img :alt="getAlt()" :style="'zoom:' + this.zoom" :title="getAlt()" src="/common/img/img_trans.gif" :class="name + ' gl-ui-img'"/>
</template>

<script>
  export default {
    name: "gl-ui-img",
    props: {'name': String, 'zoom': {type:String,default: "0"}},
    data() {
      return {
        getAlt() {
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
    float: left;
  }

  .gl-equipment-contract {
    background-position: -0px -0px;
    height: 125px;
    width: 128px;
  }

  .gl-quick-production-contract {
    background-position: -128px -0px;
    height: 125px;
    width: 119px;
  }

  .gl-quick-repair-contract {
    background-position: -247px -0px;
    height: 125px;
    width: 119px;
  }

  .gl-t-doll-contract {
    background-position: -366px -0px;
    height: 125px;
    width: 119px;
  }

  .gl-token {
    background-position: -485px -0px;
    height: 125px;
    width: 128px;
  }
</style>
