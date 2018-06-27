<template>
    <div>
        <div>
            <gl-card-left title="提示" :content="prompt"></gl-card-left>
            <gl-title icon-src="/common/img/t-doll.png" message="少前 圖片庫"></gl-title>

            <div class="input-type">
                <span class='gl-label'>種類: </span>
                <img :src="'/common/img/' + key + '.gif'" :alt="key" :style="isClick('type',key)"
                     @click="click('type',key)"
                     v-for="(item, key, index) in type">
                <img :src="'/common/img/' + oKey + '.gif'" @click="click('other',oKey)" :style="isClick('other',oKey)"
                     :alt="oKey" v-for="(oItem, oKey , oIndex) in other">

            </div>

            <div class="input-star">
                <span class='gl-label'>星數: </span>
                <img :src="'/common/img/star_' + key + '.gif'" :alt="key" :style="isClick('star',key)"
                     @click="click('star',key)" v-for="(item, key, index) in star">
            </div>

            <div class="input-sangvis" v-if="other.sangvis">
                <span class='gl-label'>鐵血人形: </span>
                <span class="get no-select" @click="click('sangvis',key)" :style="isClick('sangvis',key)"
                      v-for="(item, key, index) in sangvis" :alt="item.name">{{item.name}}</span>
            </div>

            <div class="input-girl">
                <span class='gl-label'>角色: </span>
                <span class='tag label label-warning no-select' v-for="t,key in selectList" @click="tagClick(key)">
                    #{{t}}<span class="glyphicon glyphicon-remove"></span></span>
                <div v-if="isAll" class="alert alert-warning">
                    !! 所有角色 !!
                </div>
            </div>

            <button class="btn gl-btn-primary" type="button" style="width: 100px ;        display: block;clear: both;"
                    @click="moreImage()">尋找
            </button>
        </div>


        <div class="row img-list" style="overflow: hidden;">
            <div v-if="isShow">
                <div class="col-sm-6" ref="list-4">
                    <gl-card-twitter :completedFunction="completed" :item="item" :ref="item.id"
                                     v-for="item,index in data"
                                     v-if="moIf(index,0,true)"></gl-card-twitter>
                    <gl-image-add v-if="showBlock[0]"></gl-image-add>
                    <gl-image-delete v-if="showBlock[0]"></gl-image-delete>
                </div>
                <div class="col-sm-6" ref="list-5">
                    <gl-card-twitter :completedFunction="completed" :item="item" :ref="item.id"
                                     v-for="item,index in data"
                                     v-if="moIf(index,1,false)"></gl-card-twitter>
                    <gl-image-add v-if="showBlock[1]"></gl-image-add>
                    <gl-image-delete v-if="showBlock[1]"></gl-image-delete>
                </div>

            </div>

            <div v-if="!isShow">
                <div class="col-sm-4" ref="list-1">
                    <gl-card-twitter :completedFunction="completed" :item="item" :ref="item.id"
                                     v-for="item,index in data"
                                     v-if="index % 3 == 0 "></gl-card-twitter>
                    <gl-image-add v-if="showBlock[0]"></gl-image-add>
                    <gl-image-delete v-if="showBlock[0]"></gl-image-delete>
                </div>
                <div class="col-sm-4" ref="list-2">
                    <gl-card-twitter :completedFunction="completed" :item="item" :ref="item.id"
                                     v-for="item,index in data"
                                     v-if="index % 3 == 1 "></gl-card-twitter>
                    <gl-image-add v-if="showBlock[1]"></gl-image-add>
                    <gl-image-delete v-if="showBlock[1]"></gl-image-delete>
                </div>

                <div class="col-sm-4" ref="list-3">
                    <gl-card-twitter :completedFunction="completed" :item="item" :ref="item.id"
                                     v-for="item,index in data"
                                     v-if="index % 3 == 2 "></gl-card-twitter>
                    <gl-image-add v-if="showBlock[2]"></gl-image-add>
                    <gl-image-delete v-if="showBlock[2]"></gl-image-delete>
                </div>
            </div>
        </div>

        <div v-if="!isNone" class="img-div no-select img-more" @click="moreImage()">
            <span>顯示更多作品</span>
        </div>
        <div v-if="isNone" class="alert alert-danger none-img"><span class="glyphicon glyphicon-info-sign"></span>!!沒有相關作品 歡迎添加!!
        </div>

    </div>
</template>


