<template>
    <div  class="row">
        <div class="col-sm-8">
            <gl-card-left title="提示" :content="prompt"></gl-card-left>
            <gl-title icon-src="/common/img/equipment.png" message="妖精製造時間查詢"></gl-title>
            <div class="hotTime">
                <a href="javascript:;" class="badge badge-success gl-badge" @click="badge(index)" v-for="(item,index) in hotTime">{{item.time}}</a>
            </div>
            <label>建造時間:</label>
            <div >
                <form class="input-group" @submit.prevent="search()" >
                <input type="number" style="width:100%" class="form-control" id="HH" maxlength="1" placeholder="小時"
                       max="8" min="0" v-model="hh" />
                <span class="input-group-btn grid"></span>
                <input type="number" style="width:100%" class="form-control" id="MM" maxlength="2" placeholder="分鐘"
                       max="99" min="0" v-model="mm" />
                <span class="input-group-btn">
                <input class="btn gl-btn-primary" type="submit" style="width: 100px" value="尋找">
                </span>
                </form>
            </div>
            <div class="fairy_output"></div>
        </div>
        <div class="col-sm-4">
            <gl-query-record image-src="/common/fairy/fairy_"
                             :content='content' :clickFunctoin="clearLog"></gl-query-record>

        </div>
    </div></template>

<script>
    import GlTitle from "../../components/title";
    import GlCardLeft from "../../components/cardLeft";
    import GlQueryRecord from "../../components/queryRecord";
    export default {
        components: {
            GlQueryRecord,
            GlCardLeft,
            GlTitle},
        name: 'gl-fairy-content',
        data() {
            return {
                prompt:"",
                content:null,
                hh: null,
                mm: null,
                hotTime:null

            }
        },
        methods: {
            badge:function(obj){
                var time = this.hotTime[obj].time.split(":");
                this.hh = time[0];
                this.mm = time[1];
                this.search();

            },
            search: function () {
                var _this = this;

                let hh = this.hh;
                let mm = this.mm;
                if (hh === null || hh === "") {
                    hh = 0;
                }

                if (mm === null || mm === "") {
                    mm = 0;
                }

                this.$ga.event('time','search_fairy');

                $.getJSON("/api/inquiry/fairy/" + hh + "/" + mm, function ($data) {
                    if ($data.status === "success") {
                        let outputHtml = "";
                        let dataList = [];

                        for (let listdata in $data.data) {
                            for (let star in $data.data[listdata]) {
                                let number = $data.data[listdata][star].no;
                                let name = $data.data[listdata][star].name;

                                outputHtml += "<img  src='/common/fairy/fairy_" + number + ".jpg' alt='"+name+"' title='"+name+"'>";
                                dataList.push(number);
                            }

                        }

                        $(".fairy_output").html(outputHtml);
                        _this.pushData(hh+":"+mm,dataList);

                    } else if ($data.status === "empty") {
                        $(".fairy_output").html(`<div class="alert alert-danger" role="alert">
                        <span class="glyphicon glyphicon-info-sign"></span>
                        找不到有關數據!! 請再試!!</div>`);
                    }
                }).fail(function() {
                    $(".fairy_output").html(`<div class="alert alert-warning" role="alert">
                    <span class="glyphicon glyphicon-info-sign"></span>
                    伺服器出現問題!! 請再試!!
                    </div>`);
                });
            },
            pushData:function (time,data) {

                if(this.content === ""){
                    this.content = "[]";

                }

                let json = JSON.parse(this.content);

                json.push({"time":time,"data":data});
                if(json.length >4){
                    json.shift();
                }

                this.content = JSON.stringify(json);
                $setCookie("fairyLog",this.content,7);
            },
            clearLog:function(){
                this.content = "[]";
                $setCookie("fairyLog",this.content,-7);
            }

        },
        props: ['promptData'],
        mounted: function () {
            let randomNumber = Math.floor((Math.random() * this.promptData.length) + 1);
            this.prompt  = this.promptData[randomNumber-1];

            if (this.$route.query.search !== undefined) {
                let searchTime = this.$route.query.search.split(":");
                this.hh = searchTime[0];
                this.mm = searchTime[1];

                this.search();
            }

            let cookieData = $getCookie("fairyLog");

            if(cookieData !== undefined){
                this.content = cookieData;
            }else{
                this.content = "[]";
            }

            this.$g.getHotTimeFairy('hotTime',this);
        }
    }
</script>

<style>
    .fairy_output {
        margin-top: 10px;

    }

    .fairy_output img {
        margin-right: 5px;
        width: 32%;
    }

</style>
