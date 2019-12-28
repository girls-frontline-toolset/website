<template>
    <v-layout v-resize="onResize" justify-center>
        <v-container row pa-1>
            <v-flex xs12 id="fb-root"/>
            <v-flex xs12 id="fb-page">
                <gl-ui-title text="Facebook" h2/>
                <gl-ui-fb-page-small v-if="isShow" class="fb-page-small is-load"/>
                <gl-ui-fb-page-big  v-else class="is-load"/>
            </v-flex>
        </v-container>
    </v-layout>
</template>

<script>
    import GlUiTitle from "../title";
    import GlUiFbPageBig from "../facebook/fbPageBig";
    import GlUiFbPageSmall from "../facebook/fbPageSmall";

    export default {
        components: {GlUiFbPageSmall, GlUiFbPageBig, GlUiTitle},
        name: 'gl-ui-facebook',
        data() {
            return {
                isShow: false
            }
        }, methods: {
            onResize(){
                this.isShow = (this.$s.less960());
            }
        }
    }
</script>

<style>
    .fb-page-small {
        margin: 0 auto;
        width: 98%;
        height: 180px;
        max-width: 500px;
    }
</style>
