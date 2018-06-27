<template>
    <div class="row">
        <div class="col-sm-4 ">
            <gl-title message="Android App-資料"></gl-title>
            <div class="line-bot-content">
                <div class="circle" style="width: 50%">
                    <img src="/common/img/touch-icon-iphone-retina.png" alt="line icon" style="width: 100%">
                </div>
                <span>少女前線 時間查詢</span>
                版本:V{{version}}<br>
                <a @click="open(0)"><input type="button" value="下載" class="btn gl-btn-primary" /></a>
                <a @click="open(1)"><input type="button" value="Google 雲載點" class="btn gl-btn-default" /></a>

            </div>

            <gl-title v-if="show" message="關於"></gl-title>
            <gl-android-text v-if="show" :ver="version"></gl-android-text>
        </div>
        <div class="col-sm-8">
            <gl-card-left title="提示" :content="prompt"></gl-card-left>
            <gl-title message="預覽圖"></gl-title>
            <div class="android-img">
                <div class="col-sm-4" v-for="item in img"><img :src="item" ></div>
            </div>

            <gl-title  v-if="!show" message="關於"></gl-title>
                <gl-android-text v-if="!show" :ver="version"></gl-android-text>
        </div>
    </div>
</template>

<script>
    import GlTitle from "../../components/title";
    import GlCardLeft from "../../components/cardLeft";
    import GlAndroidText from "../../components/android-text";
    export default {
        components: {
            GlAndroidText,
            GlCardLeft,
            GlTitle},
        name: 'gl-android',
        data() {
            return {
                show: true,
                version: "1.0",
                link:"",
                googleLink:"",
                prompt:"",
                img:[]
            }
        }, methods:{
            open:function(num){
                this.$ga.event('android', 'download');
                switch (num){
                    case 0:
                        window.open(this.link);
                        break;
                    case 1:
                        window.open(this.googleLink);
                        break;

                }

            }

        }, created: function () {
            this.show = (window.innerWidth >= 768);

        },props: ['promptData'],
        mounted: function () {
            var _this = this;
            let randomNumber = Math.floor((Math.random() * this.promptData.length) + 1);
            this.prompt = this.promptData[randomNumber - 1];

            $.getJSON('/common/apk/version.json', function (json) {
                _this.version = json.version;
                _this.link = json.link;
                _this.googleLink = json.googleLink;
            });

            $.getJSON('/common/data/android-img.json', function (json) {
                _this.img = json.img;
            });
        },
        beforeCreate: function () {

        }
    }
</script>

<style>
    .android-img img{
        width: 100%;
        margin-top: 10px;
    }
</style>

<style scoped>

</style>