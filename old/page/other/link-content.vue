<template>
    <div>
        <gl-card-left title="提示" :content="prompt"></gl-card-left>
        <gl-title  message="相關網址"></gl-title>
        <div class="row link-content">
            <div class="col-sm-4"  @click="clickLink(item.src)" v-for="item in listData">
                <div class="background">
                    <img :src="getImage(item.bgImg)" :alt="item.name" :title="item.name">
                </div>
                <div class="info">
                    <span class="title">{{item.name}}</span>
                    <span class="glyphicon glyphicon-arrow-right"></span>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import GlCardLeft from "../../components/cardLeft";
    import GlTitle from "../../components/title";
    export default {
        components: {
            GlTitle,
            GlCardLeft
        },
        props: ['promptData'],
        data() {
            return {
                prompt: "",
                listData: null
            }
        },
        mounted: function () {
            let randomNumber = Math.floor((Math.random() * this.promptData.length) + 1);
            this.prompt = this.promptData[randomNumber - 1];
            let _this = this;
            $.getJSON('/common/data/link.json', function (json) {
                _this.listData = json.link;
            });
        }, methods: {
            clickLink:function(url){
                window.open(url)
            },
            getImage:function (path){
                return "/common/img/link/" + path ;


            }
        }
    }
</script>

<style>
    .line-group-content span {
        font-size: 28px;
        width: 100%;
        display:block;
        color: hsla(42, 100%, 50%, 0.8);
        font-weight: bolder;
    }

    .line-group-content {
        font-size: 18px;
        text-align:center;
    }

    .circle{
        width:100%;
        border-radius:50%;
        overflow:hidden;
        margin: 0 auto;

    }

    .link{
        font-size: 18px;
    }

    .link-content .col-sm-4{
        height: 150px;
        font-size: 20px;
        font-weight: bolder;
        color: hsla(42, 100%, 50%, 0.8);
        cursor: pointer;
        margin-bottom: 10px;
    }

    .link-content .background{
        height:100px;
        overflow: hidden;
        box-shadow: 1px 0 5px #888888;
    }

    .link-content img{
        width: 100%;
    }

    .link-content .info{
        background-color: #ffffff;
        height: 50px;
        border-radius: 0 0 5px 5px;
        box-shadow: 1px 1px 5px #888888;
    }

    .link-content .glyphicon{
        float: right;
    }
</style>
