<template>
    <div >
        <div class="container-gl">
            <gl-carousel></gl-carousel>
        </div>

        <gl-nav-button></gl-nav-button>
        <gl-twitter> </gl-twitter>
        <gl-sub-content></gl-sub-content>
    </div>
</template>

<script>
    import GlCarousel from "./carousel";
    import GlNavButton from "./navButton";
    import GlTwitter from "./twitter";
    import GlSubContent from "./subContent";
    export default {
        components: {
            GlSubContent,
            GlTwitter,
            GlNavButton,
            GlCarousel},
        name: 'gl-index-content',
        data() {
            return {
                carousel: null
            }
        }, created: function () {
            var _this = this;
            $.getJSON('common/data/carousel.json', function (json) {
                _this.carousel = json.carousel;
            });
        }
    }
</script>

