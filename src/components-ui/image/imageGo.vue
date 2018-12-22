<template>
    <v-btn style="max-width: 520px;margin: 5px auto 0" block outline color="secondary" dark :to="langUrl() + '/tool/image/all'">{{$t('img.more')}}</v-btn>
</template>

<script>
    export default {
        props: [''],
        commponents: {},
        name: 'gl-ui-image-go',
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
