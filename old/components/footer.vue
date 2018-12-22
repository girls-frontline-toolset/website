<template>
    <div id="gl-footer" :style="displayNone()">
        <div class="footer_content">
        <ul>
            <li><router-link :to="langUrl() + '/more/feedback'">問題回報</router-link></li>
            <li><router-link :to="langUrl() + '/more/about'">Powered by 從車站用血換了個蘿莉</router-link></li>
            <li><img id="count_num" src="//counter1.fc2.com/counter_img.php?id=89451780" /></li>
        </ul>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'gl-footer',
        props:["s"],
        methods: {
            displayNone: function () {
                if (!this.s) {
                    return "display: none;"
                } else {
                    return "";
                }

            }
        }
    }
</script>

<style>
    /**  #gl-footer{
          border-top: 2px hsla(42, 100%, 50%, 0.8) solid;
          width: 100%;
          height: 20px;
          display: table;
      }

      #gl-footer ul{
         padding: 0;
          margin: 0;
      }

      #gl-footer li{
          display: inline;
          margin-left: 10px;
          color: hsla(42, 100%, 50%, 0.8);
          font-weight: bolder;
      }

      #gl-footer .footer_content{
          width: 100%;
          margin: 0 auto;
      }

      #gl-footer a{
          color: hsla(42, 100%, 50%, 0.8);
      }

</style>
