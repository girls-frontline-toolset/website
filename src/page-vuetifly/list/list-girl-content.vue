<template>
    <div>
        <gl-ui-tag-list v-if="isShow || $s.app" :select="model" :items="items"></gl-ui-tag-list>
        <gl-ui-card-left :content="prompt" icon="notifications"></gl-ui-card-left>
        <gl-ui-title text="人型圖鑑" h1 icon="icon-equipment"></gl-ui-title>

        <v-container grid-list-md>
            <v-layout row wrap >
                <v-flex xs6>
                    <v-select label="篩選條件" item-text="t" item-value="i" :items="humanoidItems" v-model="humanoid"
                              single-line></v-select>
                </v-flex>
                <v-flex xs3 pa-1>
                    <v-text-field mask="###" type="number" v-model="range[0]" label="開始編號" tabindex="1"></v-text-field>
                </v-flex>
                <v-flex xs3 pa-1 v-if="humanoid !== 1">
                    <v-text-field  mask="###" type="number" v-model="range[1]" label="結束編號" tabindex="2"></v-text-field>
                </v-flex>
                <v-flex xs3 pa-1 v-else>
                    <v-text-field  mask="###" type="number" v-model="range[2]" label="結束編號" tabindex="2"></v-text-field>
                </v-flex>

                <v-flex xs12 pa-1>
                    <gl-ui-title h2 text="種類: "></gl-ui-title>
                    <gl-ui-icon-button v-for="item,key in type" :key="key" :opacity="item" type="type" :name="key" ></gl-ui-icon-button>
                </v-flex>

                <v-flex xs12 pa-1>
                    <gl-ui-title h2 text="星數: "></gl-ui-title>
                    <gl-ui-icon-button v-if="humanoid !== 1" v-for="item,key in star" :key="key" :opacity="item" type="star" :name="key" ></gl-ui-icon-button>
                    <gl-ui-icon-button v-if="humanoid === 1" :opacity="other.star_other" type="other" name="star_other" ></gl-ui-icon-button>
                </v-flex>

                <v-flex xs12 pa-1 v-if="humanoid === 0">
                    <gl-ui-title h2 text="其他: "></gl-ui-title>
                    <gl-ui-icon-button :opacity="update.update" type="update" name="update" ></gl-ui-icon-button>
                </v-flex>

            </v-layout>
        </v-container>
        <v-btn color="primary" @click="getList()"> 尋找</v-btn>
        <v-btn color="primary" v-if="humanoid === 0" outline @click="getGirlTime()">人形製作時間列表</v-btn>
        <div class="list_output">
            <a v-for="item in listDate" :key="item.no" :href="'https://zh.moegirl.org/zh-hant/少女前线:' + item.n " target='_blank'><img :src='item.s' :alt='item.n' :title='item.n'></a>
        </div>

        <div class="list_time_output">
            <v-layout row wrap >
            <v-flex md6 sm6 xs12 pa-1 v-for="i in 2" :key="i">
                <div v-for="items in listTime[i - 1]">
                    <gl-ui-title h2 :text="items.title"></gl-ui-title>
                    <a v-for="item in items.data" :key="item.no" :href="'https://zh.moegirl.org/zh-hant/少女前线:' + item.n " target='_blank'><img :class="item.c"  :src="'/common/girl/girl_' + item.num + '.jpg'" :alt='item.n' :title='item.n'></a>
                </div>
            </v-flex>
            </v-layout>
        </div>

        <gl-ui-error :error="error" :text="errorText"></gl-ui-error>
    </div>
</template>

<script>
    import GlUiCardLeft from "../../components-ui/cardLeft";
    import GlUiTitle from "../../components-ui/title";
    import mPrompt from "../../mixin/mPrompt.js";
    import GlUiIconButton from "../../components-ui/iconButton";
    import GlUiError from "../../components-ui/error";
    import GlUiTagList from "../../components-ui/tagList";
    export default {
        mixins: [mPrompt],
        components: {GlUiTagList, GlUiError, GlUiIconButton, GlUiTitle, GlUiCardLeft},
        name: 'gl-ui-list-content',
        data() {
            return {
                humanoidItems: [{"i": 0, "t": "戰術人形"}, {"i": 1, "t": "特典人形"}, {"i": 2, "t": "心智升級人形"}],
                humanoid: 0,
                type: {"HG": true, "SMG": true, "RF": true, "AR": true, "MG": true, "SG": true},
                star: {"star_2": true, "star_3": true, "star_4": true, "star_5": true},
                update: {"update":true},
                other: {"star_other":true},
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
                errorText:"not-text",
                items:[{"t":"時間查詢","to":"/time/girl","i":"access_time"},{"t":"時間列表","to":"/list/girl?f=time&fn=tag","i":"list"}],

            }
        },
        methods: {
            setData(a, b, c) {
                this.$set(this[a], b, c);
            },
            init(){
                this.listTime = [[],[]];
                this.listDate = [];
                this.error = 0 ;
            },getList() {
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

                if (type === "girl") {
                    data = this.girlList[index];

                    star = this.star["star_" + data.star];
                    url = "/common/girl/girl_";

                    if (this.update["update"] && data.isUpdate === "1") {

                        switch (data.star) {
                            case '2':
                                star = this.star["star_" + 4];
                                break;
                            case '4':
                                star = this.star["star_" + 5];
                                break;
                        }
                        url = "/common/digiMindGirl/digiMindGirl_";
                    }

                    name = (data.src)? data.src:data.name;

                } else if (type === "exGirl") {
                    data = this.exGirlList[index];
                    star = this.other["star_other"];
                    url = "/common/exGirl/exgirl_";
                    name = (data.src)? data.src:data.name;
                }

                if (isAll || (this.type[data.type] && star)) {
                    return {"no":index + 1 ,"n":name,"s": url + (index + 1 ) + '.jpg'};
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

                                        dataHtml.push({"n":name,"c":getClass[girl.heavy],"num":number});
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

        }, created: function () {
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
                            _this.getList();
                        } else if (_this.$route.query.f === "time") {
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

    @media (min-width: 600px) {
        .list_output img ,.fairy_list_output img{
            max-width: 115px;
            margin-right: 5px;
            margin-bottom: 5px;
        }

        .list_output img, .fairy_list_output img {
            width: 20%;

        }
    }
</style>