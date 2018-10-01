<template>
    <div>
        <gl-card-left v-if="!showMode" title="提示" :content="prompt"></gl-card-left>
        <gl-title message="收集率圖-槍"></gl-title>
        <div class="input-type">
            <span class='gl-label'>種類: </span>
            <img :src="getImageType(key)" :alt="key" :style="isClick('type',key)" @click="click('type',key)"
                 v-for="(item, key, index) in type">
        </div>

        <div class="input-star">
            <span class='gl-label'>星數: </span>
            <img :src="getImageStar(key)" :alt="key" :style="isClick('star',key)"
                 @click="click('star',key)" v-for="(item, key, index) in star">
            <img src="/common/img/star_other.gif" alt="star_other" :style="isClick('other',0)"
                 @click="click('other',0)">
        </div>
        <div class="input-get">
            <span class='gl-label'>獲得方法: </span>
            <span class="get no-select" @click="click('get',0)" :style="isClick('get',0)">普造</span>
            <span class="get no-select" @click="click('get',1)" :style="isClick('get',1)">重造</span>
            <span class="get no-select" @click="click('get',2)" :style="isClick('get',2)">其他</span>
        </div>

        <button class="btn gl-btn-primary" v-if="!showMode" type="button" style="width: 100px" @click="getList()">列出
        </button>
        <button class="btn gl-btn-default" v-if="!showMode" @click="reset()">重設</button>
        <gl-card-left v-if="showMode" title="統計" :content="cardDataLog()"
                      style="margin-top: 0;margin-bottom: 5px;"></gl-card-left>

        <button class="btn gl-btn-primary" type="button" style="width: 100px" @click="make()" v-if="showMode">製作
        </button>

        <div class="list_output coll" v-for="(item, key, index) in listData">
            <span class='gl-label' v-if="item.list.length !== 0">{{key}}: </span>
            <div v-if="item.list.length !== 0" :ref="'c_'+key">

               <img :src="getImage(item1.no)" :alt="getAlt(item1.no)" :title="getAlt(item1.no)"
                     v-for="(item1, key1, index1) in item.list"
                     @click="select(key,item1.no)"
                     :style="isSelect(key,item1.no)">

            </div>
        </div>

        <gl-card-left v-if="total !== 0 && !showMode" title="統計" :content="cardData()"></gl-card-left>
        <div v-if="total !== 0 && !showMode " style="margin-bottom: 10px">
            <button v-if="!isSafari" class="btn gl-btn-primary" type="button" style="width: 100px" @click="exportImg()">匯出成圖片</button>
            <button class="btn gl-btn-default" @click="saveUrl()">匯出網址</button>
        </div>
        <div id="outputList"></div>
        <a ref="save" download="girl-frontline-人形收集率圖.jpg">
            <canvas class="" ref="tempCanvas" width="1180" height="10" style="display: none"></canvas>
        </a>
    </div>
</template>

