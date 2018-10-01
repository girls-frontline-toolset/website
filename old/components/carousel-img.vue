<template>
        <div id="carousel-img" class="carousel slide" data-ride="carousel" data-interval="2000">
            <ol class="carousel-indicators carousel-pixiv">
                <li data-target="#carouselvideo" :class="{'active':index === 0 }" @click="number(index)"
                    @mouseover="number(index)" v-for="(item, index) in carousel"></li>
            </ol>

            <div class="carousel-inner" role="listbox" style="max-height: 395px;">

                <div class="item" :class="{'active':index === 0 }" v-for="(item, index) in carousel">
                    <div class="">
                        <img :src="item" style="width: 90%">
                    </div>
                </div>

            </div>
        </div>
</template>

<script>
    export default {
        name: 'gl-carousel-img',
        props:["carousel"],
        data() {
            return {
            }
        }, methods: {
            prev: function () {
                $("#carousel-img").carousel("prev");
            },
            next: function () {
                $("#carousel-img").carousel("next");
            },
            number: function (number) {
                $("#carousel-img").carousel(number);
            },

        }, created: function () {
            var _this = this;

        }
    }
</script>