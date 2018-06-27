<template>
    <div>
        <div class="row">
            <div class="col-sm-8">
                <gl-card-left title="提示" :content="prompt"></gl-card-left>
                <div class="alert alert-warning">
                    !! 只是玩樂用途 與遊戲未必相同 <br v-if="!show"><span
                        style="color:#f53334;font-weight: bolder">!!本頁閾和遊戲不相同!!</span>
                </div>
                <gl-title icon-src="/common/img/t-doll.png" message="模擬重造-裝"></gl-title>
                <div class="div-h-make-device">
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
                <div class="div-h-make-select">
                    <span class="glyphicon glyphicon-chevron-left" @click="next(-1)"></span>
                    <img src="/common/img/dTickets.png"> x{{selectData[select].tickets}}
                    <img src="/common/img/nucleus.png"> x{{selectData[select].nucleus}}
                    <span class="glyphicon glyphicon-chevron-right" @click="next(1)"></span>
                </div>
                <div class="div-make-button">
                    <button class="btn gl-btn-primary" @click="start()">開始製作</button>
                    <button class="btn gl-btn-primary" @click="clean()">清理結果</button>
                    <button class="btn gl-btn-primary" @click="getList()">查看列表</button>
                </div>


                <div v-if="!show" class="make_output"></div>
            </div>
            <div class="col-sm-4">
                <gl-title message="本頁閾值" button-text="點擊查看" :button-icon="buttonIcon"
                          :clickFunction="showValue"></gl-title>
                <div class="value" v-if="valueIsClick">
                    <span class='highlight'>!!本頁閾值不代表遊戲!!</span><br>
                    <span class='highlight'>設以下角色的閾值:</span> <br>
                    <dl>

                        <dt>裝備：</dt>
                        <dd>普通裝備閾值 *10 (閾值和遊戲不相同)
                        </dd>
                        <dt>妖精資料來源: <a
                                href="https://forum.gamer.com.tw/C.php?bsn=31406&snA=8478">圖【心得】妖精系統介紹與評價 版本2.01</a>
                        </dt>
                        <dd></dd>
                    </dl>
                </div>
                <gl-card-left title="機率" :content="getChance()"></gl-card-left>
                <gl-card-left title="統計" :content="cardData()"></gl-card-left>
                <gl-card-left title="核心數" :content="getCore()"></gl-card-left>
                <gl-card-left title="最後更新" :content="time"></gl-card-left>

            </div>

        </div>
        <div v-if="show" class="make_output"></div>
        <div class="rightTop"><img src="/common/img/t-doll-w.png" alt="開始製作" @click="start()"></div>
    </div>
</template>

