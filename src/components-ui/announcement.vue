<template>
    <v-alert :value="true" icon="announcement" class="f-18" color="gl-announcement-color">
        {{$t('t.announcement')}}:<strong>{{announcement}}</strong>
    </v-alert>
</template>
<script>
    import setting from "../setting";

    export default {
        name: 'gl-ui-announcement',
        data() {
            return {
                announcement:"",
            }
        },
        beforeCreate() {
          let _this = this;
          this.$s.getDefine(function(){
            _this.$nextTick(function(){
              _this.announcement = _this.$s.announcement
            });
          });
        }
    }
</script>

<style>
    .gl-announcement-color {
        color: #8a6d3b !important;
        background-color: #fcf8e3 !important;
        border-color: #faebcc !important;
    }
</style>
