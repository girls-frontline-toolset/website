<template>
    <v-container grid-list-md pt-0>
        <v-layout row wrap>
            <v-flex md8 sm8 xs12>
                <gl-ui-card-left :content="prompt" icon="notifications"></gl-ui-card-left>
                <gl-ui-title text="好友招募區域" h1 icon="icon-friends"></gl-ui-title>
                <gl-ui-title text="搜尋:" h2></gl-ui-title>
                <v-container grid-list-md>
                    <v-layout row wrap>
                        <v-flex xs6 pa-1>
                            <v-select label="種類:" item-text="t" item-value="i" :items="type" v-model="select.s.type"
                                      @input="getGirl('select')"></v-select>
                        </v-flex>
                        <v-flex xs6 pa-1>
                            <v-select label="星數:" item-text="t" item-value="i" :items="star" v-model="select.s.star"
                                      @input="getGirl('select')"></v-select>
                        </v-flex>
                        <v-flex xs3 pa-1>
                            <v-select label="角色:" item-text="name" item-value="no" :items="girlSearch"
                                      v-model="select.s.girl"
                            ></v-select>
                        </v-flex>
                        <v-flex xs3 pa-1>
                            <v-select label="伺服:" item-text="t" item-value="i" :items="server" v-model="select.s.server"
                            ></v-select>
                        </v-flex>
                        <v-flex xs3 pa-1>
                            <v-select label="顯示數目:" item-text="t" item-value="i" :items="number"
                                      v-model="select.s.number"
                            ></v-select>
                        </v-flex>
                        <v-flex xs3 pa-1>
                            <v-btn color="primary" @click="search()" block> 尋找</v-btn>
                        </v-flex>
                        <v-flex xs12 pa-1>
                            <div class="bd primary--text" v-for="item,key in fbList" :key="item.ID +'-'+key">
                                <div class="bd-title">
                                    <div class="crop">
                                        <img :src="'/common/girl/girl_' + item.select_no + '.jpg'" :alt="allGirl[item.select_no - 1].name"
                                             :title="allGirl[item.select_no - 1].name">
                                    </div>
                                    用戶名: <span>{{item.user_name}}</span> <br>
                                    ID: <span>{{item.ID}}</span>等級:<span>{{item.grade}}</span>
                                    伺服:<span>{{item.server}}</span> <br>
                                    備註: <br>
                                    <span>{{item.content}}</span>
                                </div>
                            </div>
                        </v-flex>
                    </v-layout>
                </v-container>
            </v-flex>
            <v-flex md4 sm4 xs12 v-if="showMenuButton" >
            <v-btn color="primary" @click="showMenuButton = false" outline block>登記</v-btn>
            </v-flex>
            <v-flex md4 sm4 xs12 v-if="!showMenuButton">
                <gl-ui-title text="招募登記" h2></gl-ui-title>
                <v-form ref="form" v-model="valid" >
                <v-container grid-list-md>
                    <v-layout row wrap>
                        <v-flex xs7 pa-1>
                            <gl-ui-title text="常用角色:" h2></gl-ui-title>
                            <v-select label="種類:" item-text="t" item-value="i" :items="type" v-model="select.a.type"
                                      required @input="getGirl('add')"></v-select>
                            <v-select label="星數:" item-text="t" item-value="i" :items="star" v-model="select.a.star"
                                      required @input="getGirl('add')"></v-select>
                            <v-select label="角色:" item-text="name" item-value="no" :items="girlAdd"
                                     v-model="select.a.girl"
                                      required  :rules="[() => select.a.girl !== 0 || '必須' ]"
                            ></v-select>
                        </v-flex>
                        <v-flex xs5 pa-1>
                            <img :src="'/common/girl/girl_' + ((!select.a.girl)?0:select.a.girl) + '.jpg'" class="w-100">
                        </v-flex>
                        <v-flex xs12>
                            <v-text-field
                                    v-model="select.a.name"
                                    type="text"
                                    label="用戶名:"
                                    required
                                    :rules="[() => !!select.a.name || '必須' ]"
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs6>
                            <v-text-field
                                    v-model="select.a.uid"
                                    type="number"
                                    label="UID:"
                                    mask="##########"
                                    required
                                    :rules="[() => !!select.a.uid || '必須' ]"
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs6>
                            <v-icon style="padding: 18px 0 0;" class="c-p" @click="showHelp()">help</v-icon>
                        </v-flex>
                        <v-flex xs4>
                        <v-text-field
                                v-model="select.a.lv"
                                type="number"
                                label="等級:"
                                mask="###"
                                required
                                :rules="[() => !!select.a.lv || '必須' ]"
                        ></v-text-field>
                        </v-flex>
                        <v-flex xs8>
                            <v-radio-group v-model="select.a.server" row>
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
                                v-model="select.a.text"
                                type="text"
                                label="備註:"
                                required
                                :rules="[() => !!select.a.text || '必須' ]"
                        ></v-text-field>
                        </v-flex>
                        <v-flex xs12>
                            <v-btn color="primary" @click="addFriend()" :disabled="!valid"> 登記</v-btn>
                            <v-btn color="primary" outline @click="clear()">清除</v-btn>
                        </v-flex>

                    </v-layout>
                </v-container>
                </v-form>
            </v-flex>

        </v-layout>
    </v-container>
