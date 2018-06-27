<template>
    <v-container grid-list-md pt-0>
        <v-layout row wrap>
            <v-flex md8 sm8 xs12>
                <gl-ui-card-left :content="prompt" icon="notifications"></gl-ui-card-left>
                <gl-ui-title text="讚友招募區域" h1 icon="icon-friends"></gl-ui-title>

                <div class="bd">
                    <span class="primary--text">用戶名:</span>蘿莉控蘿莉<span class="primary--text">ID:</span>147867
                    <span class="primary--text">伺服:</span>TW<br>
                    <span class="primary--text">備註:</span>來互相點讚喔 ~ <- 這是站長 W
                </div>
                <gl-ui-title text="讚友列表" h2 ></gl-ui-title>

                <div class="bd" v-for="item in likeList">
                    <span class="primary--text">用戶名:</span>{{item.user_name}}<span class="primary--text">ID:</span>{{item.ID}}
                    <span class="primary--text">伺服:</span>{{item.server}}<br>
                    <span class="primary--text">備註:</span>{{item.content}}
                </div>
            </v-flex>
            <v-flex md4 sm4 xs12 v-if="showMenuButton" >
                <v-btn color="primary" @click="showMenuButton = false" outline block>登記</v-btn>
            </v-flex>
            <v-flex md4 sm4 xs12 v-if="!showMenuButton">
                <v-form ref="form" v-model="valid" >
                <v-container grid-list-md pa-0 ma-0>
                    <v-layout row wrap>
                        <v-flex xs12>
                            <v-card>
                                <v-card-title>
                                    <gl-ui-title text="規則" h2></gl-ui-title>
                                    <div class="f-18">
                                        參觀者 <span class='primary--text'>需對登記者按讚</span><br>
                                        登記者 <span class='primary--text'>將會回讚</span><br>
                                        登記者 <span class='primary--text'>需對其他玩家開放宿舍</span><br>
                                        登記者 <span class='primary--text'>需對所有到訪者按讚</span>
                                    </div>
                                </v-card-title>
                            </v-card>
                            <gl-ui-title text="招募登記" h2></gl-ui-title>
                        </v-flex>
                        <v-flex xs12>
                            <v-text-field
                                    v-model="add.name"
                                    type="text"
                                    label="用戶名:"
                                    required
                                    :rules="[() => !!add.name || '必須' ]"
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs6>
                            <v-text-field
                                    v-model="add.uid"
                                    type="number"
                                    label="UID:"
                                    mask="##########"
                                    required
                                    :rules="[() => !!add.uid || '必須' ]"
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs1>
                            <v-icon style="padding: 18px 0 0;" class="c-p" @click="showHelp()">help</v-icon>
                        </v-flex>
                        <v-flex xs5>
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
                                    label="備註:"
                                    required
                                    :rules="[() => !!add.text || '必須' ]"
                            ></v-text-field>
                        </v-flex>
                        <v-flex  xs12>
                            <v-btn color="primary" @click="addLikeFb()" :disabled="!valid"> 登記</v-btn>
                            <v-btn color="primary" outline @click="$refs.form.reset()">清除</v-btn>
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
    export default {
        mixins: [mPrompt],
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
                server: [{"i": "TW", "t": "台"}, {"i": "CN", "t": "陸"}],
                add:{name:"",uid:"",server:"TW",text:""},
                valid:false
            }
        }, methods: {
            showHelp: function () {
                this.$s.glDialogImg("位置查詢","/common/img/UID_check.jpg");
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
                                _this.$s.glDialogText("招募登記","已成功!!");
                                _this.$refs.form.reset();
                            }else{
                                _this.$s.glDialogText("招募登記","出現問題 請再試!!<br>請確定全部資料正確!!",1);
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
            this.showMenuButton = this.$s.less600();
            this.show = !this.$s.less600();
        },
    }
</script>

