<template>
    <v-container grid-list-md pt-0>
        <v-layout row wrap>
            <v-flex xs12>
                <gl-ui-title text="NotFound, 404 error" h1></gl-ui-title>
            </v-flex>
            <v-flex xs8 text-xs-center style="font-size: 30px">
                404 error<br>
                此網頁不存在<br>
                如有問題 請回報!! 感謝!!<br>
                <router-link to="/more/feedback">>>點這<<</router-link><br>
                清除緩存或使用無痕式視窗以得到最新版的網頁
            </v-flex>
            <v-flex xs4>
                <img src="/common/img/IDW_LOVE.jpg" style="width: 100%;max-width: 300px">
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>

    import GlUiTitle from "../../components-ui/title";
    export default {
        components: {GlUiTitle},
        name: 'gl-ui-page-not-found',
        data() {
            return {
                carousel: null
            }
        }
    }
</script>