<script>
    import GlCardLeft from "../../components/cardLeft";
    import GlTitle from "../../components/title";
    import GlNumberControl from "../../components/h-numberControl";
    export default {
        components: {
            GlNumberControl,
            GlTitle,
            GlCardLeft
        },
        props: ['promptData'],
        name: 'h-device-make-content',
        data() {
            return {
                prompt: "",
                number: [500, 500, 500, 500],
                show: false,
                buttonIcon: "glyphicon-menu-down",
                selectData: [{"tickets": 1, "nucleus": 2}, {"tickets": 20, "nucleus": 4}, {
                    "tickets": 50,
                    "nucleus": 6
                }],
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
            }
        }, methods: {
            addNumber: function (index, num) {
                this.$set(this.number, index, this.number[index] += num);
                if (this.number[index] < 500) {
                    this.$set(this.number, index, 500);
                }

                if (this.number[index] > 5000) {
                    this.$set(this.number, index, 5000);

                }

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
            showValue: function () {
                if (this.valueIsClick) {
                    this.buttonIcon = "glyphicon-menu-down";
                } else {
                    this.buttonIcon = "glyphicon-menu-up";
                }
                this.valueIsClick = !this.valueIsClick;
            },
            getChance: function () {
                return `重造1檔（低檔）<br>
妖精: 27% 5星:11% 4星:22% <br>3星:40%<br>
重造2檔（中檔）<br>
妖精: 37% 5星:18% 4星:45% <br>3星:0%<br>
重造3檔（高檔）<br>
妖精: 47% 5星:26% 4星:27% <br>3星:0%`

            },
            cardData: function () {
                return `製作數: ${this.total} <br>妖精: ${this.star[4]}<br> 5星: ${this.star[3]} <br> 4星: ${this.star[2]} <br> 3星: ${this.star[1]}`
            }, getCore: function () {
                return this.core;
            }, getList: function () {
                this.$ga.event('make','h_device_make_list');
                let html = "";
                let manpower = 0;
                let rations = 0;
                let ammunition = 0;
                let components = 0;
                let componentsLess = 0;
                let dataList = ["", "", "", ""];

                for (var i = 0; i < this.deviceMakeTime.length; i++) {
                    let data = this.deviceMakeTime[i];
                    manpower = data.manpower;
                    rations = data.rations;
                    ammunition = data.ammunition;
                    components = data.components;
                    componentsLess = data.componentsLess;

                    if (this.number[0] >= manpower && this.number[2] >= rations && this.number[1] >= ammunition && this.number[3] >= components && this.number[3] <= componentsLess) {
                        html = "";
                        for (var ii = 0; ii < data.data.length; ii++) {
                            html += this.getDevice(data.data[ii]);
                        }
                        switch (data.star) {
                            case "5":
                                dataList[1] += html;
                                break;

                            case "4":
                                dataList[2] += html;
                                break;

                            case "3":
                                dataList[3] += html;
                                break;
                        }
                    }
                }

                for (var ii = 0; ii < this.fairyMakeTime.length; ii++) {
                    let data = this.fairyMakeTime[ii];

                    manpower = parseInt(data.manpower);
                    rations = parseInt(data.rations);
                    ammunition = parseInt(data.ammunition);
                    components = parseInt(data.components);
                    if (this.number[0] >= manpower && this.number[2] >= rations && this.number[1] >= ammunition && this.number[3] >= components ) {
                        for (var iiii = 0; iiii < data.data.length; iiii++) {
                            dataList[0] += "<img  src='/common/fairy/fairy_" + data.data[iiii] + ".jpg' alt='"+ this.fairyList[data.data[iiii] - 1 ].name +"' title='"+  this.fairyList[data.data[iiii] - 1 ].name +"'>";
                        }
                    }
                }

                html = "<span class='gl-label'>妖精</span>" + dataList[0] ;

                if(this.select !== 0 ){
                    dataList[3] = "";
                }

                for (var iii = 1; iii < dataList.length; iii++) {
                    if (dataList[iii] === "") {
                        continue;

                    }
                    html += "<span class='gl-label h-gl-device-label'>" + (5 - iii +1 ) + "星列表</span>";
                    html += dataList[iii];
                }

                $(".make_output").html(html);

            }, start:function(){
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

                let html = "";

                switch (true) {
                    case (r <= rList[0] ):
                        list = this.getStarList("3");
                        data  = list[Math.floor((Math.random() * list.length))];
                        html = this.getDevice(data);
                        this.$set(this.star, 1 ,this.star[1] +=1);
                        break;
                    case (r <= rList[1] ):
                        list = this.getStarList("4");
                        data  = list[Math.floor((Math.random() * list.length))];
                        html = this.getDevice(data);
                        this.$set(this.star, 2 ,this.star[2] +=1);
                        break;
                    case (r <= rList[2] ):
                        list = this.getStarList("5");
                        data  = list[Math.floor((Math.random() * list.length))];
                        html = this.getDevice(data);
                        this.$set(this.star,3,this.star[3] +=1);
                        break;
                    case (r <= rList[3] ):
                        list = this.getFairyList();
                        data  = list[Math.floor((Math.random() * list.length))];
                        html = this.getFairy(data);
                        this.$set(this.star,4,this.star[4] += 1);
                        break;
                }

                this.total += 1 ;

                //let name = this.girlList[data - 1 ].name;
                //if(this.girlList[data - 1 ].src != null){
                    //name = this.girlList[data - 1 ].src;
                //}

                //let html = "<a href='https://zh.moegirl.org/zh-hant/少女前线:"+name+"' target='_blank'><img src='/common/girl/girl_" + (data) + ".jpg' alt='"+ name +"' title='"+name+"'></a>";
                $(".make_output").append(html);


            },getStarList:function(star){
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

            },getFairyList:function(){
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
            },clean: function () {
                $(".make_output").html("");

            },getFairy:function(number){
                return {no:number,name:this.fairyList[number - 1 ].name};

                //return "<div class='make_fairy'><img src='/common/fairy/fairy_" + number + ".jpg' alt='"+ this.fairyList[number - 1 ].name +"' title='"+  this.fairyList[number - 1 ].name +"'></div>";
            }, getDevice: function (number) {

                let data = this.deviceList[number - 1];
                let star = "";
                for (var i = 0; i < data.star; i++) {
                    star += "★";
                }
                return '<div class="div_device"><ol><li class="' + data.img + ' str_' + data.star + '_bg">' + star + '</li><li class="str_' + data.star + '">' + data.name + '</li><li>' + data.type + '</li><li>' + data.attribute + '</li></ol></div>'

            }
        }, mounted: function () {
            var _this = this;
            this.$g.output = $(".make_output");
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

            let randomNumber = Math.floor((Math.random() * this.promptData.length) + 1);
            this.prompt = this.promptData[randomNumber - 1];


        }, created: function () {
            this.show = !this.$setting.less768;
            this.time = this.$setting.h_make_device;
        }
    }
</script>

<style>
    .div-h-make-device .div-make-girls-number table .thead {
        background-color: #c5143a;
    }

    .div-h-make-device {
        background-color: #34372c;
        width: 100%;
    }

    .div-h-make-device .div-make-girls-number table .tfoot {
        background-color: #c5143a;
    }

    .make_output {
        overflow: auto;
    }

    .make_output .div_device {
        height: 224px;
    }

    .make_output .gl-label {
        width: 100%;
    }

    .make_output .make_fairy img {
      width: 100%;
    }

    .make_output .make_fairy{
      margin-top: 2px;
      height: 222px;
      width: 113px;
      float: left;
      margin-right: 5px;
    }
    .h-gl-device-label{
        float:left;
    }
</style>
