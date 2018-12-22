<template>
    <router-link :to="langUrl() + '/more/feedback'" class="unLine">
        <div class="no-select img-div">
            <v-icon size="40px" color="primary" style="width: 100%">delete</v-icon>
            <span style="font-size: 20px;">{{$t('img.remote')}}!!</span>
        </div>
    </router-link>
</template>

<script>
    export default {
        name: 'gl-ui-image-delete',
    }
</script>
