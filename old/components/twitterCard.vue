<template>
    <div >
        <div class="twitter-card col-sm-6">
            <gl-title :functionDate="number" :message="title" :button-text="buttonText"
                      :button-icon="buttonIcon" :clickFunction="toShowTwitter" >
            </gl-title>
            <div class="twitter-card-content">
                <a :id="contentId"></a>
            </div>
        </div>
    </div>
</template>

<script>
    import GlTitle from "./title";
    export default {
        components: {
            GlTitle},
        props: ['title','contentId','buttonText','clickFunction','number'],
        name: 'gl-twitter-card',
        data(){
            return{
                buttonIcon:"glyphicon-menu-down"
            }
        },
        methods: {
            toShowTwitter:function(number){
                this.$parent.toShowTwitter(number);
            },
            getIcon:function(){
                if(this.buttonText === "close"){
                    this.buttonIcon = "glyphicon-menu-up";
                }else{
                    this.buttonIcon = "glyphicon-menu-down";
                }
            }
        },
        watch: {
            buttonText(data){
                this.buttonText = data;
                this.getIcon();

            }

        }
    }
</script>
