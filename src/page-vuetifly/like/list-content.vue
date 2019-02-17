<template>
    <v-container grid-list-md pt-0 pa-0 mt-1>
        <v-layout row wrap>
            <v-flex md8 sm8 xs12>
                <gl-ui-card-left :content="prompt" icon="notifications"></gl-ui-card-left>
                <gl-ui-title :text="$t('title.h1.like.list')" h1 icon="icon-friends"></gl-ui-title>

                <div class="bd">
                    <span class="primary--text">{{$t("t.user-name")}}:</span>蘿莉控蘿莉<span class="primary--text">ID:</span>147867
                    <span class="primary--text">{{$t("t.server.s")}}:</span>TW<br>
                    <span class="primary--text">{{$t("t.remark")}}:</span>來互相點讚喔 ~ <- 這是站長 W
                </div>
                <gl-ui-title :text="$t('t.like-fb-list')" h2 ></gl-ui-title>

                <div class="bd" v-for="item in likeList">
                    <span class="primary--text">{{$t("t.user-name")}}:</span>{{item.user_name}}<span class="primary--text">ID:</span>{{item.ID}}
                    <span class="primary--text">{{$t("t.server.s")}}:</span>{{item.server}}<br>
                    <span class="primary--text">{{$t("t.remark")}}:</span>{{item.content}}
                </div>
            </v-flex>
            <v-flex md4 sm4 xs12 v-if="showMenuButton" >
                <v-btn color="primary" @click="showMenuButton = false" outline block>{{$t('register.register')}}</v-btn>
            </v-flex>
            <v-flex md4 sm4 xs12 v-if="!showMenuButton">
                <v-form ref="form" v-model="valid" >
                <v-container grid-list-md pa-0 ma-0>
                    <v-layout row wrap>
                        <v-flex xs12>
                            <v-card>
                                <v-card-title>
                                    <gl-ui-title :text="$t('like.rule')" h2></gl-ui-title>
                                    <div class="f-18">
                                        {{$t('like.visitor')}} <span class='primary--text'> {{$t('like.ru1')}}</span><br>
                                        {{$t('like.registrant')}} <span class='primary--text'>{{$t('like.ru2')}}</span><br>
                                        {{$t('like.registrant')}}<span class='primary--text'>{{$t('like.ru3')}}</span><br>
                                        {{$t('like.registrant')}} <span class='primary--text'>{{$t('like.ru4')}}</span>
                                    </div>
                                </v-card-title>
                            </v-card>
                            <gl-ui-title :text="$t('register.s')" h2></gl-ui-title>
                        </v-flex>
                        <v-flex xs12>
                            <v-text-field
                                    v-model="add.name"
                                    type="text"
                                    :label="$t('t.user-name') + ':'"
                                    required
                                    :rules="[() => !!add.name || $t('register.must')  ]"
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs5>
                            <v-text-field
                                    v-model="add.uid"
                                    type="number"
                                    label="UID:"
                                    mask="##########"
                                    required
                                    :rules="[() => !!add.uid || $t('register.must')  ]"
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs1>
                            <v-icon style="padding: 18px 0 0;" class="c-p" @click="showHelp()">help</v-icon>
                        </v-flex>
                        <v-flex xs6>
                            <v-radio-group v-model="add.server" row>
                                <v-radio
                                        :label="item.t"
                                        color="primary"
                                        :value="item.i"
                                        v-for="item in server"
                                        :key="item.i"
                                ></v-radio>
                            </v-radio-group>
                        </v-flex>
                        <v-flex xs12>
                            <v-text-field
                                    v-model="add.text"
                                    type="text"
                                    :label="$t('t.remark') + ':'"
                                    required
                                    :rules="[() => !!add.text || $t('register.must')  ]"
                            ></v-text-field>
                        </v-flex>
                        <v-flex  xs12>
                            <v-btn color="primary" @click="addLikeFb()" :disabled="!valid">{{$t('register.register')}}</v-btn>
                            <v-btn color="primary" outline @click="$refs.form.reset()">{{$t('register.clear')}}</v-btn>
                        </v-flex>
                    </v-layout>
                </v-container>
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
        name: 'gl-ui-like-content',
        data() {
            return {
                showMenuButton: false,
                show: false,
                likeList: null,
                server: [{"i": "TW", "t": "t.server.tw"}, {"i": "CN", "t": "t.server.cn"}, {"i": "JP", "t": "t.server.jp"}],
                add:{name:"",uid:"",server:"TW",text:""},
                valid:false
            }
        }, methods: {
            showHelp: function () {
                this.$s.glDialogImg(this.$t('dialog.location'),"/common/img/UID_check.jpg");
            },
            addLikeFb(){
                let _this = this;
                $.ajax({
                        url:"/api/inquiry/addLikeList",
                        type:"POST",
                        data:{
                            username: _this.add.name,
                            id: _this.add.uid,
                            servo:_this.add.server,
                            text:_this.add.text
                        },
                        success: function(data){
                            data = JSON.parse(data);
                            if(data.status === "success"){
                                _this.$s.glDialogText(_this.$t('register.s'),_this.$t('dialog.success') + "!!");
                                _this.$refs.form.reset();
                            }else{
                                _this.$s.glDialogText(_this.$t('register.s'),_this.$t('dialog.error-1'),1);
                            }
                        }
                    }
                );

            }
        },
        beforeCreate: function () {
            let _this = this;
            $.getJSON('/api/inquiry/LikeFBList', function (json) {
                if(json.status === "success"){
                    _this.likeList = json.data;
                }
            });
        },
        created: function () {
            for(let i = 0 ; this.server.length ; i++){
                this.server[i].t = this.$t(this.server[i].t);
            }

            this.showMenuButton = this.$s.less600();
            this.show = !this.$s.less600();
        },
    }
</script>

