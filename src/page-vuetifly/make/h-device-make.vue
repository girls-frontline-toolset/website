<template>
    <v-container grid-list-md pt-0 pa-0 mt-1>
        <v-layout row wrap>
            <v-flex md8 sm8 xs12>
                <gl-ui-card-left :content="prompt" icon="notifications"/>
                <gl-ui-alert-text :text="$t('make.msg1')" :strong="$t('make.msg2')"/>
                <gl-ui-title :text="$t('title.h1.make.hDevice')" h1 icon="icon-make"/>

                <v-container grid-list-md pt-1>
                    <v-layout row wrap class="no-select div-make">
                        <gl-ui-h-number-control  color="#c5143a" icon="/common/img/manpower.png" :number="number[0]"
                                                 :addFunction="addNumber" index="0" :title="$t('make.manpower')"/>
                        <gl-ui-h-number-control  color="#c5143a" icon="/common/img/ammunition.png" :number="number[1]"
                                                 :addFunction="addNumber" index="1" :title="$t('make.ammunition')"/>
                        <gl-ui-h-number-control  color="#c5143a" icon="/common/img/material.png" :number="number[2]"
                                                 :addFunction="addNumber" index="2" :title="$t('make.material')"/>
                        <gl-ui-h-number-control  color="#c5143a" icon="/common/img/parts.png" :number="number[3]"
                                                 :addFunction="addNumber" index="3" :title="$t('make.parts')"/>

                        <v-flex xs12 class="div-h-make-select" text--xs--center>
                            <v-icon class="white--text c-p" size="60px" @click="next(-1)">keyboard_arrow_left</v-icon>
                            <gl-ui-img name="gl-equipment-contract"  zoom="0.4"/> x{{selectData[select].tickets}}
                            <gl-ui-img name="gl-nucleus"  zoom="0.5"/> x{{selectData[select].nucleus}}
                            <v-icon class="white--text c-p" size="60px" @click="next(1)">keyboard_arrow_right</v-icon>
                        </v-flex>
                    </v-layout>
                </v-container>
                <v-btn color="primary" @click="start()" >{{$t('make.start')}}</v-btn>
                <v-btn color="primary" @click="getList()" >{{$t('make.list')}}</v-btn>
                <v-btn color="primary" outline @click="init()">{{$t('make.clear')}}</v-btn>
                <gl-ui-output-list v-if="!show" type="hDevice" :dataMake="dataMake" :dataList="dataList" />
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
                                            <dt>裝備：</dt>
                                            <dd>普通裝備閾值 *10 (閾值和遊戲不相同)
                                            </dd>
                                            <dt>妖精資料來源: <a href="https://forum.gamer.com.tw/C.php?bsn=31406&snA=8478">圖【心得】妖精系統介紹與評價 版本2.01</a>
                                            </dt>
                                            <dd/>
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
                                        {{$t('nav.make-time.fairy')}}: 27% 5{{$t('make.star')}}:11% 4{{$t('make.star')}}:22% <br>3{{$t('make.star')}}:40%<br>
                                        重造2檔（{{$t('make.mid-tier')}}）<br>
                                        {{$t('nav.make-time.fairy')}}: 37% 5{{$t('make.star')}}:18% 4{{$t('make.star')}}:45% <br>3{{$t('make.star')}}:0%<br>
                                        重造3檔（{{$t('make.high-tier')}}）<br>
                                        {{$t('nav.make-time.fairy')}}: 47% 5{{$t('make.star')}}:26% 4{{$t('make.star')}}:27% <br>3{{$t('make.star')}}:0%
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
                                        {{$t('nav.make-time.fairy')}}: {{star[4]}} <br>
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
            <gl-ui-output-list v-if="show" type="hDevice" :dataMake="dataMake" :dataList="dataList" />
            <div class="rightTop">
                <img src="/common/img/t-doll-w.png" alt="開始製作" @click="start()">
            </div>
        </v-layout>
    </v-container>
</template>

