<template>
    <v-container grid-list-md pa-0 mt-1>
        <v-layout row wrap>
            <v-flex xs12>
                <gl-ui-title :text="$t('title.h2.event-tw')" h1 />
            </v-flex>
            <v-flex xs12>
                <gl-ui-event-schedule/>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    import GlUiTitle from "../../components-ui/title";
    import GlUiEventSchedule from "../../components-ui/rightContent/eventSchedule";
    import mMeta from "../../mixin/mMeta.js";
    export default {
        components: {GlUiEventSchedule, GlUiTitle},
        mixins: [mMeta],
        name: 'gl-ui-schedule'
    }
</script>
