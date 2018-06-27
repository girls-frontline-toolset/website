<template>
    <div>
        <div class="login">
            <gl-title message="Login"></gl-title>
            <span class='gl-label'>User Name:</span>
            <input type="text" value="" v-model="userName"/>
            <span class='gl-label'>Password:</span>
            <input type="password" value="" v-model="pw"/>
            <input type="button" class="btn gl-btn-primary" value="登入" @click="login()">
        </div>
    </div>

</template>

<script>
    import GlTitle from "../../components/title";
    export default {
        components: {GlTitle},
        name: 'gl-admin-login',
        data() {
            return {
                userName: "",
                pw:"",
                tryNum:0,
            }
        }, methods:{
            login:function(){
                var _this = this;
                $.ajax({
                    url: "/api/inquiry/login",
                    type: "POST",
                    data: {
                        userName: this.userName,
                        pw: this.pw
                    },
                    success: function (json) {
                        json = JSON.parse(json);
                        if (json.status == "success") {
                            _this.$router.push({path: '/admin'});
                        } else {
                            _this.tryNum++;
                            if(_this.tryNum >= 5){
                                _this.$router.push({path: '/'});
                            }else{
                                glAlert("登入錯誤", "請再試!!");
                            }
                        }
                    }
                });

            }
        },beforeCreate: function () {
            var _this = this;
            $.getJSON('/api/inquiry/status', function (json) {
                if(json.status === "success"){
                    if(json.message === "isLogin"){
                        _this.$router.push({path:'/admin'});
                    }
                }
            });
        }
    }
</script>

<style>

    .login{
        width: 100%;
        max-width: 400px;
        margin: 0 auto;
        border: 1px solid rgb(225, 232, 237);
        background-color: #ffffff;
        padding: 10px;
    }
    .login input[type=text],.login input[type=password]{
        width: 100%;
        outline: none;
    }

    .login input[type=button]{
        margin-top: 5px;
    }
</style>
