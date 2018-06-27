<template>
    <div>
        <gl-card-left title="提示" :content="prompt"></gl-card-left>
        <gl-title icon-src="/common/img/line.png" message="LINE群"></gl-title>
        <div class="row">

            <div class="col-sm-6 line-group-content">
                <div class="circle">
                    <img src="/common/img/group-icon.jpg" alt="line icon" style="width: 100%">
                </div>
                <span>少前同好群</span>
                歡迎各位新手,大佬和萌新 <a href="http://line.me/R/ti/g/lxSXMRTS7S">點擊加入</a>
            </div>
            <div class="col-sm-6">
                <img src="/common/img/group.jpg" alt="LINE群 QR code" style="width: 100%"/>

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
        name: 'gl-line',
        props: ['promptData'],
        data() {
            return {
                prompt: "",
            }
        }, methods: {}, created: function () {

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
        display:block;
        color: hsla(42, 100%, 50%, 0.8);
        font-weight: bolder;
    }

    .line-group-content {
        font-size: 18px;
        text-align:center;
    }

    .circle{
        width:100%;
        border-radius:50%;
        overflow:hidden;
        margin: 0 auto;

    }
</style>
