<template>
    <div>
        <gl-card-left title="提示" :content="prompt"></gl-card-left>
        <gl-title icon-src="/common/img/t-doll.png" message="少前 圖片庫 添加作品"></gl-title>
        <div ref="script"></div>
        <form class="image-add" v-if="step == 0 " @submit.prevent="send($event)">
            <span class='gl-label'>Email (選擇填寫):</span>
            <input type="email" name="email" v-model="email">

            <span class='gl-label'>網址(支援 pixiv 及 twitter):<span class="info">每網址一行</span></span>
            <span @click="showValue" class="getImage no-select">>提取教學<</span>
            <div class="value" v-if="valueIsClick">
                <span class="help-title no-select"><span class="glyphicon glyphicon-chevron-right"></span>twitter</span>
                <div v-if="!isShow">
                    <img src="/common/img/add-image/add-image-twitter-pc.jpg"/>
                </div>
                <div v-if="isShow">
                    <img src="/common/img/add-image/add-image-twitter-phone.jpg"/>
                </div>
                <span class="help-title no-select"><span class="glyphicon glyphicon-chevron-right"></span>pixiv</span>
                <div v-if="!isShow">
                    <img src="/common/img/add-image/add-image-pixiv-pc.jpg"/>
                </div>
                <div v-if="isShow">
                    <img src="/common/img/add-image/add-image-pixiv-phone.jpg"/>
                </div>
            </div>
            <div class="error" v-if="erUrl.length != 0">
                <span>網址錯誤:</span>
                <span v-for="item in erUrl">{{item.name}}</span>
            </div>
            <textarea v-model="textarea" style="height:200px" required @keyup.enter="enter()" @keyup="addLine($event)"
                      ref="url">
            </textarea>
            <input type="submit" value="繼續" class='btn gl-btn-primary'>
            <input type="reset" value="清除" class="btn gl-btn-default">
        </form>
        <div v-if="step == 1">
            <div v-if="isShow" class="row">
                <div class="col-sm-6" ref="list-4">
                    <gl-image-add-card
                            :ref="item.id"
                            v-for="item,index in data"
                            v-if="moIf(index,0,true)"
                            :item="item" :completed="completed" :tag-click="tagClick"
                            :change-option="changeOption" :index="index"
                            :select-option="selectOption[index]" :tag-list="tagList[index]" :enter-tag="enterTag"
                    ></gl-image-add-card>
                </div>
                <div class="col-sm-6" ref="list-4">
                    <gl-image-add-card
                            :ref="item.id"
                            v-for="item,index in data"
                            v-if="moIf(index,1,false)"
                            :item="item" :completed="completed" :tag-click="tagClick"
                            :change-option="changeOption" :index="index"
                            :select-option="selectOption[index]" :tag-list="tagList[index]" :enter-tag="enterTag"
                    ></gl-image-add-card>
                </div>
            </div>

            <div v-if="!isShow" class="row">
                <div class="col-sm-4" ref="list-1">
                    <gl-image-add-card
                            :ref="item.id"
                            v-for="item,index in data"
                            v-if="index % 3 == 0 "
                            :item="item" :completed="completed" :tag-click="tagClick"
                            :change-option="changeOption" :index="index"
                            :select-option="selectOption[index]" :tag-list="tagList[index]" :enter-tag="enterTag"
                    ></gl-image-add-card>
                </div>
                <div class="col-sm-4" ref="list-2">
                    <gl-image-add-card
                            :ref="item.id"
                            v-for="item,index in data"
                            v-if="index % 3 == 1 "
                            :item="item" :completed="completed" :tag-click="tagClick"
                            :change-option="changeOption" :index="index"
                            :select-option="selectOption[index]" :tag-list="tagList[index]" :enter-tag="enterTag"
                    ></gl-image-add-card>
                </div>
                <div class="col-sm-4" ref="list-3">
                    <gl-image-add-card
                            :ref="item.id"
                            v-for="item,index in data"
                            v-if="index % 3 == 2 "
                            :item="item" :completed="completed" :tag-click="tagClick"
                            :change-option="changeOption" :index="index"
                            :select-option="selectOption[index]" :tag-list="tagList[index]" :enter-tag="enterTag"
                    ></gl-image-add-card>
                </div>
            </div>
            <div>
                <input type="button" value="提交" @click="submit()" class='btn gl-btn-primary'>
                <input type="button" value="返回" @click="returnStep()" class='btn gl-btn-default'>
            </div>
        </div>

    </div>
