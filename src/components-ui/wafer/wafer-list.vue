<template>
  <v-expansion-panel class="wafer-list">
    <v-expansion-panel-content
      v-for="item ,key in items"
      :key="item.title"
    >
      <div slot="header">{{item.title}}</div>
      <v-card>
          <img @click="addWafer(subItem)" v-on:dragstart="dragStart" @mousedown="mouseDown" :data-key="key" :data-id="subKey" draggable="true" v-if="color === 1" v-for="subItem , subKey in item.items.blue" :src="'/common/cell/'+ subItem.gird +'/'+ subItem.position + '-' + subItem.color+'.png' ">
          <img @click="addWafer(subItem)" v-on:dragstart="dragStart" @mousedown="mouseDown" :data-key="key" :data-id="subKey" draggable="true" v-if="color === 0" v-for="subItem , subKey in item.items.orange" :src="'/common/cell/'+ subItem.gird +'/'+ subItem.position + '-' + subItem.color+'.png' ">
      </v-card>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script>
  export default {
    props: ['color','createWafer'],
    commponents: {},
    name: 'gl-ui-wafer-list',
    data() {
      return {
        cellList:null,
        items: [
          {
            title: '6 格',
            items: {blue:[],orange:[]}
          },
          {
            title: '5 格 一類',
            items: {blue:[],orange:[]}
          },
          {
            title: '5 格 二類',
            items: {blue:[],orange:[]}
          },
          {
            title: '4 格',
            items: {blue:[],orange:[]}
          },
          {
            title: '3 格',
            items: {blue:[],orange:[]}
          },
        ],
        pos:null
      }
    }, methods: {
     mouseDown(event){
         this.pos = [event.pageX, event.pageY];
      },
      dragStart(event){
        let map = ["orange","blue"];
        event.dataTransfer.setData("data", JSON.stringify(this.items[event.target.getAttribute("data-key")].items[map[this.color]][event.target.getAttribute("data-id")]));
        event.dataTransfer.setData("pos", JSON.stringify(this.pos));

      },
      addWafer(obj){
         this.createWafer(obj.gird, obj.position, obj.color, eval(obj.polygon));

      }
    },
    beforeCreate() {
    }, created() {
      let _this = this;
      this.$g.getCellList("cellList",this,function(){
        let map  = ["blue","orange"];

        for (let i = 0; i <_this.cellList.length; i++) {
          switch (_this.cellList[i].gird) {
            case '6':
              _this.items[0].items[map[_this.cellList[i].color]].push(_this.cellList[i]);
              break;
            case '5':
                if(_this.cellList[i].type === "1"){
                  _this.items[1].items[map[_this.cellList[i].color]].push(_this.cellList[i]);
                }else{
                  _this.items[2].items[map[_this.cellList[i].color]].push(_this.cellList[i]);
                }
              break;
            case '4':
              _this.items[3].items[map[_this.cellList[i].color]].push(_this.cellList[i]);
              break;
            case '3':
              _this.items[4].items[map[_this.cellList[i].color]].push(_this.cellList[i]);
              break;
          }
        }

        console.log(_this.items);
      });

    }, beforeMount() {
    }, mounted() {
    }, beforeUpdate() {
    }, updated() {
    }
  }
</script>

<style>
  .wafer-list img{
    width: 50%;
    cursor: pointer;
  }
</style>
