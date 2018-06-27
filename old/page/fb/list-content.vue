<template>
    <div class="row">
        <div class="col-sm-8">
            <gl-card-left title="提示" :content="prompt"></gl-card-left>
            <gl-title icon-src="/common/img/t-doll.png" message="好友招募區域"></gl-title>
            <div class="search-fb">
                <form  @submit.prevent="search($event)" >
                <label>搜尋:</label>
                <div class="input-group">
                    <span class="input-group-addon">種類:</span>
                    <select name="myType" class="form-control" id="getListType" @change="getGirl('getListType','getListStar')">
                        <option value="">選擇</option>
                        <option value="HG">HG</option>
                        <option value="SMG">SMG</option>
                        <option value="RF">RF</option>
                        <option value="AR">AR</option>
                        <option value="MG">MG</option>
                        <option value="SG">SG</option>
                    </select>

                    <span class="input-group-addon">星數:</span>
                    <select name="myStar"  class="form-control" @change="getGirl('getListType','getListStar')" id="getListStar">
                        <option value="">選擇</option>
                        <option value="5">5</option>
                        <option value="4">4</option>
                        <option value="3">3</option>
                        <option value="2">2</option>
                    </select>

                    <span class="input-group-addon">角色:</span>
                    <select name="myNum" class="form-control" >
                        <option value="">選擇</option>
                        <option :value="item.no" v-for="item in getListGirl">{{item.name}}</option>
                    </select>
                </div>


                <div class="input-group">
                    <span class="input-group-addon">伺服:</span>
                    <select name="myServer" id="type_select" class="form-control">
                        <option value="TW">台</option>
                        <option value="CN">陸</option>
                    </select>

                    <span class="input-group-addon" >顯示數目:</span>
                    <select name="mySelect" id="star_select" class="form-control">
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="15">15</option>
                        <option value="20">20</option>
                        <option value="30">30</option>
                    </select>
                    <span class="input-group-btn">
                <input class="btn gl-btn-primary" type="submit" style="width: 100px" value="尋找">
                </span>

                </div>
                </form>
            </div>


            <div class="fb-list">
                <div class="bd-callout bd-color" v-for="item in fbList">

                    <div class="bd-title">
                        <div class="crop" >
                            <img :src="getImg(item.select_no)" :alt="getName(item.select_no)" :title="getName(item.select_no)">
                        </div>
                        用戶名: <span>{{item.user_name}}</span> <br>
                        ID: <span>{{item.ID}}</span>等級:<span>{{item.grade}}</span> 伺服:<span>{{item.server}}</span>  <br>
                        備註:  <br>
                        <span>{{item.content}}</span>
                    </div>

                </div>
                <div class="list_output">

                </div>
            </div>
        </div>
        <div class="col-sm-4">
            <gl-title message="招募登記"></gl-title>
            <div v-if="showMenuButton"><span class="glyphicon glyphicon-triangle-bottom gl-menu-down-icon"
                                             @click="clicked" ref="showLog"></span></div>
            <div v-if="show" class="add-fb">
                <form @submit.prevent="addFriend($event)">
                <div class="div-select">
                    <label>常用角色:</label> <br>
                    種類: <select required="required" name="type" id="addFBType" @change="getGirl('addFBType','addFBStar')">
                    <option value="" >選擇</option>
                    <option value="HG">HG</option>
                    <option value="SMG">SMG</option>
                    <option value="RF">RF</option>
                    <option value="AR">AR</option>
                    <option value="MG">MG</option>
                    <option value="SG">SG</option>
                </select><br>

                    星數: <select required="required" name="star" id="addFBStar" @change="getGirl('addFBType','addFBStar')">
                    <option value="">選擇</option>
                    <option value="5">5</option>
                    <option value="4">4</option>
                    <option value="3">3</option>
                    <option value="2">2</option>
                </select><br>

                    角色: <br><select required="required" name="num" @change="changeGirl($event)" id="addFBNum">
                    <option value="">選擇</option>
                    <option :value="item.no" v-for="item in addFBListGirl">{{item.name}}</option>
                </select> <br>
                </div>
                <div class="div-img">
                    <img src="/common/girl/girl_0.jpg">
                </div>


                <label>用戶名:</label>
                <input type="text" name="name" required="required">
                <label>UID:</label>
                <input type="text" style="width: 80%" name="id" required="required"> <span class="glyphicon glyphicon-info-sign" @click="showHelp" style="cursor: pointer"></span>
                <label>等級:</label>
                <input type="number" min="1" max="999" name="grade" required="required">

                <input type="radio" name="servo" value="TW" required="required">台
                <input class="a1_orange" type="radio" name="servo" value="CN">陸

                <label>備註:</label>
                <input type="text" name="content" required="required">
                <input class="btn gl-btn-primary" type="submit" value="登記">
                <input class="btn gl-btn-default" type="reset" value="清除">
                <br>
                </form>
            </div>

        </div>

    </div>
</template>

