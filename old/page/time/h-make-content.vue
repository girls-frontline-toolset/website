<template>
    <div>
        <div class="row">
            <div class="col-sm-8">
                <gl-card-left title="提示" :content="prompt"></gl-card-left>
                <div class="alert alert-warning">
                    !! 只是玩樂用途 與遊戲未必相同 <br v-if="!show"><span style="color:#f53334;font-weight: bolder">!!本頁閾和遊戲不相同!!</span>
                </div>
                <gl-title icon-src="/common/img/t-doll.png" message="模擬重造-槍"></gl-title>
                <div class="div-h-make">
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
                    <img src="/common/img/tickets.png"> x{{selectData[select].tickets}}
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
    import GlTitle from "../../components/title";
    import GlCardButton from "../../components/cardButton";
    import GlCardLeft from "../../components/cardLeft";
    import GlNumberControl from "../../components/h-numberControl";
    export default {
        components: {
            GlNumberControl,
            GlCardLeft,
            GlCardButton,
            GlTitle
        },
        props: ['promptData'],
        name: 'gl-h-make-content',
        data() {
            return {
                total: 0,
                star: [0, 0, 0 , 0],
                number: [1000, 1000, 1000, 1000],
                selectData: [{"tickets": 1, "nucleus": 3}, {"tickets": 20, "nucleus": 5}, {
                    "tickets": 50,
                    "nucleus": 10
                }],
                prompt: "",
                select: 0,
                valueIsClick: false,
                buttonIcon: "glyphicon-menu-down",
                girlMakeTime: [],
                girlNMakeTime: null,
                show: false,
                girlList: null,
                time:"",
                girlHMakeTime:null,
                core:200,
            }
        }, methods: {
            getCore: function(){
                return this.core;
            },
            cardData: function () {
                return `製作數: ${this.total} <br> 5星: ${this.star[3]} <br> 4星: ${this.star[2]} <br> 3星: ${this.star[1]}`


            },
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
            showValue: function () {
                if (this.valueIsClick) {
                    this.buttonIcon = "glyphicon-menu-down";
                } else {
                    this.buttonIcon = "glyphicon-menu-up";
                }
                this.valueIsClick = !this.valueIsClick;
            },
            clean: function () {
                $(".make_output").html("");

            },
            getList: function () {
                this.$ga.event('make','h_girl_make_list');
                let html = "";
                let manpower = 0;
                let rations = 0;
                let ammunition = 0;
                let components = 0;
                let moreSum = 0;
                let lessSum = 0;
                let sum = 0;
                let dataList = ["", "", ""];

                let name = this.girlList[122 - 1].name;
                dataList[0] += "<a href='https://zh.moegirl.org/zh-hant/少女前线:" + name + "' target='_blank'><img src='/common/girl/girl_122.jpg' alt='" + name + "' title='" + name + "'></a>";

                name = this.girlList[65 - 1].name;
                dataList[0] += "<a href='https://zh.moegirl.org/zh-hant/少女前线:" + name + "' target='_blank'><img src='/common/girl/girl_65.jpg' alt='" + name + "' title='" + name + "'></a>";

                for (var i = 0; i < this.girlMakeTime.length; i++) {
                    let data = this.girlMakeTime[i];

                    manpower = data.manpower;
                    rations = data.rations;
                    ammunition = data.ammunition;
                    components = data.components;
                    moreSum = data.moreSum;
                    lessSum = data.lessSum;

                    sum = ( this.number[0] + this.number[1] + this.number[2] + this.number[3] );

                    if (this.number[0] >= manpower && this.number[2] >= rations && this.number[1] >= ammunition && this.number[3] >= components && moreSum <= sum && lessSum >= sum) {
                        html = "";
                        for (var ii = 0; ii < data.data.length; ii++) {
                            if(data.data[ii] == "122" || data.data[ii] == "65"){
                                continue;
                            }
                            let name = this.girlList[data.data[ii] - 1].name;
                            html += "<a href='https://zh.moegirl.org/zh-hant/少女前线:" + name + "' target='_blank'><img src='/common/girl/girl_" + data.data[ii] + ".jpg' alt='" + name + "' title='" + name + "'></a>";
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

                        }


                    }

                }

                if(this.select === 2){
                    dataList[2] = "";

                }

                html = "";
                for (var iii = 0; iii < dataList.length; iii++) {
                    if(dataList[iii] === ""){
                        continue;

                    }
                    html += "<span class='gl-label'>" + (5 - iii) + "星列表</span>";
                    html += dataList[iii];
                }

                $(".make_output").html(html);

            },
            getChance: function () {
                return `重造1檔（低檔）<br>
5星:15%  4星:45% 3星:40%<br>
                重造2檔（中檔）<br>
                5星:20%  4星:60% 3星:20%<br>
重造3檔（高檔）<br>
5星:25%  4星:75% 3星:0%<br>`

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
            start:function(){
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

                let name = this.girlList[data - 1 ].name;
                if(this.girlList[data - 1 ].src != null){
                    name = this.girlList[data - 1 ].src;
                }

                let html = "<a href='https://zh.moegirl.org/zh-hant/少女前线:"+name+"' target='_blank'><img src='/common/girl/girl_" + (data) + ".jpg' alt='"+ name +"' title='"+name+"'></a>";
                $(".make_output").append(html);
            }

        },
        mounted: function () {
            this.$g.output = $(".make_output");
            let randomNumber = Math.floor((Math.random() * this.promptData.length) + 1);
            this.prompt = this.promptData[randomNumber - 1];
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
                        //console.log(_this.girlNMakeTime[i]);
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
            this.show = !this.$setting.less768;
            this.time = this.$setting.h_make;
        }

    }
</script>

<style>
    .div-h-make .div-make-girls-number table .thead td {
        width: 25%;
    }

    .div-h-make {
        background-color: #34372c;
        width: 100%;
    }

    .div-h-make .div-make-girls-number table .thead {
        background-color: #d7570c;
    }

    .div-h-make .div-make-girls-number table .tfoot {
        background-color: #d7570c;
    }

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

    .div-h-make-select .glyphicon {
        font-size: 4vh;
        cursor: pointer;
    }

    .div-h-make-select img {
        width: 18%;
        max-width: 70px;;
    }

</style>

<style scoped>

</style>