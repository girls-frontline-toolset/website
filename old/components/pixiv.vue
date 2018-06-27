<template>
    <div id="gl-carousel-pixiv" class="carousel slide" data-ride="carousel" data-interval="2000" style="height:350px;">
        <p class="logo"><a href="https://www.pixiv.net/" target="_blank"><img
                src="/common/img/pixiv_logo.png" alt="pixiv" width="60" height="24"></a></p>
        <ol class="carousel-indicators carousel-pixiv">
            <li data-target="#carouselvideo" :class="{'active':index === 0 }" @click="number(index)"
                @mouseover="number(index)" v-for="(item, index) in carousel"></li>
        </ol>

        <div class="carousel-inner" role="listbox" style="max-height: 395px;">

                <div class="item" :class="{'active':index === 0 }" v-for="(item, index) in carousel">
                    <div class="pixiv-embed" data-border="off" :data-id="getDataId(item)" data-size="medium"></div>
                </div>

        </div>

        <div class="otherFunction">
            <span class="glyphicon glyphicon-plus" @click="addNew()"></span><br>
            <span class="glyphicon glyphicon-refresh" @click="refresh()"></span>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'gl-pixiv',
        data() {
            return {
                carousel: null
            }
        }, methods: {
            prev: function () {
                $("#gl-carousel-pixiv").carousel("prev");
            },
            next: function () {
                $("#gl-carousel-pixiv").carousel("next");
            },
            number: function (number) {
                $("#gl-carousel-pixiv").carousel(number);
            },
            getDataId: function (obj) {
                return obj.dataId + "_" + obj.md5;
            },
            addNew:function(){
               glAlert("推薦圖片","","pixiv");

            },
            refresh:function(){
                var _this = this;
                $.getJSON('/api/inquiry/Pixiv', function (json) {
                    if(json.status == "success"){
                        _this.carousel = json.data;
                    }
                });

            }

        }, beforeCreate: function () {
            var _this = this;
            $.getJSON('/api/inquiry/Pixiv', function (json) {
                if(json.status == "success"){
                    _this.carousel = json.data;

                }
            });
        },
        updated: function () {
            $.get("/common/lib/pixiv.js", function () {
                let pixivDiv = document.getElementsByClassName("pixiv-embed");
                for (var i = 0; i < pixivDiv.length; i++) {
                    __pixiv__.embed(pixivDiv[i],{"border":"on"})

                }
            });


        }
    }
</script>


<style>
    /**  .pixiv-embed p {
          margin: 0 auto;
          text-align: center;
      }

      p.logo {
          height: 20px;
          text-align: left;
      }

      #gl-carousel-pixiv {
          padding: 6px 10px 10px;
          text-align: center;
          border: solid 2px hsla(42, 100%, 50%, 0.8);
          margin: 5px auto;
      }

      .carousel-pixiv {
          position: absolute;
          bottom: 10px;
          left: unset;
          z-index: 15;
          width: 10px;
          height: 50px;
          padding-left: 0;
          margin-left: -30%;
          text-align: center;
          list-style: none;
          right: 3%;
          top: 3%;
          display: grid;
      }

      .carousel-pixiv li {
          height: 50px;
          border-radius: 0;
          border: 1px solid hsla(42, 100%, 50%, 0.8);
          margin-bottom: 10px;
      }

      .carousel-pixiv .active {
          padding: 0;
          width: 10px;
          height: 50px;
          background-color: hsla(42, 100%, 50%, 0.8);
          margin: 0 1px 10px 1px;
      }


      #gl-carousel-pixiv .otherFunction {
          position: absolute;
          right: 5px;
          font-size: 20px;
          bottom:0;
          color: hsla(42, 100%, 50%, 0.8) ;
          cursor: pointer;
      }



</style>

