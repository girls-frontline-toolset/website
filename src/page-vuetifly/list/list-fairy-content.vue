<template>
    <div>
        <gl-ui-tag-list v-if="isShow || $s.app" :select="model" :items="items"/>
        <gl-ui-card-left :content="prompt" icon="notifications"/>
        <gl-ui-title :text="$t('title.h1.list.fairy')" h1 icon="icon-equipment"/>

        <v-container grid-list-md pa-0 mt-1>
            <v-layout row wrap>
                <v-flex xs6>
                    <v-select :label="$t('time.filter')" item-text="t" item-value="i" :items="fairyItems" v-model="fairy"
                              single-line/>
                </v-flex>
                <v-flex xs3 pa-1>
                    <v-text-field mask="###" type="number" v-model="range[0]" :label="$t('time.start-no')" tabindex="1"/>
                </v-flex>
                <v-flex xs3 pa-1 v-if="fairy === 0">
                    <v-text-field mask="###" type="number" v-model="range[1]" :label="$t('time.end-no')" tabindex="2"/>
                </v-flex>
                <v-flex xs3 pa-1 v-if="fairy === 1">
                    <v-text-field mask="###" type="number" v-model="range[2]" :label="$t('time.end-no')" tabindex="2"/>
                </v-flex>

                <v-flex xs12 pa-1>
                    <gl-ui-title h2 :text="$t('t.type') + ': '"/>
                    <gl-ui-icon-button v-for="(item, key) in type" :key="key" :opacity="item" type="type"
                                       :name="key"/>
                </v-flex>

            </v-layout>
        </v-container>

        <v-btn color="primary" @click="getList()">{{$t('t.search')}}</v-btn>
        <v-btn color="primary" @click="getAll()">{{$t('t.all')}}</v-btn>
        <v-btn color="primary" v-if="fairy === 0" outline @click="getFairyTime()">{{$t('time.fairy-list')}}</v-btn>


        <div class="fairy_list_output">
            <img v-for="item in listData" :src='item.s' :alt='item.n'  :title='item.n'>
        </div>

        <div class="list_time_output">
            <v-layout row wrap >
                <v-flex md6 sm6 xs12 pa-1 v-for="i in 2" :key="i">
                    <div v-for="items in listTime[i - 1]">
                        <gl-ui-title h2 :text="items.title"/>
                        <img v-for="item in items.data" :src="item.s" :alt='item.n' :title='item.n'>
                    </div>
                </v-flex>
            </v-layout>
        </div>

        <gl-ui-error :error="error" :text="errorText"/>
    </div>
</template>

