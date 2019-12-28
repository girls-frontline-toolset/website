<template>
    <v-flex xs12 pa-1 >
        <v-alert v-if="errorText[error]" :value="errorText[error] !== undefined" outline :color="color[error]" :icon="icon[error]">{{errorText[error]}}<a v-if="error === 2 " href="https://www1.ntw-20.com" >後備伺服器</a></v-alert>
    </v-flex>
</template>
<script>
    export default {
        props: {error:Number,text:String},
        name: 'gl-ui-error',
        data() {
            return {
                errorText:[undefined,"找不到有關數據!! 請再試!!","伺服器出現問題!! 請再試!!",this.text],
                color:[undefined,"error","primary","error"],
                icon:[undefined,"warning","priority_high","warning"]
            }
        },watch:{
            text(data){
                this.errorText[3] = data;
            }
        }
    }
</script>
