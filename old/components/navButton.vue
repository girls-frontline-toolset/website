<template>
    <div class="container navButton-gl" >
        <div class="row" v-for="list , key in buttonList">

            <gl-nav-button-button class="col-sm-6" :message="item.message" :href="item.href" v-for="item in list"></gl-nav-button-button>

        </div>
    </div>
</template>

<script>
    import GlNavButtonButton from "./navButtonButton";
    export default {
        components: {GlNavButtonButton},
        name: 'gl-navButton',
        data() {
            return {
                buttonList: null
            }
        }, beforeCreate: function () {
            var _this = this;
            $.getJSON('/common/data/gl-navButton.json', function (json) {
                _this.buttonList = json;
            });
        }
    }
</script>

<style>
    /**  .navButton-gl {
          max-width: 929px;
      }
</style>


