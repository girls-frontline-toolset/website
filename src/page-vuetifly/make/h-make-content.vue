<template>
    <v-container grid-list-md pt-0 pa-0 mt-1>
        <v-layout row wrap>
            <v-flex md8 sm8 xs12>
                <gl-ui-card-left :content="prompt" icon="notifications"></gl-ui-card-left>
                <gl-ui-alert-text :text="$t('make.msg1')" :strong="$t('make.msg2')"></gl-ui-alert-text>
                <gl-ui-title :text="$t('title.h1.make.hGirl')" h1 icon="icon-make"></gl-ui-title>

                <v-container grid-list-md pt-1>
                    <v-layout row wrap class="no-select div-make">
                        <gl-ui-h-number-control  color="#d7570c" icon="/common/img/manpower.png" :number="number[0]"
                                                 :addFunction="addNumber" index="0" :title="$t('make.manpower')"></gl-ui-h-number-control>
                        <gl-ui-h-number-control  color="#d7570c" icon="/common/img/ammunition.png" :number="number[1]"
                                                 :addFunction="addNumber" index="1" :title="$t('make.ammunition')" ></gl-ui-h-number-control>
                        <gl-ui-h-number-control  color="#d7570c" icon="/common/img/material.png" :number="number[2]"
                                                 :addFunction="addNumber" index="2" :title="$t('make.material')"></gl-ui-h-number-control>
                        <gl-ui-h-number-control  color="#d7570c" icon="/common/img/parts.png" :number="number[3]"
                                                 :addFunction="addNumber" index="3" :title="$t('make.parts')"></gl-ui-h-number-control>

                        <v-flex xs12 class="div-h-make-select" text--xs--center>
                            <v-icon class="white--text c-p" size="60px" @click="next(-1)">keyboard_arrow_left</v-icon>
                            <img src="/common/img/tickets.png"> x{{selectData[select].tickets}}
                            <img src="/common/img/nucleus.png"> x{{selectData[select].nucleus}}
                            <v-icon class="white--text c-p" size="60px" @click="next(1)">keyboard_arrow_right</v-icon>
                        </v-flex>
                    </v-layout>
                </v-container>
                <v-btn color="primary" @click="start()" >{{$t('make.start')}}</v-btn>
                <v-btn color="primary" @click="getList()" >{{$t('make.list')}}</v-btn>
                <v-btn color="primary" outline @click="init()">{{$t('make.clear')}}</v-btn>
                <gl-ui-output-list v-if="!show" type="hGirl" :dataMake="dataMake" :dataList="dataList" ></gl-ui-output-list>
            </v-flex>
            <v-flex md4 sm4 xs12>
                <v-layout row wrap>
                    <v-flex xs12>
                        <v-expansion-panel>
                            <v-expansion-panel-content class="f-18 threshold">
                                <div slot="header" class="primary--text">本頁閾值</div>
                                <v-card pa-1>
                                    <v-card-text>
                                        <strong class='primary--text'>設以下角色的閾值:</strong><br>
                                        <dl>
                                            <dt>G11:</dt>
                                            <dd>人力,彈藥,口糧及零件1000以上
                                            </dd>
                                            <dt>其他：</dt>
                                            <dd>普通角色閾值 *10
                                            </dd>
                                            <dt>資料來源: <a href="http://gfdb.baka.pw/statistician.html">IOP公司出货统计 3.5 BETA</a>
                                            </dt>
                                            <dd></dd>
                                        </dl>
                                    </v-card-text>
                                </v-card>
                            </v-expansion-panel-content>
                        </v-expansion-panel>
                    </v-flex>
                    <v-flex xs12>
                        <v-card pa-1>
                            <v-card-title primary-title class="f-18 pa-3">
                                <div>
                                    <h3 class="headline mb-0 primary--text">{{$t('make.probability')}}</h3>
                                    <div >
                                        重造1檔（{{$t('make.low-tier')}}）<br>
                                        5{{$t('make.star')}}:15%  4{{$t('make.star')}}:45% 3{{$t('make.star')}}:40%<br>
                                        重造2檔（{{$t('make.mid-tier')}}）<br>
                                        5{{$t('make.star')}}:20%  4{{$t('make.star')}}:60% 3{{$t('make.star')}}:20%<br>
                                        重造3檔（{{$t('make.high-tier')}}）<br>
                                        5{{$t('make.star')}}:25%  4{{$t('make.star')}}:75% 3{{$t('make.star')}}:0%
                                    </div>
                                </div>
                            </v-card-title>
                        </v-card>
                    </v-flex>
                    <v-flex xs12>
                        <v-card pa-1>
                            <v-card-title primary-title class="f-18 pa-3">
                                <div>
                                    <h3 class="headline mb-0 primary--text">{{$t('make.statistics')}}</h3>
                                    <div >
                                        {{$t('make.no-of-production')}}: {{total}} <br>
                                        5{{$t('make.star')}}: {{star[3]}} <br>
                                        4{{$t('make.star')}}: {{star[2]}} <br>
                                        3{{$t('make.star')}}: {{star[1]}}
                                    </div>
                                </div>
                            </v-card-title>
                        </v-card>
                    </v-flex>
                    <v-flex xs12>
                        <v-card pa-1>
                            <v-card-title primary-title class="f-18 pa-3">
                                <div>
                                    <h3 class="headline mb-0 primary--text">{{$t('make.no-of-core')}}</h3>
                                    <div >{{core}}</div>
                                </div>
                            </v-card-title>
                        </v-card>
                    </v-flex>
                    <v-flex xs12>
                        <v-card pa-1>
                            <v-card-title primary-title class="f-18 pa-3">
                                <div>
                                    <h3 class="headline mb-0 primary--text">{{$t('make.last-update')}}</h3>
                                    <div >{{time}}</div>
                                </div>
                            </v-card-title>
                        </v-card>
                    </v-flex>
                </v-layout>
            </v-flex>
            <gl-ui-output-list v-if="show" type="hGirl" :dataMake="dataMake" :dataList="dataList" ></gl-ui-output-list>
            <div class="rightTop">
                <img src="/common/img/t-doll-w.png" alt="開始製作" @click="start()">
            </div>
        </v-layout>
    </v-container>