<script>
    import mPrompt from "../../mixin/mPrompt.js";
    import GlUiCardLeft from "../../components-ui/cardLeft";
    import GlUiTitle from "../../components-ui/title";
    import GlUiAlertText from "../../components-ui/make/alertText";
    import GlUiHNumberControl from "../../components-ui/make/h-numberControl";
    import GlUiOutputList from "../../components-ui/make/outputList";
    import mMeta from "../../mixin/mMeta.js";
    import GlUiImg from "../../components-ui/img";
    export default {
        mixins: [mPrompt,mMeta],
        components: {
          GlUiImg,
            GlUiOutputList,
            GlUiHNumberControl,
            GlUiAlertText,
            GlUiTitle,
            GlUiCardLeft
        },
        name: 'h-ui-device-make-content',
        data() {
            return {
                prompt: "",
                number: [500, 500, 500, 500],
                show: false,
                selectData: [{"tickets": 1, "nucleus": 2}, {"tickets": 20, "nucleus": 4}, {"tickets": 50,"nucleus": 6}],
                select: 0,
                valueIsClick: false,
                total: 0,
                star: [0, 0, 0, 0 ,0],
                core: 200,
                time: "",
                deviceMakeTime: [],
                deviceList: null,
                fairyList: null,
                fairyMakeTime: null,
                deviceMaTime:null,
                dataMake:[],
                dataList:{d:[{"title":"5星列表","data":[]}, {"title":"4星列表","data":[]}, {"title":"3星列表","data":[]}],f:[]}
            }
        }, methods: {
            addNumber(index, num) {
                this.$set(this.number, index, this.number[index] += num);
                if (this.number[index] < 500) {
                    this.$set(this.number, index, 500);
                }

                if (this.number[index] > 5000) {
                    this.$set(this.number, index, 5000);
                }
            },
            next(event) {
                this.select += event;
                if (this.select < 0) {
                    this.select = this.selectData.length - 1;
                }

                if (this.select >= this.selectData.length) {
                    this.select = 0;

                }
            },
            getList() {
                this.$set(this,'dataMake',[]);
                this.$ga.event('make','h_device_make_list');
                let html = "";
                let manpower = 0;
                let rations = 0;
                let ammunition = 0;
                let components = 0;
                let componentsLess = 0;
                let dataList = {d:[{"title":"5星列表","data":[]}, {"title":"4星列表","data":[]}, {"title":"3星列表","data":[]}],f:[]};


                for (let i = 0, data ; i < this.deviceMakeTime.length; i++) {
                    data = this.deviceMakeTime[i];
                    manpower = data.manpower;
                    rations = data.rations;
                    ammunition = data.ammunition;
                    components = data.components;
                    componentsLess = data.componentsLess;

                    if (this.number[0] >= manpower && this.number[2] >= rations && this.number[1] >= ammunition && this.number[3] >= components && this.number[3] <= componentsLess) {
                        html = [];
                        for (var ii = 0; ii < data.data.length; ii++) {
                            html.push(this.getDevice(data.data[ii]));
                        }
                        switch (data.star) {
                            case "5":
                                dataList.d[0].data = dataList.d[0].data.concat(html);
                                break;

                            case "4":
                                dataList.d[1].data = dataList.d[1].data.concat(html);
                                break;

                            case "3":
                                dataList.d[2].data = dataList.d[2].data.concat(html);
                                break;
                        }
                    }
                }

                for (let ii = 0, data; ii < this.fairyMakeTime.length; ii++) {
                    data = this.fairyMakeTime[ii];

                    manpower = parseInt(data.manpower);
                    rations = parseInt(data.rations);
                    ammunition = parseInt(data.ammunition);
                    components = parseInt(data.components);

                    if (this.number[0] >= manpower && this.number[2] >= rations && this.number[1] >= ammunition && this.number[3] >= components ) {
                        for (var iiii = 0; iiii < data.data.length; iiii++) {
                            dataList.f.push({no:data.data[iiii],name:this.fairyList[data.data[iiii] - 1 ].name});
                        }
                    }
                }
                if(this.select !== 0 ){
                    dataList.d[2].data = [];
                }

                this.$set(this,'dataList',dataList);

            },
            start(){
                this.$set(this,'dataList',{d:[{"title":"5星列表","data":[]}, {"title":"4星列表","data":[]}, {"title":"3星列表","data":[]}],f:[]});
                this.$ga.event('make','h_device_make');
                let  r = Math.floor((Math.random() * 100) + 1);
                let list = "";
                let data = -1;
                let rList = [0,0,0,100];

                switch (this.select) {
                    case 0:
                        rList[0] = 40;
                        rList[1] = 62;
                        rList[2] = 73;

                        this.core -= 3;
                        break;
                    case 1:
                        rList[0] = 0;
                        rList[1] = 45;
                        rList[2] = 63;

                        this.core -= 5;
                        break;
                    case 2:
                        rList[0] = 0;
                        rList[1] = 27;
                        rList[2] = 53;
                        this.core -= 10;
                        break;
                }

                let html = null;

                switch (true) {
                    case (r <= rList[0] ):
                        list = this.getStarList("3");
                        data  = list[Math.floor((Math.random() * list.length))];
                        html = this.getDevice(data,'s');
                        this.$set(this.star, 1 ,this.star[1] +=1);
                        break;
                    case (r <= rList[1] ):
                        list = this.getStarList("4");
                        data  = list[Math.floor((Math.random() * list.length))];
                        html = this.getDevice(data,'s');
                        this.$set(this.star, 2 ,this.star[2] +=1);
                        break;
                    case (r <= rList[2] ):
                        list = this.getStarList("5");
                        data  = list[Math.floor((Math.random() * list.length))];
                        html = this.getDevice(data,'s');
                        this.$set(this.star,3,this.star[3] +=1);
                        break;
                    case (r <= rList[3] ):
                        list = this.getFairyList();
                        data  = list[Math.floor((Math.random() * list.length))];
                        html = {t:"f",no:data,name:this.fairyList[data - 1 ].name};
                        this.$set(this.star,4,this.star[4] += 1);
                        break;
                }

                this.total += 1 ;
                this.dataMake.push(html);
            },getStarList(star){
                let dataList = [];
                for(var i = 0 ; i < this.deviceMakeTime.length ; i ++) {
                    let data = this.deviceMakeTime[i];
                    if(data.star != star){
                        continue;
                    }

                    if (this.number[0] >= parseInt(data.manpower) && this.number[2] >= parseInt(data.rations) && this.number[1] >= parseInt(data.ammunition) && this.number[3] >= parseInt(data.components) && this.number[3] <= data.componentsLess) {
                        for (var ii = 0; ii < data.data.length; ii++) {
                            dataList.push(data.data[ii] );
                        }
                    }
                }

                return dataList;

            },getFairyList(){
                let dataList = [];
                for(var i = 0 ; i < this.fairyMakeTime.length ; i ++) {
                    let data = this.fairyMakeTime[i];

                    if (this.number[0] >= parseInt(data.manpower) && this.number[2] >= parseInt(data.rations) && this.number[1] >= parseInt(data.ammunition) && this.number[3] >= parseInt(data.components)) {
                        for (var ii = 0; ii < data.data.length; ii++) {
                            dataList.push(data.data[ii] );
                        }
                    }
                }
                return dataList;
            },init() {
                this.$set(this,'dataMake',[]);
                this.$set(this,'dataList',{d:[{"title":"5星列表","data":[]}, {"title":"4星列表","data":[]}, {"title":"3星列表","data":[]}],f:[]});
            },
            getDevice(number,type) {
                let data = this.deviceList[number - 1], star = "";

                for (let i = 0; i < data.star; i++) {
                    star += "★";
                }
                if(type === 's'){
                    return {"t":"d","img":data.img,"name":data.name,"type":data.type,"att":data.attribute,"star":data.star,"starText":star};
                }else{
                    return {"img":data.img,"name":data.name,"type":data.type,"att":data.attribute,"star":data.star,"starText":star};
                }
            }
        }, mounted: function () {
            var _this = this;
            this.$g.getAllDevice('deviceList', this);
            this.$g.getAllFairy('fairyList', this);
            this.$g.getDeviceMakeTime('deviceMaTime', this,function(){
                    for(var i = 0; i < _this.deviceMaTime.length ;i++){
                       var manpower = (parseInt(_this.deviceMaTime[i].manpower) < 500) ? 500 : parseInt(_this.deviceMaTime[i].manpower) * 10;
                       var rations = (parseInt(_this.deviceMaTime[i].rations) < 500) ? 500 : parseInt(_this.deviceMaTime[i].rations) * 10;
                       var ammunition = (parseInt(_this.deviceMaTime[i].ammunition) < 500) ? 500 : parseInt(_this.deviceMaTime[i].ammunition) * 10;
                       var components = (parseInt(_this.deviceMaTime[i].components) < 500) ? 500 : parseInt(_this.deviceMaTime[i].components) * 10;
                       var componentsLess = (parseInt(_this.deviceMaTime[i].componentsLess) ==  1200 ) ? 20000 : parseInt(_this.deviceMaTime[i].componentsLess) * 10;
                        _this.deviceMakeTime.push({"manpower":manpower,"rations":rations,"ammunition":ammunition,"components":components,"componentsLess":componentsLess,"data":_this.deviceMaTime[i].data,"star":_this.deviceMaTime[i].star});

                }
            });

            this.$g.getFairyMakeTime('fairyMakeTime', this);
        }, created: function () {
            this.show = !this.$s.less600();
            this.time = this.$s.h_make_device;
        }
    }
</script>
