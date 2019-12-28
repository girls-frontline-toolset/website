<template>
    <v-alert :value="true"  class="f-18" icon="announcement" color="gl-announcement-color">
        {{text}}  <strong class="red--text">{{strong}}</strong>
    </v-alert>
</template>

<script>
    export default {
        props: ['text','strong'],
        name: 'gl-ui-alert-text'
    }
</script>
