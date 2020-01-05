<template>
    <v-flex xs12>
        <gl-ui-title text="關於" h2 />
        <div class="f-18">
            這是同好寫的line 機械人喔! <br>
            可以加入群組 <br>
            <br>
            版本:{{ver}}<br>
            問題回報及建議:
            <router-link :to="langUrl() + '/more/feedback'">>點這<</router-link><br>
            Github:<a href="https://github.com/girls-frontline-toolset/line-bot">>點這<</a>
            <br>
            作者:本站長<br>
        </div>
    </v-flex>
</template>

<script>
    import GlUiTitle from "../title";
    export default {
        components: {GlUiTitle},
        name: 'gl-ui-line-bot-about',
        data() {
            return {
              ver:"V0.0"
            }
        }, methods: {},
      beforeCreate() {
        var _this = this;
        this.$s.getJSON('/api/line/text.json', function (json) {
          _this.ver = json.ver;
        });
        }
    }
</script>
