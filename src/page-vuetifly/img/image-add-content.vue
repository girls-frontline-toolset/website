<template>
    <v-container grid-list-md pt-0>
        <v-layout row wrap>
            <v-flex xs12>
                <gl-ui-card-left :content="prompt" icon="notifications"></gl-ui-card-left>
                <gl-ui-title text="圖片庫 添加作品" h1></gl-ui-title>
            </v-flex>
            <v-flex xs12 v-if="el === 1">
                <gl-ui-image-url-help :is-show="isShow"></gl-ui-image-url-help>
                <v-form ref="form" v-model="valid">
                    <v-text-field v-model="select.email" type="email"
                                  label="E-mail  (選擇填寫)" name="email"></v-text-field>
                    <div class="red--text f-18" v-if=" erUrl.length !== 0 ">
                        網址錯誤:
                        <div v-for="item in erUrl"><span>{{item.name}}</span><br></div>
                    </div>
                    <v-text-field @keyup.enter="enter()" class="image-url" multi-line
                                  label="網址(支援 pixiv 及 twitter): 每網址一行"
                                  :rules="[() => !!select.content || '必須' ]"
                                  v-model="select.content" required></v-text-field>
                </v-form>
                <v-btn color="primary" @click="send()" :disabled="!valid">繼續</v-btn>
                <v-btn color="primary" outline @click="$refs.form.reset()">清除</v-btn>
            </v-flex>
            <v-flex xs12 v-else-if="el === 2">
                                <v-layout row wrap>
                                    <v-flex xs12 sm6 md4 pa-1 ref="list-1">
                                        <gl-ui-image-add-card :item="item" :ref="item.id"
                                                              v-for="item,index in data"
                                                              v-if="show(index,0)"
                                                              :key="index"
                                                              :completed="completed" :tag-click="tagClick"
                                                              :change-option="changeOption" :index="index"
                                                              :select-option="selectOption[index]" :tag-list="tagList[index]" :enter-tag="enterTag"
                                        ></gl-ui-image-add-card>
                                    </v-flex>
                                    <v-flex xs12 sm6 md4 pa-1 ref="list-2">
                                        <gl-ui-image-add-card :item="item" :ref="item.id"
                                                              v-for="item,index in data"
                                                              v-if="show(index,1)"
                                                              :key="index"
                                                              :completed="completed" :tag-click="tagClick"
                                                              :change-option="changeOption" :index="index"
                                                              :select-option="selectOption[index]" :tag-list="tagList[index]" :enter-tag="enterTag"
                                        ></gl-ui-image-add-card>
                                    </v-flex>
                                    <v-flex xs12 sm6 md4 pa-1 hidden-sm-and-down ref="list-3">
                                        <gl-ui-image-add-card :item="item" :ref="item.id"
                                                              v-for="item,index in data"
                                                              v-if="show(index,2)"
                                                              :key="index"
                                                              :completed="completed" :tag-click="tagClick"
                                                              :change-option="changeOption" :index="index"
                                                              :select-option="selectOption[index]" :tag-list="tagList[index]" :enter-tag="enterTag"
                                        ></gl-ui-image-add-card>
                                    </v-flex>
                                </v-layout>
                            <v-btn color="primary" @click="submit()" :disabled="!valid">提交</v-btn>
                            <v-btn color="primary" outline @click="reSet()">返回</v-btn>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    import mPrompt from "../../mixin/mPrompt.js";
    import mPixivTwitter from "../../mixin/mPixivTwitter";
    import GlUiCardLeft from "../../components-ui/cardLeft";
    import GlUiTitle from "../../components-ui/title";
    import GlUiImageAddCard from "../../components-ui/image/imageAddCard";
    import GlUiImageUrlHelp from "../../components-ui/image/imageUrlHelp";
    import mTagManagement from "../../mixin/mTagManagement";
    export default {
        mixins: [mTagManagement,mPixivTwitter, mPrompt],
        components: {
            GlUiImageUrlHelp,
            GlUiImageAddCard,
            GlUiTitle,
            GlUiCardLeft
        },
        name: 'gl-ui-image-add-content',
        data() {
            return {
                el: 1,
                erUrl: [],
                step: 0,
                girlList: null,
                npcList: [],
                sangvislList: [],
                isShow: false,
                less600: false,
                data: [],
                select: {
                    email: "",
                    content: ""
                },
                valid: false,
            }
        }, methods: {
            show(index, num) {
                if (!this.less960) {
                    return (index % 3 === num)
                } else {
                    return (index % 2 === num)
                }
            },
            submit: function () {
                var _this = this;
                var postList = [];

                for (var i = 0; i < this.data.length; i++) {
                    if (this.data[i].md5 !== undefined) {
                        postList.push({
                            "type": this.data[i].type,
                            "id": this.data[i].id,
                            "tagAdd": this.data[i].tagAdd,
                            "md5": this.data[i].md5
                        });
                    } else {
                        postList.push({
                            "type": this.data[i].type,
                            "id": this.data[i].id,
                            "tagAdd": this.data[i].tagAdd
                        });
                    }
                }
                this.$ga.event('imageGallery', 'imageAdd');
                $.ajax({
                        url: "/api/inquiry/addImage",
                        type: "POST",
                        data: {
                            data: postList,
                            email: _this.select.email
                        },
                        success: function (data) {
                            data = JSON.parse(data);
                            if (data.status === "success") {
                                _this.$s.glDialogText("添加作品", "已成功!!感謝你的推薦!! 請等待批核");
                                _this.reSet();
                                _this.select = {email: "",content: ""}
                            } else {
                                _this.$s.glDialogText("添加作品", "出現問題 請再試!!", 1);
                            }
                        }
                    }
                );
            },
            enter() {
                this.erUrl = [];
                var line = this.select.content.split('\n');
                const regex = /^https:\/\/www\.pixiv\.net\/member\_illust\.php\?mode\=medium\&illust_id\=[0-9]*[\w\W]*$|^https:\/\/twitter\.com\/[\w\W]*\/status\/[0-9]*$|^https:\/\/twitter\.com\/[\w\W]*\/status\/[0-9]*\?s\=[0-9]+$|^^https:\/\/twitter\.com\/[\w\W]*\/status\/[0-9]*\/[\w\W]*|^https:\/\/www\.pixiv\.net\/member\_illust\.php\?illust_id\=[0-9]*[\w\W]*/g;
                for (let i = 0, string, res; i < line.length; i++) {
                    if (line[i] === undefined || line[i] === "") {
                        continue;
                    }
                    string = "" + line[i];
                    res = string.match(regex);
                    if (res === null) {
                        this.erUrl.push({"name": string});
                    }
                }

                this.valid = (!this.erUrl.length);
            },
            reSet() {
                this.el = 1;
                this.data = [];
                $('html,body').animate({scrollTop: 0});
            },
            completed() {},
            send() {
                this.enter();
                let line = this.select.content.split('\n');
                let count = 0;

                for (var i = 0; i < line.length; i++) {
                    for (var ii = 0; ii < line.length; ii++) {
                        if (i === ii) {
                            count++;
                            continue;
                        }
                        if (line[ii] === "") {
                            continue;
                        }
                        if (line[i] === line[ii]) {
                            this.$s.glDialogText("網址問題", "網址不能相同!!<br>" + line[ii], 1);
                            return;
                        }
                        count++;
                    }

                }

                if (!count) {
                    this.$s.glDialogText("網址問題", "沒有輸入網址", 1);
                    return;
                }

                if (this.erUrl.length === 0) {
                    this.data = [];
                    const regexPi = /^https:\/\/www\.pixiv\.net\/member\_illust\.php\?mode\=medium\&illust_id\=|^https:\/\/www\.pixiv\.net\/member\_illust\.php\?illust_id\=/g;
                    const regexTw = /^https:\/\/twitter\.com\/[\w\W]*\/status\//g;

                    for (let x = 0, res, id; x < line.length; x++) {
                        if (line[x] === "") {
                            continue;
                        }

                        res = line[x].match(regexPi);
                        //console.log(res);

                        if (res !== null) {
                            id = line[x].replace(regexPi, "");
                            id = "" + id.match(/^[0-9]+/g);
                            this.data.push({"type": "pixiv", "id": id, "md5": md5(id), "tag": [], "tagAdd": []})
                        } else {
                            id = line[x].replace(regexTw, "");
                            id = "" + id.match(/^[0-9]+/g);
                            this.data.push({"type": "twitter", "id": id, "tag": [], "tagAdd": []})
                        }

                    }
                    $('html,body').animate({scrollTop: 0});
                    this.el = 2;
                    let _this = this;
                    this.$nextTick(function () {
                        for (var i = 0; i < _this.data.length; i++) {
                            _this.getPixivTwitterImg(i);
                        }
                    });
                }
            }

        }, created: function () {
            this.isShow = this.$s.less960();
            this.less600 = this.$s.less600();
            this.$g.getAllGirlList('girlList', this);
            this.$g.getNpc('npcList', this);
            this.$g.getSangvisl('sangvislList', this);
        },

    }
</script>

<style>
    .image-url textarea {
        height: 500px;
    }
</style>
