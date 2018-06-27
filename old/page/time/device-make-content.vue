<template>
    <div>
        <div class="row">
            <div class="col-sm-8">
                <gl-card-left title="提示" :content="prompt"></gl-card-left>
                <div class="alert alert-warning">
                    !! 只是玩樂用途 與遊戲未必相同
                </div>
                <gl-title icon-src="/common/img/t-doll.png" message="模擬造裝"></gl-title>
                <div class="div-make device_mark">
                    <div class="row no-select">
                        <gl-number-control icon="/common/img/manpower.png" :number="number[0]" :addFunction="addNumber"
                                           index="0" title="人力"></gl-number-control>
                        <gl-number-control icon="/common/img/ammunition.png" :number="number[1]"
                                           :addFunction="addNumber" index="1" title="彈藥"></gl-number-control>
                    </div>
                    <div class="row no-select">
                        <gl-number-control icon="/common/img/material.png" :number="number[2]" :addFunction="addNumber"
                                           index="2" title="口糧"></gl-number-control>
                        <gl-number-control icon="/common/img/parts.png" :number="number[3]" :addFunction="addNumber"
                                           index="3" title="零件"></gl-number-control>
                    </div>
                </div>
                <div class="div-make-button">
                    <button class="btn gl-btn-primary" @click="start()">開始製作</button>
                    <button class="btn gl-btn-primary" @click="clean()">清理結果</button>
                    <button class="btn gl-btn-primary" @click="getList()">查看列表</button>
                </div>


                <div v-if="!show" class="device_mark_output"></div>
            </div>
            <div class="col-sm-4">
                <gl-title message="本頁閾值" button-text="點擊查看" :button-icon="buttonIcon"
                          :clickFunction="showValue"></gl-title>
                <div class="value" v-if="valueIsClick">
                    <span class='highlight'>設以下裝備的閾值:</span> <br>
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
                        <dd></dd>


                    </dl>
                </div>
                <gl-card-left title="機率" :content="getChance()"></gl-card-left>
                <gl-card-left title="統計" :content="cardData()"></gl-card-left>
                <gl-card-left title="最後更新" :content="time"></gl-card-left>
            </div>

        </div>
        <div v-if="show" class="device_mark_output"></div>
        <div class="rightTop"><img src="/common/img/t-doll-w.png" alt="開始製作" @click="start()"></div>
    </div>
</template>

<script>
    import GlNumberControl from "../../components/numberControl";
    import GlCardLeft from "../../components/cardLeft";
    import GlTitle from "../../components/title";
    export default {
        components: {
            GlTitle,
            GlCardLeft,
            GlNumberControl
        },
        props: ['promptData'],
        name: 'device-make-content',
        data() {
            return {
                number: [10, 10, 10, 10],
                star: [0, 0, 0, 0],
                prompt: "",
                show: false,
                buttonIcon: "glyphicon-menu-down",
                valueIsClick: false,
                total: 0,
                deviceList: null,
                deviceMakeTime: null,
                time:""
            }
        }, methods: {
            addNumber: function (index, num) {

                this.$set(this.number, index, this.number[index] + num);
                if (this.number[index] < 10) {
                    //this.number[index] = 10
                    this.$set(this.number, index, 10);
                }

                if (this.number[index] > 300) {
                    this.$set(this.number, index, 300);

                }

                //this.$forceUpdate();
            },
            start: function () {

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

                //let name = this.girlList[data - 1 ].name;
                let html = this.getDevice(data);
                $(".device_mark_output").append(html);


            }, getList: function () {
                let html = "", dataList = ["", "", "", ""], data = "", manpower = 0, rations = 0, ammunition = 0,
                    components = 0, componentsLess = 0;

                this.$ga.event('make','device_make_list');

                for (let i = 0; i < this.deviceMakeTime.length; i++) {
                    data = this.deviceMakeTime[i];
                    manpower = parseInt(data.manpower);
                    rations = parseInt(data.rations);
                    ammunition = parseInt(data.ammunition);
                    components = parseInt(data.components);
                    componentsLess = parseInt(data.componentsLess);
                    html = "";

                    if (this.number[0] >= manpower && this.number[2] >= rations && this.number[1] >= ammunition && this.number[3] >= components && this.number[3] <= componentsLess) {
                        for (var ii = 0; ii < data.data.length; ii++) {
                            html += this.getDevice(data.data[ii]);
                        }


                    }

                    switch (data.star) {
                        case "5":
                            dataList[0] += html;
                            break;
                        case "4":
                            dataList[1] += html;
                            break;
                        case "3":
                            dataList[2] += html;
                            break;
                        case "2":
                            dataList[3] += html;
                            break;


                    }
                }

                html = "";
                for (var iii = 0; iii < dataList.length; iii++) {
                    html += "<span class='gl-label'>" + (5 - iii) + "星列表</span>";
                    html += dataList[iii];
                }

                $(".device_mark_output").html(html);


            }, getChance: function () {
                return "5星裝備機率：6.5%<br>" +
                    "4星裝備機率：15%<br>" +
                    "3星裝備機率：30%<br>" +
                    "2星裝備機率：48.5%";
            }, cardData: function () {
                return `製作數: ${this.total} <br> 5星: ${this.star[3]} <br> 4星: ${this.star[2]} <br> 3星: ${this.star[1]} <br> 2星: ${this.star[0]}`

            },
            showValue: function () {
                if (this.valueIsClick) {
                    this.buttonIcon = "glyphicon-menu-down";
                } else {
                    this.buttonIcon = "glyphicon-menu-up";
                }
                this.valueIsClick = !this.valueIsClick;
            },
            clean: function () {
                $(".device_mark_output").html("");

            }, getDevice: function (number) {
                let data = this.deviceList[number - 1];
                let star = "";
                for (var i = 0; i < data.star; i++) {
                    star += "★";
                }
                return '<div class="div_device"><ol><li class="' + data.img + ' str_' + data.star + '_bg">' + star + '</li><li class="str_' + data.star + '">' + data.name + '</li><li>' + data.type + '</li><li>' + data.attribute + '</li></ol></div>'

            }, getStarList: function (star) {
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

        }, created: function () {
            this.$g.output = $(".device_mark_output");
            let randomNumber = Math.floor((Math.random() * this.promptData.length) + 1);
            this.prompt = this.promptData[randomNumber - 1];

            this.show = !this.$setting.less768;
            this.time = this.$setting.make_device;
            this.$g.getDeviceMakeTime('deviceMakeTime',this);
            this.$g.getAllDevice('deviceList',this);

        }
    }
</script>

<style>
    .device_mark .div-make-girls-number table .thead, .device_mark .div-make-girls-number table .tfoot {
        background-color: #389acc;

    }

    .device_mark_output .gl-label {
        float: left;
        width: 100%;
    }

    .device_mark_output .div_device {
        height: 218px;
        margin-bottom: 5px;
    }

    .device_mark_output {
        overflow: hidden;
    }
</style>