</template>

<script>
    import GlCardLeft from "../../components/cardLeft";
    import GlTitle from "../../components/title";
    import GlCardTwitter from "../../components/card-twitter";
    import mPixivTwitter from "../../mixin/mPixivTwitter";
    import mTagManagement from "../../mixin/mTagManagement";
    import GlImageAddCard from "../../components/image-add-card";
    export default {
        mixins: [mPixivTwitter,mTagManagement],
        props: ['promptData'],
        components: {
            GlImageAddCard,
            GlCardTwitter,
            GlTitle,
            GlCardLeft
        },
        name: 'gl-image-add-content',
        data() {
            return {
                email: "",
                textarea: "",
                prompt: "",
                erUrl: [],
                step: 0,
                data: [],
                girlList: null,
                npcList: [],
                sangvislList: [],
                isShow: false,
                less540: false,
                valueIsClick:false,
                militaryList: [],
                whiteForcesList: [],
                eildList: [],
            }
        }, methods: {
            showValue:function(){
              this.valueIsClick = !this.valueIsClick;

            },
            submit: function () {
                var _this = this;
                var postList = [];

                for (var i = 0; i < this.data.length; i++) {
                    if (this.data[i].md5 !== undefined) {
                        postList.push({
                            "type": this.data[i].type,
                            "id": this.data[i].id,
                            "tagAdd": this.data[i].tagAdd,
                            "md5": this.data[i].md5
                        });
                    } else {
                        postList.push({
                            "type": this.data[i].type,
                            "id": this.data[i].id,
                            "tagAdd": this.data[i].tagAdd
                        });
                    }
                }

                //console.log(postList);

                this.$ga.event('imageGallery','imageAdd');
                $.ajax({
                        url: "/api/inquiry/addImage",
                        type: "POST",
                        data: {
                            data: postList,
                            email: _this.email
                        },
                        success: function (data) {
                            data = JSON.parse(data);
                            if (data.status == "success") {
                                glAlert("添加作品", "已成功!!感謝你的推薦!! 請等待批核");
                                _this.step = 0;
                                _this.email = "";
                                _this.textarea = "";

                            } else {
                                glAlert("添加作品", "出現問題 請再試!!");
                            }
                        }
                    }
                );
            },
            returnStep: function () {
                this.step = 0;
            },
            addLine: function (obj) {
                let scrollHeight = obj.target.scrollHeight;
                let height = obj.target.style.height;
                let heightNum = parseInt(height);

                while (heightNum < scrollHeight) {
                    heightNum++;
                }

                while (heightNum > scrollHeight) {
                    heightNum -= 20;
                }

                if (heightNum <= 200) {
                    heightNum = 200;
                }

                obj.target.style.height = heightNum + "px";
            },
            enter: function () {
                this.erUrl = [];

                var line = this.$refs.url.value.split('\n');
                const regex = /^https:\/\/www\.pixiv\.net\/member\_illust\.php\?mode\=medium\&illust_id\=[0-9]*[\w\W]*$|^https:\/\/twitter\.com\/[\w\W]*\/status\/[0-9]*$|^https:\/\/twitter\.com\/[\w\W]*\/status\/[0-9]*\?s\=[0-9]+$|^^https:\/\/twitter\.com\/[\w\W]*\/status\/[0-9]*\/[\w\W]*|^https:\/\/www\.pixiv\.net\/member\_illust\.php\?illust_id\=[0-9]*[\w\W]*/g;


                for (var i = 0; i < line.length; i++) {
                    if (line[i] === undefined || line[i] === "") {
                        continue;
                    }
                    var string = "" + line[i];
                    var res = string.match(regex);
                    if (res === null) {
                        this.erUrl.push({"name": string});
                    }
                }
            },
            completed: function () {

            },
            send: function () {
                this.enter();
                //check is not same

                var line = this.$refs.url.value.split('\n');

                for (var i = 0; i < line.length; i++) {
                    for (var ii = 0; ii < line.length; ii++) {
                        if (i === ii || line[ii] === "") {
                            continue;
                        }
                        if (line[i] === line[ii]) {
                            glAlert("網址問題", "網址不能相同!!");
                            return;
                        }
                    }
                }

                if (this.erUrl.length === 0) {
                    this.data = [];
                    const regexPi = /^https:\/\/www\.pixiv\.net\/member\_illust\.php\?mode\=medium\&illust_id\=|^https:\/\/www\.pixiv\.net\/member\_illust\.php\?illust_id\=/g;
                    const regexTw = /^https:\/\/twitter\.com\/[\w\W]*\/status\//g;

                    for (var i = 0; i < line.length; i++) {
                        if (line[i] === "") {
                            continue;
                        }

                        var res = line[i].match(regexPi);
                        if (res !== null) {
                            var id = line[i].replace(regexPi, "");
                            id = "" + id.match(/^[0-9]+/g);
                            var hash = md5(id);

                            this.data.push({"type": "pixiv", "id": id, "md5": hash, "tag": [], "tagAdd": []})
                        } else {
                            var id = line[i].replace(regexTw, "");
                            id = "" + id.match(/^[0-9]+/g);
                            this.data.push({"type": "twitter", "id": id, "tag": [], "tagAdd": []})
                        }

                    }
                    this.step = 1;
                    var _this = this;

                    this.$nextTick(function () {
                        //for (var i = 0; i < this.data.length; i++) {
                        //console.log(_this.data[0].id);
                        //console.log(_this.$refs);
                        //_this.getPixivTwitterImg(0);
                        //}

                        for (var i = 0; i < _this.data.length; i++) {
                            //console.log(i);
                            //console.log(_this.$refs[_this.data[i].id][0]);
                            _this.getPixivTwitterImg(i);
                        }
                    });
                }
            }

        }, created: function () {
            let randomNumber = Math.floor((Math.random() * this.promptData.length) + 1);
            this.prompt = this.promptData[randomNumber - 1];
            this.isShow = this.$setting.less768;
            this.less540 = this.$setting.less540;
            this.$g.getAllGirlList('girlList', this);
            this.$g.getNpc('npcList', this);
            this.$g.getSangvisl('sangvislList', this);
            this.$g.getMilitary('militaryList', this);
            this.$g.getEild('eildList', this);
            this.$g.getWhiteForces('whiteForcesList', this);

        },

    }
