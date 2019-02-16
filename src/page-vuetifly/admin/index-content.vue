<template>
  <v-container grid-list-md pt-0 style="height: 100%">
    <v-layout row wrap style="height: 100%">
      <v-flex xs3>
        <gl-ui-admin-nav></gl-ui-admin-nav>
      </v-flex>
      <v-flex xs9>
        <router-view></router-view>
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
                isShow: false
            }
        }, methods: function () {


        },beforeCreate: function () {
            var _this = this;
            $.getJSON('/api/inquiry/status', function (json) {
                if(json.status === "success"){
                    if(json.message === "isLogin"){
                        _this.isShow = true;
                    }else{
                        _this.$router.push({path:'/login'});
                    }
                }
            });
        }
    }
</script>
