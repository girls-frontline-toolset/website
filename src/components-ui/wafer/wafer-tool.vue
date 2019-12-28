<template>
  <div>
    <v-tabs
      slot="extension"
      centered
      show-arrows
      slider-color="gl-main-color"
      next-icon="navigate_next"
      prev-icon="navigate_before"
    >

      <v-tab v-for="(item, key) in tabList" :href="'#tab-' + key" :key="key" >
        {{$t(item.name)}}
      </v-tab>

      <v-tabs-items>
        <v-tab-item value="tab-0" key="0" :style="'height:' + height + ';overflow: auto'">
          <v-card flat>
            <gl-ui-wafer-list :cell-list="cellList" :create-wafer="createWafer" :color="selectColor"/>
          </v-card>
        </v-tab-item>
        <v-tab-item value="tab-1" key="1" :style="'height:' + height + ';overflow: auto'">
          <v-card flat>
            <gl-ui-support-unit-list :support-unit-list="supportUnitList" click-type="0" :change-data="changeGird"/>
          </v-card>
        </v-tab-item>
        <v-tab-item value="tab-2" key="2" :style="'height:' + height + ';overflow: auto'">
          <v-card flat>
            <gl-ui-support-unit-list :support-unit-list="supportUnitList"  click-type="1" :best-arrange="bestArrange" />
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </v-tabs>
  </div>


</template>

<script>
    import GlUiWaferList from "../../components-ui/wafer/wafer-list";
    import GlUiSupportUnitList from "./support-unit";
    export default {
      components: {GlUiSupportUnitList,GlUiWaferList},
        props: ['supportUnitList','bestArrange','changeGird','createWafer','selectColor','cellList'],
        name: 'gl-ui-wafer-tool-list',
        data() {
            return {
              tabList:[{name:"make.wafer-list"},{name:"make.support-unit-list"},{name:"make.best-sorting"}],
              height:'unset'
            }
        }, mounted() {
            if(this.$s.less600()){
                console.log(window.innerHeight);
                this.height = window.innerHeight - 50 +'px'
            }

        }
    }
</script>
