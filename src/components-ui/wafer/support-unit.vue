<template>
  <v-container grid-list-md>
    <v-layout row wrap v-for="(item ,key) in supportUnitList" :key="key">

      <v-flex xs12 pa-1 @click="open(key)" >
        <img :alt="item.name" :src="'/common/supportUnit/support-unit-' + item.id +'.jpg'" class="w-100 c-p"/>
      </v-flex>
          <v-flex xs6 pa-1 v-for="i in 5" v-if="toggle[key].open" :key="i">
            <gl-ui-title h2 :text="i + $t('make.star')"></gl-ui-title>
            <img :alt="i" class="no-select c-p"  @click="click(item,item.color,i)" :src="'/common/supportUnit/'+ item.id + '/' + i + '.png'" style="width: 100%"/>
          </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import GlUiTitle from "../title";

  export default {
    components: {GlUiTitle},
    mixins: [],
    props: ['changeData','clickType','bestArrange','supportUnitList'],
    commponents: {},
    name: 'gl-ui-support-unit-list',
    data() {
      return {
        toggle: []
      }
    }, methods: {
      click(item,color,i){
        console.log(arguments);
        if(this.clickType === "0"){
            this.changeData(eval(item['star'  + i]),color)
          }else if(this.clickType  === "1"){
            this.bestArrange(eval(item['bestArrangeStar'  + i]),color)
          }
      },
      open(key) {
        for (let i = 0; i < this.toggle.length; i++) {
          if (i === key) {
            this.$set(this.toggle[i], "open", !this.toggle[i].open);
          } else {
            this.$set(this.toggle[i], "open", false);
          }
        }
      },
      initList(){
        for (let i = 0; i < this.supportUnitList.length; i++) {
          this.toggle.push({"name": this.supportUnitList[i].name, "open": false})
        }
      }
    }, beforeCreate() {
    }, created() {
    }, beforeMount() {
    }, mounted() {
      if(this.supportUnitList){
        this.initList();
      }
    }, beforeUpdate() {
    }, updated() {
    }, render() {
    },watch:{
      supportUnitList(data){
       this.supportUnitList = data;
        this.initList();
      }
    }
  }
</script>

<style>
</style>
