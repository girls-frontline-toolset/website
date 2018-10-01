<template>
    <v-container grid-list-md pt-0>
        <v-layout row wrap>
            <v-flex xs12>
                <gl-ui-title :text="$t('title.h2.event-tw')" h1></gl-ui-title>
            </v-flex>
            <v-flex xs12>
                <gl-ui-event-schedule></gl-ui-event-schedule>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    import GlUiTitle from "../../components-ui/title";
    import GlUiEventSchedule from "../../components-ui/eventSchedule";
    export default {
        components: {GlUiEventSchedule, GlUiTitle},
        mixins: [],
        props: [''],
        commponents: {},
        name: 'gl-ui-schedule',
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

<style>

</style>