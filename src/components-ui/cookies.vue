<template>
   <div class="cookies" @click="close()" v-if="isShow">
        本網頁及APP使用cookies。您可以隨時通過設備設置這些內容。更多信息，請閱讀<router-link to="/more/privacy_policy">隱私政策</router-link>。繼續瀏覽，即表示您同意允許使用的Cookie。
       <v-icon style="float: right;color: white">close</v-icon>
   </div>
</template>

<script>
    export default {
        name: 'gl-ui-cookies',
        data() {
            return {
                isShow:true
            }
        }, methods: {
            close(){
                this.isShow = false
            }
        }
    }
</script>

<style>
    .cookies{
        position: fixed;
        bottom: 0;
        width: 100%;
        padding: 10px;
        background-color: #424242!important;
        color: white;
        z-index: 16;
        cursor: pointer;
    }
</style>
