<template>
    <router-link :to="langUrl() + '/more/feedback'"><div class="img-div no-select img-remove">
        <span><span class="glyphicon glyphicon-trash" style="font-size: 30px"></span>移除作品!!</span>
    </div></router-link>
</template>

<script>
    export default {
        commponents: {},
        name: 'gl-image-delete',

    }
</script>
