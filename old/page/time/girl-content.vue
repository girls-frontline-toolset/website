<template>
    <div class="row">
        <div class="col-sm-8">
            <gl-card-left title="提示" :content="prompt"></gl-card-left>
            <gl-title type="1" icon-src="/common/img/t-doll.png" message="人型製造時間查詢"></gl-title>
            <div class="hotTime">
                <a href="javascript:" class="badge badge-success gl-badge" @click="badge(index)" v-for="(item,index) in hotTime">{{item.time}}</a>

            </div>
            <span class='gl-label'>建造時間:</span>
            <div>
                <form class="input-group" @submit.prevent="search()" >
                <input type="number" style="width:100%" class="form-control" id="HH" placeholder="小時"
                       max="8" min="0" v-model="hh" tabindex="1" autofocus  />
                <span class="input-group-btn grid"></span>
                <input type="number" style="width:100%" class="form-control" id="MM"  placeholder="分鐘"
                       max="99" min="0" v-model="mm"  tabindex="2" />
                <span class="input-group-btn" >
                <input type="submit" class="btn gl-btn-primary" style="width: 100px"
                        tabindex="3" value="尋找">
                </span>
                    </form>
            </div>

            <div class="girl_output"></div>
        </div>
        <div class="col-sm-4">
            <gl-query-record image-src="/common/girl/girl_"
                             :content='content' :clickFunctoin="clearLog"></gl-query-record>
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
            GlTitle
        },
        name: 'gl-girl-content',
        data() {
            return {
                prompt: "",
                hh: null,
                mm: null,
                content: '[]',
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

                this.$ga.event('time','search_girl');

                $.getJSON("/api/inquiry/girl/" + hh + "/" + mm, function ($data) {
                    if ($data.status === "success") {
                        let outputHtml = "";
                        let dataList = [];

                        for (let listdata in $data.data) {
                            for (let star in $data.data[listdata]) {
                                let number = $data.data[listdata][star].no;
                                let name = $data.data[listdata][star].name;
                                if($data.data[listdata][star].src != null){
                                    name = $data.data[listdata][star].src;
                                }

                                let className = "";
                                switch($data.data[listdata][star].heavy){
                                    case "1":
                                        className = "is_heavy";
                                        break;
                                    case "0":
                                        className = "no_heavy";
                                        break;
                                }
                                outputHtml += "<a href='https://zh.moegirl.org/zh-hant/少女前线:"+name+"' target='_blank'><img class='"+className+"' src='/common/girl/girl_" + number + ".jpg' alt='"+name+"' title='"+name+"'></a>";
                                dataList.push(number);
                            }

                        }

                        $(".girl_output").html(outputHtml);
                        _this.pushData(hh+":"+mm,dataList);

                    } else if ($data.status === "empty") {
                        $(".girl_output").html(`<div class="alert alert-danger" role="alert">
                        <span class="glyphicon glyphicon-info-sign"></span>
                        找不到有關數據!! 請再試!!</div>`);
                    }
                }).fail(function() {
                    $(".girl_output").html(`<div class="alert alert-warning" role="alert">
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
                $setCookie("girlLog",this.content,7);
            },
            clearLog:function(){
                this.content = "[]";
                $setCookie("girlLog",this.content,-7);
            }

        },
        props: ['promptData'],
        mounted: function () {
            let randomNumber = Math.floor((Math.random() * this.promptData.length) + 1);
            this.prompt = this.promptData[randomNumber - 1];

                if (this.$route.query.search !== undefined) {
                let searchTime = this.$route.query.search.split(":");
                this.hh = searchTime[0];
                this.mm = searchTime[1];

                this.search();
            }

            let cookieData = $getCookie("girlLog");

            if(cookieData !== undefined){
                this.content = cookieData;
            }else{
                this.content = "[]";
            }

            this.$g.getHotTimeGirl('hotTime',this);

        }
    }
</script>

<style>
    .input-group .grid {
        width: 10px;
    }

    .gl-menu-down-icon {
        font-size: 25px;
        text-align: center;
        width: 100%;
        cursor: pointer;
        color: hsla(42, 100%, 50%, 0.8);
    }



    .girl_output {
        margin-top: 10px;

    }

    .girl_output img {
        margin-right: 5px;
        width: 30%;
    }

    @media (min-width: 600px){
        .girl_output img {
            width: 20%;
        }
    }

    .is_heavy{
        border: 3px solid #ed7b4a;

     }

    .no_heavy{
        border: 3px solid #a0c11b;
    }

    .gl-badge{
        background-color: hsla(42, 100%, 50%, 0.8);
        border-radius: 6px;
    }

</style>