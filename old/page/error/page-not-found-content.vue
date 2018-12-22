<template>
    <div >
        <gl-title message="404"></gl-title>

        <div class="page-not-found col-sm-8">
        404 error<br>
        此網頁不存在<br>
            如有問題 請回報!! 感謝!!<br>
            <router-link :to="langUrl() + '/more/feedback'">>>點這<<</router-link><br>
            清除緩存或使用無痕式視窗以得到最新版的網頁
        </div>
        <div class="col-sm-4">
            <img src="/common/img/IDW_LOVE.jpg" style="width: 100%;max-width: 300px">
        </div>
    </div>
</template>

<script>
    import GlTitle from "../../components/title";
    export default {
        components: {GlTitle},
        name: 'gl-page-not-found',
        data() {
            return {
                carousel: null
            }
        }
    }
</script>
<style>
    .page-not-found{
        font-size: 28px;
        text-align: center;
    }
</style>