</template>

<script>

    import GlUiTitle from "../../components-ui/title";
    import GlUiCardLeft from "../../components-ui/cardLeft";
    import mPrompt from "../../mixin/mPrompt.js";

    export default {
        mixins: [mPrompt],
        components: {
            GlUiCardLeft,
            GlUiTitle
        },
        name: 'gl-ui-fb-list-content',
        data() {
            return {
                valid: true,
                showMenuButton: false,
                show: true,
                fbList: null,
                prompt: "",
                allGirl: null,
                type: [{"i": '', "t": "選擇"}, {"i": 'HG', "t": "HG"}, {"i": 'SMG', "t": "SMG"}, {"i": 'RF',"t": "RF"}, {"i": 'AR', "t": "AR"}, {"i": 'MG', "t": "MG"}, {"i": 'SG', "t": "SG"}],
                star: [{"i": '', "t": "選擇"}, {"i": 5, "t": "5"}, {"i": 4, "t": "4"}, {"i": 3, "t": "3"}, {"i": 2,"t": "2"}],
                girlSearch: [{"no": 0, "name": "選擇"}],
                girlAdd: [{"no": 0, "name": "選擇"}],
                server: [{"i": "TW", "t": "台"}, {"i": "CN", "t": "陸"}],
                number: [{"i": 5, "t": "5"}, {"i": 10, "t": "10"}, {"i": 15, "t": "15"}, {"i": 20, "t": "20"}, {"i": 30, "t": "30" }],
                select: {
                    s: {type: '', star: '', girl: '', server: 'TW', number: 5},
                    a: {type: '', star: '', girl: 0, name: "", uid: "", lv: "", server: "TW", text: ""}
                }
            }
        }, methods: {
            clear(){
                this.$refs.form.reset();
            },
            showHelp: function () {
                this.$s.glDialogImg("位置查詢","/common/img/UID_check.jpg");
            },
            getGirl: function (t) {
                let star = (t === "select") ? this.select.s.star : this.select.a.star;
                let type = (t === "select") ? this.select.s.type : this.select.a.type;
                if (!star || !type) {
                    return false;
                }

                let list = [{"no": 0, "name": "選擇"}];

                for (let i = 0; i < this.allGirl.length; i++) {
                    if (this.allGirl[i].type === type && this.allGirl[i].star === "" + star) {
                        list.push({"name": this.allGirl[i].name, "no": this.allGirl[i].no});
                    }
                }

                if (t === "select") {
                    this.girlSearch = list;
                } else {
                    this.girlAdd = list;
                }

            }, search: function () {
                let _this = this;

                $.ajax({
                        url: "/api/inquiry/friendListQuery",
                        type: "POST",
                        data: {
                            myType: _this.select.s.type,
                            myStar: _this.select.s.star,
                            myServer: _this.select.s.server,
                            mySelect: _this.select.s.number,
                            myNum: (_this.select.s.girl === 0 )? '' :_this.select.s.girl
                        },
                        success: function (data) {
                            data = JSON.parse(data);
                            if (data.status === "success") {
                                _this.fbList = data.data;
                            }
                        }
                    }
                );
            },
            addFriend: function () {
                let _this = this, data = this.select.a;

                if(!data.type || !data.star || !data.girl || !data.name || !data.uid || !data.lv || !data.text ){
                    this.$s.glDialogText("出現問題","請輸入所有欄位!",1);
                    return;
                }

                $.ajax({
                        url: "/api/inquiry/addFriend",
                        type: "POST",
                        data: {
                            type: _this.select.a.type,
                            star: _this.select.a.star,
                            num: _this.select.a.girl,
                            name: _this.select.a.name,
                            id: _this.select.a.uid,
                            grade: _this.select.a.lv,
                            servo: _this.select.a.server,
                            content: _this.select.a.text

                        },
                        success: function (data) {
                            data = JSON.parse(data);
                            if (data.status === "success") {
                                _this.$s.glDialogText("招募登記", "已成功!!");
                                $.getJSON('/api/inquiry/friendList', function (data) {
                                    if (data.status === "success") {
                                        _this.fbList = data.data;
                                        _this.clear();
                                        $('html,body').animate({scrollTop: 0}, 'slow');
                                    }
                                });
                            } else {
                                _this.$s.glDialogText("出現問題","出現問題 請再試!!<br>請確定全部資料正確!!",1);
                            }
                            return false;
                        }
                    }
                );

            }
        },
        created: function () {
            this.showMenuButton = this.$s.less600();
            this.show = !this.$s.less600();
        },
        mounted: function () {
            this.$g.getFriendList('fbList', this);
            this.$g.getAllGirlList('allGirl', this);

        }
    }
</script>

<style>
    .bd .crop {
        height: 120px;
        overflow: hidden;
        float: left;
        min-width: 112px;
        margin-right: 5px;
    }

    .bd .crop img {
        height: 200px;
        margin: -30px 0 0 0px;
    }

    .bd {
        overflow: hidden;
    }

    .bd .bd-title {
        margin-left: 10px;
        float: left;
        width: 100%;
    }

    .bd span {
        color: #000;
        font-weight: 100;
        margin: 0 5px 0 5px;
    }
</style>
