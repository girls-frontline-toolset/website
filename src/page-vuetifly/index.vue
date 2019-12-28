<template>
    <div>
        <gl-ui-announcement/>
        <gl-ui-jumbotron/>
        <gl-ui-event-doc/>
        <gl-ui-tool-list/>
        <gl-ui-featured-image v-if="! less960"/>
    </div>
</template>

<script>
    import GlUiJumbotron from "../components-ui/jumbotron";
    import GlUiAnnouncement from "../components-ui/announcement";
    import GlUiToolList from "../components-ui/toolList";
    import GlUiTitle from "../components-ui/title";
    import GlUiFeaturedImage from "../components-ui/featuredImage";
    import GlUiFbNewPost from "../components-ui/facebook/fbNewPost";
    import GlUiEventDoc from "../components-ui/event-doc";
    import mMeta from "../mixin/mMeta.js";
    export default {
        components: {
            GlUiEventDoc,
            GlUiFbNewPost, GlUiFeaturedImage, GlUiTitle, GlUiToolList, GlUiAnnouncement, GlUiJumbotron},
        mixins: [mMeta],
        name: 'gl-ui-index',
        data() {
            return {
                less960:false
            }
        }, created() {
            this.less960 =  this.$s.less960();
        }, mounted() {
            this.$nextTick(() => this.$refs.newPost.run());
        }
    }
</script>

<style>
    .fb-post span {
        display: block;
        margin: 0 auto;
    }
</style>
