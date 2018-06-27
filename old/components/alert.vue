<template>
    <div id="gl-alert" v-if="isShow"  @click.self="close">
        <div class="alert alertContent glScrollbar" ref="alertContent" :style="getMargin(this)">
            <h4 class="font-title-style-reverse border-bottom h4-title twitter-title">{{title}}
                <div class="glyphicon glyphicon-remove cursor-pointer" style="float: right" @click.self="close"></div>
            </h4>

                <div class="alertData " v-html="text">

                </div>
                <a v-if="collGirlUrl !== undefined" :href="collGirlUrl">{{collGirlUrl}}</a>
            <gl-pixiv-alert v-if="isShowPixiv"></gl-pixiv-alert>
        </div>

    </div>
</template>

<script>
    import GlPixivAlert from "./pixiv-alert";
    export default {
        components: {GlPixivAlert},
        name: 'gl-alert',
        data() {
            return {
                isShow: false,
                text:"",
                title:"",
                height:0,
                width:0,
                isShowPixiv:false,
                collGirlUrl:""
            }
        },
        methods: {
            close:function(){
                this.isShow = false;
                this.isShowPixiv = false;
            },
            getMargin(obj){
                return {
                    "margin-left": "-" + this.width + "px",
                    "margin-top": "-" + this.height + "px",

                }
            },
            updatedHeightWidth(){


            }
        },
        created: function () {
            var _this = this;

            window.glAlert = function(title,text,components,data){
                _this._data.isShowPixiv =  false;
                _this._data.isShow = true;
                _this._data.title = title;
                _this.collGirlUrl = undefined;

                if(components === "pixiv"){
                _this._data.isShowPixiv =  true;
                _this._data.text = "";
                    //let height = (this.$refs.alertContent.clientHeight)/2;
                    //let width = (this.$refs.alertContent.clientWidth)/2;

                    //_this.$refs.alertContent.style.marginLeft = "-"+height+"px";
                    ////_this.$refs.alertContent.style.marginTop = "-"+width+"px";
                    return;
                }else if(components === "collGirl"){
                    _this.collGirlUrl = data;
                }


                _this._data.text = text;
            };
        },
        updated: function(){
            if(window.innerWidth >= 768){
                if(this.$refs.alertContent !== undefined){
                    let height = (this.$refs.alertContent.offsetHeight)/2;
                    let width = (this.$refs.alertContent.offsetWidth)/2;

                    this.$refs.alertContent.style.marginLeft = "-"+width+"px";
                    this.$refs.alertContent.style.marginTop = "-"+height+"px";



                }
            }
        }
    }
</script>

<style>
    /**   #gl-alert{
           position: fixed;
           z-index: 999999;
           width: 100%;
           height: 100%;
           background-color: rgba(0, 0, 0, 0.4);
           color: hsla(42, 100%, 50%, 0.8);
       }

       .alertContent{
           overflow: auto;
           background-color: #fff;
           max-height: 100%;
           width: 100%;
           position: fixed;
       }

       .alertData{
           max-height:80%;
           overflow: auto;
           font-size: 20px;
           font-weight: bolder;
       }

       @media (min-width: 590px){
           .alertContent {
               width: 500px;
               max-height: 70%;
               top: 50%;
               left: 50%;

           }
       }
</style>
