<template>
    <div class="app-gl">
        <router-link :to="langUrl() + item.link" v-on:click.native="click(index)" v-for="item,index in data"><div class="app-item col-sm-3" :style="isMO()">
            <img class="circle" :src="item.icon" style="width: 50%">
            <span>{{item.text}}</span>
        </div></router-link>
    </div>
</template>

<script>
    export default {
        name: 'gl-app',
        data() {
            return {
                data: [{"text":"LINE 機械人","icon":"/common/img/line-bot-icon.jpg","link":"/bot/line"},
                    {"text":"Android App","icon":"/common/img/touch-icon-iphone-retina.png","link":"/tool/android"},
                    {"text":"Chrome App","icon":"/common/img/chrome-icon.png","link":"/tool/chrome"},
                    {"text":"Line 群","icon":"/common/img/group-icon.jpg","link":"/more/line"},]
            }
        }, methods:{
            isMO:function(){
                if(window.innerWidth <= 768){
                    return{
                        "width": "50%",
                        "float": "left"
                    }
                }else{
                    return{}
                }


            },
            click:function(data){
               this.$ga.event('index-button', this.data[data].text);
            }

        }, created: function () {
        }
    }
</script>

<style>
    /**  .app-gl {
          max-width: 929px;
          margin-top: 10px;
          text-align: center;
          -webkit-touch-callout: none;
          -webkit-user-select: none;
          -khtml-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
      }

      .app-gl span{
          font-size: 24px;
          width: 100%;
          display: block;
          color: hsla(42, 100%, 50%, 0.8);
          font-weight: bolder;
      }

</style>
