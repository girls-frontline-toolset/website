<template>
    <div>
        <gl-ui-tag-list v-if="isShow || $s.app" :select="model" :items="items"/>
        <gl-ui-card-left :content="prompt" icon="notifications"/>
        <gl-ui-title :text="$t('title.h1.list.girl')" h1 icon="icon-equipment"/>

        <v-container grid-list-md pa-0 mt-1>
            <v-layout row wrap >
                <v-flex xs6>
                    <v-select :label="$t('time.filter')" item-text="t" item-value="i" :items="humanoidItems" v-model="humanoid"
                              single-line/>
                </v-flex>
                <v-flex xs3 pa-1>
                    <v-text-field mask="###" type="number" v-model="range[0]" :label="$t('time.start-no')" tabindex="1"/>
                </v-flex>
                <v-flex xs3 pa-1 v-if="humanoid !== 1">
                    <v-text-field  mask="###" type="number" v-model="range[1]" :label="$t('time.end-no')" tabindex="2"/>
                </v-flex>
                <v-flex xs3 pa-1 v-else>
                    <v-text-field  mask="###" type="number" v-model="range[2]" :label="$t('time.end-no')" tabindex="2"/>
                </v-flex>

                <v-flex xs12 pa-1>
                    <gl-ui-title h2 :text="$t('t.type') + ':'"/>
                    <gl-ui-icon-button v-for="(item,key) in type" :key="key" :opacity="item" type="type" :name="key" />
                </v-flex>

                <v-flex xs12 pa-1>
                    <gl-ui-title h2 :text="$t('t.star') + ':'"/>
                    <gl-ui-icon-button v-if="humanoid !== 1" v-for="(item,key) in star" :key="key" :opacity="item" type="star" :name="key" />
                    <gl-ui-icon-button v-if="humanoid === 1" :opacity="other.star_other" type="other" name="star_other" />
                </v-flex>

                <v-flex xs12 pa-1 v-if="humanoid === 0 || humanoid === 2">
                    <gl-ui-title h2 :text="$t('t.other') + ':'"/>
                    <gl-ui-icon-button :opacity="update.update" type="update" name="update" />
                </v-flex>

            </v-layout>
        </v-container>
        <v-btn color="primary" @click="getList()">{{$t('t.search')}}</v-btn>
        <v-btn color="primary" @click="getAll()">{{$t('t.all')}}</v-btn>
        <v-btn color="primary" v-if="humanoid === 0" outline @click="getGirlTime()">{{$t('time.girl-list')}}</v-btn>
        <div class="list_output">
            <a v-for="item in listDate" :key="item.no" :href="'https://zh.moegirl.org/zh-hant/少女前线:' + item.n " target='_blank'>
                <div :alt="$t(getResourceName(item.no,humanoid))" :title='$t(getResourceName(item.no,humanoid))'
                     :style="'display: inline-block;zoom:' + zoom + ';margin-right: 5px'"
                     :class="'t-doll-' + ((item.type)?  item.type + '-': '') + 'sprites-' + ((item.lang)? item.lang.replace('/','') + '-'  : '') + item.no"></div>
            </a>
        </div>

        <div class="list_time_output">
            <v-layout row wrap >
            <v-flex md6 sm6 xs12 pa-1 v-for="i in 2" :key="i">
                <div v-for="items in listTime[i - 1]">
                    <gl-ui-title h2 :text="items.title"/>
                    <a v-for="item in items.data" :key="item.no" :href="'https://zh.moegirl.org/zh-hant/少女前线:' + item.n " target='_blank'>
                        <div :alt='$t(getResourceName(item.num))' :title='$t(getResourceName(item.num))'
                             :class="item.c + ' ' +'t-doll-sprites-' + ((item.lang)? item.lang.replace('/','') + '-'  : '') + item.num"
                             :style="'display: inline-block; zoom: ' + zoom  + ';margin-right: 5px;'"/>
                    </a>
                </div>
            </v-flex>
            </v-layout>
        </div>

        <gl-ui-error :error="error" :text="errorText"/>
    </div>
</template>

