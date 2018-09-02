<template>
</template>

<script>
    export default {
        mixins: [],
        props: [''],
        commponents: {},
        name: 'gl-referrer',
        data() {
            return {}
        }, methods: {}, beforeCreate() {
        }, created() {
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
        }, beforeMount() {
        }, mounted() {
        }, beforeUpdate() {
        }, updated() {
        }, render() {
        }
    }
</script>
