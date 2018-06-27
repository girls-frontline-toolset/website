<template>
    <v-flex sm12 xs12 md4 pr-1  ref="content">
        <gl-ui-title text="最新資訊" h2></gl-ui-title>
        <div ref="script"></div>
        <div class="fb-post" v-for="item in data" :data-width="width" :data-href="item.h"  data-show-text="true"></div>
    </v-flex>
</template>

<script>
    import GlUiTitle from "../title";
    export default {
        components: {GlUiTitle},
        props: [''],
        commponents: {},
        name: 'gl-ui-fb-new-post',
        data() {
            return {
                data: [{"h": "https://www.facebook.com/gf.txwy.tw/posts/647723305576582","s":0.835}, {"h": "https://www.facebook.com/gf.txwy.tw/photos/a.365254697156779.1073741828.306546406360942/647199302295649","s":1.07}],
                width:0,
                load:false,
                height:600
            }
        }, methods: {
        }, beforeCreate() {
            window.FB = undefined;
        }, created() {

        }, beforeMount() {

        }, mounted() {

            this.width = this.$refs.content.clientWidth;
            //console.log(window.FB);
            let dom = this.$refs.script;
            let script = document.createElement('script');
            script.setAttribute("type", "text/javascript");
            script.async;
            script.src = 'https://connect.facebook.net/zh_HK/sdk.js#xfbml=1&version=v3.0&appId=1862532710659470&autoLogAppEvents=1';
            dom.appendChild(script);
            //console.log(window.FB);
        }, beforeUpdate() {
        }, updated() {
        }, render() {
        }
    }
</script>