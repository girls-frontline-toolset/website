<template>
    <div  class="cleat-both">
        <gl-title message="分享"></gl-title>

        <a href="javascript: void(window.open('http://www.facebook.com/share.php?u='.concat(encodeURIComponent(location.href)) ));">
            <img id="facebook" class="share-icon" src="/common/img/fb-logo.png" alt="分享到FB"/></a>

        <a href="javascript: void(window.open('http://twitter.com/home/?status='.concat(encodeURIComponent(document.title)) .concat(' ') .concat(encodeURIComponent(location.href))));">
            <img id="twitter" class="share-icon" src="/common/img/tw-logo.png" alt="分享到twitter"/></a>

        <a href="http://line.naver.jp/R/msg/text/?少女前線 工具集 https://www.ntw-20.com">
            <img id="Line" class="share-icon" src="/common/img/line-logo.png" alt="分享到Line"/></a>
    </div>
</template>

<script>
    import GlTitle from "./title";
    export default {
        components: {GlTitle},
        name: 'gl-share'
    }
</script>

<style>
    /**   .share-icon {
           width: 32%;
           max-width: 90px;
       }
</style>