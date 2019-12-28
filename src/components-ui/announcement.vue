<template>
    <v-alert :value="true" icon="announcement" class="f-18" color="gl-announcement-color">
        {{$t('t.announcement')}}:<strong>{{announcement}}</strong>
    </v-alert>
</template>
<script>
    export default {
        name: 'gl-ui-announcement',
        data() {
            return {
                announcement:this.$s.announcement,
            }
        }
    }
</script>

<style>
    .gl-announcement-color {
        color: #8a6d3b !important;
        background-color: #fcf8e3 !important;
        border-color: #faebcc !important;
    }
</style>
