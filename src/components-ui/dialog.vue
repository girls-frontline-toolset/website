<template>
        <v-dialog v-model="dialog" max-width="500">
            <v-toolbar dark :color="color[type]">
                <v-toolbar-title class="white--text">{{title}}</v-toolbar-title>
                <v-spacer/>
                <v-btn icon @click.native="dialog = false">
                    <v-icon>highlight_off</v-icon>
                </v-btn>
            </v-toolbar>
            <v-card>
                <v-card-text v-if="text"  v-html="text"/>
                <img v-if="img" :src="img" class="w-100">
            </v-card>
        </v-dialog>
</template>

<script>
    export default {
        name: 'gl-ui-dialog',
        data() {
            return {
                dialog:false,
                title:"",
                text:"",
                img:"",
                color:["gl-main-color","error","primary","error"],
                type:0,
            }
        }, methods: {
            glDialogText(title,text,type){
                this.title = title;
                this.text = text;
                this.dialog = true;
                this.img = "";
                if(!type){
                   type = 0;
                }
                this.type = type
            },
            glDialogImg(title, img){
                this.title = title;
                this.text = "";
                this.img = img;
                this.dialog = true;
                this.type = 0;
            }
        }, mounted() {
            this.$s.glDialog =  this;

        }
    }
</script>
