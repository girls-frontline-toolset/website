<template>
    <div class="card "  :class="getClass()">
        <div class="card-gl ">
            <h4 v-if="title" class="card-header h4-title color-fff">
                <span v-if="icon" class="glyphicon" :class="icon"></span>
                {{title}}</h4>
            <div class="card-body card-body-gl padding-5px">
                <h4 class="card-title" v-html="messageText"></h4>
                <a v-if="src && button" :href="src" class="btn gl-btn-primary">{{button}}</a>
                <button v-if="!src && button" @click="show()" class="btn gl-btn-primary">{{button}}</button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['message', 'title', 'button', 'href', 'src','className','icon'],
        name: 'gl-card-button',
        data() {
            return {
                messageText: "",
            }
        },
        methods: {
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
    /** .card-gl {
         border: 1px hsla(42, 100%, 50%, 1)solid;
         background: hsla(42, 100%, 50%, 0.8);
         border-radius: 5px;
     }

     .card{
         margin-top: 10px;
     }

     @media (min-width: 992px) {
          .card{
              width: 100%;
              padding: 0;
          }
     }

     @media (max-width: 762px) {
         .card{
             width: 100%;
             padding: 0;
         }
     }

     .highlight{
         color:#c96720;

     }

     .card-body-gl{
         border-radius: 0 0 5px 5px;
     }


</style>