<script>
    import GlTwitterCard from "../../components/twitterCard";
    import GlCardTwitter from "../../components/card-twitter";
    import GlTitle from "../../components/title";
    import GlCardLeft from "../../components/cardLeft";
    import GlImageAdd from "../../components/img-add";
    import mPixivTwitter from "../../mixin/mPixivTwitter";
    import mSelectImg from "../../mixin/mSelectImg";
    import GlImageDelete from "../../components/image-delete";
    export default {
        mixins: [mPixivTwitter, mSelectImg],
        components: {
            GlImageDelete,
            GlImageAdd,
            GlCardLeft,
            GlTitle,
            GlCardTwitter,
            GlTwitterCard
        },
        name: 'gl-image',
        data() {
            return {
                data: [],
                isShow: false,
                friendList: {},
                type: {"HG": true, "SMG": true, "RF": true, "AR": true, "MG": true, "SG": true},
                star: {"5": false, "4": false, "3": false, "2": false},
                other: {"sangvis": false, "GK": false},
                sangvis: [{"name": "常規", "s": false}, {"name": "裝甲", "s": false}, {
                    "name": "特殊",
                    "s": false
                }, {"name": "頭目", "s": false}],
                prompt: "",
                girlList: null,
                isAll: true,
                selectList: [],
                completedCount: 0,
                showBlock: [false, false, false],
                point: 0,
                less540: false,
                isNone: false,
                npcList: [],
                sangvislList: [],
                limit: 0,
            }
        }, methods: {
            moreImage: function () {
                this.$ga.event('imageGallery','moreImage');
                var _this = this;
                $.ajax({
                        url: "/api/inquiry/image/" + this.limit,
                        type: "POST",
                        data: {
                            selectList: this.selectList,
                            isAll: this.isAll
                        },
                        success: function (data) {
                            data = JSON.parse(data);

                            if (data.status === "success") {
                                for (var i = 0; i < data.data.length; i++) {
                                    _this.data.push(data.data[i]);
                                }

                            }

                            _this.limit += 9;

                            //console.log(_this.limit);
                            _this.$nextTick(function () {

                                if (_this.point === _this.data.length) {
                                    _this.isNone = true;
                                    return;
                                }

                                _this.$set(_this.showBlock, 0, false);
                                _this.$set(_this.showBlock, 1, false);
                                _this.$set(_this.showBlock, 2, false);

                                for (var i = _this.point; i < _this.data.length; i++) {
                                    _this.getPixivTwitterImg(i);
                                }
                                _this.point = _this.data.length;
                            });
                        }
                    }
                );


            },
            completed: function () {
                this.completedCount++;

                if (this.completedCount === this.data.length) {

                    if (!this.isShow) {
                        var height = [this.$refs["list-1"].clientHeight, this.$refs["list-2"].clientHeight, this.$refs["list-3"].clientHeight];
                    } else {
                        var height = [this.$refs["list-4"].clientHeight, this.$refs["list-5"].clientHeight];
                    }

                    var min = height[0];
                    var min_index = 0;


                    for (var i = 0; i < height.length; i++) {
                        if (height[i] < min) {
                            min = height[i];
                            min_index = i;
                        }
                    }

                    this.$set(this.showBlock, [min_index], true);
                }

            },
            reSet:function(){
                this.completedCount = 0;
                this.isNone = false;
                this.limit = 0;
                this.data = [];
                this.point = 0;
                this.$set(this.showBlock, 0, false);
                this.$set(this.showBlock, 1, false);
                this.$set(this.showBlock, 2, false);
            },
            tagClick: function (data) {
                this.reSet();
                this.$delete(this.selectList, data);
            },
            getGirlList: function () {
                var map = {"common": 0, "armor": 1, "unusual": 2, "boss": 3};

                this.selectList = [];
                var list = [];

                var isAll = true;
                for (var ii in this.type) {
                    if (!this.type[ii]) {
                        isAll = false;
                        break;
                    }
                }
                for (var iii in this.star) {
                    if (!this.star[iii]) {
                        isAll = false;
                        break;
                    }
                }

                for (var iiii in this.sangvis) {
                    if (!this.sangvis[iiii].s) {
                        isAll = false;
                        break;
                    }
                }

                for (var iiii in this.other) {
                    if (!this.other[iiii]) {
                        isAll = false;
                        break;
                    }
                }


                this.isAll = isAll;
                if (isAll) {
                    return;
                }
                for (var i in this.girlList) {
                    if (this.girlList[i].name !== "" && this.type[this.girlList[i].type] && this.star[this.girlList[i].star]) {
                        list.push(this.girlList[i].name);
                    }
                }

                if (this.other.sangvis) {
                    for (var z = 0; z < this.sangvislList.length; z++) {
                        if (this.sangvis[map[this.sangvislList[z]['type']]].s) {
                            list.push(this.sangvislList[z].name);
                        }
                    }

                }

                if (this.other.GK) {
                    for (var s = 0; s < this.npcList.length; s++) {
                        list.push(this.npcList[s].name);
                    }
                }


                //npcList:[],
                //  :[],
                this.reSet();
                this.selectList = list;
            }
            , click: function (type, num) {
                switch (type) {
                    case "type":
                        this.$set(this.type, num, !this.type[num]);
                        this.getGirlList();
                        break;
                    case "star":
                        this.$set(this.star, num, !this.star[num]);
                        this.getGirlList();
                        break;
                    case "sangvis":
                        this.$set(this.sangvis[num], "s", !this.sangvis[num].s);
                        this.getGirlList();
                        break;
                    case"other":
                        this.$set(this.other, num, !this.other[num]);
                        this.getGirlList();
                        break;
                }
            },
            image: function () {
                this.point = this.data.length;
                for (var i = 0; i < this.data.length; i++) {
                    this.getPixivTwitterImg(i);
                }
            },
            tag: function (tag) {
                var string = "";
                var tagList = tag.split("__");
                for (var ii = 0; ii < tagList.length; ii++) {
                    string += "";

                }
            }
        }, mounted: function () {


        }, created: function () {
            let randomNumber = Math.floor((Math.random() * this.promptData.length) + 1);
            this.prompt = this.promptData[randomNumber - 1];
            this.isShow = this.$setting.less768;
            this.less540 = this.$setting.less540;
            this.$g.getAllGirlList('girlList', this);
            this.$g.getNpc('npcList', this);
            this.$g.getSangvisl('sangvislList', this);
            var _this = this;


            if (this.$route.params.name !== undefined && this.$route.params.name !== "all") {

                this.selectList.push(this.$route.params.name);
                this.isAll = false;
            }

            //console.log(this.$route.query);
            //console.log();
            $.ajax({
                url: "/api/inquiry/image/0",
                type: "POST",
                data: {
                    isAll: this.isAll,
                    selectList: this.selectList
                },
                success: function (json) {
                    json = JSON.parse(json);
                    //json = json.decode(json);

                    if (json.status == "success") {
                        _this.data = json.data;
                        _this.limit += 9;
                        //_this.$set(_this, 'data', json.data);
                        _this.$nextTick(function () {
                            _this.image();
                        });
                    }
                    //}
                }
            });

            //let randomNumber = Math.floor((Math.random() * this.promptData.length) + 1);
            //this.MPrompt = this.promptData[randomNumber - 1];


        }, props: ['promptData'],
        beforeRouteUpdate (to, from, next) {
            //console.log(to.path);
            //console.log(to.path.match(/^\/tool\/image$/gm));
            if (to.path.match(/^\/tool\/image\/[\w\W]*$/gm) !== null) {
                var name = to.path.split("/")[3];

                if(name === "all"){
                    this.$set(this,'selectList',[]);
                    this.isAll = true;
                    this.$ga.event('imageGallery','all');
                }else{
                    this.$set(this,'selectList',[name]);
                    this.isAll = false;
                    this.$ga.event('imageGallery',name);
                }
                this.reSet();
                this.moreImage();
                next();
            }else{
                next();
            }
        }
    }
