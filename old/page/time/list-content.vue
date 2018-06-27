<template>
    <div>
        <gl-card-left title="提示" :content="prompt"></gl-card-left>
        <gl-title message="人型圖鑑"></gl-title>

        <div class="input-group">
            <span class="input-group-addon">篩選條件:</span>
            <select class="form-control" v-model="humanoid">
                <option value="0">戰術人型</option>
                <option value="1">特典人型</option>
                <option value="2">心智升級人型</option>
            </select>
            <span class="input-group-addon">編號選擇:</span>

            <input type="number" class="form-control" placeholder="開始"
                    min="1" :max="girlListCount" tabindex="1" v-model="range[0]"/>
            <span class="input-group-addon">-</span>
            <input type="number"  class="form-control" placeholder="結束"
                    min="1" :max="girlListCount" tabindex="1" v-model.number="range[1]" v-if="humanoid == 0 || humanoid == 2"/>
            <input type="number"  class="form-control" placeholder="結束"
                   min="1" :max="exGirlListCount" tabindex="1" v-model.number="range[2]" v-if="humanoid == 1"/>
        </div>

        <div class="input-type">
            <span class='gl-label'>種類: </span>
            <img :src="getImageType(key)" :alt="key" :style="isClick('type',key)" @click="click('type',key)"
                 v-for="(item, key, index) in type">
        </div>

        <div class="input-star">
            <span class='gl-label'>星數: </span>
            <img v-if="humanoid != 1" :src="getImageStar(key)" :alt="key" :style="isClick('star',key)"
                     @click="click('star',key)" v-for="(item, key, index) in star">
            <img v-if="humanoid == 1" src="/common/img/star_other.gif" alt="star_other" :style="isClick('other',0)"
                 @click="click('other',0)" >
        </div>


        <div class="input-star" v-if="humanoid == 0">
            <span class='gl-label'>其他: </span>
            <img src="/common/img/update.gif" alt="update" :style="isClick('update',0)"
                 @click="click('update',0)" >
        </div>

        <button class="btn gl-btn-primary" type="button" style="width: 100px" @click="getList()">尋找</button>
        <button class="btn gl-btn-default" v-if="humanoid == 0"  @click="getGirlTime()">人型製作時間列表</button>

        <div class="list_output"></div>
    </div>
</template>

