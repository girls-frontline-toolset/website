<template>
    <div class="row">
        <div class="col-sm-8">
            <gl-card-left title="提示" :content="prompt"></gl-card-left>
            <gl-title icon-src="/common/img/equipment.png" message="裝備製造時間查詢"></gl-title>
            <label for="time">建造時間:</label>
            <div class="hotTime">
                <a href="javascript:;" class="badge badge-success gl-badge" @click="badge(index)" v-for="(item,index) in hotTime">{{item.time}}</a>
            </div>
            <div >
                <form class="input-group" @submit.prevent="search()" >
                <input type="number" v-model="mm" class="form-control" id="time" maxlength="2" placeholder="分鐘" max="99" min="0"/>
                <span class="input-group-btn">
                <input class="btn gl-btn-primary" type="submit" style="width: 100px" value="尋找">
                </span>
                </form>
            </div>
            <div class="device_output"></div>
        </div>
        <div class="col-sm-4">
            <gl-query-record  :content='content' :clickFunctoin="clearLog"></gl-query-record>
        </div>

    </div>
</template>

<script>
    import GlTitle from "../../components/title";
    import GlCardLeft from "../../components/cardLeft";
    import GlQueryRecord from "../../components/queryRecord";
    export default {
        components: {
            GlQueryRecord,
            GlCardLeft,
            GlTitle},
        name: 'gl-device-content',
        data() {
            return {
                prompt:"",
                content:null,
                mm: null,
                hotTime:null
            }
        }, methods:{
            badge:function(obj){
            var time = this.hotTime[obj].time;
            this.mm = time;
            this.search();

            },
            search: function () {
                var _this = this;

                let mm = this.mm;

                if (mm === null || mm === "") {
                    mm = 0;
                }

                this.$ga.event('time','search_device');

                $.getJSON("/api/inquiry/device/"+ mm, function ($data) {
                    if ($data.status === "success") {
                        let outputHtml = "";
                        let dataList = [];

                        for (let listdata in $data.data) {

                            let data = $data.data[listdata];
                            let star = "";

                            for(let ii = 0 ; ii < data.star ; ii ++){
                                star += "★";
                            }

                            outputHtml += '<div class="div_device"><ol><li class="'+data.img+' str_'+data.star+'_bg">'+star+'</li><li class="str_'+data.star+'">'+data.name+'</li><li>'+data.type+'</li><li>'+data.attribute+'</li></ol></div>'
                            dataList.push(data);

                        }

                        $(".device_output").html(outputHtml);

                        _this.pushData(mm,dataList);

                    } else if ($data.status === "empty") {
                        $(".device_output").html(`<div class="alert alert-danger" role="alert">
                        <span class="glyphicon glyphicon-info-sign"></span>
                        找不到有關數據!! 請再試!!</div>`);
                    }
                }).fail(function() {
                    $(".device_output").html(`<div class="alert alert-warning" role="alert">
                    <span class="glyphicon glyphicon-info-sign"></span>
                    伺服器出現問題!! 請再試!!
                    </div>`);
                });
            },
            clearLog:function(){
                this.content = "[]";
                $setCookie("deviceLog",this.content,-7);
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

                $setCookie("deviceLog",this.content,7);
            }
        },
        props: ['promptData'],
        mounted: function () {
            let randomNumber = Math.floor((Math.random() * this.promptData.length) + 1);
            this.prompt  = this.promptData[randomNumber-1];

            if (this.$route.query.search !== undefined) {
                this.mm  = this.$route.query.search;

                this.search();
            }

            let cookieData = $getCookie("deviceLog");

            if(cookieData !== undefined){
                this.content = cookieData;
            }else{
                this.content = "[]";
            }

            this.$g.getHotTimeDevice('hotTime',this);
        }
    }
</script>

<style>
    .div_device{
        width: 113px;
        margin-right: 5px;
        float: left;
    }


    .div_device ol{
        list-style: none;
        padding:  0 ;
        margin: 2px ;
        width: 113px;
    }

    .div_device li{
        text-align: center;
    }

    .div_device li:nth-child(1){
        font-size: 10px;
        background-size: 115px 115px;
        height: 120px;
        background-repeat: no-repeat;
        background-position: center center;
    }

    .div_device li:nth-child(2){
        background-color: #000000;
    }

    .div_device li:nth-child(3){
        background-color: #000000;
        color: #fff;
    }

    .div_device li:nth-child(4){
        background-color: #313731;
        color: #fff;
    }

    .ty_001 {
        background-image:url('/common/device/ty_001.png') ;
    }

    .ty_002 {
        background-image:url('/common/device/ty_002.png') ;
    }

    .ty_003 {
        background-image:url('/common/device/ty_003.png') ;
    }

    .ty_004 {
        background-image:url('/common/device/ty_004.png') ;
    }

    .ty_005 {
        background-image:url('/common/device/ty_005.png') ;
    }

    .ty_006 {
        background-image:url('/common/device/ty_006.png') ;
    }

    .ty_007 {
        background-image:url('/common/device/ty_007.png') ;
    }

    .ty_008 {
        background-image:url('/common/device/ty_008.png') ;
    }

    .ty_009 {
        background-image:url('/common/device/ty_009.png') ;
    }

    .ty_010 {
        background-image:url('/common/device/ty_010.png') ;
    }

    .ty_011 {
        background-image:url('/common/device/ty_011.png') ;
    }

    .ty_012 {
        background-image:url('/common/device/ty_012.png') ;
    }

    .ty_013 {
        background-image:url('/common/device/ty_013.png') ;
    }

    .ty_014 {
        background-image:url('/common/device/ty_014.png') ;
    }

    .ty_015 {
        background-image:url('/common/device/ty_015.png') ;
    }

    .str_5 {
        color: #ffbc00;
    }

    .str_4 {
        color: #9cd125;
    }

    .str_3 {
        color: #9acdef;
    }

    .str_2 {
        color: #dedcde;
    }

    .str_5_bg{
        background-color: #ffbc00;
    }

    .str_4_bg{
        background-color: #9cd125;
    }

    .str_3_bg{
        background-color: #9acdef;
    }

    .str_2_bg{
        background-color: #dedcde;
    }

    .device_output {
        margin-top: 10px;
        overflow: overlay;
    }
</style>
