<template>
    <v-container grid-list-md pa-0 mt-1>
        <v-layout row wrap>
            <v-flex xs12>
                <gl-ui-title text="NotFound, 404 error" h1></gl-ui-title>
            </v-flex>
            <v-flex xs8 text-xs-center style="font-size: 30px">
                404 error<br>
                此網頁不存在<br>
                如有問題 請回報!! 感謝!!<br>
                <router-link :to="langUrl() + '/more/feedback'">>>點這<<</router-link><br>
                清除緩存或使用無痕式視窗以得到最新版的網頁
            </v-flex>
            <v-flex xs4>
                <img alt="IDW 404" src="/common/img/IDW_LOVE.jpg" style="width: 100%;max-width: 300px">
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    import mMeta from "../../mixin/mMeta.js";
    import GlUiTitle from "../../components-ui/title";
    export default {
        components: {GlUiTitle},
        name: 'gl-ui-page-not-found',
        mixins: [mMeta],
        data() {
            return {
                carousel: null
            }
        },
        beforeCreate() {
            let lang = "";
            let pathname = window.location.pathname;

            if (pathname.startsWith("/ja")){
                lang =  '&lang=ja';
            }else if (pathname.startsWith("/tw")){
                lang =  '&lang=tw';
            }else if (pathname.startsWith("/cn")){
                lang =  '&lang=cn';
            }else if (pathname.startsWith("/en")){
                lang =  '&lang=en';
            }

            window.location = '/404?url=' + pathname + window.location.search + lang;
        }
    }
</script>
