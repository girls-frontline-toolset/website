<template>
    <v-container grid-list-md pt-0 pa-0 mt-1>
        <v-layout row wrap>
            <v-flex md8 sm8 xs12>
                <gl-ui-card-left :content="prompt" icon="notifications"/>
                <gl-ui-alert-text :text="$t('make.msg1')"/>
                <gl-ui-title :text="$t('title.h1.make.device')" h1 icon="icon-make"/>

                <v-container grid-list-md pt-1>
                    <v-layout row wrap class="no-select div-make">
                        <gl-ui-number-control color="#389acc" icon="/common/img/manpower.png" :number="number[0]"
                                              :addFunction="addNumber" index="0" :title="$t('make.manpower')"/>
                        <gl-ui-number-control color="#389acc" icon="/common/img/ammunition.png" :number="number[1]"
                                              :addFunction="addNumber" index="1" :title="$t('make.ammunition')" />
                        <gl-ui-number-control color="#389acc" icon="/common/img/material.png" :number="number[2]"
                                              :addFunction="addNumber" index="2" :title="$t('make.material')"/>
                        <gl-ui-number-control color="#389acc" icon="/common/img/parts.png" :number="number[3]"
                                              :addFunction="addNumber" index="3" :title="$t('make.parts')"/>
                    </v-layout>
                </v-container>
                <v-btn color="primary" @click="start()" >{{$t('make.start')}}</v-btn>
                <v-btn color="primary" @click="getList()" >{{$t('make.list')}}</v-btn>
                <v-btn color="primary" outline @click="init()">{{$t('make.clear')}}</v-btn>
                <gl-ui-output-list v-if="!show" type="device" :dataMake="dataMake" :dataList="dataList" />
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
                                            <dt>全息瞄具,紅點瞄具,光學瞄具</dt>
                                            　
                                            <dd>零件151以下出現
                                            </dd>
                                            <dt>夜戰裝備</dt>
                                            <dd>五星:100人力 100口糧時開始出現<br>
                                                四星:50人力 50口糧時開始出現<br>
                                                其他星數:無閾值
                                            </dd>
                                            <dt>消音器</dt>
                                            <dd>五星:50人力時開始出現<br>
                                                其他星數:無閾值
                                            </dd>
                                            <dt>高速彈,穿甲彈,狀態彈,獵鹿彈,獨頭彈</dt>
                                            <dd>五星:150彈藥 50零件時開始出現<br>
                                                二,三,四星:100彈藥時開始出現
                                            </dd>
                                            <dt>
                                                彈藥箱
                                            </dt>
                                            <dd>四,五星:150零件時開始出現 無二,三星</dd>
                                            <dt>偽裝披風</dt>
                                            <dd>五星:100人力 100口糧時開始出現<br>其他星數:無閾值</dd>
                                            <dt>外骨骼</dt>
                                            <dd>五星(T4,X4):50人力 50零件時開始出現<br>
                                                四星(T3,X3):50人力時開始出現<br>
                                                其他星數:無閾值
                                            </dd>
                                            <dt>防彈插板</dt>
                                            <dd>五星:50零件時開始出現 無二星<br>
                                                其他星數:無閾值
                                            </dd>
                                            <dt>數據來源:<a href="http://gfdb.baka.pw/statistician.html">IOP製造公司出貨統計2.03 Beta</a></dt>
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
                                        {{$t('make.device-5')}}：6.5%<br>
                                        {{$t('make.device-4')}}：15%<br>
                                        {{$t('make.device-3')}}：30%<br>
                                        {{$t('make.device-2')}}：48.5%
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
                                       3{{$t('make.star')}}: {{star[1]}} <br>
                                       2{{$t('make.star')}}: {{star[0]}}
                                    </div>
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
            <gl-ui-output-list v-if="show" type="device" :dataMake="dataMake" :dataList="dataList" />
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
    import GlUiNumberControl from "../../components-ui/make/numberControl";
    import GlUiOutputList from "../../components-ui/make/outputList";
    import mMeta from "../../mixin/mMeta.js";
    export default {
        mixins: [mPrompt,mMeta],
        components: {
            GlUiOutputList,
            GlUiNumberControl,
            GlUiTitle,
            GlUiAlertText,
            GlUiCardLeft
        },
        name: 'gl-ui-device-make-content',
        data() {
            return {
                number: [10, 10, 10, 10],
                star: [0, 0, 0, 0],
                show: false,
                total: 0,
                deviceList: null,
                deviceMakeTime: null,
                time:"",
                dataMake:[],
                dataList:[]
            }
        }, methods: {
            addNumber(index, num) {

                this.$set(this.number, index, this.number[index] + num);
                if (this.number[index] < 10) {
                    this.$set(this.number, index, 10);
                }

                if (this.number[index] > 300) {
                    this.$set(this.number, index, 300);
                }
            },
            start() {
                this.$set(this,'dataList',[]);
                this.$ga.event('make','device_make');

                let r = Math.floor((Math.random() * 1000) + 1);
                let list = "";
                let data = -1;
                switch (true) {
                    case (r <= 485):
                        list = this.getStarList("2");
                        data = list[Math.floor((Math.random() * list.length))];
                        this.$set(this.star, 0, this.star[0] += 1);
                        break;
                    case (r <= 785):
                        list = this.getStarList("3");
                        data = list[Math.floor((Math.random() * list.length))];
                        this.$set(this.star, 1, this.star[1] += 1);
                        break;
                    case (r <= 935):
                        list = this.getStarList("4");
                        data = list[Math.floor((Math.random() * list.length))];
                        this.$set(this.star, 2, this.star[2] += 1);
                        break;
                    case (r <= 1000):
                        list = this.getStarList("5");
                        data = list[Math.floor((Math.random() * list.length))];
                        this.$set(this.star, 3, this.star[3] += 1);
                        break;
                }
                this.total += 1;
                this.dataMake.push(this.getDevice(data));
            },
            getList() {
                this.$set(this,'dataMake',[]);
                let html = "", data = "", manpower = 0, rations = 0, ammunition = 0,
                    components = 0, componentsLess = 0;

                let dataList = [{"title":"5星列表","data":[]}, {"title":"4星列表","data":[]}, {"title":"3星列表","data":[]}, {"title":"2星列表","data":[]}];

                this.$ga.event('make','device_make_list');

                for (let i = 0; i < this.deviceMakeTime.length; i++) {
                    data = this.deviceMakeTime[i];
                    manpower = parseInt(data.manpower);
                    rations = parseInt(data.rations);
                    ammunition = parseInt(data.ammunition);
                    components = parseInt(data.components);
                    componentsLess = parseInt(data.componentsLess);
                    html = [];

                    if (this.number[0] >= manpower && this.number[2] >= rations && this.number[1] >= ammunition && this.number[3] >= components && this.number[3] <= componentsLess) {
                        for (var ii = 0; ii < data.data.length; ii++) {
                            html.push(this.getDevice(data.data[ii]));
                        }
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
                        case "2":
                            dataList[3].data = dataList[3].data.concat(html);
                            break;
                    }
                }
                this.$set(this,'dataList',dataList);
            },
            init(){
                this.$set(this,'dataMake',[]);
                this.$set(this,'dataList',[]);
            },
            getDevice(number) {
                let data = this.deviceList[number - 1], star = "";

                for (let i = 0; i < data.star; i++) {
                    star += "★";
                }
                return {"img":data.img,"name":data.name,"type":data.type,"att":data.attribute,"star":data.star,"starText":star};

            }, getStarList(star) {
                let dataList = [];

                for (var i = 0; i < this.deviceMakeTime.length; i++) {
                    let data = this.deviceMakeTime[i];
                    if (data.star != star) {
                        continue;
                    }

                    if (this.number[0] >= parseInt(data.manpower) && this.number[2] >= parseInt(data.rations) && this.number[1] >= parseInt(data.ammunition) && this.number[3] >= parseInt(data.components) && this.number[3] <= parseInt(data.componentsLess)) {
                        for (var ii = 0; ii < data.data.length; ii++) {
                            dataList.push(data.data[ii]);
                        }
                    }
                }
                return dataList;
            }

        },
        beforeCreate() {
           let _this = this;
           this.$s.getDefine(function () {
              _this.$nextTick(function () {
                _this.time = _this.$s.make_device;
             });
            });
          },
        created() {
            this.show = this.$s.less600;
            this.$g.getDeviceMakeTime('deviceMakeTime',this);
            this.$g.getAllDevice('deviceList',this);
        }
    }
</script>

<style>
    .device_output .div_device{
        height: 218px;
        margin-bottom: 10px;
    }
</style>
