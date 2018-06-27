<template>
    <v-container grid-list-md pt-0>
        <v-layout row wrap>
            <v-flex md8 sm8 xs12>
                <gl-ui-card-left :content="prompt" icon="notifications"></gl-ui-card-left>
                <gl-ui-alert-text text="只是玩樂用途 與遊戲未必相同"></gl-ui-alert-text>
                <gl-ui-title text="模擬造槍" h1 icon="icon-make"></gl-ui-title>


                <v-container grid-list-md pt-1>
                    <v-layout row wrap class="no-select div-make">
                        <gl-ui-number-control color="#8ec01f" icon="/common/img/manpower.png" :number="number[0]"
                                              :addFunction="addNumber" index="0" title="人力"></gl-ui-number-control>
                        <gl-ui-number-control color="#8ec01f" icon="/common/img/ammunition.png" :number="number[1]"
                                              :addFunction="addNumber" index="1" title="彈藥"></gl-ui-number-control>
                        <gl-ui-number-control color="#8ec01f" icon="/common/img/material.png" :number="number[2]"
                                              :addFunction="addNumber" index="2" title="口糧"></gl-ui-number-control>
                        <gl-ui-number-control color="#8ec01f" icon="/common/img/parts.png" :number="number[3]"
                                              :addFunction="addNumber" index="3" title="零件"></gl-ui-number-control>
                    </v-layout>
                </v-container>
                <v-btn color="primary" @click="start()" >開始製作</v-btn>
                <v-btn color="primary" @click="getList()" >查看列表</v-btn>
                <v-btn color="primary" outline @click="init()">清理結果</v-btn>

                <gl-ui-output-list v-if="!show" type="girl" :dataMake="dataMake" :dataList="dataList" ></gl-ui-output-list>
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
                                            　
                                            <dt>手槍（HG）：</dt>
                                            　
                                            <dd>斯捷奇金,USP Compact,Bren Ten<br>
                                                四項資源總和在920以內出現
                                            </dd>
                                            <dt>衝鋒鎗（SMG）：</dt>
                                            <dd>斯登MK II 無閾值<br>
                                                希普卡 400人力,400彈藥時開始出現
                                            </dd>
                                            <dt>突擊步槍（AR）：</dt>
                                            <dd>63式 四項資源總和超過800就會出現<br>
                                                RFB,利貝羅勒 400彈藥,400口糧時開始出現
                                            </dd>
                                            <dt>步槍（RF）：</dt>
                                            <dd>IWS 2000 400人力,400口糧時開始出現</dd>
                                            <dt>機槍（MG）：</dt>
                                            <dd>AEK-999,173,RPD 600人力,600彈藥,100口糧,400零件時開始出現<br>
                                                RPD 400人力,600彈藥,300零件時開始出現<br>
                                                RPD 400人力,600彈藥,300零件時開始出現<br></dd>
                                            <dt>其他角色資料來源: <a
                                                    href="https://forum.gamer.com.tw/C.php?bsn=31406&snA=266&tnum=2">槍枝製作時間表(20170509更新)</a>
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
                                    <h3 class="headline mb-0 primary--text">機率</h3>
                                    <div >
                                        5星人形機率：3%<br>
                                        4星人形機率：10%<br>
                                        3星人形機率：27%<br>
                                        2星人形機率：60%<br>
                                    </div>
                                </div>
                            </v-card-title>
                        </v-card>
                    </v-flex>
                    <v-flex xs12>
                        <v-card pa-1>
                            <v-card-title primary-title class="f-18 pa-3">
                                <div>
                                    <h3 class="headline mb-0 primary--text">統計</h3>
                                    <div >
                                        製作數: {{total}}  <br>
                                        5星: {{star[3]}}   <br>
                                        4星: {{star[2]}}  <br>
                                        3星: {{star[1]}}  <br>
                                        2星: {{star[0]}}
                                    </div>
                                </div>
                            </v-card-title>
                        </v-card>
                    </v-flex>
                    <v-flex xs12>
                        <v-card pa-1>
                            <v-card-title primary-title class="f-18 pa-3">
                                <div>
                                    <h3 class="headline mb-0 primary--text">最後更新</h3>
                                    <div >{{time}}</div>
                                </div>
                            </v-card-title>
                        </v-card>
                    </v-flex>
                </v-layout>
            </v-flex>
            <gl-ui-output-list v-if="show" type="girl" :dataMake="dataMake" :dataList="dataList" ></gl-ui-output-list>
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
    import GlUiNumberControl from "../../components-ui/make/numberControl";
    import GlUiOutputList from "../../components-ui/make/outputList";

    export default {
        mixins: [mPrompt],
        components: {
            GlUiOutputList,
            GlUiNumberControl,
            GlUiAlertText,
            GlUiTitle,
            GlUiCardLeft
        },
        name: 'gl-make-content',
        data() {
            return {
                number: [30, 30, 30, 30],
                total: 0,
                star: [0, 0, 0, 0],
                girlMakeTime: null,
                show: false,
                girlList: null,
                time: "NaN",
                dataMake:[],
                dataList:[]
            }

        }, methods: {
            addNumber(index, num) {
                this.$set(this.number, index, this.number[index] += num);
                if (this.number[index] < 30) {
                    this.$set(this.number, index, 30);
                }

                if (this.number[index] > 999) {
                    this.$set(this.number, index, 999);
                }
            },
            start() {
                this.$ga.event('make', 'girl_make');
                this.$set(this,'dataList',[]);

                let r = Math.floor((Math.random() * 100) + 1);
                let list = "", data = -1;
                switch (true) {
                    case (r <= 60):
                        list = this.getStarList("2");
                        data = list[Math.floor((Math.random() * list.length))];
                        this.$set(this.star, 0, this.star[0] += 1);
                        break;
                    case (r <= 87):
                        list = this.getStarList("3");
                        data = list[Math.floor((Math.random() * list.length))];
                        this.$set(this.star, 1, this.star[1] += 1);
                        break;
                    case (r <= 97):
                        list = this.getStarList("4");
                        data = list[Math.floor((Math.random() * list.length))];
                        this.$set(this.star, 2, this.star[2] += 1);
                        break;
                    case (r <= 100):
                        list = this.getStarList("5");
                        data = list[Math.floor((Math.random() * list.length))];
                        this.$set(this.star, 3, this.star[3] += 1);
                        break;
                }
                this.total += 1;
                let name = (this.girlList[data - 1].src)?  this.girlList[data - 1].src: this.girlList[data - 1].name;
                this.dataMake.push({name:name,no:data});

            },
            getStarList(star) {
                let sum = (this.number[0] + this.number[1] + this.number[2] + this.number[3]);
                let dataList = [];
                //console.log(this);
                //console.log(this.girlMakeTime);
                for (var i = 0, data; i < this.girlMakeTime.length; i++) {
                    data = this.girlMakeTime[i];
                    if (data.star != star) {
                        continue;
                    }

                    if (this.number[0] >= parseInt(data.manpower) && this.number[2] >= parseInt(data.rations) && this.number[1] >= parseInt(data.ammunition) && this.number[3] >= parseInt(data.components) && parseInt(data.moreSum) <= sum && parseInt(data.lessSum) >= sum) {
                        for (var ii = 0; ii < data.data.length; ii++) {
                            dataList.push(data.data[ii]);
                        }
                    }
                }
                return dataList;
            },
            init(){
                this.$set(this,'dataMake',[]);
                this.$set(this,'dataList',[]);
            },
            getList(){
                this.$ga.event('make', 'girl_make_list');
                this.$set(this,'dataMake',[]);

                let html = "", manpower = 0, rations = 0, ammunition = 0, components = 0, moreSum = 0, lessSum = 0, sum = 0;
                let dataList = [{"title":"5星列表","data":[]}, {"title":"4星列表","data":[]}, {"title":"3星列表","data":[]}, {"title":"2星列表","data":[]}];


                for (let i = 0,data; i < this.girlMakeTime.length; i++) {
                    data = this.girlMakeTime[i];

                    manpower = parseInt(data.manpower);
                    rations = parseInt(data.rations);
                    ammunition = parseInt(data.ammunition);
                    components = parseInt(data.components);
                    moreSum = parseInt(data.moreSum);
                    lessSum = parseInt(data.lessSum);

                    sum = (this.number[0] + this.number[1] + this.number[2] + this.number[3]);

                    if (this.number[0] >= manpower && this.number[2] >= rations && this.number[1] >= ammunition && this.number[3] >= components && moreSum <= sum && lessSum >= sum) {
                        html = [];
                        for (var ii = 0; ii < data.data.length; ii++) {
                            let name = this.girlList[data.data[ii] - 1].name;
                            if (this.girlList[data.data[ii] - 1].src != null) {
                                name = this.girlList[data.data[ii] - 1].src;
                            }

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

                            case "2":
                                dataList[3].data = dataList[3].data.concat(html);
                                break;
                        }
                    }
                }
                this.$set(this,'dataList',dataList);
            }
        },
        created: function () {
            this.time = this.$s.make;
            this.show = !this.$s.less600();
            this.$g.getAllGirlList('girlList', this);
            this.$g.getGirlMakeTime('girlMakeTime', this);
        }

    }
