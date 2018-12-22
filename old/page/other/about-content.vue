<template>
    <div>
        <gl-card-left title="提示" :content="prompt"></gl-card-left>
        <gl-title message="關於"></gl-title>
        <div class="row">
            <div class="col-sm-4">
                <div class="line-bot-content">
                    <div class="circle" style="width: 50%">
                        <img src="/common/img/about-icon.jpg" alt="line icon" style="width: 100%">
                    </div>
                    <span>從車站用血換了個蘿莉</span>
                </div>
            </div>
            <div class="col-sm-8" style="font-size: 18px">
                <span style="font-size: 50px">少女前線很休閒!</span> <br>
                <br>
                歡迎加入本LINE群啊
                <router-link :to="langUrl() + '/more/line'">>>點這<<</router-link>
                <br>
                使用LINE 機械人很方便喔
                <router-link :to="langUrl() + '/more/line'">>>點這<<</router-link>
                <br>
                如有任何問題回報及建議
                <router-link :to="langUrl() + '/more/feedback'">>>點這<<</router-link>
                <br>
                本人的網頁: <a href="http://kurumichan.com/">http://kurumichan.com/</a><br>
                Email: admin@ntw-20.com
                <gl-title message="少前名片"></gl-title>
                <img src="/common/img/gl-card.png" style="width: 100%">
                <gl-title message="其他"></gl-title>
                <div class="about-other">
                    <a href="https://www.facebook.com/SnSa.AW/"><img src="/common/img/facebook.png" ></a>
                    <a href="https://twitter.com/andy19974a22"><img src="/common/img/twitter.png" ></a>
                    <a href="https://home.gamer.com.tw/andy19974a22"><img src="/common/img/gamer.png"></a>
                </div>
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
        props: ['promptData'],
        data() {
            return {
                prompt: "",
            }
        },
        mounted: function () {
            let randomNumber = Math.floor((Math.random() * this.promptData.length) + 1);
            this.prompt = this.promptData[randomNumber - 1];
            let _this = this;


        }
    }
</script>

<style>
    .line-group-content span {
        font-size: 28px;
        width: 100%;
        display: block;
        color: hsla(42, 100%, 50%, 0.8);
        font-weight: bolder;
    }

    .line-group-content {
        font-size: 18px;
        text-align: center;
    }

    .circle {
        width: 100%;
        border-radius: 50%;
        overflow: hidden;
        margin: 0 auto;

    }

    .link {
        font-size: 18px;
    }

    .about-other img {
        margin: 5px;
        width: 28%;
    }
</style>
