<template>
    <div class="line-bot-info">
        這APP 只是用APP來看這網頁!! <br>
        要是喜歡 可以下載來用喔W<br>
        未來可能加入手機使用優化<br>
        <br>
        版本:V{{ver}}<br>
        問題回報及建議:
        <router-link :to="langUrl() + '/more/feedback'">>點這<</router-link>
        <br>
        作者:本站長<br>
        **禁止用作商業用途**
    </div>
</template>

<script>
    export default {
        props:['ver'],
        name: 'gl-android-text',
        data() {
            return {
                version: null,
                link:"",
            }
        }

    }
</script>
