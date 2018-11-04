<template>
  <v-container grid-list-md>
    <v-layout row wrap v-for="item ,key in supportUnitList">

      <v-flex xs12 pa-1 @click="open(key)" >
        <img :src="'/common/supportUnit/support-unit-' + item.id +'.jpg'" class="w-100 c-p"/>
      </v-flex>
          <v-flex xs6 pa-1 v-for="i in 5" v-if="toggle[key].open">
            <gl-ui-title h2 :text="i + '星'"></gl-ui-title>
            <img class="no-select c-p"  @click="changeData(item['star'  + i],item.color)" :src="'/common/supportUnit/'+ item.id + '/' + i + '.png'" style="width: 100%"/>
          </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import GlUiTitle from "../title";

  export default {
    components: {GlUiTitle},
    mixins: [],
    props: ['changeData'],
    commponents: {},
    name: 'gl-ui-support-unit-list',
    data() {
      return {
        supportUnitList: null,
        toggle: []
      }
    }, methods: {
      open(key) {
        for (let i = 0; i < this.toggle.length; i++) {
          if (i === key) {
            this.$set(this.toggle[i], "open", !this.toggle[i].open);
          } else {
            this.$set(this.toggle[i], "open", false);
          }
        }
      }
    }, beforeCreate() {
    }, created() {
      let _this = this;

      this.$g.getSupportUnitList('supportUnitList', this,
        function () {
          for (let i = 0; i < _this.supportUnitList.length; i++) {
            console.log(_this.supportUnitList[i])
            _this.toggle.push({"name": _this.supportUnitList[i].name, "open": false})
          }
        }
      );
    }, beforeMount() {
    }, mounted() {
    }, beforeUpdate() {
    }, updated() {
    }, render() {
    }
  }
</script>

<style>
</style>

<style scoped>

</style>
