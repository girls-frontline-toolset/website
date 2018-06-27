<template>
    <v-container grid-list-md pt-0>
        <v-layout row wrap>
            <v-flex xs12>
                <gl-ui-card-left :content="prompt" icon="notifications"></gl-ui-card-left>
                <gl-ui-title text="問題回報,建議或移除作品" h1></gl-ui-title>
                <v-form ref="form" v-model="valid">
                    <v-text-field v-model="data.email" type="email"
                                  label="E-mail  (選擇填寫)" name="email"></v-text-field>
                    <v-text-field  multi-line label="內容:"
                                  :rules="[() => !!data.content || '必須' ]"
                                  v-model="data.content" required></v-text-field>
                    <v-btn color="primary" @click="send()" :disabled="!valid"> 登記</v-btn>
                    <v-btn color="primary" outline @click="$refs.form.reset()">清除</v-btn>
                </v-form>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    import mPrompt from "../../mixin/mPrompt.js";
    import GlUiCardLeft from "../../components-ui/cardLeft";
    import GlUiTitle from "../../components-ui/title";

    export default {
        mixins: [mPrompt],
        components: {
            GlUiTitle,
            GlUiCardLeft
        },
        name: 'gl-ui-feedback',
        data() {
            return {
                data: {'email': '', 'content': ''},
                emailRules: [
                    v => !!v || 'E-mail is required',
                    v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
                ],
                valid:false
            }
        }, methods: {
            send: function () {
                let _this = this;
                $.ajax({
                        url: "/api/inquiry/email",
                        type: "POST",
                        data: {
                            email: _this.data.email,
                            content: _this.data.content
                        },
                        success: function (data) {
                            data = JSON.parse(data);
                            if (data.status === "success") {
                                _this.$s.glDialogText("問題回報或建議","已成功!!感謝你的回報或建議!!");
                            } else {
                                _this.$s.glDialogText("問題回報或建議","出現問題 請再試!!",1);
                            }
                        }
                    }
                )
            }
        }
    }
</script>
