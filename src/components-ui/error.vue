<template>
    <v-flex xs12 pa-1 >
        <v-alert v-if="errorText[error]" :value="errorText[error] !== undefined" outline :color="color[error]" :icon="icon[error]">{{errorText[error]}}</v-alert>
    </v-flex>
</template>
<script>
    export default {
        props: {error:Number,text:String},
        commponents: {},
        name: 'gl-ui-error',
        data() {
            return {
                errorText:[undefined,"找不到有關數據!! 請再試!!","伺服器出現問題!! 請再試!!",this.text],
                color:[undefined,"error","primary","error"],
                icon:[undefined,"warning","priority_high","warning"]
            }
        }, methods: {}, beforeCreate() {
        }, created() {
        }, beforeMount() {
        }, mounted() {
        }, beforeUpdate() {
        }, updated() {
        },watch:{
            text(data){
                this.errorText[3] = data;
            }
        }
    }
</script>