<script>
    import GlCardLeft from "../../components/cardLeft";
    import GlTitle from "../../components/title";
    import mSelectImg from "../../mixin/mSelectImg";
    export default {
        mixins: [mSelectImg],
        components: {
            GlTitle,
            GlCardLeft
        },
        name: 'gl-ui-list-content',
        data() {
            return {
                prompt: "",
                type: {"HG":true, "SMG":true, "RF":true, "AR":true, "MG":true, "SG":true},
                star: {"5":true, "4":true, "3":true, "2":true},
                update:[true],
                other: [true],
                humanoid: 0,
                girlListCount:0,
                exGirlListCount:0,
                girlList: null,
                exGirlList:null,
                range: [1, 10,0],
                girlTimeList:null
            }
        },
        props: ['promptData'],
        methods: {
            setData(a,b,c){
                this.$set(this[a],b,c);
            },
            click: function (type, num) {
                switch (type) {
                    case "type":
                        this.$set(this.type,num,!this.type[num]);
                        break;
                    case "star":
                        this.$set(this.star,num,!this.star[num]);
                        break;
                    case "other":
                        this.$set(this.other,num,!this.other[num]);
                        break;
                    case "update":
                        this.$set(this.update,num,!this.update[num]);
                        break;

                }
                //this.$forceUpdate();

            },
            getImageType: function (type) {
                return "/common/img/" + type + ".gif";

            },
            getImageStar: function (star) {
                return "/common/img/star_" + star + ".gif";

            },
            getList:function () {
                this.$ga.event('list','girl_list');
                let html = "";
                let isAll = false;
                if(this.humanoid == 0 || this.humanoid == 2) {
                    if (this.range[0] < 0 || this.range[1] > this.girlListCount) {
                        glAlert("提示", "請選擇在範圍內 0 - " + this.girlListCount);
                        return;
                    }
                    if(this.star["5"] && this.star["4"] && this.star["3"] && this.star["2"] &&
                        this.type["HG"] && this.type["SMG"] && this.type["RF"] && this.type["AR"] && this.type["MG"] && this.type["SG"]
                    ){
                        isAll = true;
                    }

                }else{
                    if (this.range[0] < 0 || this.range[2] > this.exGirlListCount) {
                        glAlert("提示", "請選擇在範圍內 0 - " + this.exGirlListCount);
                        return;
                    }

                    if(this.type["HG"] && this.type["SMG"] && this.type["RF"] && this.type["AR"] && this.type["MG"] && this.type["SG"] &&
                        this.other[0]
                    ){
                        isAll = true;
                    }

                }
                //console.log(this.humanoid);


                switch(this.humanoid){
                    case 0:
                    case '0':
                        for(let i = this.range[0] ; i <= this.range[1] ; i ++){
                            html += this.getImgList("girl",i-1,isAll,"list");
                        }
                    break;

                    case '1':
                        for(let i = this.range[0] ; i <= this.range[2] ; i ++){
                            html += this.getImgList("exGirl",i-1,isAll);
                        }

                        break;

                    case '2':

                        for(let i = this.range[0] ; i <= this.range[1] ; i ++){
                           // console.log((this.girlList[i-1]).isUpdate === "1");
                            if((this.girlList[i-1]).isUpdate === "1"){
                                html += this.getImgList("girl",i-1,isAll,"list");
                            }

                        }

                    break;
                    default:



                }
                $(".list_output").html(html);
            },
            getImgList:function(type,index,isAll,fun){
                let data = null;
                let star = null;
                let url = "";
                let name = "";
                let digiMind = null;

                if(type === "girl"){
                    data = this.girlList[index];
                    star = this.star[data.star];
                    url = "/common/girl/girl_";

                    if(this.update[0] && data.isUpdate === "1"){

                        switch (data.star) {
                            case '2':
                                star = this.star[4];
                            break;
                            case '4':
                                star =  this.star[5];
                            break;
                        }


                        url = "/common/digiMindGirl/digiMindGirl_";
                    }

                    if(data.src !== null){
                        name = data.src;
                    }else{
                        name = data.name;
                    }


                    if(fun === "list"){

                    }

                }else if(type === "exGirl"){
                    data = this.exGirlList[index];
                    star = this.other[0];
                    //console.log(this.other);
                    url ="/common/exGirl/exgirl_";

                    if(data.src !== null){
                        name = data.src;
                    }else{
                        name = data.name;
                    }
                }

                if(isAll || (this.type[data.type] && star)){

                    return "<a href='https://zh.moegirl.org/zh-hant/少女前线:"+ name+"' target='_blank'><img src='"+url+(index + 1) +".jpg' alt='"+data.name+ "' title='"+data.name+"'></a>";
                }else {
                    return "";
                }
            },
            getGirlTime:function() {
                this.$ga.event('list','girl_time_list');

                if(this.humanoid != 0 ){
                    $(".list_output").html("");
                    return;
                }

                let data = this.girlTimeList;
                let dataList = [];

                for (let i = 0; i < data.length; i++) {
                    let dataHtml = "";
                    let dataTitle = "";

                    dataTitle += "<span class='gl-label'>" + data[i].time + "</span>";

                    for (let listData in data[i]) {
                        if (listData !== "time") {
                            if (data[i][listData] !== "") {

                                for (var ii = 0; ii < data[i][listData].length; ii++) {
                                    let number = parseInt(data[i][listData][ii]);

                                    if (number >= this.range[0] && number <= this.range[1]) {

                                        let girl = this.girlList[number - 1];
                                        let name = girl.name;

                                        if (this.getImgList("girl", number - 1) === "") {
                                            continue;
                                        }

                                        let className = "";
                                        switch (girl.heavy) {
                                            case "1":
                                                className = "is_heavy";
                                                break;
                                            case "0":
                                                className = "no_heavy";
                                                break;
                                        }
                                        dataHtml += "<a href='https://zh.moegirl.org/zh-hant/少女前线:"+name+"' target='_blank'><img class='" + className + "' src='/common/girl/girl_" + number + ".jpg' alt='" + name + "' title='" + name + "'></a>";
                                    }
                                }

                            }
                        }
                    }

                    if (dataHtml != "") {
                        dataList.push(( dataTitle + dataHtml));
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

                $(".list_output").html("<div class='row'><div class='col-md-6'>" + html + "</div><div class='col-md-6'>" + html2 + "</div></div>");
            }

        },created:function(){

            let randomNumber = Math.floor((Math.random() * this.promptData.length) + 1);
            this.prompt = this.promptData[randomNumber - 1];

            var _this = this;
            var contList = 0;

            var query = function(){
                if(contList === 3 ){
                    //console.log(_this.$route.query);
                    if (_this.$route.query.f !== undefined) {
                        let queryStar = _this.$route.query.star;


                        if(queryStar !== undefined){

                            for(let index in _this.star){

                                _this.star[index] = false;
                            }

                            for(let star in queryStar ){

                                if(_this.star[queryStar[star]] !== undefined){
                                    _this.star[queryStar[star]] = true;
                                }
                            }

                        }

                        let queryType = _this.$route.query.type;

                        if(queryType !== undefined){

                            for(let index in _this.type){
                                _this.type[index] = false;
                            }

                            if(Array.isArray(queryType)){
                                for(let type in queryType ){

                                    if(_this.type[queryType[type]] !== undefined){
                                        _this.type[queryType[type]] = true;
                                    }
                                }

                            }else{
                                if(_this.type[queryType] !== undefined){
                                    _this.type[queryType] = true;
                                }
                            }

                        }


                        if(_this.$route.query.f === "list"){
                            _this.getList();
                        }else if(_this.$route.query.f === "time"){
                            _this.getGirlTime();
                        }

                    }

                }
            };

            this.$g.getAllGirlList('girlList',this,function(){
                _this.girlListCount = _this.girlList.length;
                _this.$set(_this.range,1,_this.girlList.length);
                contList++;
                query();
            });


            this.$g.getAllExGirlList('exGirlList',this,function(){
                _this.exGirlListCount = _this.exGirlList.length;
                _this.$set(_this.range,2,_this.exGirlList.length);
                contList++;
                query();
            });

            this.$g.getAllGirlTime('girlTimeList',this,function(){
                contList++;
                query();
            });
        },mounted:function(){
            this.$g.output = $(".list_output");
        }
    }
</script>

<style>

    .input-group select {
        height: 34px;
        padding: 6px 12px;
        font-size: 14px;
        line-height: 1.42857143;
        color: #555;
        background-color: #fff;
        background-image: none;
        border: 1px solid hsla(42, 100%, 50%, 1);
    }

    .input-group select:focus {
        box-shadow: 0 0 10px hsla(42, 100%, 50%, 0.8);
        border: 1px hsla(42, 100%, 50%, 0.8) solid;
    }

    .input-group-addon {
        color: hsla(42, 100%, 50%, 0.8);
        font-weight: bolder;
        font-size: 18px;
    }

    .input-group {
        margin-bottom: 5px;
    }

    .input-type img {
        width: 14%;
        max-width: 102px;
        opacity: 0.5;
        cursor: pointer;
    }

    .input-star img {
        width: 14%;
        max-width: 102px;
        opacity: 0.5;
        cursor: pointer;
    }

    .input-action {
        opacity: 1;

    }

    .input-star {
        margin-bottom: 5px;
    }

    input[type=range] {
        position: absolute;
        pointer-events: none;

    }

    .list_output{
        margin-top: 5px;
        margin-bottom: 5px;
    }

    .list_output img{
        width: 25%;

    }

    @media (min-width: 1200px) {
        .list_output img {
            max-width: 115px;
            margin-right: 5px;
            margin-bottom: 5px;
        }

        .list_output img{
            width: 20%;

        }
    }

</style>