<template>
  <v-container grid-list-md pt-0 pa-0 mt-1>
    <v-layout row wrap>
      <v-flex xs12>
        <gl-ui-card-left :content="prompt" icon="notifications"/>
        <gl-ui-title :text="$t('title.h1.make.wafer')" h1/>
      </v-flex>
      <v-flex xs12 sm5 v-if="isLess600">
      <v-btn flat icon dark @click.stop="drawer = !drawer" color="primary"  >
        <v-icon>list</v-icon>
      </v-btn>
      <v-btn flat icon dark color="primary" @click="downloadCanvas" >
         <v-icon>arrow_downward</v-icon>
      </v-btn>
        <v-btn flat icon dark color="primary" :to="langUrl() + '/more/feedback'">
         <v-icon>bug_report</v-icon>
      </v-btn>

      <v-navigation-drawer
        v-model="drawer"
        absolute
        temporary
      >
        <v-card height="100%">
          <v-card-title>
            <gl-ui-wafer-tool-list :support-unit-list="supportUnitList" :best-arrange="bestArrange" :change-gird="changeGird" :create-wafer="createWafer" :select-color="selectColor"  :cell-list="cellList"/>
          </v-card-title>
        </v-card>
      </v-navigation-drawer>
      </v-flex>
      <v-flex xs12 sm5 v-else>
        <div class="white">
          <v-btn flat icon dark color="primary" @click="downloadCanvas">
            <v-icon>arrow_downward</v-icon>
          </v-btn>
          <v-btn flat icon dark color="primary" :to="langUrl() + '/more/feedback'">
            <v-icon>bug_report</v-icon>
          </v-btn>
        </div>
        <gl-ui-wafer-tool-list :support-unit-list="supportUnitList" :best-arrange="bestArrange" :change-gird="changeGird" :create-wafer="createWafer" :select-color="selectColor"  :cell-list="cellList"/>
      </v-flex>
      <v-flex xs10 ref="app" text--center sm6>
        <div ref="loader" class="loader">
          <div class="dot dot1"></div>
          <div class="dot dot2"></div>
          <div class="dot dot3"></div>
          <div class="dot dot4"></div>
        </div>
      </v-flex>
      <v-flex text-xs-center xs2 sm1 class="wafer-action-list">
        <v-speed-dial
          v-for="(item , key) in wafer"
          v-if="item !== null"
          :key="item.objDate.no"
          v-model="fab[key]"
          direction="left"
          :open-on-hover="!isLess600"
          transition="slide-y-reverse-transition"
        >

        <v-btn
                slot="activator"
                color="White"
                dark
                fab
                outline
                @mouseover="mouse('over',item)"
                @mouseout="mouse('out',item)"

        >
          <img alt="wafer"
                  :src="'/common/cell/' + item.objDate.gird + '/' + item.objDate.position + '-' + item.objDate.color+ '.png'"/>
        </v-btn>


          <v-btn fab dark small color="indigo" @click="rotation(item)">
            <v-icon>autorenew</v-icon>
          </v-btn>

          <v-btn fab dark small color="red" @click="deleteWafer(item)">
            <v-icon>delete</v-icon>
          </v-btn>

        </v-speed-dial>
      </v-flex>
      <v-flex text-xs-center xs12 id="debug">
        <a id="download" style="display: none">download</a>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import GlUiTitle from "../../components-ui/title";
  import mGeneratePixi from "../../mixin/mGeneratePixi.js";
  import mHandlePixi from "../../mixin/mHandlePixi.js";
  import mHandleDataPixi from "../../mixin/mHandleDataPixi.js";
  import GlUiWaferList from "../../components-ui/wafer/wafer-list";
  import GlUiSupportUnitList from "../../components-ui/wafer/support-unit";
  import GlUiWaferToolList from "../../components-ui/wafer/wafer-tool";
  import mPrompt from "../../mixin/mPrompt.js";
  import GlUiCardLeft from "../../components-ui/cardLeft";
  import mMeta from "../../mixin/mMeta.js";
  export default {
    components: {GlUiCardLeft, GlUiWaferToolList, GlUiSupportUnitList, GlUiWaferList, GlUiTitle},
    mixins: [mGeneratePixi, mHandlePixi,mHandleDataPixi,mPrompt,mMeta],
    name: 'gl-ui-wafer-content',
    data() {
      return {
        selectColor: 0,
        dropData: null,
        fab: [],
        isLess600: false,
        drawer: false,
        cellList:null,
        supportUnitList:null
      }
    }, methods: {
      mouse(action, obj) {
        switch (action) {
          case "over":
            if (this.isLess600) return;
            obj.scale.x *= 1.05;
            obj.scale.y *= 1.05;
            break;
          case "out":
            if (this.isLess600) return;
            obj.scale.x = 1;
            obj.scale.y = 1;
            break;
        }

      },downloadCanvas(){
        this.$ga.event('make-wafer', 'download');
        let canvas = this.getCanvas();
        let image = null;

        if(canvas.getContext('2d')  == null) {
          let outOfBox = {x:0,y:0};
          canvas = this.app.renderer.extract.canvas(this.app.stage);
          let ctx = canvas.getContext('2d');
          for (let i = 0; i < this.wafer.length; i++) {
            let x = this.wafer[i].x;
            let y = this.wafer[i].y;
            if (this.wafer[i].dataRotation) {
              switch (this.wafer[i].dataRotation - 90) {
                case 90:
                  x -= this.img.height;
                  break;
                case 180:
                  x -= this.img.width;
                  y -= this.img.height;
                  break;
                case 270:
                  y -= this.img.width;
                  break;
              }
            }
            if (x < outOfBox.x) {
              outOfBox.x = x
            }
            if (y < outOfBox.y) {
              outOfBox.y = y
            }
          }

          outOfBox = {x: Math.abs(outOfBox.x), y: Math.abs(outOfBox.y)};

          let imageData = ctx.getImageData(outOfBox.x, outOfBox.y, outOfBox.x + (this.width * this.data.length + this.start.x * 2), outOfBox.y + (this.width * this.data.length + this.start.x * 2));
          let newCan = document.createElement('canvas');
          newCan.width = this.width * this.data.length + this.start.x * 2;
          newCan.height = this.width * this.data.length + this.start.x * 2;
          let newCtx = newCan.getContext('2d');
          newCtx.putImageData(imageData, 0, 0);
          image = newCan.toDataURL("image/png").replace("image/png", "image/octet-stream");
        }else{
          image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
        }

        let now = new Date();
        let download = document.getElementById("download");
        download.setAttribute("href", image);
        download.setAttribute("download","www.ntw-20.com-" + now.getDate() + "-" + now.getMonth() + "-" + now.getFullYear() + "-" + now.getHours()  + "-" +  now.getMinutes()  + "-" +  now.getSeconds() + ".png");
        download.click();
      }
    },
    created() {
      this.$g.getCellList("cellList",this);
      this.$g.getSupportUnitList('supportUnitList', this);


      this.isLess600 = this.$s.less600();
      if (this.selectColor === 1) {
        this.select.type = this.color["blue"];
      } else {
        this.select.type = this.color["orange"];
      }

      let _this = this;

      let script = document.createElement('script');
      script.src = '/common/lib/pixi.min.js';
      script.onload = function () {
        _this.$refs.loader.remove();
        _this.init();
      };

      document.body.appendChild(script);
    }
  }
</script>

<style>

  .wafer-action-list .icon {
    height: unset;
    width: unset;
  }

  .wafer-action-list img {
    width: 120%;
  }
</style>
