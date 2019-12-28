<template>
  <v-expansion-panel class="wafer-list">
    <v-expansion-panel-content
      v-for="(item ,key) in items"
      :key="item.title"
    >
      <div slot="header">{{$t(item.title)}}</div>
      <v-card>
          <img :alt="item.no" v-for="(subItem , subKey) in item.items.blue" @click="addWafer(subItem)" v-on:dragstart="dragStart" @mousedown="mouseDown" :data-key="key" :data-id="subKey" draggable="true" v-if="color === 1"  :src="'/common/cell/'+ subItem.gird +'/'+ subItem.position + '-1.png' ">
          <img :alt="item.no" v-for="(subItem , subKey) in item.items.orange" @click="addWafer(subItem)" v-on:dragstart="dragStart" @mousedown="mouseDown" :data-key="key" :data-id="subKey" draggable="true" v-if="color === 0"  :src="'/common/cell/'+ subItem.gird +'/'+ subItem.position + '-0.png' ">
      </v-card>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script>
  export default {
    props: ['color','createWafer',"cellList"],
    name: 'gl-ui-wafer-list',
    data() {
      return {
        items: [
          {
            title: 'make.grid6',
            items: {blue:[],orange:[]}
          },
          {
            title: 'make.grid5-type1',
            items: {blue:[],orange:[]}
          },
          {
            title: 'make.grid5-type2',
            items: {blue:[],orange:[]}
          },
          {
            title: 'make.grid4',
            items: {blue:[],orange:[]}
          },
          {
            title: 'make.grid3',
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

      },
      addWafer(obj){
        console.log(obj.color);
        this.createWafer(obj.gird, obj.position, obj.color, eval(obj.polygon));
      },
      initItem(){
        let map  = ["orange","blue"];

        for (let i = 0; i <this.cellList.length; i++) {
          switch (this.cellList[i].gird) {
            case '6':
              this.items[0].items[map[this.cellList[i].color]].push(this.cellList[i]);
              break;
            case '5':
              if(this.cellList[i].type === "1"){
                this.items[1].items[map[this.cellList[i].color]].push(this.cellList[i]);
              }else{
                this.items[2].items[map[this.cellList[i].color]].push(this.cellList[i]);
              }
              break;
            case '4':
              this.items[3].items[map[this.cellList[i].color]].push(this.cellList[i]);
              break;
            case '3':
              this.items[4].items[map[this.cellList[i].color]].push(this.cellList[i]);
              break;
          }
        }
      }
    }, mounted() {
          if(this.cellList){
            this.initItem()
          }


    },watch:{
      cellList(data){
        this.cellList = data;
        this.initItem()
      }
    }
  }
</script>

<style>
  .wafer-list img{
    width: 50%;
    cursor: pointer;
  }
</style>