</script>

<style>
    .image-add textarea {
        width: 100%;
        max-width: 100%;
        resize: none;
        overflow: hidden;
    }

    .image-add input[type=email] {
        width: 100%;
    }

    .image-add input[type=email]:focus, .image-add textarea:focus {
        box-shadow: 0 0 10px hsla(42, 100%, 50%, 0.8);
        border: 1px hsla(42, 100%, 50%, 0.8) solid;
        outline: 0;
    }

    .image-add textarea {
        width: 100%;
        background-color: rgb(255, 255, 255);
        display: block;
        border: 1px solid hsla(42, 100%, 50%, 1);
        resize: none;
        overflow: hidden;
        color: #000000;
    }

    .image-add div {
        color: #000000;

    }

    .image-add .error {
        color: #F53334;
        margin-bottom: 5px;
    }

    .image-add .error span {
        display: block;
        font-size: 18px;
    }

    .image-add-tag {
        clear: both;
        width: 100%;
        background-color: #ffff;
        padding: 5px;
        border: 1px solid rgb(225, 232, 237);
        border-radius: 0px 0px 4px 4px;
    }


    .image-delete-tag{
        clear: both;
        width: 100%;
        background-color: #ffff;
        padding: 5px;
        border: 1px solid rgb(225, 232, 237);
        border-radius: 0px 0px 4px 4px;
    }

    .image-delete-tag span{
        cursor: pointer;
    }
    .image-add-tag input[type=text] {
        border: 0px solid hsla(42, 100%, 50%, 1);
        box-shadow: 0 0 0px hsla(42, 100%, 50%, 0.8);
        outline: unset;
    }

    .image-add-tag select {
        outline: unset;
    }

    .image-tag {
        padding: 5px 5px 0 5px;
        background-color: #fff;
        border-right: 1px solid rgb(225, 232, 237);
        border-left: 1px solid rgb(225, 232, 237);
        overflow: overlay;
    }

    .image-tag .tag {
        cursor: pointer;
        margin-right: 5px;
        float: left;
        margin-bottom: 5px;
    }

    .gl-label .info {
        font-size: 15px;
        color: #ff0000;
    }

    .image-add .getImage{
        color: #3f3fae;
        font-size: 20px;
        cursor: pointer;
    }

    .value .help-title{
        display: block;
        font-size: 20px;
    }

    .value img{
        width: 100%;
    }

    .value{
        margin-bottom: 10px;
    }
</style>
