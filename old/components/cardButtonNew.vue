<template>
    <div class="card-button-new">

        <div v-if="title"  class="title">
            <span v-if="icon" class="glyphicon" :class="icon"></span>
            {{title}}
        </div>
        <div class="card-title" v-html="messageText">
        </div>
        <hr>
        <a v-if="src && button" :href="src" class="btn gl-btn-primary">{{button}}</a>
        <button v-if="!src && button" @click="show()" class="btn gl-btn-primary">{{button}}</button>
    </div>
</template>

<script>
    export default {
        props: ['message', 'title', 'button', 'href', 'src','className','icon'],
        name: 'gl-card-button-new',
        data() {
            return {
                messageText: "",

            }
        }, methods:{
            show:function(){
                if(this.title == "更新日誌"){
                    this.$ga.event('show','updateLog' );
                }
                glAlert(this.title,this.$parent.alertData);
            },
            getClass: function(){
                if(this.className){
                    return this.className;
                }else{
                    return "col-sm-6";
                }

            }

        },
        mounted: function () {
            if(Array.isArray(this.message)){
                if(this.message[0].info !== undefined){

                    let text = "";
                    switch (this.message[0].type){
                        case "0":
                            text += "[更新]";
                            break;
                        case "1":
                            text += "[圖片]";
                            break;
                        case "2":
                            text += "[修改]";
                            break;
                        case "3":
                            text += "[問題]";
                            break;
                        case "4":
                            text += "[新增]";
                            break;
                    }

                    let date = this.message[0].date.split("-");
                    text += "[" + date[1] +"月" +  date[2]+ "日" + "]";
                    text += this.message[0].info ;

                    this.messageText = text;
                }else{
                    this.messageText = this.message[0].text;
                }
            }else{
                this.messageText = this.message;

            }
        }
    }
</script>

<style>
    /** .card-button-new .title {
         font-size: 25px;
         color: hsla(42, 100%, 50%, 1);
         font-weight: bolder;
         margin-bottom: 10px;
     }

     .card-button-new {
         border: 1px solid rgb(225, 232, 237);
         border-top-color: #c96720;
         padding: 0 5px 5px 5px;
         margin-top: 5px;
         background: #fff;
         font-size: 18px;
     }

     .card-button-new hr {
         margin-top: 5px;
         margin-bottom: 5px;
     }
</style>