</template>

<script>
    import mPrompt from "../../mixin/mPrompt.js";
    import GlUiCardLeft from "../../components-ui/cardLeft";
    import GlUiAlertText from "../../components-ui/make/alertText";
    import GlUiTitle from "../../components-ui/title";
    import GlUiHNumberControl from "../../components-ui/make/h-numberControl";
    import GlUiOutputList from "../../components-ui/make/outputList";
    import mMeta from "../../mixin/mMeta.js";
    export default {
        mixins: [mPrompt,mMeta],
        components: {
            GlUiOutputList,
            GlUiHNumberControl,
            GlUiTitle,
            GlUiAlertText,
            GlUiCardLeft

        },
        name: 'gl-ui-h-make-content',
        data() {
            return {
                total: 0,
                star: [0, 0, 0 , 0],
                number: [1000, 1000, 1000, 1000],
                selectData: [{"tickets": 1, "nucleus": 3}, {"tickets": 20, "nucleus": 5}, {"tickets": 50, "nucleus": 10}],
                select: 0,
                valueIsClick: false,
                girlMakeTime: [],
                girlNMakeTime: null,
                show: false,
                girlList: null,
                time:"",
                girlHMakeTime:null,
                core:200,
                dataMake:[],
                dataList:[]
            }
        }, methods: {
            getStarList:function(star){
                let sum = ( this.number[0] + this.number[1] + this.number[2] + this.number[3] );
                let dataList = [];
                for(var i = 0 ; i < this.girlMakeTime.length ; i ++) {
                    let data = this.girlMakeTime[i];
                    if(data.star != star){
                        continue;
                    }

                    if (this.number[0] >= parseInt(data.manpower) && this.number[2] >= parseInt(data.rations) && this.number[1] >= parseInt(data.ammunition) && this.number[3] >= parseInt(data.components) && parseInt(data.moreSum) <= sum && parseInt(data.lessSum) >= sum) {
                        for (var ii = 0; ii < data.data.length; ii++) {
                            if(data.data[ii] === "157" || data.data[ii] === "160" || data.data[ii] === "188"){
                                let r = Math.floor((Math.random() * 100) + 1);
                                //console.log(r);
                                if(r > 80){
                                    dataList.push(data.data[ii] );
                                }
                                continue;
                            }
                            dataList.push(data.data[ii] );
                        }
                    }
                }

                return dataList;

            },
            addNumber: function (index, num) {
                this.$set(this.number, index, this.number[index] += num);
                if (this.number[index] < 1000) {
                    this.$set(this.number, index, 1000);
                }

                if (this.number[index] > 9999) {
                    this.$set(this.number, index, 9999);
                }
            },
            init() {
                this.$set(this,'dataMake',[]);
                this.$set(this,'dataList',[]);
            },
            getList: function () {
                this.$set(this,'dataMake',[]);
                this.$ga.event('make','h_girl_make_list');
                let html, manpower = 0, rations = 0, ammunition = 0, components = 0, moreSum = 0, lessSum = 0, sum = 0;

                let dataList = [{"title":"5星列表","data":[]}, {"title":"4星列表","data":[]}, {"title":"3星列表","data":[]}, {"title":"2星列表","data":[]}];

                let name = this.girlList[122 - 1].name;
                dataList[0].data.push({"n":name,"s":'122'});

                name = this.girlList[65 - 1].name;
                dataList[0].data.push({"n":name,"s":'65'});

                for (var i = 0, data; i < this.girlMakeTime.length; i++) {
                    data = this.girlMakeTime[i];

                    manpower = data.manpower;
                    rations = data.rations;
                    ammunition = data.ammunition;
                    components = data.components;
                    moreSum = data.moreSum;
                    lessSum = data.lessSum;

                    sum = ( this.number[0] + this.number[1] + this.number[2] + this.number[3] );

                    if (this.number[0] >= manpower && this.number[2] >= rations && this.number[1] >= ammunition && this.number[3] >= components && moreSum <= sum && lessSum >= sum) {
                        html = [];
                        for (var ii = 0; ii < data.data.length; ii++) {
                            if(data.data[ii] == "122" || data.data[ii] == "65"){
                                continue;
                            }
                            let name = this.girlList[data.data[ii] - 1].name;
                            html.push({"n":name,"s":data.data[ii]});
                        }

                        switch (data.star) {
                            case "5":
                                dataList[0].data = dataList[0].data.concat(html);
                                break;

                            case "4":
                                dataList[1].data = dataList[1].data.concat(html);
                                break;

                            case "3":
                                dataList[2].data = dataList[2].data.concat(html);
                                break;
                        }
                    }
                }

                if(this.select === 2){
                    dataList[2].data = "";

                }

                this.$set(this,'dataList',dataList);
            },
            next: function (event) {
                this.select += event;
                if (this.select < 0) {
                    this.select = this.selectData.length - 1;
                }

                if (this.select >= this.selectData.length) {
                    this.select = 0;
                }
            },
            start(){
                this.$set(this,'dataList',[]);
                this.$ga.event('make', 'h_girl_make');

                let  r = Math.floor((Math.random() * 100) + 1);
                let list = "";
                let data = -1;
                let rList = [0,0,100];

                switch (this.select) {
                    case 0:
                        rList[0] = 40;
                        rList[1] = 85;

                        this.core -= 3;
                        break;
                    case 1:
                        rList[0] = 20;
                        rList[1] = 80;
                        this.core -= 5;
                        break;
                    case 2:
                        rList[0] = 0;
                        rList[1] = 75;
                        this.core -= 10;
                        break;
                }

                switch (true) {
                    case (r <= rList[0] ):
                        list = this.getStarList("3");
                        data  = list[Math.floor((Math.random() * list.length))];
                        this.$set(this.star, 1 ,this.star[1] +=1);
                        break;
                    case (r <= rList[1] ):
                        list = this.getStarList("4");
                        data  = list[Math.floor((Math.random() * list.length))];
                        this.$set(this.star, 2 ,this.star[2] +=1);
                        break;
                    case (r <= rList[2] ):
                        list = this.getStarList("5");
                        data  = list[Math.floor((Math.random() * list.length))];
                        this.$set(this.star,3,this.star[3] +=1);
                        break;
                }

                this.total += 1 ;

                let name = (this.girlList[data - 1 ].src != null) ? this.girlList[data - 1 ].src: this.girlList[data - 1 ].name;
                this.dataMake.push({"name":name,"no":data});
            }

        },
        mounted: function () {
            let _this = this;
            var contList = 0;

            var query = function(){
                var data = "";
                if(contList === 3 ){
                    for(var i = 0 ; i < _this.girlNMakeTime.length ; i++){
                        if(_this.girlNMakeTime[i].star === "2"){
                            continue;
                        }
                        data = _this.girlNMakeTime[i];
                        var moreSum = (parseInt(data.moreSum) === 3996)? 39996 : parseInt(data.moreSum)*10;
                        var manpower = (parseInt(data.manpower) < 100)? 1000 : parseInt(data.manpower) *10;
                        var ammunition = (parseInt(data.ammunition) < 100)? 1000 : parseInt(data.ammunition) *10;
                        var rations = (parseInt(data.rations) < 100)? 1000 : parseInt(data.rations) *10;
                        var components = (parseInt(data.components) < 100)? 1000 : parseInt(data.components) *10;

                        _this.girlMakeTime.push({"star":data.star,"manpower":manpower,"ammunition":ammunition,"rations":rations,"components":components,"lessSum":(parseInt(data.lessSum) * 10),"moreSum":moreSum,"data":data.data});
                    }

                    for(var ii = 0; ii < _this.girlHMakeTime.length ; ii++){
                        data = _this.girlHMakeTime[ii];
                        _this.girlMakeTime.push({"star":data.star,"manpower":parseInt(data.manpower),"ammunition":(parseInt(data.ammunition)),"rations":(parseInt(data.rations)),"components":(parseInt(data.components)),"lessSum":36696,"moreSum":0,"data":data.data});
                    }
                 }


            };

            this.$g.getAllGirlList('girlList',this,function(){
                contList++;
                query();
            });
            this.$g.getAllHGirlMakeTime('girlHMakeTime',this,function(){
                contList++;
                query();
            });

            this.$g.getGirlMakeTime('girlNMakeTime',this,function(){
                contList++;
                query();
            });

        },
        created: function () {
            this.show = !this.$s.less600();
            this.time = this.$s.h_make;
        }

    }
</script>

<style>

    .div-h-make-select {
        background-color: #34372c;
        color: #ffffff;
        font-size: 6vh;
        text-align: center;

        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }


</style>
