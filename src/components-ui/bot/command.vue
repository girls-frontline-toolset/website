<template>
    <v-flex xs12 class="line-help">
        <div v-for="(list , index ) in description">
            <span>{{list.title}}</span>
            指令:
            <div class="code" v-for="code in list.code">{{code}}</div>
            例子:
            <div class="example" v-for="example in list.example">{{example}}</div>
            <span class="high"> {{list.high}}</span>
            <hr v-show="index + 1  !== description.length">
        </div>
    </v-flex>
</template>

<script>
    export default {
        name: 'gl-bot-command',
        data() {
            return {
                description: null,
            }
        },
        beforeCreate: function () {
        this.$ga.event('line', 'command');
        var _this = this;
        this.$s.getJSON('/common/data/bot-line.json', function (json) {
            _this.description = json;
        });
        }
    }
</script>
