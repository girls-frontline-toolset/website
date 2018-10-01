<template>
    <div class="row">
        <div class="col-sm-4 ">
            <gl-title message="Chrome 插件-資料"></gl-title>
            <div class="line-bot-content">
                <div class="circle" style="width: 50%">
                    <img src="/common/img/chrome-icon.png" alt="line icon" style="width: 100%">
                </div>
                <span>少女前線 時間查詢</span>
                版本:V{{version}}<br>
                <a target="_blank" :href="link"><input type="button" value="下載" class="btn gl-btn-primary" /></a>
            </div>

            <gl-title v-if="show" message="關於"></gl-title>
            <gl-chrome-text v-if="show" :ver="version"></gl-chrome-text>
        </div>
        <div class="col-sm-8">
            <gl-card-left title="提示" :content="prompt"></gl-card-left>
            <gl-title message="預覽圖"></gl-title>
                <gl-carousel-img :carousel="carousel"></gl-carousel-img>
            <gl-title message="預覽片"></gl-title>
                <div class="col-sm-12 videoWrapper">
                    <iframe  src="https://www.youtube.com/embed/N_4v0ww20Lw" frameborder="0" allow="encrypted-media" allowfullscreen></iframe>
                </div>

            <gl-title v-if="!show" message="關於"></gl-title>
            <gl-chrome-text v-if="!show"  :ver="version"></gl-chrome-text>
        </div>
    </div>
</template>

<script>
    import GlTitle from "../../components/title";
    import GlCardLeft from "../../components/cardLeft";
    import GlChromeText from "../../components/chrome-text";
    import GlCarouselImg from "../../components/carousel-img";
    export default {
        components: {
            GlCarouselImg,
            GlChromeText,
            GlCardLeft,
            GlTitle},
        name: 'gl-chrome',
        data() {
            return {
                prompt:"",
                show:true,
                version:"",
                link:"",
                carousel: ["/common/img/chrome-img-1.jpg","/common/img/chrome-img-2.jpg","/common/img/chrome-img-3.jpg"]
            }
        }, methods: function () {


        }, created: function () {
                this.show = (window.innerWidth >= 768);
        },props: ['promptData'],
        mounted: function () {
            let randomNumber = Math.floor((Math.random() * this.promptData.length) + 1);
            this.prompt = this.promptData[randomNumber - 1];
        },
        beforeCreate: function () {
            var _this = this;
            $.getJSON('/common/data/chrome-version.json', function (json) {
                _this.version = json.version;
                _this.link = json.link;
            });
        }
    }
</script>

<style>
    .videoWrapper iframe {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }

    .videoWrapper {
        position: relative;
        padding-bottom: 56.25%; /* 16:9 */
        padding-top: 25px;
        height: 0;
    }
</style>