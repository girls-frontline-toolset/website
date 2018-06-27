<template>
    <h1 v-if="type === '1'"  :class="hasButton()" class="gl-title-h4">
        <img v-if="iconSrc" :src="iconSrc" class="icon"/>
        {{message}}
        <!-- <slot name="button"></slot> -->
        <button v-if="buttonText" type="button" class="btn gl-btn-primary" style="float: right;" @click="clicked">
        <span v-if="buttonIcon" class="glyphicon" :class="buttonIcon"></span>
            {{buttonText}}
        </button>
    </h1>
    <h2 v-else :class="hasButton()" class="gl-title-h4">
        <img v-if="iconSrc" :src="iconSrc" class="icon"/>
        {{message}}
        <!-- <slot name="button"></slot> -->
        <button v-if="buttonText" type="button" class="btn gl-btn-primary" style="float: right;" @click="clicked">
            <span v-if="buttonIcon" class="glyphicon" :class="buttonIcon"></span>
            {{buttonText}}
        </button>
    </h2>
</template>

<script>
    export default {
        props: ['type','message','iconSrc','buttonText','clickFunction','buttonIcon','functionDate'],
        name: 'gl-title',
         methods: {
            hasButton: function () {
                if (!!this.buttonText) {
                    return "gl-title-button"
                }
            },
             clicked:function(){
                 this.clickFunction(this.functionDate);
             }
        }
    }

</script>

<style>
    /**  h1{
          margin-top: 10px;
      }

      h2{
          margin-top: 10px;
      }
</style>