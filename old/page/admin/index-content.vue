<template>
    <div>
        <gl-admin-nav></gl-admin-nav>
        <router-view></router-view>
    </div>
</template>

<script>
    import GlAdminNav from "../../components/admin-nav";
    export default {
        components: {GlAdminNav},
        name: 'gl-admin-index',
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

<style>

</style>

<style scoped>

</style>