<template>
    <v-alert :value="true" icon="announcement" class="f-18" color="gl-announcement-color">
        {{$t('t.announcement')}}:<strong>{{announcement}}</strong>
    </v-alert>
</template>
<script>
    export default {
        props: [''],
        commponents: {},
        name: 'gl-ui-announcement',
        data() {
            return {
                announcement:this.$s.announcement,
            }
        }, methods: {},
        beforeCreate() {
        }, created() {
        }, beforeMount() {
        }, mounted() {
        }, beforeUpdate() {
        }, updated() {
        }, render() {
        }
    }
</script>

<style>
    .gl-announcement-color {
        color: #8a6d3b;
        background-color: #fcf8e3;
        border-color: #faebcc;
    }
</style>
