<template>
    <div>
        <gl-ui-announcement></gl-ui-announcement>
        <gl-ui-jumbotron></gl-ui-jumbotron>
        <gl-ui-event-doc></gl-ui-event-doc>
        <gl-ui-tool-list></gl-ui-tool-list>
        <gl-ui-featured-image v-if="! less960"></gl-ui-featured-image>
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
        props: [''],
        mixins: [mMeta],
        commponents: {},
        name: 'gl-ui-index',
        data() {
            return {
                less960:false
            }
        }, methods: {},
        beforeCreate: function () {
        }, created: function () {
            this.less960 =  this.$s.less960();
        }, beforeMount: function () {
        }, mounted: function () {
            this.$nextTick(() => this.$refs.newPost.run());
        }, beforeUpdate: function () {
        }, updated: function () {
        }
    }
</script>

<style>
    .fb-post span {
        display: block;
        margin: 0 auto;
    }
</style>
