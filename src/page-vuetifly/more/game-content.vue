<template>
  <v-container grid-list-md pt-0>
    <v-layout row wrap>
      <v-flex xs12>
        <gl-ui-title text="Game" h1></gl-ui-title>
      </v-flex>
      <v-flex xs12 sm5 v-if="isLess600">
      <v-btn
        color="pink"
        dark
        @click.stop="drawer = !drawer"
      >
        Toggle
      </v-btn>

      <v-navigation-drawer
        v-model="drawer"
        absolute
        temporary
      >
        <v-card height="100%">
          <v-card-title>
            <v-tabs
              slot="extension"
              centered

              show-arrows
              slider-color="gl-main-color"
            >
              <v-tab v-for="i in 2" :href="'#tab-' + i" :key="i" >
                Item {{ i }}
              </v-tab>

              <v-tabs-items>
                <v-tab-item id="tab-1" key="1">
                  <v-card flat>
                    <gl-ui-wafer-list :create-wafer="createWafer" :color="selectColor"></gl-ui-wafer-list>
                  </v-card>
                </v-tab-item>
                <v-tab-item id="tab-2" key="2">
                  <v-card flat>
                    <gl-ui-support-unit-list :change-data="changeGird"></gl-ui-support-unit-list>
                  </v-card>
                </v-tab-item>
              </v-tabs-items>
            </v-tabs>
          </v-card-title>
        </v-card>
      </v-navigation-drawer>
      </v-flex>
      <v-flex xs12 sm5 v-else>
        <v-tabs
          slot="extension"
          centered

          show-arrows
          slider-color="gl-main-color"
        >
          <v-tab v-for="i in 2" :href="'#tab-' + i" :key="i" >
            Item {{ i }}
          </v-tab>

          <v-tabs-items>
            <v-tab-item id="tab-1" key="1">
              <v-card flat>
                <gl-ui-wafer-list :create-wafer="createWafer" :color="selectColor"></gl-ui-wafer-list>
              </v-card>
            </v-tab-item>
            <v-tab-item id="tab-2" key="2">
              <v-card flat>
                <gl-ui-support-unit-list :change-data="changeGird"></gl-ui-support-unit-list>
              </v-card>
            </v-tab-item>
          </v-tabs-items>
        </v-tabs>

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
          v-for="item , key in wafer"
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
                @click="click()"
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
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import GlUiTitle from "../../components-ui/title";
  import mGeneratePixi from "../../mixin/mGeneratePixi.js";
  import mHandlePixi from "../../mixin/mHandlePixi.js"
  import GlUiWaferList from "../../components-ui/wafer/wafer-list";
  import GlUiSupportUnitList from "../../components-ui/wafer/support-unit";

  export default {
    components: {GlUiSupportUnitList, GlUiWaferList, GlUiTitle},
    mixins: [mGeneratePixi, mHandlePixi],
    props: [''],
    commponents: {},
    name: 'gl-ui-game',
    data() {
      return {
        selectColor: 0,
        dropData: null,
        fab: [],
        isLess600: false,
        drawer: false,
      }
    }, methods: {
      click() {
        console.log("click")
      },
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

      },
    },
    beforeCreate() {
    }, created() {
      this.isLess600 = this.$s.less600();
      console.log(this.isLess600);
      if (this.selectColor === 0) {
        this.select.type = this.color["blue"];
      } else {
        this.select.type = this.color["orange"];
      }

      let _this = this;

      let script = document.createElement('script');
      script.src = '/common/lib/pixi.min.js';
      script.onload = function () {
        console.log(this.data);

        _this.$refs.loader.remove();
        _this.init();
      };

      document.body.appendChild(script);
    }, beforeMount() {
    }, mounted() {

      // document.addEventListener('fullscreenchange', exitHandler);
      // document.addEventListener('webkitfullscreenchange', exitHandler);
      // document.addEventListener('mozfullscreenchange', exitHandler);
      // document.addEventListener('MSFullscreenChange', exitHandler);
      //
      // let _this = this;
      //
      // function exitHandler() {
      //     if (!document.fullscreenElement && !document.webkitIsFullScreen && !document.mozFullScreen && !document.msFullscreenElement) {
      //         let canvas = document.getElementsByTagName("canvas");
      //         if(canvas.length >0){
      //             document.getElementsByTagName("canvas")[0].remove();
      //         }
      //     }
      // }
    }, beforeUpdate() {
    }, updated() {
    }, render() {
    }, watch: {
      fab(data) {
        console.log(data);

      }
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
