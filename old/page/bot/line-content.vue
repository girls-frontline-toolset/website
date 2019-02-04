<template>
    <div class="row">
        <div class="col-sm-4 ">
            <gl-title message="好友資料"></gl-title>
            <div class="line-bot-content">
                <div class="circle" style="width: 50%">
                    <img src="/common/img/line-bot-icon.jpg" alt="line icon" style="width: 100%">
                </div>
                <span>少女前線 時間查詢</span>
                @bnj2321p<br>
                <a href="https://line.me/R/ti/p/%40bnj2321p"><img style="height:36px;border: 0;" alt="加入好友"
                                                                  src="/common/img/zh-Hant.png"></a>
            </div>
            <gl-title message="QR CODE"></gl-title>
            <div v-if="showMenuButton"><span class="glyphicon glyphicon-triangle-bottom gl-menu-down-icon"
                                             @click="clicked" ref="showLog"></span></div>
            <img v-if="show" src="/common/img/line-bot.jpg" alt="line icon" style="width: 100%">

            <gl-title v-if="show" message="關於"></gl-title>
            <div v-if="show" class="line-bot-info" >
                這是同好寫的line 機械人喔! <br>
                可以加入群組 <br>
                <br>
                版本:V1.1<br>
                問題回報及建議:
                <router-link :to="langUrl() + '/more/feedback'">>點這<</router-link>
                <br>
                作者:本站長<br>
                **禁止用作商業用途**
            </div>

        </div>
        <div class="col-sm-8">
            <gl-card-left title="提示" :content="prompt"></gl-card-left>
            <gl-title message="教學"></gl-title>
                <div class="line-help">

                    <div v-for="(list , index ) in description">
                    <span>{{list.title}}</span>
                    指令:
                    <div class="code" v-for="code in list.code">{{code}}</div>
                    例子:
                    <div class="example" v-for="example in list.example">{{example}}</div>
                    <span class="high"> {{list.high}}</span>
                        <hr v-show="index + 1  != description.length">
                    </div>

                </div>

            <gl-title  v-if="!show" message="關於"></gl-title>
            <div v-if="!show" class="line-bot-info">
                這是同好寫的line 機械人喔! <br>
                可以加入群組 <br>
                <br>
                版本:V1.1<br>
                問題回報及建議:
                <router-link :to="langUrl() + '/more/feedback'">>點這<</router-link>
                <br>
                作者:本站長<br>
                **禁止用作商業用途**
            </div>

        </div>
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
        name: 'gl-bot-line',
        data() {
            return {
                show: false,
                showMenuButton: false,
                prompt: "",
                description: null,
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

            }

        }, created: function () {
            this.showMenuButton = (window.innerWidth < 768);
            this.show = (window.innerWidth >= 768);
        },
        props: ['promptData'],
        mounted: function () {
            let randomNumber = Math.floor((Math.random() * this.promptData.length) + 1);
            this.prompt = this.promptData[randomNumber - 1];
        },
        beforeCreate: function () {
            var _this = this;
             $.getJSON('/api/line/text.json', function (json) {
                    _this.description = json.help;
                });


        }
    }
</script>

<style>
    .line-bot-content {
        font-size: 18px;
        text-align: center;
    }

    .line-bot-content span {
        font-size: 28px;
        width: 100%;
        display: block;
        color: hsla(42, 100%, 50%, 0.8);
        font-weight: bolder;
    }

    .line-bot-info {
        font-size: 18px;
    }

    .code {
        margin-left: 20px;
        margin-top: 5px;
        background-color: #f7f7f9;
        padding: 5px;
        border: 1px solid #eee;
        border-radius: .25rem;
    }

    .line-help {
        font-size: 18px;
        margin-bottom: 5px;
    }

    .line-help span{
        font-weight: bolder;
        display: block;
    }

    .line-help .high{
        font-size: 15px;
        color:#ac2925;
        margin-top: 5px;
    }


    .line-help hr{
        border: 1px hsla(42, 100%, 50%, 0.8) solid;
    }

    .example{
        border: 1px solid hsla(42, 100%, 50%, 0.8);
        margin-left: 20px;
        margin-top: 5px;
        background-color: #ffab4073;
        padding: 5px;
        border-radius: .25rem;

    }
</style>
