<template>
    <div class="card-twitter" >
        <div class="image-twitter loadImg" ref="content" @click="click()">
            <div class='glyphicon-load load' ><span class='glyphicon glyphicon-refresh glyphicon-refresh-animate glyphicon-refresh-size'></span></div>
            <div v-if="item.img" class="pixiv-img" ref="img" :style="getHeight()">
                <iframe v-if="item.img != ''" v-on:load="completed" class="pixiv-ifame" style="overflow: hidden;" :style="zoom()" :width="item.img_w" :height="item.img_h" :src="'https://embed.pixiv.net/embed_mk2.php?id='+item.id+'_'+item.md5+'&size=large&border=off&done=null'" ></iframe>
            </div>
            <div v-if="item.img" class="pixiv-content">
                <span class="user">{{item.user}}</span><img src="/common/img/pixiv_logo.png">
                <span class="title">{{item.title}}</span>
                <span class="caption">{{item.caption}}</span>
                <span class="update" v-text="getDateFormat(item.update)"></span>
            </div>
        </div>
        <div class="twitter-tag no-select" v-if="item.tag.length != 0">
             <span class='tag label label-warning' v-for="t in item.tag" @click="clickTag(t)">
                    #{{t}}</span>
        </div>
    </div>
</template>

<script>
    export default {
        props:['item','completedFunction'],
        name: 'gl-card-twitter',
        data() {
            return {
                h: 0,
            }
        },
        methods: {
            clickTag:function(name){
                this.$router.push({path:'/tool/image/'+name});
            },
            completed:function(){
                if(this.item.img){
                    this.completedFunction();
                }
            },
            getDateFormat:function(date){

                var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

                var d = new Date(date);
                var hr = d.getHours();
                var min = d.getMinutes();

                if (min < 10) {
                    min = "0" + min;
                }

                var ampm = "AM";
                if( hr > 12 ) {
                    hr -= 12;
                    ampm = "PM";
                }
                var date = d.getDate();
                var month = months[d.getMonth()];
                var year = d.getFullYear();
                return(hr + ":"+ min + " " +  ampm + " - " + month + " " + date + ", " + year);
            },click:function(){
                if(this.item.img){
                    window.open("https://www.pixiv.net/member_illust.php?mode=medium&illust_id="+this.item.id);
                }
            },zoom:function(event){
                var clientWidth = this.$refs.content.clientWidth;
                var width = clientWidth / this.item.img_w ;

                this.h = this.item.img_h * width;
                //var clientHeight =  this.$refs.img.clientHeight
                return {
                    "-ms-transform": "scale("+width+")",
                    "-moz-transform": "scale("+width+")",
                    "-o-transform": "scale("+width+")",
                    "-webkit-transform": "scale("+width+")",
                    "transform": "scale("+width+")",
                }
            },
            getHeight:function(){
                return {"height":this.h + "px"}

            }
        }, beforeCreate: function () {
          //  console.log(this.item);
           // console.log(this.completedFunction);
            //console.log("created")
        },mounted:function(){
        },updated:function(){
        }
    }
</script>

<style>
    /**
        .twitter-tag {
            padding: 5px;
            width: 100%;
            border: 1px solid rgb(225, 232, 237);
            border-top: 0;
            background-color: #fff;
            border-radius: 0px 0px 4px 4px;
            overflow: auto;
        }

        .twitter-tweet {
            margin-bottom: 0 !important;
        }

        .card-twitter .loadImg{
            border: 1px solid rgb(225, 232, 237);
            background-color: #ffffff;
            margin-top: 10px;
        }

        .card-twitter {

        }

        .twitter-tag .tag {
            margin-right: 5px;
            margin-bottom: 2px;
            cursor: pointer;
            float: left;
        }

        .pixiv-img{
            border-radius: 4px 4px ;
        }

        .pixiv-img img{
            width: 100%;
            border-radius: 4px 4px 0px 0px;
        }

        .pixiv-embed{
            margin-top: 10px;
            border-radius: 4px 4px 4px 4px;
            cursor: pointer;
        }

        .pixiv-content{
            padding: 15px;

        }

        .pixiv-content .user{
            font-weight: bolder;
            width: 100%;
            margin-bottom: 5px;
        }

        .pixiv-content .title{
            margin-bottom: 5px;
            display: block;
            font-size: 24px;
        }

        .pixiv-content .caption{
            margin-bottom: 5px;
            display: block;
            overflow: hidden;
            width: 100%;
        }

        .pixiv-content .update{
            font-size: 12.25px;
            margin-bottom: 5px;
            display: block;
            color: rgb(105, 120, 130);
        }

        .pixiv-content img{
            float: right;
        }


        .pixiv-ifame{
            -ms-transform-origin: 0 0;
            -moz-transform-origin: 0 0;
            -o-transform-origin: 0 0;
            -webkit-transform-origin: 0 0;
            transform-origin: 0 0;
            border-width: 0;
            border-radius: 4px 4px 0px 0px;
        }
</style>