</script>

<style>
    .make_output img{
        max-width: 115px;
    }


    .div-make {
        background-color: #34372c;
        width: 100%;
    }

    .div-make .material {
        width: 40%;
        float: left;
    }

    .div-make .description {
        font-size: 30px;
        color: #ffffff;
        text-align: center;
    }

    .div-make .number {
        width: 60%;
        float: left;
        height: 100%;
    }

    .div-make .number table {
        width: 100%;
        height: 100%;
    }

    .div-make .number table td {
        font-size: 5vh;
        text-align: center;
        color: #fff;
        background-color: #34372c;
        width: 23px;
    }

    .div-make .number table .thead td, .div-make .number table .tfoot td {
        width: 0;
        background: url(/common/img/triangle-up.png);
        background-size: 100% 100%;
        cursor: pointer;
    }

    .div-make .number table .tfoot td {
        background: url(/common/img/triangle-bottom.png);
        background-size: 100% 100%;
    }

    .div-make .number table .thead, .div-make .number table .tfoot {
        height: 25%;
    }

    .threshold dt {
        font-weight: 700;
    }

    .threshold dd {
        margin-left: 10px;
    }

    .rightTop{
        position: fixed;
        right: 0;
        bottom: 60px;
        margin: 0 5px 5px 0;
        width: 50px;
        height: 50px;
        background: hsla(42, 100%, 50%, 0.8);
        color:#fff;
        z-index: 20;
        cursor: pointer;
    }

    .rightTop img{
        margin: 5px;
        width: 40px;
        height: 40px;
    }
</style>

