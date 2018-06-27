<template>
    <router-link to="/tool/image_add" class="unLine">
        <div class="no-select img-div " style="font-size: 50%;">
            <v-icon size="90px" color="primary" style="width: 100%">add</v-icon>
            <span>添加更多作品!!</span>
        </div>
    </router-link>
</template>

<script>
    export default {
        name: 'gl-ui-image-add',
    }
</script>

<style>
    .img-div {
        cursor: pointer;
        padding: 10px;
        border: 1px solid #e1e8ed;
        background-color: #fff;
        border-radius: 4px 4px 4px 4px;
        margin-top: 10px;
        text-align: center;
    }


    .img-div span{
        font-size: 30px;
    }

</style>