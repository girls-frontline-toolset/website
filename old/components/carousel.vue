<template>
    <div class="carousel slide" data-ride="carousel" id="gl-carousel">
        <ol class="carousel-indicators">
            <li :class="{'active':index === 0 }" @click="number(index)" @mouseover="number(index)" v-for="(item, index) in carousel"></li>
        </ol>

        <div class="carousel-inner" >
            <div class="item" :class="{'active':index === 0 }" v-for="(item, index) in carousel">
                <img :src="item.src" :alt="item.alt" style="width:100%;">
            </div>
        </div>

        <a class="left carousel-control"  data-slide="prev" @click="prev()" style="background-image: unset;">
            <span class="glyphicon glyphicon-chevron-left"></span>
            <span class="sr-only">Previous</span>
        </a>
        <a class="right carousel-control" data-slide="next" @click="next()" style="background-image: unset;">
            <span class="glyphicon glyphicon-chevron-right"></span>
            <span class="sr-only">Next</span>
        </a>
    </div>
</template>

<script>
    export default {
        name: 'gl-carousel',
        methods: {
            prev: function() {
                $("#gl-carousel").carousel("prev");
            },
            next:function(){
                $("#gl-carousel").carousel("next");
            },
            number:function(number){
                $("#gl-carousel").carousel(number);
            }
        },
        data() {
            return {
                carousel:null
            }
        },created: function () {
            var _this = this;
            $.getJSON('common/data/carousel.json', function (json) {
                _this.carousel = json;
            });
        }
    }
</script>
