<template>
  <v-container grid-list-md pt-0>
    <v-layout row wrap>
      <v-flex xs12>
        <gl-ui-title :text="$t('nav.magical-tool.so-appetizing')" h1 icon="icon-make"></gl-ui-title>
      </v-flex>
      <v-flex xs12 md4>
          <v-layout row wrap pa1>
            <v-flex xs8 md12 pa-1>
              <v-text-field type="text" maxlength="2" v-model="text" :label="$t('make.string')" tabindex="1" @keyup.enter.native="generate()"></v-text-field>
            </v-flex>
            <v-flex xs4 md12 pa-1>
              <v-btn color="primary" block dark @click="generate()" tabindex="2">{{$t('make.generate')}}</v-btn>
            </v-flex>
            <v-flex md12 pa-1>
              <a :download="str +'.png'" :href="base64String">
              <v-btn color="primary" block dark outline tabindex="3">{{$t('make.download')}}{{$t('make.bigImg')}}</v-btn>
              </a>
            </v-flex>
          </v-layout>
      </v-flex>
      <v-flex xs12 md8>
        <img ref="img" crossOrigin="anonymous" @load="imgLoaded()" style="width: 100%" :src="'https://www.ntw-20.com/api/line/ImgCool.php?str=' + encodeURIComponent(str) " alt="">
      </v-flex>
      <v-flex ref="debug">

      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
    import GlUiAlertText from "../../components-ui/make/alertText";
    import GlUiTitle from "../../components-ui/title";
    import mMeta from "../../mixin/mMeta.js";
    export default {
      components: {GlUiTitle, GlUiAlertText},
      mixins: [mMeta],
        props: [''],
        commponents: {},
        name: 'so-appetizing-content',
        data() {
            return {
              text:"真香",
              str:"真香",
              canvas:null,
              base64String:""
            }
        }, methods: {
          generate() {
            this.$ga.event('so-appetizing', 'generate');
            this.str = this.text;
          },
          imgLoaded() {
            var img = this.$refs['img'];
            let ctx = this.canvas.getContext('2d');

            img.crossOrigin = "anonymous";

            this.canvas.height = (img.naturalHeight/4 * 3);
            this.canvas.width = (img.naturalWidth/4 * 3);

            ctx.drawImage(img, 0, 0, (img.naturalWidth/4 * 3),(img.naturalHeight/4 * 3) );
            this.base64String = this.canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
          }
        }, beforeCreate() {
        }, created() {
        }, beforeMount() {
        }, mounted() {
        this.canvas = document.createElement("canvas");
        }, beforeUpdate() {
        }, updated() {
        }, render() {
        }
    }
</script>

<style>

</style>
