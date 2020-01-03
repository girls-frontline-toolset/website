<template>
    <v-container grid-list-md pa-0 mt-1>
        <v-layout row wrap>
            <v-flex xs12>
                <gl-ui-card-left :content="prompt" icon="notifications"/>
                <gl-ui-title :text="$t('feedback.title')" h1/>
                <v-form ref="form" v-model="valid">
                    <v-text-field v-model="data.email" type="email"
                                  :label="$t('feedback.email')" name="email"/>
                    <v-textarea :label="$t('feedback.content')"
                                  :rules="[() => !!data.content || $t('register.must') ]"
                                  v-model="data.content" required/>
                    <v-btn color="primary" @click="send()" :disabled="!valid">{{$t('feedback.submit')}}</v-btn>
                    <v-btn color="primary" outline @click="$refs.form.reset()">{{$t('register.clear')}}</v-btn>
                </v-form>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    import mPrompt from "../../mixin/mPrompt.js";
    import GlUiCardLeft from "../../components-ui/cardLeft";
    import GlUiTitle from "../../components-ui/title";
    import mMeta from "../../mixin/mMeta.js";
    export default {
        mixins: [mPrompt,mMeta],
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
            send() {
                let _this = this;
                $.ajax({
                        url: "/api/inquiry/email",
                        type: "POST",
                        data: {
                            email: _this.data.email,
                            content: _this.data.content
                        },
                        success(data) {
                            data = JSON.parse(data);
                            if (data.status === "success") {
                                _this.$s.glDialogText(_this.$t('feedback.title'),_this.$t('dialog.success-1'));
                            } else {
                                _this.$s.glDialogText(_this.$t('feedback.title'),_this.$t('dialog.error-2'),1);
                            }
                        }
                    }
                )
            }
        }
    }
</script>
