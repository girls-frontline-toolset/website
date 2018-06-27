<template>
    <div class="row">
        <div class="col-sm-8">
            <gl-card-left title="提示" :content="prompt"></gl-card-left>
            <gl-card-button v-if="showMenuButton" title="規則"
                            message="參觀者 <span class='highlight'>需對登記者按讚</span><br>登記者 <span class='highlight'>將會回讚</span><br>
登記者 <span class='highlight'>需對其他玩家開放宿舍</span><br>登記者 <span class='highlight'>需對所有到訪者按讚</span>"
                            class-name="col-md-6"></gl-card-button>

            <div class="webmasters">
                <gl-title icon-src="/common/img/t-doll.png" message="讚友招募區域"></gl-title>
                <div class="bd-callout bd-color">
                    <div class="bd-content">
                        用戶名:<span>蘿莉控蘿莉</span> ID:<span>147867</span> 伺服:<span>TW</span>
                        <br>備註:<span>來互相點讚喔 ~ <- 這是站長 W</span>
                    </div>
                </div>
            </div>


            <gl-title message="讚友列表"></gl-title>
            <div class="like-list">
                <div class="bd-callout bd-color" v-for="item in likeList">
                    <div class="bd-content">
                        用戶名:<span>{{item.user_name}}</span> ID:<span>{{item.ID}}</span> 伺服:<span>{{item.server}}</span>
                        <br>備註:<span>{{item.content}}</span>
                    </div>
                </div>
            </div>

        </div>
        <div class="col-sm-4">
            <gl-card-button v-if="!showMenuButton" title="規則"
                            message="參觀者 <span class='highlight'>需對登記者按讚</span><br>登記者 <span class='highlight'>將會回讚</span><br>
登記者 <span class='highlight'>需對其他玩家開放宿舍</span><br>登記者 <span class='highlight'>需對所有到訪者按讚</span>"
                            class-name="col-md-6"></gl-card-button>

            <gl-title message="招募登記"></gl-title>
            <div v-if="showMenuButton"><span class="glyphicon glyphicon-triangle-bottom gl-menu-down-icon"
                                             @click="clicked" ref="showLog"></span></div>
            <div v-if="show" class="add-like">
                <form class="div-select" @submit.prevent="add($event)" >
                    <label>用戶名:</label> <br>
                    <input type="text"  name="username" required><br>

                    <label>UID:</label> <br>
                    <input type="text" style="width: 50%" name="id" required><span class="glyphicon glyphicon-info-sign" @click="showHelp"
                                                                style="cursor: pointer"></span>
                    <input type="radio" name="servo" value="TW" style="margin-left: 10px" required>台
                    <input class="a1_orange" type="radio" name="servo" value="CN">陸<br>

                    <label>備註:</label> <br>
                    <input type="text" name="text" required><br>
                    <input type="submit" class="btn gl-btn-primary" value="登記">
                    <input type="reset" class="btn gl-btn-default" value="清除">

                </form>
            </div>


        </div>

    </div>
</template>

<script>
    import GlCardLeft from "../../components/cardLeft";
    import GlTitle from "../../components/title";
    import GlCardButton from "../../components/cardButton";
    export default {
        components: {
            GlCardButton,
            GlTitle,
            GlCardLeft
        },
        name: 'app',
        data() {
            return {
                showMenuButton: false,
                show: false,
                likeList: null,
                prompt:""
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
            showHelp: function () {
                glAlert("位置查詢", "<img src='/common/img/UID_check.jpg' style='width: 100%;'>");
            },
            add:function(obj){
                let _this = this;
                $.ajax({
                        url:"/api/inquiry/addLikeList",
                        type:"POST",
                        data:{
                            username: obj.target.username.value,
                            id: obj.target.id.value,
                            servo:obj.target.servo.value,
                            text:obj.target.text.value
                        },
                        success: function(data){
                            data = JSON.parse(data);
                            if(data.status == "success"){
                                glAlert("招募登記","已成功!!");
                            }else{
                                glAlert("招募登記","出現問題 請再試!!<br>請確定全部資料正確!!");
                            }
                        }
                    }
                );

            }
        },
        created: function () {
            this.showMenuButton = (window.innerWidth < 768);
            this.show = (window.innerWidth >= 768);

            let _this = this;
            $.getJSON('/api/inquiry/LikeFBList', function (json) {
                if(json.status == "success"){
                    _this.likeList = json.data;
                }
            });
        },
        props: ['promptData'],
        mounted: function () {
            let randomNumber = Math.floor((Math.random() * this.promptData.length) + 1);
            this.prompt  = this.promptData[randomNumber-1];
        }
    }
</script>

<style>
    .add-like label {
        margin-top: 5px;
        width: 100%;
    }

    .add-like input[type=text] {
        width: 100%;
    }

    .add-like select:focus, .add-like input[type=text]:focus, .add-like input[type=number]:focus {
        box-shadow: 0 0 10px hsla(42, 100%, 50%, 0.8);
        border: 1px hsla(42, 100%, 50%, 0.8)solid;
        outline: 0;
    }

    .add-like button {
        margin-top: 5px;
    }

    .add-like {
        font-size: 18px;
    }

    .like-list .bd-content span ,.webmasters .bd-content span{
        color: #000;
        font-weight: 100;
        margin: 0 5px 0 5px;
    }

    .like-list .bd-content, .webmasters .bd-content {
        font-weight: bolder;
        color: hsla(42, 100%, 50%, 1);
    }

    .like-list .bd-callout {
        margin-top: 0.25rem;
        margin-bottom: 0.25rem;
    }


</style>
