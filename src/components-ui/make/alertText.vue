<template>
    <v-alert :value="true"  class="f-18" icon="announcement" color="gl-announcement-color">
        {{text}}  <strong class="red--text">{{strong}}</strong>
    </v-alert>
</template>

<script>
    export default {
        mixins: [],
        props: ['text','strong'],
        commponents: {},
        name: 'gl-ui-alert-text',
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