<script>
    import GlCardLeft from "../../components/cardLeft";
    import GlTitle from "../../components/title";
    export default {
        components: {
            GlTitle,
            GlCardLeft
        },
        name: 'gl-fb-list-content',
        data() {
            return {
                showMenuButton: false,
                show: true,
                fbList: null,
                prompt:"",
                allGirl:null,
                getListGirl: null,
                addFBListGirl:null
            }
        }, methods: {
            clicked: function () {
                let showLog = this.$refs.showLog.classList;
                if (showLog.contains("glyphicon-triangle-bottom")) {
                    showLog.remove("glyphicon-triangle-bottom");
                    showLog.add("glyphicon-triangle-top");
                    this.show = true;
                } else {
                    showLog.add("glyphicon-triangle-bottom");
                    showLog.remove("glyphicon-triangle-top");
                    this.show = false;
                }

            },
            getImg:function(num){
                return '/common/girl/girl_'+num +'.jpg';
            },
            getName:function(num){
                return this.allGirl[num - 1 ].name;
            },
            showHelp:function(){
                glAlert("位置查詢","<img src='/common/img/UID_check.jpg' style='width: 100%;'>");
            },
            getGirl:function(type,star){
                let slType = $("#"+ type).val();
                let slStar = $("#" + star).val();
                if(slType == "" || slStar == ""){
                    return false;

                }
                let list = [];
                if(type == "getListType"){
                    this.getListGirl  =  list ;

                }else{
                    this.addFBListGirl = list;
                    $("#addFBNum").val("");
                }


                for(let i = 0; i < this.allGirl.length ; i ++){
                    if(this.allGirl[i].type == slType && this.allGirl[i].star == slStar){
                        list.push({"name": this.allGirl[i].name, "no":this.allGirl[i].no});
                    }
                }



            },changeGirl:function(obj){

                let num  = obj.target.value;
                if(num == ""){
                    $(".div-img img").attr("src","/common/girl/girl_0.jpg")
                }else{
                    $(".div-img img").attr("src",this.getImg(obj.target.value));
                }

             },search:function(obj){
                let _this = this;

                $.ajax({
                    url:"/api/inquiry/friendListQuery",
                    type:"POST",

                    data:{
                        myType: obj.target.myType.value,
                        myStar: obj.target.myStar.value,
                        myServer : obj.target.myServer.value,
                        mySelect : obj.target.mySelect.value,
                        myNum : obj.target.myNum.value
                    },
                    success: function(data){
                        data = JSON.parse(data);
                        if(data.status == "success"){
                            _this.fbList = data.data;
                        }
                     }
                    }
                );
            },
            addFriend:function(obj){
                let _this = this;


                $.ajax({
                        url:"/api/inquiry/addFriend",
                        type:"POST",

                        data:{
                            type: obj.target.type.value,
                            star: obj.target.star.value,
                            num : obj.target.num.value,
                            name : obj.target.name.value,
                            id : obj.target.id.value,
                            grade:obj.target.grade.value,
                            servo:obj.target.servo.value,
                            content:obj.target.content.value

                        },
                        success: function(data){
                            data = JSON.parse(data);
                            if(data.status == "success"){
                                glAlert("招募登記","已成功!!");


                                $.getJSON('/api/inquiry/friendList',function(data){
                                    if (data.status === "success") {
                                        _this.fbList = data.data
                                    }
                                });
                            }else{
                                glAlert("招募登記","出現問題 請再試!!<br>請確定全部資料正確!!");
                            }

                            return false;
                        }
                    }
                );

            }
        },
        created: function () {
            this.showMenuButton = (window.innerWidth < 768);
            this.show = (window.innerWidth >= 768);
        },
        props: ['promptData'],
        mounted: function () {
            let randomNumber = Math.floor((Math.random() * this.promptData.length) + 1);
            this.prompt  = this.promptData[randomNumber-1];
            this.$g.output = $(".list_output");
            this.$g.getFriendList('fbList',this);
            this.$g.getAllGirlList('allGirl',this);

        }
    }
</script>

<style>
    .add-fb {
        font-size: 18px;
    }

    .add-fb select {
        font-size: 18px;

    }

    .add-fb select {
        height: 34px;
        padding: 6px 12px;
        font-size: 14px;
        line-height: 1.42857143;
        color: #555;
        background-color: #fff;
        background-image: none;
        border: 1px solid hsla(42, 100%, 50%, 1);
    }

    .add-fb select:focus, .add-fb input[type=text]:focus, .add-fb input[type=number]:focus {
        box-shadow: 0 0 10px hsla(42, 100%, 50%, 0.8);
        border: 1px hsla(42, 100%, 50%, 0.8) solid;
        outline: 0;
    }

    .add-fb label {
        margin-top: 5px;
        width: 100%;
    }

    .add-fb input[type=text] {
        width: 100%;
    }

    #gl-fb-list-content {
        overflow: auto;

    }

    .add-fb button {
        margin-top: 5px;
    }

    .add-fb .div-select {
        float: left;
        width: 60%;
    }

    .add-fb .div-img {
        float: left;
        width: 40%;
    }

    .add-fb .div-img img {
        width: 100%;
    }

    .crop {
        height: 120px;
        overflow: hidden;
        float: left;
        min-width: 112px;
        margin-right: 5px;
    }

    .crop img {
        height: 200px;
        margin: -30px 0 0 0px;
    }

    .fb-list .bd-callout{
        overflow: hidden;

    }

    .fb-list .bd-title{
        margin-left: 10px;
        float: left;
        width: 100%;
    }

    .fb-list span{
        color: #000;
        font-weight: 100;
        margin: 0 5px 0 5px;
    }
</style>
