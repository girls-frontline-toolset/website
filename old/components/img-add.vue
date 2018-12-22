<template>
    <router-link :to="langUrl() + '/tool/image_add'"><div class="img-div no-select">
        <span><span class="glyphicon glyphicon-plus" style="font-size: 50px"></span>添加更多作品!!</span>
    </div></router-link>
</template>

<script>
    export default {
        name: 'gl-image-add'
    }
</script>
