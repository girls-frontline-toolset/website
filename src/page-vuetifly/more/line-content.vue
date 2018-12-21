<template>
    <v-container grid-list-md pt-0>
        <v-layout row wrap>
            <v-flex sm12>
                <gl-ui-card-left :content="prompt" icon="notifications"></gl-ui-card-left>
                <gl-ui-title text="LINE 群" h1 icon="icon-line-other"></gl-ui-title>
            </v-flex>

            <v-flex sm6 xs12 text-xs-center class="f-18">
                <v-avatar class="avatar-d w-100">
                    <img src="/common/img/group-icon.jpg" alt="line icon">
                </v-avatar>
                <span class="d-block">少前同好群</span>
                歡迎各位新手,大佬和萌新 <a href="http://line.me/R/ti/g/lxSXMRTS7S" target="_blank">點擊加入</a>
            </v-flex>

            <v-flex sm6 xs12 text-xs-center>
                    <img src="/common/img/group.jpg" alt="LINE群 QR code" width="60%">
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    import mPrompt from "../../mixin/mPrompt.js";
    import GlUiTitle from "../../components-ui/title";
    import GlUiCardLeft from "../../components-ui/cardLeft";
    import mMeta from "../../mixin/mMeta.js";
    export default {
        components: {
            GlUiCardLeft,
            GlUiTitle

        },
        name: 'gl-ui-line',
        mixins: [mPrompt,mMeta],
        data() {
            return {}
        }, methods: {},
        created: function () {

        },
        mounted: function () {
        }
    }
</script>
