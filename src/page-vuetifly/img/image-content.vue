<template>
    <v-container grid-list-md pt-0>
        <v-layout row wrap>
            <v-flex xs12>
                <gl-ui-card-left :content="prompt" icon="notifications"></gl-ui-card-left>
                <gl-ui-title :text="$t('title.h1.img')" h1 ></gl-ui-title>
            </v-flex>
            <v-flex xs12 pa-1>
                    <gl-ui-title h2 :text="$t('t.type') + ':' "></gl-ui-title>
                    <gl-ui-icon-button v-for="(item,key) in type" :key="key" :opacity="item" type="type" :name="key" ></gl-ui-icon-button>
            </v-flex>
            <v-flex xs12 pa-1>
                    <gl-ui-title h2 :text="$t('t.star') + ':' "></gl-ui-title>
                    <gl-ui-icon-button v-for="(item,key) in star" :key="key" :opacity="item" type="star" :name="key" ></gl-ui-icon-button>
            </v-flex>
            <v-flex class="input-sangvis" v-if="type.sangvis||type.military || type.whiteForces || type.EILD" xs12 pa-1>
                <gl-ui-title h2 text="鐵血人形:"></gl-ui-title>
                <span class="get no-select" @click="click('sangvis',key)" :style="isClick('sangvis',key)"
                      v-for="(item, key, index) in sangvis" :alt="item.name">{{item.name}}</span>
            </v-flex>
            <v-flex class="input-girl" xs12 pa-1>
                <gl-ui-title h2 :text="$t('t.character') + ':'"></gl-ui-title>
                <v-chip label color="primary" class="c-p no-select" style="height: 20px;" small text-color="white"  v-for="t,key in selectList" @click="tagClick(key)" :key="key">#{{t}} X</v-chip>
                <v-alert :value="isAll" outline color="primary" icon="priority_high">
                    !! {{$t("img.all-character")}} !!
                </v-alert>
            </v-flex>
            <v-flex xs12 pa-1>
                <v-btn color="primary" @click="moreImage()">{{$t('t.search')}}</v-btn>
            </v-flex>
            <v-flex xs12 sm6 md4 pa-1 ref="list-1">
                <gl-ui-image-card :completedFunction="completed" :item="item" :ref="item.id"
                                 v-for="(item,index) in data"
                                  :key="index"
                                 v-if="show(index,0)"></gl-ui-image-card>
                <gl-ui-image-add v-if="showBlock[0]"></gl-ui-image-add>
                <gl-ui-image-delete v-if="showBlock[0]"></gl-ui-image-delete>
             </v-flex>
             <v-flex xs12 sm6 md4 pa-1 ref="list-2">
                 <gl-ui-image-card :completedFunction="completed" :item="item" :ref="item.id"
                                   v-for="(item,index) in data"
                                   :key="index"
                                   v-if="show(index,1)"></gl-ui-image-card>
                 <gl-ui-image-add v-if="showBlock[1]"></gl-ui-image-add>
                 <gl-ui-image-delete v-if="showBlock[1]"></gl-ui-image-delete>
             </v-flex>
             <v-flex xs12 sm6 md4 pa-1 hidden-sm-and-down ref="list-3">
                 <gl-ui-image-card :completedFunction="completed" :item="item" :ref="item.id"
                                   v-for="(item,index) in data"
                                   :key="index"
                                   v-if="show(index,2)"></gl-ui-image-card>
                 <gl-ui-image-add v-if="showBlock[2]"></gl-ui-image-add>
                 <gl-ui-image-delete v-if="showBlock[2]"></gl-ui-image-delete>
             </v-flex>

             <v-flex xs12 pa-1>
                 <v-btn v-if="!isNone" block color="primary" outline @click="moreImage()">{{$t('img.more')}}</v-btn>
                 <v-btn v-if="isNone" block color="error">!!{{$t('img.add')}}!!</v-btn>
             </v-flex>
         </v-layout>
     </v-container>
</template>


