<template>
</template>

<script>
  import mMeta from "../mixin/mMeta.js";
  export default {
        mixins: [mMeta],
        props: [''],
        components: {},
        name: 'gl-referrer'
        , created() {
            if (this.$route.query.url !== undefined){

                let url = this.$route.query.url;
                for(let data in this.$route.query){
                    if(data !== 'url'){
                        url += '&' + data + "="+this.$route.query[data];
                    }
                }
                window.location = url;
            }else{
                this.$router.push({path: '/'});
            }
        }
    }
</script>
