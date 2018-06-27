<template>
    <div>
    <div  class="row">
        <div class="col-sm-8">
            <gl-card-left title="提示" :content="prompt"></gl-card-left>
            <div class="alert alert-warning" >
                !! 只是玩樂用途 與遊戲未必相同
            </div>
            <gl-title icon-src="/common/img/t-doll.png" message="模擬造槍"></gl-title>
            <div  class="div-make">
                <div class="row no-select">
                    <gl-number-control icon="/common/img/manpower.png" :number="number[0]" :addFunction="addNumber" index="0" title="人力"></gl-number-control>
                    <gl-number-control icon="/common/img/ammunition.png" :number="number[1]" :addFunction="addNumber" index="1" title="彈藥"></gl-number-control>
                </div>
                <div class="row no-select">
                    <gl-number-control icon="/common/img/material.png" :number="number[2]" :addFunction="addNumber" index="2" title="口糧"></gl-number-control>
                    <gl-number-control icon="/common/img/parts.png" :number="number[3]" :addFunction="addNumber" index="3" title="零件"></gl-number-control>
                </div>
            </div>
            <div class="div-make-button">
                <button class="btn gl-btn-primary" @click="start()">開始製作</button>
                <button class="btn gl-btn-primary" @click="clean()">清理結果</button>
                <button class="btn gl-btn-primary" @click="getList()">查看列表</button>
            </div>


            <div v-if="!show" class="make_output"></div>
        </div>
        <div class="col-sm-4">
            <gl-title message="本頁閾值" button-text="點擊查看" :button-icon="buttonIcon" :clickFunction="showValue"></gl-title>
            <div class="value" v-if="valueIsClick">
                <span class='highlight'>設以下角色的閾值:</span> <br>
                <dl>
                    　<dt>手槍（HG）：</dt>
                    　<dd>斯捷奇金,USP Compact,Bren Ten<br>
                    四項資源總和在920以內出現</dd>
                    <dt>衝鋒鎗（SMG）：</dt>
                    <dd>斯登MK II 無閾值<br>
                        希普卡 400人力,400彈藥時開始出現</dd>
                    <dt>突擊步槍（AR）：</dt>
                    <dd>63式 四項資源總和超過800就會出現<br>
                        RFB,利貝羅勒 400彈藥,400口糧時開始出現</dd>
                    <dt>步槍（RF）：</dt>
                    <dd>IWS 2000 400人力,400口糧時開始出現</dd>
                    <dt>機槍（MG）：</dt>
                    <dd>AEK-999,173,RPD 600人力,600彈藥,100口糧,400零件時開始出現<br>
                        RPD 400人力,600彈藥,300零件時開始出現<br>
                        RPD 400人力,600彈藥,300零件時開始出現<br></dd>
                    <dt>其他角色資料來源: <a href="https://forum.gamer.com.tw/C.php?bsn=31406&snA=266&tnum=2">槍枝製作時間表(20170509更新)</a></dt>
                    <dd></dd>
                </dl>
            </div>
            <gl-card-left title="機率" :content="getChance()"></gl-card-left>
            <gl-card-left title="統計" :content="cardData()"></gl-card-left>
            <gl-card-left title="最後更新" :content="time"></gl-card-left>

        </div>

    </div>
    <div v-if="show" class="make_output"></div>
    <div class="rightTop"><img src="/common/img/t-doll-w.png" alt="開始製作" @click="start()"></div>
    </div>
