<template>
    <v-flex xs12>
        <gl-ui-title text="關於" h2 ></gl-ui-title>
        <div class="f-18">
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
    </v-flex>
</template>

<script>
    import GlUiTitle from "../title";
    export default {
        components: {GlUiTitle},
        mixins: [],
        props: ['ver'],
        commponents: {},
        name: 'gl-ui-chrome-about',
        data() {
            return {}
        }, methods: {}, beforeCreate() {
        }, created() {
        }, beforeMount() {
        }, mounted() {
        }, beforeUpdate() {
        }, updated() {
        }, render() {
        }
    }
</script>