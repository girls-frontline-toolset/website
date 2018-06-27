<template>
    <div >
        <div class="row ">
            <gl-twitter-card  number="0" :title="title[0]" :content-id="contentId[0]" :button-text="buttonText[0]"></gl-twitter-card>
            <gl-twitter-card  number="1" :title="title[1]" :content-id="contentId[1]" :button-text="buttonText[1]"></gl-twitter-card>
        </div>
        <div class="row">
            <gl-twitter-card  number="2" :title="title[2]" :content-id="contentId[2]" :button-text="buttonText[2]"></gl-twitter-card>
            <gl-twitter-card  number="3" :title="title[3]" :content-id="contentId[3]" :button-text="buttonText[3]"></gl-twitter-card>
        </div>
    </div>
</template>

<script>
    import GlTitle from "./title";
    import GlTwitterCard from "./twitterCard";
    export default {
        components: {
            GlTwitterCard,
            GlTitle},
        name: 'gl-twitter',
        data (){
            return {
                showTwitter: [false, false,false, false],
                buttonText: ["open", "open","open", "open"],
                twitterData:[{ widgetId:"936645892291010571"},
                    { widgetId:"935185693189402624"},
                    { widgetId:"936947924629458945"},
                    { widgetId:"936948564306960384"}
                ],
                title:["#少女前线 推文","#少女前線 推文","#소녀전선 推文","#少女戰線 推文"],
                contentId:["showTwitter1","showTwitter2","showTwitter3","showTwitter4"]

            }
        },
        methods: {
            toShowTwitter: function (number) {
                this.$ga.event('show','twitter_' + this.title[number] );

                if(this.showTwitter[number]){
                    //this.showTwitter[number] = false;
                    //this.buttonText[number] = "open";
                    this.$set(this.showTwitter,number,false);
                    this.$set(this.buttonText,number,"open");

                    $("#showTwitter" + (parseInt(number)+1)).html("")

                }else{
                    //this.showTwitter[number] = true;
                    //this.buttonText[number] = "close";

                    this.$set(this.showTwitter,number,true);
                    this.$set( this.buttonText,number,"close");

                    $("#showTwitter" + (parseInt(number)+1)).html("<div class='glyphicon-load' id='load'><span class='glyphicon glyphicon-refresh glyphicon-refresh-animate glyphicon-refresh-size'></span></div>");

                    const _twttrData = {
                        width: this.$el.clientWidth,
                        height: '700',
                        related: 'twitterdev,twitterapi',
                        chrome: 'transparent noheader nofooter noborders'
                    };

                    twttr.widgets.createTimeline(
                        {
                            sourceType: 'widget',
                            widgetId: this.twitterData[number].widgetId
                        },
                        document.getElementById(("showTwitter" + (parseInt(number)+1))),
                        _twttrData).then(
                            function(){
                               $("#showTwitter" + (parseInt(number)+1) + " div:first-child").remove();
                            }
                    );
                }
                //this.$forceUpdate();
            }
        },
        updated: function(){

        }
    }
</script>

<style>
    /**  .twitter-card {
          margin-top: 4px;
      }

      .twitter-card-content {
          width: 98%;
          margin: 0 auto;
          height: 90%;
          max-width: 520px;

      }

      #gl-twitter {
          max-width: 1040px;
          margin: 0 auto;
      }

      .twitter-title {
          height: 40px;
      }

      .glyphicon-refresh-animate {
          -animation: spin 1.2s infinite linear;
          -webkit-animation: spin2 1.2s infinite linear;
      }

      @-webkit-keyframes spin2 {
          from { -webkit-transform: rotate(0deg);}
          to { -webkit-transform: rotate(360deg);}
      }

      @keyframes spin {
          from { transform: scale(1) rotate(0deg);}
          to { transform: scale(1) rotate(360deg);}
      }

      .glyphicon-refresh-size{
          font-size: 30px;
          color: var(--main-background-color);
      }

      .glyphicon-load{
          text-align: center;
      }

</style>