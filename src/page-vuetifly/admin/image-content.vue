<template>
    <v-container grid-list-md pt-0>
        <v-layout row wrap>
            <v-flex xs12>
                <gl-ui-title text="圖片庫管理" h1></gl-ui-title>
                <v-layout row wrap v-if="!isNone">
                    <v-flex xs12 sm6 md4 pa-1 ref="list-1">
                        <div v-for="item,index in data" v-if="show(index,0)">
                            <gl-ui-image-add-card :item="item" :ref="item.id"
                                                  :completed="completed" :tag-click="tagClick"
                                                  :change-option="changeOption" :index="index"
                                                  :select-option="selectOption[index]" :tag-list="tagList[index]"
                                                  :enter-tag="enterTag"
                            ></gl-ui-image-add-card>
                            <div class="twitter-tag" :style="isDelete(index)">
                                <v-icon @click="del(index)" class="c-p">delete</v-icon>
                            </div>
                        </div>
                    </v-flex>
                    <v-flex xs12 sm6 md4 pa-1 ref="list-1">
                        <div v-for="item,index in data" v-if="show(index,1)">
                            <gl-ui-image-add-card :item="item" :ref="item.id"
                                                  :completed="completed" :tag-click="tagClick"
                                                  :change-option="changeOption" :index="index"
                                                  :select-option="selectOption[index]" :tag-list="tagList[index]"
                                                  :enter-tag="enterTag"
                            ></gl-ui-image-add-card>
                            <div class="twitter-tag" :style="isDelete(index)">
                                <v-icon @click="del(index)" class="c-p">delete</v-icon>
                            </div>
                        </div>
                    </v-flex>
                    <v-flex xs12 sm6 md4 pa-1 ref="list-1">
                        <div v-for="(item,index) in data" v-if="show(index,2)">
                            <gl-ui-image-add-card :item="item" :ref="item.id"
                                                  :completed="completed" :tag-click="tagClick"
                                                  :change-option="changeOption" :index="index"
                                                  :select-option="selectOption[index]" :tag-list="tagList[index]"
                                                  :enter-tag="enterTag"
                            ></gl-ui-image-add-card>
                            <div class="twitter-tag" :style="isDelete(index)">
                                <v-icon @click="del(index)" class="c-p">delete</v-icon>
                            </div>
                        </div>
                    </v-flex>
                    <v-flex xs12>
                        <v-btn color="primary" @click="submit()">提交</v-btn>
                    </v-flex>
                </v-layout>
                <v-layout row wrap v-if="isNone">
                    <v-btn block color="error" >!!沒有作品!!</v-btn>

                </v-layout>
            </v-flex>
        </v-layout>
    </v-container>
</template>
<script>
    import mPixivTwitter from "../../mixin/mPixivTwitter";
    import mTagManagement from "../../mixin/mTagManagement";
    import GlUiTitle from "../../components-ui/title";
    import GlUiImageAddCard from "../../components-ui/image/imageAddCard";
    import mMeta from "../../mixin/mMeta.js";
    export default {
        mixins: [mPixivTwitter, mTagManagement,mMeta],
        components: {
            GlUiImageAddCard,
            GlUiTitle
        },
        name: 'gl-ui-admin-image',
        data() {
            return {
                data: [],
                isShow: false,
                girlList: null,
                npcList: [],
                sangvislList: [],
                isNone: true,
                less960: false,
                militaryList: [],
                whiteForcesList: [],
                eildList: [],
            }
        }, methods: {
            show(index, num) {
                if (!this.less960) {
                    return (index % 3 === num)
                } else {
                    return (index % 2 === num)
                }
            },
            getImage: function () {
                var _this = this;
                this.data = [];
                $.getJSON('/api/inquiry/imageManage', function (json) {
                    if (json.status === "success") {
                        _this.data = json.data;
                       // console.log(_this.data);
                        _this.isNone = false;
                        _this.$nextTick(function () {
                            for (var i = 0; i < _this.data.length; i++) {
                                //console.log(_this.data[i]);
                                //console.log(_this.$refs[_this.data[i].id][0]);
                                _this.getPixivTwitterImg(i);
                            }
                        });

                    } else {
                        _this.isNone = true;
                    }
                });
            },
            submit: function () {
                var list = [];
                var _this = this;

                for (var i = 0; i < this.data.length; i++) {
                    var isDel = false;
                    if (this.data[i].del !== undefined && this.data[i].del === "true") {
                        isDel = true;
                    }
                    list.push({
                        "type": this.data[i].type,
                        "id": this.data[i].id,
                        "tagAdd": this.data[i].tagAdd,
                        "del": isDel
                    });

                }
                //console.log(list);
                $.ajax({
                        url: "/api/inquiry/updateImage",
                        type: "POST",
                        data: {
                            data: list,
                        },
                        success: function (data) {
                            //console.log(data);
                            data = JSON.parse(data);
                            if (data.status == "success") {
                                _this.getImage()
                            }
                        }
                    }
                );

            },
            isDelete: function (index) {
                if (this.data[index].del !== undefined && this.data[index].del === "true") {
                    return {"background-color": "#f00"}
                }
                return {};
            },
            del: function (index) {
                if (this.data[index].del === undefined || this.data[index].del === "false") {
                    this.$set(this.data[index], "del", "true");
                } else {
                    this.$set(this.data[index], "del", "false");
                }
            },
            completed: function () {


            }
        }, beforeCreate: function () {

        }, created: function () {
            this.isShow = this.$s.less768;
            this.less960 = this.$s.less960();
            this.$g.getAllGirlList('girlList', this);
            this.$g.getNpc('npcList', this);
            this.$g.getSangvisl('sangvislList', this);
            this.$g.getMilitary('militaryList', this);
            this.$g.getEild('eildList', this);
            this.$g.getWhiteForces('whiteForcesList', this);
            this.getImage();
        }
    }
</script>
