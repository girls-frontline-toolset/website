<template>
    <div >
        <div id="fb-root" ></div>
        <div id="fb-page">
            <gl-title message="facebook"></gl-title>
            <gl-fb-page-big v-if="isShow()" class="fb-page-big is-load"></gl-fb-page-big>
            <gl-fb-page-small v-else class="fb-page-small is-load"></gl-fb-page-small>
        </div>
    </div>
</template>

<script>
    import GlFbPageBig from "./fb/fbPageBig";
    import GlFbPageSmall from "./fb/fbPageSmall";
    import GlTitle from "./title";
    export default {
        components: {
            GlTitle,
            GlFbPageSmall,
            GlFbPageBig
        },
        name: 'gl-facebook',
        data() {
            return {
                carousel: null
            }
        }, methods: {
            isShow: function () {
                return (window.innerWidth > 991);
            }
        }
    }
</script>

