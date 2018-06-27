<template>
    <v-flex xs12>
        <gl-ui-title text="關於" h2 ></gl-ui-title>
        <div class="f-18">
            這是同好寫的line 機械人喔! <br>
            可以加入群組 <br>
            <br>
            版本:V1.1<br>
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
        props: [''],
        commponents: {},
        name: 'gl-ui-line-bot-about',
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