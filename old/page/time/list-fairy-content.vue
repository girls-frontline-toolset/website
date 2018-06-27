<template>
    <div>
        <gl-card-left title="提示" :content="prompt"></gl-card-left>
        <gl-title message="妖精圖鑑"></gl-title>


        <div class="input-group">
            <span class="input-group-addon">篩選條件:</span>
            <select class="form-control" v-model="fairy">
                <option value="0">妖精</option>
                <option value="1">特典妖精</option>
            </select>
            <span class="input-group-addon">編號選擇:</span>

            <input type="number" class="form-control" placeholder="開始"
                   min="1" :max="fairyListCount" tabindex="1" v-model.number="range[0]"/>
            <span class="input-group-addon">-</span>
            <input v-if="fairy == 0 " type="number" class="form-control" placeholder="結束"
                   min="1" :max="fairyListCount" tabindex="1" v-model.number="range[1]"/>
            <input v-if="fairy == 1 " type="number" class="form-control" placeholder="結束"
                   min="1" :max="exFairyListCount" tabindex="1" v-model.number="range[2]"/>
        </div>

        <div class="input-type">
            <span class='gl-label'>種類: </span>
            <img :src="getImageType(index)" :alt="getAlt(index)" :style="isClick('type',index)" @click="click(index)"
                 v-for="(item, index) in type" :title="getAlt(index)">
        </div>


        <button class="btn gl-btn-primary" type="button" style="width: 100px" @click="getList()">尋找</button>
        <button v-if="fairy == 0 " class="btn gl-btn-default" @click="getFairyTime()">妖精製作時間列表</button>

        <div class="fairy_list_output"></div>
    </div>


</template>

<script>
    import GlTitle from "../../components/title";
    import GlCardLeft from "../../components/cardLeft";
    import mSelectImg from "../../mixin/mSelectImg";
    export default {
        mixins: [mSelectImg],
        components: {
            GlCardLeft,
            GlTitle
        },
        name: 'gl-list-fairy-content',
        props: ['promptData'],
        data() {
            return {
                prompt: null,
                fairyListCount: null,
                fairyList: null,
                range: [1, 0, 0],
                type: [true, true],
                fairyTimeList:null,
                fairy:"0",
                exFairyList:null,
                exFairyListCount: null,
            }
        }, methods: {
            getFairyTime: function () {
                this.$ga.event('list','fairy_time_list');


                let data = this.fairyTimeList;
                let dataList = [];
                for (let i = 0; i < data.length; i++) {
                    let number = parseInt(data[i].data);
                    if (number >= this.range[0] && number <= this.range[1]) {
                        let dataHtml = "";
                        let dataTitle = "";

                        dataTitle += "<span class='gl-label'>" + data[i].time + "</span>";

                        if (this.getImgList(number - 1, false)) {
                            dataHtml += "<img  src='/common/fairy/fairy_" + number + ".jpg' alt='" + this.fairyList[number - 1].name + "' title='" + this.fairyList[number - 1].name + "'>";
                        }

                        if (dataHtml != "") {
                            dataList.push(( dataTitle + dataHtml));
                        }
                    }

                }


                let html = "";
                let html2 = "";

                for (var xx = 0; xx < dataList.length; xx++) {
                    if (xx < dataList.length / 2) {
                        html += dataList[xx];
                    } else {
                        html2 += dataList[xx];
                    }

                }

                $(".fairy_list_output").html("<div class='row'><div class='col-md-6'>" + html + "</div><div class='col-md-6'>" + html2 + "</div></div>");


            }, getList: function () {
                this.$ga.event('list','fairy_list');

                let range = this.range[1];
                if(this.fairy === "0" ){

                    if(this.range[0] < 0 || range > this.fairyListCount){
                        glAlert("提示","請選擇在範圍內 0 - " + this.fairyListCount);
                        return;
                    }
                }else{
                    range = this.range[2];
                    if(this.range[0] < 0 || range > this.exFairyListCount){
                        glAlert("提示","請選擇在範圍內 0 - " + this.exFairyListCount);
                        return;
                    }
                }


                let html = "";
                let isAll = false;

                if(this.type[0] && this.type[1]){
                    isAll = true;
                }

                for(let i = this.range[0] ; i <= range  ; i ++){
                    html += this.getImgList(i-1,isAll);
                }


                $(".fairy_list_output").html(html);

            }, getImageType: function (no) {
                return "/common/img/fairyType_" + no + ".gif";

            }, click: function (no) {

                //this.type[no] = !this.type[no];
                //this.$forceUpdate();
                this.$set(this.type,no,!this.type[no]);
            }, getAlt: function (no) {
                switch (no) {
                    case 0 :
                        return "戰鬥妖精";
                        break;
                    case 1:
                        return "策略妖精";
                        break;

                }

            },getImgList:function(index,isAll){
                //console.log(this.fairyList[index]);
                let data = this.fairyList[index];
                if(this.fairy === "1" ) {
                    data = this.exFairyList[index];
                }

                let type = -1;

                switch ( data.type) {
                    case "戰鬥妖精" :
                        type = 0;
                        break;
                    case "策略妖精":
                        type = 1;
                        break;
                }

                if((isAll || (this.type[type] )) && this.fairy === "0"){
                    return "<img src='/common/fairy/fairy_"+(index + 1) +".jpg' alt='"+data.name+ "' title='"+data.name+"'>";
                }if((isAll || (this.type[type] )) && this.fairy === "1"){
                    return "<img src='/common/exFairy/exFairy_"+(index + 1) +".jpg' alt='"+data.name+ "' title='"+data.name+"'>";
                }else {
                    return "";
                }

            }


        },
        mounted: function () {
            let randomNumber = Math.floor((Math.random() * this.promptData.length) + 1);
            this.prompt = this.promptData[randomNumber - 1];

            var _this = this;

            this.$g.output = $(".fairy_list_output");

            this.$g.getAllFairy('fairyList',this,function(){
                _this.fairyListCount = _this.fairyList.length;
                _this.range[1] = _this.fairyList.length;

            });
            this.$g.getAllExFairy('exFairyList',this,function (){
               _this.exFairyListCount  = _this.exFairyList.length;
               _this.range[2] = _this.exFairyList.length;

            });
            this.$g.getAllTimeFairy('fairyTimeList',this);

        }


    }

</script>

<style>
    .fairy_list_output{
        margin-top: 5px;
        margin-bottom: 5px;
    }

    .fairy_list_output img{
        width: 25%;

    }

    @media (min-width: 1200px) {
        .fairy_list_output img {
            max-width: 115px;
            margin-right: 5px;
            margin-bottom: 5px;
        }
    }
</style>