</script>

<style>

    .img-list .col-sm-4 {
        padding: 0 7.5px 2.5px 7.5px;

    }

    .card-pixiv {
        margin-bottom: 5px;
        width: 100%;
        border: 1px solid rgb(225, 232, 237);
        border-top: 0;
        background-color: #fff;

    }

    .pixiv-tag {
        border-top: 1px solid rgb(225, 232, 237);
        border-radius: 0px 0px 4px 4px;
    }

    .input-girl {
        margin-bottom: 10px;
        cursor: pointer;
    }

    .input-girl .tag {
        margin-left: 5px;
        float: left;
        margin-bottom: 5px;
    }

    .input-girl .glyphicon {
        margin-left: 2px;
    }

    .img-div {
        cursor: pointer;
        padding: 10px;
        border: 1px solid rgb(225, 232, 237);
        background-color: #ffffff;
        border-radius: 4px 4px 4px 4px;
        margin-top: 10px;
    }

    .img-div span {
        font-size: 30px;
        display: block;
        text-align: center;
    }

    .img-div .info {
        text-align: center;
    }

    .img-more {
        color: hsla(42, 100%, 50%, 1);
        border: 1px solid hsla(42, 100%, 50%, 1);
        margin-bottom: 10px;
    }

    .img-more span {
        font-size: 15px;
    }

    .none-img {
        font-size: 15px;
        padding: 10px;
        text-align: center;
        margin-bottom: 10px;
        margin-top: 10px;
    }

    .input-sangvis .get {
        width: 28%;
        max-width: 102px;
        cursor: pointer;
        background: #383a38;
        color: #fff;
        padding: 5px;
        font-size: 15px;
        margin: 0 0 10px 10px;
        display: inline-block;
        font-weight: bold;
        border-radius: 5px;
        text-align: center;
        opacity: 0.5;
    }

    .img-remove span{
        font-size: 18px;
    }
</style>