</template>
<script>
    import GlCardLeft from "../../components/cardLeft";
    import GlCardButton from "../../components/cardButton";
    import GlTitle from "../../components/title";
    import GlNumberControl from "../../components/numberControl";
    export default {
        components: {
            GlNumberControl,
            GlTitle,
            GlCardButton,
            GlCardLeft},
        name: 'gl-make-content',
        data() {
            return {
              number:[30,30,30,30],
              total:0,
              star:[0,0,0,0],
              prompt:"",
              valueIsClick:false,
              buttonIcon:"glyphicon-menu-down",
              girlMakeTime:null,
              show:false,
              girlList:null,
              time: "NaN"
            }

        }, methods: {
            addNumber:function(index,num){

                this.$set(this.number,index,this.number[index] += num);
                if( this.number[index]  < 30){
                    this.$set(this.number,index,30);
                }

                if( this.number[index] >999){
                    this.$set(this.number,index,999);

                }

                //this.$forceUpdate();
            },
            cardData:function(){
                return   `製作數: ${this.total} <br> 5星: ${this.star[3]} <br> 4星: ${this.star[2]} <br> 3星: ${this.star[1]} <br> 2星: ${this.star[0]}`


            },getChance:function(){
                return "5星人形機率：3%<br>4星人形機率：10%<br>3星人形機率：27%<br>2星人形機率：60%<br>";
            },
            start:function(){
                this.$ga.event('make', 'girl_make');

                let  r = Math.floor((Math.random() * 100) + 1);
                let list = "";
                let data = -1;
                switch (true) {
                    case (r<=60):
                        list = this.getStarList("2");
                        data  = list[Math.floor((Math.random() * list.length))];
                        this.$set(this.star , 0,this.star[0] +=1);
                        break;
                    case (r<=87):
                        list = this.getStarList("3");
                        data  = list[Math.floor((Math.random() * list.length))];
                        this.$set(this.star, 1 ,this.star[1] +=1);
                        break;
                    case (r<=97):
                        list = this.getStarList("4");
                        data  = list[Math.floor((Math.random() * list.length))];
                        this.$set(this.star, 2 ,this.star[2] +=1);
                        break;
                    case (r<=100):
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

                //this.$forceUpdate();

            },
            getStarList:function(star){
                let sum = ( this.number[0] + this.number[1] + this.number[2] + this.number[3] );
                let dataList = [];
                //console.log(this);
                //console.log(this.girlMakeTime);
                for(var i = 0 ; i < this.girlMakeTime.length ; i ++) {
                    let data = this.girlMakeTime[i];
                    if(data.star != star){
                        continue;
                    }

                    if (this.number[0] >= parseInt(data.manpower) && this.number[2] >= parseInt(data.rations) && this.number[1] >= parseInt(data.ammunition) && this.number[3] >= parseInt(data.components) && parseInt(data.moreSum) <= sum && parseInt(data.lessSum) >= sum) {
                        for (var ii = 0; ii < data.data.length; ii++) {
                            dataList.push(data.data[ii] );
                        }
                    }
                }

                return dataList;

            },
            showValue:function(){
                if(this.valueIsClick){
                    this.buttonIcon = "glyphicon-menu-down";
                }else{
                    this.buttonIcon = "glyphicon-menu-up";
                }
                this.valueIsClick = !this.valueIsClick;
            },
            clean:function(){
                $(".make_output").html("");

            },
            getList:function(){
                this.$ga.event('make','girl_make_list');

                    let html = "";
                    let manpower = 0;
                    let rations = 0 ;
                    let ammunition = 0 ;
                    let components = 0;
                    let moreSum = 0;
                    let lessSum = 0;
                    let sum = 0;
                    let dataList = ["","","",""];


                    for(var i = 0 ; i < this.girlMakeTime.length ; i ++){
                        let data = this.girlMakeTime[i];

                        manpower = parseInt(data.manpower);
                        rations = parseInt(data.rations);
                        ammunition = parseInt(data.ammunition);
                        components = parseInt(data.components);
                        moreSum = parseInt(data.moreSum);
                        lessSum = parseInt(data.lessSum);

                        sum = ( this.number[0] + this.number[1] + this.number[2] + this.number[3] );

                        if(this.number[0] >= manpower && this.number[2] >= rations  && this.number[1] >= ammunition && this.number[3] >= components && moreSum <= sum   && lessSum >= sum ){
                            html = "";
                            for(var ii = 0 ; ii < data.data.length ; ii++){
                                let name = this.girlList[data.data[ii]-1].name;
                                if(this.girlList[data.data[ii]-1].src != null){
                                    name = this.girlList[data.data[ii]-1].src;
                                }

                                html += "<a href='https://zh.moegirl.org/zh-hant/少女前线:"+name+"' target='_blank'><img src='/common/girl/girl_" + data.data[ii] + ".jpg' alt='"+ name +"' title='"+name+"'></a>";
                            }

                            switch(data.star){
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

                    }

                        html = "";
                    for(var iii = 0 ; iii < dataList.length ;iii++){
                        html += "<span class='gl-label'>" + (5 - iii) + "星列表</span>";
                        html += dataList[iii];
                    }

                  $(".make_output").html(html);

            }
        },
        props: ['promptData'],
        created: function () {
            this.$g.output = $(".make_output");
            let randomNumber = Math.floor((Math.random() * this.promptData.length) + 1);
            this.prompt  = this.promptData[randomNumber-1];

            this.show = !this.$setting.less768;
            this.$g.getAllGirlList('girlList',this);
            this.$g.getGirlMakeTime('girlMakeTime',this);
            this.time = this.$setting.make;

        }


    }
</script>

<style>
    .stick {
        position:fixed;
        top:0px;
    }


    .div-make-girls-material{
        width: 40%;
        float: left;
    }

    .div-make-girls-material img{
        width: 100%;
    }

    .div-make-girls-number{
        width:60%;
        float: left;
    }


    .div-make-girls-number table{
        width: 100%;
        height: 100%;
    }

    .div-make-girls-number table th {
        width: 0;
        border-style: solid;
        border-width: 0 10px 15px 10px;
        border-color: transparent transparent #fff transparent;
        background-color: #8ec01f;
        cursor: pointer;
    }

    .div-make-girls-number table td {
        font-size: 5vh;
        text-align: center;
        color: #fff;
        background-color: #34372c;
        width: 23px;
    }

    .div-make-girls-number table .thead td {
        width: 0;
        background: url(/common/img/triangle-up.png);
        background-size: 100% 100%;
        cursor: pointer;
    }

    .div-make-girls-number table .thead,.div-make-girls-number table .tfoot {
        background-color: #8ec01f;
        height: 25%;
    }

    .div-make-girls-number table .tfoot td {
        width: 0;
        background: url(/common/img/triangle-bottom.png);
        background-size: 100% 100%;
        cursor: pointer;
    }


    .div-make-gl-row{
        overflow: overlay;
        display: flex;
        margin-bottom: 10px;
        width: 50%;
        float: left;
    }
    .div-make-girls-description{
        font-size: 30px ;
        color: #ffffff;
        text-align: center;

    }

    .div-make{
        background-color: #34372c;
        width: 100%;

    }

    .value {
        font-size: 18px;
    }

    .value dd{
        margin-left: 10px;
    }

    .make_output{
        margin-top: 5px;
    }

    .make_output img{

        width: 32%;
    }

    @media (min-width: 1200px){
        .make_output img{
            max-width: 115px;
            margin-right: 5px;
            margin-bottom: 5px;
        }
    }

    .div-make-button{
        margin-top: 5px;
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

