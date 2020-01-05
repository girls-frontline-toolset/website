<template>
  <v-container grid-list-md pt-0 pa-0 style="height: 100%">
    <v-layout row wrap style="height: 100%">
      <v-flex :class="(less600)?'xs12':'xs3'">
        <gl-ui-admin-nav :horizontal="less600"/>
      </v-flex>
      <v-flex :class="(less600)?'xs12':'xs9'">
        <router-view/>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>

  import GlUiAdminNav from "../../components-ui/admin/nav";

  export default {
    components: {GlUiAdminNav},
    name: 'gl-ui-admin-index',
    data() {
      return {
        less600: false
      }
    }, beforeCreate() {
      var _this = this;
      this.$s.getJSON('/api/inquiry/status', function (json) {
        if (json.status === "success") {
          if (json.message === "isLogin") {
          } else {
            _this.$router.push({path: '/login'});
          }
        }
      });
    }, created() {
      this.less600 = this.$s.less600();
    }
  }
</script>
