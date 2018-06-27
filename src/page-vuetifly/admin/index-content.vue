<template>
    <div>
        <gl-ui-admin-nav></gl-ui-admin-nav>
        <router-view></router-view>
    </div>
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