<script>
    import GlTitle from "../../components/title";
    import GlCardLeft from "../../components/cardLeft";
    export default {
        components: {
            GlCardLeft,
            GlTitle
        },
        name: 'gl-coll-girl',
        props: ['promptData'],
        data() {
            return {
                prompt: null,
                type: {"HG": true, "SMG": true, "RF": true, "AR": true, "MG": true, "SG": true},
                star: {"5": true, "4": true, "3": true, "2": true},
                other: [true],
                get: [true, true, true],
                girlList: null,
                exGirlList: null,
                listData: {
                    "HG": {"list": []},
                    "SMG": {"list": []},
                    "RF": {"list": []},
                    "AR": {"list": []},
                    "MG": {"list": []},
                    "SG": {"list": []}

                },
                total: 0,
                have: 0,
                girlListPointer: 0,
                showMode: false,
                time: "",
                isSafari:false,
                mapListData:{
                    "HG": {"list": []},
                    "SMG": {"list": []},
                    "RF": {"list": []},
                    "AR": {"list": []},
                    "MG": {"list": []},
                    "SG": {"list": []}
                }

            }
        }, methods: {
            make: function () {
                this.$ga.event('coll', 'girl_coll_make');
                //window.location.href = "/coll/girl";
                this.$router.push({name: undefined, query: ''});
                this.reset();
                this.showMode = false;

                var _this = this;
                $.when(
                    $.getJSON('/api/inquiry/allGirl'),
                    $.getJSON('/api/inquiry/allExGirl')
                ).done(function (result1, result2) {

                    if (result1[0].status === "success") {
                        _this.girlList = result1[0].data;
                        _this.girlListPointer = _this.girlList.length;
                    }

                    if (result2[0].status === "success") {
                        _this.exGirlList = result2[0].data;
                        for (var i = 0; i < result2[0].data.length; i++) {
                            _this.girlList.push({
                                "name": result2[0].data[i].name,
                                "no": (_this.girlList.length + 1),
                                "star": "6",
                                "type": result2[0].data[i].type,
                                "heavy": null
                            });
                        }
                    }
                });


            },
            getImageType: function (type) {
                return "/common/img/" + type + ".gif";

            },
            getImageStar: function (star) {
                return "/common/img/star_" + star + ".gif";

            },

            isClick: function (type, num) {
                switch (type) {
                    case "type":
                        if (this.type[num]) {
                            if (this.showMode) {
                                return {"opacity": 1, "cursor": "default"};
                            }
                            return {"opacity": 1};
                        } else {
                            if (this.showMode) {
                                return {"cursor": "default"};
                            }
                            return null;
                        }
                        break;
                    case "star":
                        if (this.star[num]) {
                            if (this.showMode) {
                                return {"opacity": 1, "cursor": "default"};
                            }
                            return {"opacity": 1};

                        } else {
                            if (this.showMode) {
                                return {"cursor": "default"};
                            }
                            return null;
                        }
                        break;
                    case 'other':
                        if (this.other[num]) {
                            if (this.showMode) {
                                return {"opacity": 1, "cursor": "default"};
                            }
                            return {"opacity": 1};
                        } else {
                            if (this.showMode) {
                                return {"cursor": "default"};
                            }
                            return null;
                        }
                        break;
                    case 'get':
                        if (this.get[num]) {
                            if (this.showMode) {
                                return {"opacity": 1, "cursor": "default"};
                            }
                            return {"opacity": 1};
                        } else {
                            if (this.showMode) {
                                return {"cursor": "default"};
                            }
                            return null;
                        }
                        break;
                }

            },
            click: function (type, num) {
                if (this.showMode) {
                    return;
                }
                switch (type) {
                    case "type":
                        this.$set(this.type, num, !this.type[num]);
                        break;
                    case "star":
                        this.$set(this.star, num, !this.star[num]);
                        break;
                    case "other":
                        this.$set(this.other, num, !this.other[num]);
                        break;
                    case "get":
                        this.$set(this.get, num, !this.get[num]);
                        break;

                }
                //this.$forceUpdate();

            },
            getAlt: function (num) {

                return this.girlList[num - 1].name;

            },
            reset: function () {
                for (var key in this.type) {
                    this.$set(this.type, key, true);
                }

                for (var key1 in this.star) {
                    this.$set(this.star, key1, true);
                }

                for (var key2 in this.get) {
                    this.$set(this.get, key2, true);
                }

                this.$set(this.other, 0, true);
                this.clear();
            },
            getImage: function (index) {
                //console.log(index);


                if (parseInt(index) < parseInt(this.girlListPointer)) {
                    return "/common/girl/girl_" + index + ".jpg";
                } else {
                    return "/common/exGirl/exgirl_" + (parseInt(index) - this.girlListPointer) + ".jpg";
                }

            },
            clear: function () {
                this.listData =  {
                    "HG": {"list": []},
                    "SMG": {"list": []},
                    "RF": {"list": []},
                    "AR": {"list": []},
                    "MG": {"list": []},
                    "SG": {"list": []}
                };

                this.mapListData = {
                    "HG": {"list": []},
                    "SMG": {"list": []},
                    "RF": {"list": []},
                    "AR": {"list": []},
                    "MG": {"list": []},
                    "SG": {"list": []}
                };
                this.total = 0;
                this.have = 0;
            },
            getList: function () {
                this.$ga.event('coll','girl_coll_getList');
                this.clear();
                var data = {
                    "HG": {"6": [], "5": [], "4": [], "3": [], "2": []},
                    "SMG": {"6": [], "5": [], "4": [], "3": [], "2": []},
                    "RF": {"6": [], "5": [], "4": [], "3": [], "2": []},
                    "AR": {"6": [], "5": [], "4": [], "3": [], "2": []},
                    "MG": {"6": [], "5": [], "4": [], "3": [], "2": []},
                    "SG": {"6": [], "5": [], "4": [], "3": [], "2": []}
                }

                for (var i = 1; i < this.girlList.length; i++) {
                    let type = this.girlList[i]["type"];
                    let star = this.girlList[i]["star"];
                    switch (this.girlList[i]["heavy"]) {
                        case "1":
                            if (this.get[1] !== true) {
                                continue;
                            }
                            break;
                        case "0":
                            if (this.get[0] !== true) {
                                continue;
                            }
                            break;

                        case null:
                            if (this.get[2] !== true) {
                                continue;
                            }
                            break;
                    }

                    if (this.girlList[i]["type"] === "" || this.type[type] !== true) {
                        continue;
                    }


                    if (star === "6") {
                        if (this.other[0] !== true) {
                            continue;
                        }
                    } else {
                        if (this.star[star] !== true) {
                            continue;
                        }
                    }

                    data[type][star].push(this.girlList[i]["no"]);
                }


                var list = {
                    "HG": {"list": []},
                    "SMG": {"list": []},
                    "RF": {"list": []},
                    "AR": {"list": []},
                    "MG": {"list": []},
                    "SG": {"list": []}
                };

                var listMap = {
                    "HG": {"list": []},
                    "SMG": {"list": []},
                    "RF": {"list": []},
                    "AR": {"list": []},
                    "MG": {"list": []},
                    "SG": {"list": []}
                }

                for (var item in data) {
                    //let length = 0 ;
                    for (var ii = 6; ii > 1; ii--) {
                        for (var iii = 0; iii < data[item][ii].length; iii++) {
                            this.total += 1;
                            //list[item].list[ii + "_" + data[item][ii][iii] ] =  false;
                            list[item].list.push({"no": data[item][ii][iii], "select": false});
                            listMap[item].list[data[item][ii][iii]] = list[item].list.length - 1;


                            //length++;
                        }
                    }
                    //list[item].list.length = length;
                }

                this.listData = list;
                this.mapListData = listMap;
                //console.log(this.listData );
                //console.log(listMap);

            },
            isSelect: function (type, no) {

                var select = this.listData[type].list[this.mapListData[type].list[no]].select;

                if(select === true || select === "true"){
                    if (this.showMode) {
                        return {"opacity": 1, "cursor": "default"};
                    }
                    return {"opacity": 1};
                }else{
                    if (this.showMode) {
                        return {"cursor": "default"};
                    }
                    return null;
                }

            },
            select: function (type, no) {
                if (this.showMode) {
                    return;
                }

                var index = this.mapListData[type].list[no];
                var select = this.listData[type].list[this.mapListData[type].list[no]].select;
                if(select){
                    this.have -= 1;

                } else {
                    this.have += 1;
                }
                this.$set(this.listData[type].list[index], "select", !this.listData[type].list[index].select);
                return false;

            },
            cardData: function () {
                var rate = ((parseInt(this.have) / parseInt(this.total) ) * 100).toFixed(2);
                return `收集數: ${this.have} / ${this.total} 收集率: ${rate}%`
            },
            cardDataLog: function () {
                var rate = ((parseInt(this.have) / parseInt(this.total) ) * 100).toFixed(2);
                return `收集數: ${this.have} / ${this.total} 收集率: ${rate}% 時間: ${this.time}`
            },
            saveUrl: function () {
                this.$ga.event('coll', 'girl_coll_saveUrl');
                let _this = this;
                $.ajax({
                        url: "/api/inquiry/addCollGirl",
                        type: "POST",
                        data: {
                            type: JSON.stringify(_this.type),
                            other: JSON.stringify(_this.other),
                            star: JSON.stringify(_this.star),
                            get: JSON.stringify(_this.get),
                            total: _this.total,
                            have: _this.have,
                            pointer: _this.girlListPointer,
                            data: _this.listData,
                        },
                        success: function (data) {
                            data = JSON.parse(data);
                            if (data.status == "success") {
                                glAlert("滙出網址", "已成功!!", "collGirl", "https://www.ntw-20.com/coll/girl?id=" + data.id);
                            } else {
                                glAlert("滙出網址", "出現問題 請再試!!");
                            }
                        }
                    }
                )

            },
            exportImg: function () {
                this.$ga.event('coll', 'girl_coll_exportImg');

                var date = new Date();
                var toDate = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();

                var tempCanHe = 60;

                for (var item in this.listData) {
                    if (this.listData[item].list.length !== 0) {

                        tempCanHe += (Math.ceil(this.listData[item].list.length / 12)) * 120;
                        //console.log(Math.ceil(this.listData[item].list.length / 12));
                        tempCanHe += 45;
                    }
                }

                this.$refs.tempCanvas.setAttribute("height", tempCanHe);

                //console.log(this);

                var rate = ((parseInt(this.have) / parseInt(this.total) ) * 100).toFixed(2);
                var imgX = 10, imgY = 60;

                var canvas = this.$refs.tempCanvas;
                var cts = canvas.getContext("2d");
                cts.clearRect(0, 0, canvas.width, canvas.height);
                cts.fillStyle = "#fff";
                cts.fillRect(0, 0, canvas.width, canvas.height);

                cts.fillStyle = "#ffb300";
                cts.fillRect(0, 50, canvas.width, 10);

                cts.fillStyle = "#ffb300";
                cts.font = "bold 30px Arial";
                cts.fillText("人形收集率圖", 10, 40);

                cts.fillStyle = "#383a38";
                cts.font = "20px Arial";
                cts.fillText("收集數: " + this.have + " / " + this.total + " 收集率: " + rate + "%", 200, 40);

                cts.font = "12px Arial";
                cts.fillText("https://www.ntw-20.com/coll/girl", 1000, 45);

                cts.font = "12px Arial";
                cts.fillText(toDate, 940, 45);


                cts.fillStyle = "#ffb300";
                cts.font = "20px Arial";
                cts.fillText("篩選:", 500, 40);

                var itemTypeX = 560;
                for (var itemType in this.type) {
                    cts.font = "12px Arial";
                    if (this.type[itemType]) {
                        cts.fillStyle = "#ffb300";

                    } else {
                        cts.fillStyle = "#383a38";
                    }
                    cts.fillText(itemType, itemTypeX, 30);
                    itemTypeX += 30;
                }

                var itemStarX = 560;
                for (var itemStar in this.star) {
                    cts.font = "12px Arial";
                    if (this.star[itemStar]) {
                        cts.fillStyle = "#ffb300";

                    } else {
                        cts.fillStyle = "#383a38";
                    }
                    cts.fillText(itemStar, itemStarX, 45);
                    itemStarX += 30;
                }

                if (this.other[0]) {
                    cts.fillStyle = "#ffb300";
                } else {
                    cts.fillStyle = "#383a38";
                }
                cts.fillText("特典人型", itemStarX, 45);
                itemStarX += 60;

                var getText = ["普造", "重造", "其他"];
                for (var xx = 0; xx < this.get.length; xx++) {
                    if (this.get[xx]) {
                        cts.fillStyle = "#ffb300";

                    } else {
                        cts.fillStyle = "#383a38";
                    }
                    cts.fillText(getText[xx], itemStarX, 45);
                    itemStarX += 30;
                }


                for (var item in this.listData) {
                    //console.log(this.listData[item].list);

                    if (this.listData[item].list.length !== 0) {
                        cts.globalAlpha = 1;
                        cts.fillStyle = "#ffb300";
                        cts.fillRect(10, imgY + 10, 5, 30);

                        cts.fillStyle = "#383a38";
                        cts.font = "bold 30px Arial";
                        cts.fillText(item, 20, imgY + 35);
                        imgY += 45;
                        imgX = 10;

                        //console.log( this.listData[item].list.length);
                        for (var ii = 0; ii < this.listData[item].list.length; ii++) {

                            if (this.listData[item].list[ii].select) {
                                cts.globalAlpha = 1;
                            } else {
                                cts.globalAlpha = 0.4;
                            }

                            var img = this.$refs["c_" + item][0].childNodes[ii];

                            //console.log(imgY);

                            cts.drawImage(img, 0, 32, 239, 300, imgX, imgY, 95.6, 120);
                            imgX += 95.6;

                            if (ii + 1 === this.listData[item].list.length) {

                                break;
                            }

                            if (((ii + 1) % 12) === 0) {
                                imgY += 120;
                                imgX = 10;
                            }

                        }
                        imgY += 115;

                    }


                }

                // var image = canvas.toDataURL('image/jpeg').replace('image/jpeg', "image/octet-stream");
                //window.location.href = image;
                this.$refs.save.setAttribute("download", "girl-frontline-人形收集率圖-" + toDate + ".jpg");
                this.$refs.save.setAttribute("href", canvas.toDataURL('image/jpeg').replace('image/jpeg', "image/octet-stream"));

                //window.location.href =  canvas.toDataURL('image/jpeg').replace('image/jpeg', "image/octet-stream");
                this.$refs.save.click();

            },decodeHtml: function (str) {
                var map =
                    {
                        '&amp;': '&',
                        '&lt;': '<',
                        '&gt;': '>',
                        '&quot;': '"',
                        '&#039;': "'"
                    };
                return str.replace(/&amp;|&lt;|&gt;|&quot;|&#039;/g, function (m) {
                    return map[m];
                });
            },

        },
        mounted: function () {

            this.isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

            let randomNumber = Math.floor((Math.random() * this.promptData.length) + 1);
            this.prompt = this.promptData[randomNumber - 1];
            var _this = this;
            var contList = 0 ;


            var query = function() {
                if (contList === 2) {
                    //console.log(_this.exGirlList);

                    for (var i = 0; i < _this.exGirlList.length; i++) {
                        _this.girlList.push({
                            "name": _this.exGirlList[i].name,
                            "no": (_this.girlList.length + 1),
                            "star": "6",
                            "type": _this.exGirlList[i].type,
                            "heavy": null
                        });
                    }

                    //console.log(_this.$route.query);

                    if (_this.$route.query.id !== undefined){
                        var data  = null;

                        $.ajax({
                            url: "/api/inquiry/getCollGirl/" + _this.$route.query.id,
                            success: function (data) {
                                data = JSON.parse(data);

                                if (data.status === "success"){

                                    _this.$ga.event('coll', 'girl_coll_view');

                                    var jsonData = _this.decodeHtml(data.data.data);
                                    _this.girlListPointer = data.data.pointer;
                                    _this.type = JSON.parse(_this.decodeHtml(data.data.type));
                                    _this.star = JSON.parse(_this.decodeHtml(data.data.star));
                                    _this.other = JSON.parse(data.data.other);
                                    _this.get = JSON.parse(data.data.getType);
                                    _this.total = parseInt(data.data.total);
                                    _this.have = parseInt(data.data.have);


                                    var time = data.data.time.split(" ")[0];
                                    _this.time = time;
                                    _this.girlList.splice(_this.girlListPointer, _this.girlList.length - _this.girlListPointer);

                                    for (var iii = 0; iii < _this.exGirlList.length; iii++) {
                                        _this.girlList.push({
                                            "name": _this.exGirlList[iii].name,
                                            "no": (_this.girlListPointer),
                                            "star": "6",
                                            "type": _this.exGirlList[iii].type,
                                            "heavy": null
                                        });
                                    }

                                    _this.listData = JSON.parse(jsonData);

                                    var mapList = {
                                        "HG": {"list": []},
                                        "SMG": {"list": []},
                                        "RF": {"list": []},
                                        "AR": {"list": []},
                                        "MG": {"list": []},
                                        "SG": {"list": []}
                                    };


                                    for(var item in _this.listData){
                                        for(var ii = 0 ; ii < _this.listData[item].list.length ; ii++){
                                            mapList[item].list[_this.listData[item].list[ii].no] = ii ;

                                        }
                                    }

                                    _this.mapListData = mapList;
                                    _this.showMode = true;

                                }else{
                                    _this.showMode = false;
                                    _this.$router.push({name: undefined, query: ''});
                                }
                            }
                        });
                    }
                }
            };

            this.$g.getAllGirlList('girlList',this,function(){
                _this.girlListPointer = _this.girlList.length;
                contList++;
                query();
            });

            this.$g.getAllExGirlList('exGirlList',this,function(){
                contList++;
                query();
            });

        }
    }
</script>

<style>

    .input-get .get {
        width: 28%;
        max-width: 102px;
        cursor: pointer;
        background: #383a38;
        color: #fff;
        padding: 10px;
        font-size: 30px;
        margin: 0 0 10px 10px;
        display: inline-block;
        font-weight: bold;
        border-radius: 5px;
        text-align: center;
        opacity: 0.5;
    }

    .coll img {
        opacity: 0.5;
        cursor: pointer;
        width: 20%;
    }
</style>