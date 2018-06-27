<template>
    <div class="line-bot-info">
        Chrome 的插件!!<br>
        在電腦上更易查詢到時間!!<br>
        <br>
        版本:V{{ver}}<br>
        問題回報及建議:
        <router-link to="/more/feedback">>點這<</router-link>
        <br>
        作者:本站長<br>
        **禁止用作商業用途**
    </div>
</template>

<script>
    export default {
        props:['ver'],
        name: 'gl-chrome-text',
    }
</script>