<script>
    import mPixivTwitter from "../../mixin/mPixivTwitter";
    import mPrompt from "../../mixin/mPrompt.js";
    import GlUiCardLeft from "../../components-ui/cardLeft";
    import GlUiTitle from "../../components-ui/title";
    import GlUiIconButton from "../../components-ui/iconButton";
    import GlUiImageCard from "../../components-ui/image/imageCard";
    import GlUiImageAdd from "../../components-ui/image/imageAdd";
    import GlUiImageDelete from "../../components-ui/image/imageDelete";
    import mMeta from "../../mixin/mMeta.js";
    export default {
        mixins: [mPixivTwitter,mPrompt,mMeta],
        components: {
            GlUiImageDelete,
            GlUiImageAdd,
            GlUiImageCard,
            GlUiIconButton,
            GlUiTitle,
            GlUiCardLeft
        },
        name: 'gl-ui-image',
        data() {
            return {
                data: [],
                isWaitMeta:true,
                isShow: false,
                friendList: {},
                type: {"HG": true, "SMG": true, "RF": true, "AR": true, "MG": true, "SG": true,"sangvis":false,"military":false,"whiteForces":false,"EILD":false,"GK":false},
                star: {"star_2": false, "star_3": false, "star_4": false, "star_5": false},
                sangvis: [{"name": "常規", "s": false}, {"name": "裝甲", "s": false}, {"name": "特殊","s": false}, {"name": "頭目", "s": false}],
                girlList: null,
                isAll: true,
                selectList: [],
                completedCount: 0,
                showBlock: [false, false, false],
                point: 0,
                less960: false,
                less600:false,
                isNone: false,
                npcList: [],
                sangvislList: [],
                limit: 0,
                militaryList: [],
                whiteForcesList: [],
                eildList: [],
            }
        }, methods: {
            show(index,num){
                if(!this.less960){
                    return (index %3 === num)
                }else if(this.less600){
                    return (num === 0)
                }else{
                    return (index %2 === num)
                }

            },
            setData(a, b, c) {
                this.$set(this[a], b, c);
                this.getGirlList();
            },
            isClick: function (type, num) {
                switch (type) {
                    case 'sangvis':
                        if (this.sangvis[num].s) {
                            return {"opacity": 1};
                        } else {
                            return null;
                        }
                        break;
                }
            },
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
                    let _this = this;

                    let getHeight = function(sole){
                        let height = 0 ;

                        for(let i = 0 ;  i < _this.$refs[sole].children.length; i ++){
                            height += _this.$refs[sole].children[i].clientHeight;
                        }

                        return height;
                    };


                    var height ;
                    if (!this.less960) {
                        height = [getHeight("list-1"), getHeight("list-2"), getHeight("list-3")];
                    }else if(this.less600){
                        height = [getHeight("list-1")];
                    } else {
                        height = [getHeight("list-1"), getHeight("list-2")];
                    }

                    let min = height[0] , min_index = 0;

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
            getGirlList() {
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

                this.isAll = isAll;
                if (isAll) {
                    return;
                }

                for (var i in this.girlList) {
                    if (this.girlList[i].name !== "" && this.type[this.girlList[i].type] && this.star["star_"+this.girlList[i].star]) {
                        list.push(this.girlList[i].name);
                    }
                }

                if (this.type.sangvis) {
                    for (var z = 0; z < this.sangvislList.length; z++) {
                        if (this.sangvis[map[this.sangvislList[z]['type']]].s) {
                            list.push(this.sangvislList[z].name);
                        }
                    }
                }

                if (this.type.military) {
                 for (var zz = 0; zz < this.militaryList.length; zz++) {
                    if (this.sangvis[map[this.militaryList[zz]['type']]].s) {
                      list.push(this.militaryList[zz].name);
                    }
                 }
                }

              if (this.type.whiteForces) {
                for (var zzz = 0; zzz < this.whiteForcesList.length; zzz++) {
                  if (this.sangvis[map[this.whiteForcesList[zzz]['type']]].s) {
                    list.push(this.whiteForcesList[zzz].name);
                  }
                }
              }

              if (this.type.EILD) {
                for (var zzzz = 0; zzzz < this.eildList.length; zzzz++) {
                  if (this.sangvis[map[this.eildList[zzzz]['type']]].s) {
                    list.push(this.eildList[zzzz].name);
                  }
                }
              }

                if (this.type.GK) {
                    for (var s = 0; s < this.npcList.length; s++) {
                        list.push(this.npcList[s].name);
                    }
                }
                this.reSet();
                this.selectList = list;
            }
            , click: function (type, num) {
                switch (type) {
                    case "sangvis":
                        this.$set(this.sangvis[num], "s", !this.sangvis[num].s);
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
        }, created: function () {
            this.isShow = this.$s.less768;
            this.less960 = this.$s.less960();
            this.less600 = this.$s.less600();
            this.$g.getAllGirlList('girlList', this);
            this.$g.getNpc('npcList', this);
            this.$g.getSangvisl('sangvislList', this);
            this.$g.getMilitary('militaryList', this);
            this.$g.getEild('eildList', this);
            this.$g.getWhiteForces('whiteForcesList', this);
            var _this = this;

            if (this.$route.params.name !== undefined && this.$route.params.name !== "all") {
                this.selectList.push(this.$route.params.name);
                this.isAll = false;

                let name = this.$route.params.name;
              this.$nextTick(function () {
                this.metaTitle = name + " - " + this.$route.meta.pageTitle;
                this.metaDescription = "少前前線圖片庫 " + name + " 精選圖片";
                document.dispatchEvent(new Event('render-event'));
                document.title = this.metaTitle;
              });

            }else{
              this.$nextTick(function () {
                document.dispatchEvent(new Event('render-event'));
              });
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
                }
            });
        },
        beforeRouteUpdate (to, from, next) {
            if (to.path.match(/^\/image\/[\w\W]*$/gm) !== null) {
                var name = to.path.split("/")[2].replace("%2F","/");

                if(name === "all"){
                    this.$set(this,'selectList',[]);
                    this.isAll = true;
                    this.$ga.event('imageGallery','all');
                    this.$nextTick(function () {
                      document.dispatchEvent(new Event('render-event'));
                    });
                }else{
                  this.$nextTick(function () {
                    this.metaTitle = name + " - " + this.$route.meta.pageTitle;
                    this.metaDescription = "少前前線圖片庫 " + name + " 精選圖片";
                    document.title = this.metaTitle;
                    document.dispatchEvent(new Event('render-event'));
                  });

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
</style>
