<template>
    <div>
        <gl-title message="圖片庫管理"></gl-title>
        <div v-if="!isNone" class="row img-list-admin" style="overflow: hidden;">
            <div v-if="isShow" >
                <div class="col-sm-6" ref="list-4">
                    <div v-for="item,index in data"
                         v-if="moIf(index,0,true)" >
                        <gl-image-add-card
                                :del="del"
                                :ref="item.id"
                                :item="item" :completed="completed" :tag-click="tagClick"
                                :change-option="changeOption" :index="index"
                                :select-option="selectOption[index]" :tag-list="tagList[index]" :enter-tag="enterTag"
                        ></gl-image-add-card>
                        <div class="image-delete-tag" :style="isDelete(index)">
                            <span class="glyphicon glyphicon-trash" @click="del(index)"></span>
                        </div>
                    </div>
                </div>
                <div class="col-sm-6" ref="list-4">
                    <div v-for="item,index in data"
                         v-if="moIf(index,1,false)">
                        <gl-image-add-card
                                :del="del"
                                :ref="item.id"
                                :item="item" :completed="completed" :tag-click="tagClick"
                                :change-option="changeOption" :index="index"
                                :select-option="selectOption[index]" :tag-list="tagList[index]" :enter-tag="enterTag"
                        ></gl-image-add-card>
                        <div class="image-delete-tag" :style="isDelete(index)">
                            <span class="glyphicon glyphicon-trash" @click="del(index)"></span>
                        </div>
                    </div>
                </div>
            </div>

            <div v-if="!isShow">
                <div class="col-sm-4" ref="list-1">
                    <div v-for="item,index in data"
                         v-if="index % 3 == 0 ">
                        <gl-image-add-card
                                :del="del"
                                :ref="item.id"
                                :item="item" :completed="completed" :tag-click="tagClick"
                                :change-option="changeOption" :index="index"
                                :select-option="selectOption[index]" :tag-list="tagList[index]" :enter-tag="enterTag"
                        ></gl-image-add-card>
                        <div class="image-delete-tag" :style="isDelete(index)">
                            <span class="glyphicon glyphicon-trash" @click="del(index)"></span>
                        </div>
                    </div>
                </div>
                <div class="col-sm-4" ref="list-2">
                    <div v-for="item,index in data"
                         v-if="index % 3 == 1 ">
                        <gl-image-add-card
                                :del="del"
                                :ref="item.id"
                                :item="item" :completed="completed" :tag-click="tagClick"
                                :change-option="changeOption" :index="index"
                                :select-option="selectOption[index]" :tag-list="tagList[index]" :enter-tag="enterTag"
                        ></gl-image-add-card>
                        <div class="image-delete-tag" :style="isDelete(index)">
                            <span class="glyphicon glyphicon-trash" @click="del(index)"></span>
                        </div>
                    </div>
                </div>
                <div class="col-sm-4" ref="list-3">
                    <div v-for="item,index in data"
                         v-if="index % 3 == 2 ">
                        <gl-image-add-card
                                :del="del"
                                :ref="item.id"
                                :item="item" :completed="completed" :tag-click="tagClick"
                                :change-option="changeOption" :index="index"
                                :select-option="selectOption[index]" :tag-list="tagList[index]" :enter-tag="enterTag"
                        ></gl-image-add-card>
                        <div class="image-delete-tag" :style="isDelete(index)">
                            <span class="glyphicon glyphicon-trash" @click="del(index)"></span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="submit col-sm-12">
                <input type="button" value="提交" @click="submit()" class='btn gl-btn-primary'>
            </div>
        </div>

        <div v-if="isNone" class="alert alert-danger none-img"><span class="glyphicon glyphicon-info-sign"></span>!!沒有作品!!
        </div>
    </div>
</template>
<script>
    import GlTitle from "../../components/title";
    import GlImageAddCard from "../../components/image-add-card";
    import mPixivTwitter from "../../mixin/mPixivTwitter";
    import mTagManagement from "../../mixin/mTagManagement";
    import GlCardTwitter from "../../components/card-twitter";
    export default {
        mixins: [mPixivTwitter, mTagManagement],
        components: {
            GlCardTwitter,
            GlImageAddCard,
            GlTitle
        },
        name: 'gl-admin-image',
        data() {
            return {
                data: [],
                isShow: false,
                less540: false,
                girlList: null,
                npcList: [],
                sangvislList: [],
                isNone: true
            }
        }, methods: {
            getImage:function(){
                var _this = this;
                this.data = [];
                $.getJSON('/api/inquiry/imageManage', function (json) {
                    if (json.status === "success") {
                        _this.data = json.data;
                        //console.log(_this.data);
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
            submit:function(){
                var list = [];
                var _this = this;

                for(var i = 0 ; i < this.data.length ; i ++){
                    var isDel = false;
                    if(this.data[i].del !== undefined && this.data[i].del === "true" ){
                        isDel = true;
                    }
                    list.push({"type":this.data[i].type,"id":this.data[i].id,"tagAdd":this.data[i].tagAdd,"del":isDel});

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
            isDelete:function(index){
                if(this.data[index].del !== undefined && this.data[index].del === "true" ){
                    return {"background-color":"#f00"}

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
            this.isShow = this.$setting.less768;
            this.less540 = this.$setting.less540;
            this.$g.getAllGirlList('girlList', this);
            this.$g.getNpc('npcList', this);
            this.$g.getSangvisl('sangvislList', this);
            this.getImage();
        }
    }
</script>

<style>
    .img-list-admin .submit {
        clear: both;
        margin-top: 10px;
        margin-bottom: 10px;
    }
</style>