<template>
    <div>
        <div v-if="announcement" class="alert alert-warning max-width-929 " style="margin-bottom: 5px">
            <span  class="glyphicon glyphicon-bell"></span>
            公告: {{announcement}}
        </div>
        <router-link to="/tool/image/all"><div class="alert alert-info max-width-929" style="margin-bottom: 5px">
            <span class="glyphicon glyphicon-picture"></span>
            <strong>圖片庫總數目:</strong>{{countNum}}<strong>最近加入:</strong>{{number}}
        </div></router-link>

        <div class="container-gl">
            <gl-carousel></gl-carousel>
        </div>
        <div class="row max-width-929">
            <gl-nav-button class="col-sm-12"></gl-nav-button>
            <gl-app class="col-sm-12"></gl-app>
        </div>
        <gl-twitter class="max-width-929"> </gl-twitter>
    </div>
</template>

<script>
    import GlCarousel from "../components/carousel";
    import GlNavButton from "../components/navButton";
    import GlTwitter from "../components/twitter";
    import GlSubContent from "../components/subContent";
    import GlPixiv from "../components/pixiv";
    import GlApp from "../components/app";
    import GlGanttChart  from "../components/gantt-chart";
    export default {
        components: {
            GlGanttChart,
            GlApp,
            GlPixiv,
            GlSubContent,
            GlTwitter,
            GlNavButton,
            GlCarousel},
        name: 'gl-index-content',
        data() {
            return {
                carousel: null,
                announcement: null,
                countNum:0,
                number:0,
            }
        }, beforeCreate: function () {
            var _this = this;
            $.getJSON('/common/data/carousel.json', function (json) {
                _this.carousel = json.carousel;
            });

            $.getJSON('/common/data/announcement.json', function (json) {
                _this.announcement = json.announcement;
            });

            $.getJSON('/common/data/image.json', function (json) {
                _this.countNum = json.count;
                _this.number = json.number;
            });
        }
    }
</script>