<script>
    import GlUiCardLeft from "../../components-ui/cardLeft";
    import GlUiTitle from "../../components-ui/title";
    import mPrompt from "../../mixin/mPrompt.js";
    import GlUiIconButton from "../../components-ui/iconButton";
    import GlUiError from "../../components-ui/error";
    import GlUiTagList from "../../components-ui/tagList";
    import mMeta from "../../mixin/mMeta.js";
    import mCheckWebp from "../../mixin/mModernizr-checkWebp.js";
    export default {
        mixins: [mPrompt,mMeta,mCheckWebp],
        components: {GlUiTagList, GlUiError, GlUiIconButton, GlUiTitle, GlUiCardLeft},
        name: 'gl-ui-list-content',
        data() {
            return {
                humanoidItems: [{"i": 0, "t": "time.t-doll"}, {"i": 1, "t": "time.other-doll"}, {"i": 2, "t": "time.update-doll"}],
                humanoid: 0,
                type: {"HG":false, "SMG":false, "RF": false, "AR": false, "MG": false, "SG": false},
                star: {"star_2": false, "star_3": false, "star_4": false, "star_5": false ,"star_6": false},
                update: {"update":false},
                other: {"star_other":false},
                girlListCount: 0,
                exGirlListCount: 0,
                girlList: null,
                exGirlList: null,
                range: [1, 10, 0],
                girlTimeList: null,
                listDate:[],
                listTime:[[],[]],
                error:0,
                isShow:false,
                model:"tab-1",
                zoom:'0.5',
                errorText:"not-text",
                items:[{"t":"time.search","to":"/time/girl","i":"access_time"},{"t":"time.list","to":"/list/girl?f=time&fn=tag","i":"list"}],

            }
        },
        methods: {
            setData(a, b, c) {
                this.$set(this[a], b, c);
            },
            openAll(){
                for(let ti in this.type){
                    this.type[ti] = true;
                }

                for(let si in this.star){
                    this.star[si] = true;

                }
                this.update.update = true;
                this.other.star_other = true;

            },
            init(){
                this.listTime = [[],[]];
                this.listDate = [];
                this.error = 0 ;
            },
            getAll(){
              this.$ga.event('list', 'girl_list_all');
              this.type =  {"HG":true, "SMG":true, "RF": true, "AR": true, "MG": true, "SG": true};
              this.star =  {"star_2": true, "star_3": true, "star_4": true, "star_5": true, "star_6": true};
              this.update = {"update":true};
              this.other = {"star_other":true};

              this.getList();
            },
            getList() {
                this.$ga.event('list', 'girl_list');
                this.init();

                let html = [];
                let isAll = false;
                if (this.humanoid === 0 || this.humanoid === 2) {
                    if (this.range[0] < 0 || this.range[1] > this.girlListCount) {
                        this.init();
                        this.error = 3;
                        this.errorText = "請選擇在範圍內 0 - " + this.girlListCount;
                        return;
                    }
                    if (this.star["star_5"] && this.star["star_4"] && this.star["star_3"] && this.star["star_2"] &&
                        this.type["HG"] && this.type["SMG"] && this.type["RF"] && this.type["AR"] && this.type["MG"] && this.type["SG"]
                    ) {
                        isAll = true;
                    }

                } else {
                    if (this.range[0] < 0 || this.range[2] > this.exGirlListCount) {
                        this.init();
                        this.error = 3;
                        this.errorText = "請選擇在範圍內 0 - " + this.exGirlListCount;
                        return;
                    }

                    if (this.type["HG"] && this.type["SMG"] && this.type["RF"] && this.type["AR"] && this.type["MG"] && this.type["SG"] &&
                        this.other["star_other"]) {
                        isAll = true;
                    }

                }
                switch (this.humanoid) {
                    case 0:
                        for (let i = this.range[0],tmp; i <= this.range[1]; i++) {
                            tmp = this.getImgList("girl", i - 1, isAll, "list");
                            if(tmp) html.push(tmp);

                        }
                        break;

                    case 1:
                        for (let i = this.range[0],tmp; i <= this.range[2]; i++) {
                            tmp = this.getImgList("exGirl", i - 1, isAll);
                            if(tmp) html.push(tmp);
                        }

                        break;

                    case 2:
                        for (let i = this.range[0],tmp; i <= this.range[1]; i++) {
                            if ((this.girlList[i - 1]).isUpdate === "1") {
                                tmp = this.getImgList("girl", i - 1, isAll, "list");
                                if(tmp) html.push(tmp);
                            }
                        }
                        break;
                    default:
                }
                this.listDate = html;
                this.error = (!html.length) ? 1 : 0 ;
            },
            getImgList(type, index, isAll) {
                let data = null, star = null, url = "", name = "";
                let t = ''

                if (type === "girl") {
                    data = this.girlList[index];

                    star = this.star["star_" + data.star];
                    url = "/common/girl/" + this.$t('resourcePath') + "girl_";

                    if (this.update["update"] && data.isUpdate === "1") {

                        switch (data.star) {
                            case '2':
                                star = this.star["star_" + 4];
                                break;
                            case '4':
                                star = this.star["star_" + 5];
                                break;
                            case '3':
                                star = this.star["star_" + 4];
                                break;
                            case '5':
                                star = this.star["star_" + 6];
                                break;
                        }
                        url = "/common/digiMindGirl/" + this.$t('resourcePath') + "digiMindGirl_";
                        t = 'digi';
                    }

                    name = (data.src)? data.src:data.name;

                } else if (type === "exGirl") {
                    data = this.exGirlList[index];
                    star = this.other["star_other"];
                    url = "/common/exGirl/" + this.$t('resourcePath') + "exgirl_";
                    name = (data.src)? data.src:data.name;
                    t = 'ex';
                }

                if (isAll || (this.type[data.type] && star)) {
                    return {"no":index + 1 ,"n":name,"s": url + (index + 1 ) + '.jpg', "lang":this.$t('resourcePath'), "type":t };
                }
                return null;

            },
            getGirlTime() {
                this.$ga.event('list', 'girl_time_list');
                this.init();

                let data = this.girlTimeList;
                let getClass = ["no_heavy","is_heavy"];
                let dataList = [];

                for (let i = 0, dataHtml, dataTitle ; i < data.length; i++) {
                    dataHtml = [];
                    dataTitle = {"title":data[i].time};

                    for (let listData in data[i]) {
                        if (listData !== "time") {
                            if (data[i][listData] !== "") {

                                for (let ii = 0, girl, name; ii < data[i][listData].length; ii++) {
                                    let number = parseInt(data[i][listData][ii]);

                                    if (number >= this.range[0] && number <= this.range[1]) {

                                        girl = this.girlList[number - 1];
                                        name = girl.name;

                                        if (!this.getImgList("girl", number - 1)) continue;

                                        dataHtml.push({"n":name,"c":getClass[girl.heavy], "lang":this.$t('resourcePath'), "num":number});
                                    }
                                }

                            }
                        }
                    }

                    if (dataHtml.length) {
                        dataTitle.data = dataHtml;
                        dataList.push(dataTitle);
                    }
                }
                let leftSide = dataList.splice(0, Math.ceil(dataList.length /2));
                this.listTime = [leftSide, dataList];
                this.error = (!leftSide.length) ? 1 : 0 ;
            }

        }, mounted(){
          let link = document.createElement("link");
          link.rel = "stylesheet"
          link.href = "/common/css/t-doll-sprites.css"
          document.head.append(link);
        }, created() {
        console.log(Modernizr);

        this.zoom = (this.$s.less600())? '0.4':'0.5';
        for(let i = 0 ; i < this.humanoidItems.length ;i++){
                this.humanoidItems[i].t = this.$t(this.humanoidItems[i].t);
            }

            let _this = this , contList = 0;

            var query = function () {
                if (contList === 3) {
                    if (!!_this.$route.query.f) {
                        let queryStar = _this.$route.query.star, queryType = _this.$route.query.type;

                        if (!!queryStar) {
                            for (let index in _this.star) {
                                _this.star[index] = false;
                            }

                            for (let star in queryStar) {
                                if (!_this.star["star_" + queryStar[star]])  _this.star["star_" + queryStar[star]] = true;
                            }
                        }

                        if (!!queryType ) {
                            for (let index in _this.type) {
                                _this.type[index] = false;
                            }

                            if (Array.isArray(queryType)) {
                                for (let type in queryType) {
                                    if (!_this.type[queryType[type]])  _this.type[queryType[type]] = true;
                                }
                            } else {
                                if (!_this.type[queryType])  _this.type[queryType] = true;
                            }
                        }

                        if (_this.$route.query.f === "list") {
                            _this.openAll();
                            _this.getList();
                        } else if (_this.$route.query.f === "time") {
                            _this.openAll();
                            _this.getGirlTime();
                        }

                        if (_this.$route.query.fn === "tag") {
                            if(!_this.$s.app && _this.$s.less960()){
                                _this.$nav.nav.items = JSON.parse(JSON.stringify(_this.items));
                                _this.$nav.nav.subSubNav = true;
                            }
                            _this.isShow = true;
                        }

                    }

                }
            };

            this.$g.getAllGirlList('girlList', this, function () {
                _this.girlListCount = _this.girlList.length;
                _this.$set(_this.range, 1, _this.girlList.length);
                contList++;
                query();
            });

            this.$g.getAllExGirlList('exGirlList', this, function () {
                _this.exGirlListCount = _this.exGirlList.length;
                _this.$set(_this.range, 2, _this.exGirlList.length);
                contList++;
                query();
            });

            this.$g.getAllGirlTime('girlTimeList', this, function () {
                contList++;
                query();
            });
        }, beforeRouteLeave(to, from, next) {
            if(!this.$s.app)this.$nav.nav.subSubNav = false;
            next();
        }
    }
</script>

<style>
    .list_output,.list_time_output {
        margin-top: 5px;
        margin-bottom: 5px;
    }

    .list_output img , .fairy_list_output img{
        width: 25%;

    }

    .list_time_output img , .fairy_list_output img {
        width: 30%;
        margin-right: 10px;
    }

    .cell_list_output img{
        width: 47%;
        margin-right: 10px;
    }

    @media (min-width: 600px) {
        .list_output img ,.fairy_list_output img{
            max-width: 115px;
            margin-right: 5px;
            margin-bottom: 5px;
        }

        .cell_list_output img{
            max-width: 160px;
            margin-right: 5px;
            margin-bottom: 5px;
        }

        .list_output img, .fairy_list_output img .cell_list_output img {
            width: 20%;

        }

      .webp .no_heavy, .no-webp .no_heavy {
        border: 5px solid #a0c11b;
      }


      .webp .is_heavy, .no-webp .is_heavy {
        border: 5px solid #ed7b4a;
      }

    }
</style>
