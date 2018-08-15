<template>
    <v-flex xs12 class="line-help">
        <div>
            <span>不顯示梗圖</span>
            指令:
            <div class="code" >:</div>
            例子:
            <div class="example">:萌新求加</div>
            <div class="example">:110</div>
            <span class="high"></span>
            <hr >
        </div>
        <div v-for="(item,index) in role">
            文字:
            <div class="code" v-for="text in item.role">{{text}}</div>
            圖片:
            <v-flex xs12 v-if="item.imgUrl.length == 1">
                <img :src="'/api/line/img/' + img" v-for="img in item.imgUrl" style="width: 100%">
            </v-flex>
            <v-layout row wrap v-else>
                <v-flex xs12 sm6 v-for="img in item.imgUrl">
                    <img :src="'/api/line/img/' + img" style="width: 100%">
                </v-flex>
            </v-layout>
            <hr v-show="index + 1  !== role.length">
        </div>
    </v-flex>
</template>

<script>
    export default {
        name: 'gl-bot-img',
        data() {
            return {
                role: null
            }
        }, methods: {},
        beforeCreate() {
            this.$ga.event('line', 'image');
            var _this = this;
            $.getJSON('/api/line/text.json', function (json) {

                let list = [];

                for (let i = 0; i < json.role.length; i++) {
                    if (json.role[i].imgUrl) {
                        if (!Array.isArray(json.role[i].role)) {
                            json.role[i].role = [json.role[i].role];
                        }
                        list.push(json.role[i]);
                    }
                }
                _this.role = list;
            });
        }
    }
</script>