<script>
    import mPrompt from "../../mixin/mPrompt.js";
    import GlUiCardLeft from "../../components-ui/cardLeft";
    import GlUiTitle from "../../components-ui/title";
    import GlUiIconButton from "../../components-ui/iconButton";
    import GlUiError from "../../components-ui/error";
    import GlUiTagList from "../../components-ui/tagList";
    import mMeta from "../../mixin/mMeta.js";
    export default {
        mixins: [mPrompt,mMeta],
        components: {
            GlUiTagList,
            GlUiError,
            GlUiIconButton,
            GlUiTitle,
            GlUiCardLeft,
        },
        name: 'gl-list-fairy-content',
        props: ['promptData'],
        data() {
            return {
                error: 0,
                fairyListCount: null,
                fairyList: null,
                range: [1, 0, 0],
                type: {"fairyType_0": false, "fairyType_1": false},
                fairyItems: [{"i": 0, "t": "time.fairy"}, {"i": 1, "t": "time.other-fairy"}],
                fairyTimeList: null,
                fairy: 0,
                exFairyList: null,
                exFairyListCount: null,
                listData: [],
                listTime:[[],[]],
                isShow:false,
                errorText:"not-text",
                model:"tab-1",
                items:[{"t": "時間查詢", "to": "/time/fairy", "i": "access_time"}, {"t": "時間列表", "to": "/list/fairy?f=time&fn=tag", "i": "list"}]
            }
        }, methods: {
            setData(a, b, c) {
                this.$set(this[a], b, c);
            },init(){
                this.listTime = [[],[]];
                this.listData = [];
                this.error = 0 ;
            },openAll() {
                for(let i in this.type){
                    this.type[i] = true;
                }
            },
            getFairyTime() {
                this.$ga.event('list', 'fairy_time_list');
                this.init();

                let data = this.fairyTimeList;
                let dataList = [];

                for (let i = 0, dataTitle, tmp; i < data.length; i++) {
                    let number = parseInt(data[i].data);
                    if (number >= this.range[0] && number <= this.range[1]) {
                        dataTitle = {"title": data[i].time};

                        tmp = this.getImgList(number - 1, false);

                        if(tmp){
                            dataTitle.data = [tmp] ;
                            dataList.push(dataTitle);
                        }
                    }
                }

                let leftSide = dataList.splice(0, Math.ceil(dataList.length /2));
                this.listTime = [leftSide, dataList];
                this.error = (!leftSide.length) ? 1 :  0 ;

            }, getAll(){
                this.$ga.event('list', 'fairy_list_all');
                this.type =  {"fairyType_0": true, "fairyType_1": true};
                this.getList();

            },getList() {
                this.$ga.event('list', 'fairy_list');
                this.init();

                let range = this.range[this.fairy + 1 ], count  = (this.fairy === 0)? this.fairyListCount :this.exFairyListCount ;

                if (this.range[0] < 0 || range >  count) {
                    this.init();
                    this.error = 3;
                    this.errorText = "請選擇在範圍內 0 - " + count;
                    return;
                }

                let html = [];
                let isAll = false;

                if (this.type["fairyType_" + 0] && this.type["fairyType_" + 1]) {
                    isAll = true;
                }

                for (let i = this.range[0],tmp; i <= range; i++) {
                    tmp = this.getImgList(i - 1, isAll);
                    if(tmp) html.push(tmp);
                }

                this.$set(this,'listData',html);
                this.error = (!html.length) ? 1 :  0 ;

            }, getImgList(index, isAll) {
                this.listTime = [[],[]];
                let data = this.fairyList[index];
                if (this.fairy === 1) {
                    data = this.exFairyList[index];
                }

                let type = -1;
                switch (data.type) {
                    case "戰鬥妖精" :
                        type = 0;
                        break;
                    case "策略妖精":
                        type = 1;
                        break;
                }

                if ((isAll || (this.type["fairyType_" + type])) && this.fairy === 0) {
                    return {"s": '/common/fairy/fairy_' + (index + 1) + '.jpg', "n": data.name};
                }
                if ((isAll || (this.type["fairyType_" + type])) && this.fairy === 1) {
                    return {"s": '/common/exFairy/exFairy_' + (index + 1) + '.jpg', "n": data.name};
                } else {
                    return null;
                }

            }
        },
        mounted() {

            for(let i = 0; i < this.fairyItems.length ; i++){
             this.fairyItems[i].t = this.$t(this.fairyItems[i].t);
            }

            let contList = 0, _this = this;

            let query = function () {
                if (contList === 3) {
                    if (!!_this.$route.query.f) {
                        let queryType = _this.$route.query.type;

                        if (!!queryType) {
                            for (let index in _this.type) {
                                _this.type[index] = false;
                            }

                            if (Array.isArray(queryType)) {
                                for (let type in queryType) {
                                    if (!_this.type["fairyType_" + queryType[type]])  _this.type["fairyType_" + queryType[type]] = true;
                                }
                            } else {
                                if (!_this.type["fairyType_" + queryType])  _this.type["fairyType_" + queryType] = true;
                            }
                        }

                        if (_this.$route.query.f === "list") {
                            _this.openAll();
                            _this.getList();
                        } else if (_this.$route.query.f === "time") {
                            _this.openAll();
                            _this.getFairyTime();
                        }

                        if (_this.$route.query.fn === "tag") {
                           if(_this.$s.less960() && !_this.$s.app){
                              _this.$nav.nav.items = JSON.parse(JSON.stringify(_this.items));
                              _this.$nav.nav.subSubNav = true;
                           }
                            _this.isShow = true;
                        }
                    }
                }
            };


            this.$g.getAllFairy('fairyList', this, function () {
                _this.fairyListCount = _this.fairyList.length;
                _this.range[1] = _this.fairyList.length;
                contList++;
                query();
            });
            this.$g.getAllExFairy('exFairyList', this, function () {
                _this.exFairyListCount = _this.exFairyList.length;
                _this.range[2] = _this.exFairyList.length;
                contList++;
                query();
            });
            this.$g.getAllTimeFairy('fairyTimeList', this,function(){
                contList++;
                query();
            });
        }, beforeRouteLeave(to, from, next) {
            if(!this.$s.app) this.$nav.nav.subSubNav = false;
            next();
        }
    }

</script>
