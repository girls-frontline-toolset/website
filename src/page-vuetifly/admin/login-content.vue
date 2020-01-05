<template>
    <v-container>
        <v-layout align-center row wrap>
            <v-flex xs6 mx-auto>
                <gl-ui-title text="Login" h1/>
                <v-form ref="form" v-model="valid">
                    <v-text-field
                            v-model="userName"
                            name="userName"
                            type="text"
                            label="用戶名:"
                            required
                            :rules="[() => !!userName || '必須' ]"
                    />
                    <v-text-field
                            v-model="pw"
                            name="password"
                            label="Password"
                            type="password"
                            required
                            :rules="[() => !!pw || '必須' ]"
                    />
                    <v-btn color="primary" @click="login()" :disabled="!valid">登入</v-btn>
                </v-form>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    import GlUiTitle from "../../components-ui/title";

    export default {
        components: {GlUiTitle},
        name: 'gl-ui-admin-login',
        data() {
            return {
                userName: "",
                pw: "",
                tryNum: 0,
                valid:false,
            }
        }, methods: {
            login() {
              var _this = this;
              this.$s.postData("/api/inquiry/login",
                {
                  userName: this.userName,
                  pw: this.pw
                },
                function (json) {
                  if (json.status === "success") {
                    _this.$router.push({path: '/admin'});
                  } else {
                    _this.tryNum++;
                    if (_this.tryNum >= 5) {
                      _this.$router.push({path: '/'});
                    } else {
                      _this.$s.glDialogText("登入錯誤", "請再試!!", 1);
                    }
                  }
                }
              );

            }
        }, beforeCreate() {
            var _this = this;
        this.$s.getJSON('/api/inquiry/status', function (json) {
                if (json.status === "success") {
                    if (json.message === "isLogin") {
                        _this.$router.push({path: '/admin'});
                    }
                }
            });
        }
    }
</script>
