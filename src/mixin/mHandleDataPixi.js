import mArray from './mArray.js'
let mHandleDataPixi = {
  data () {
   return{
   }
  },
  methods: {
    sumNumber(array , number ){
      if (array.length < 0 ) return 0 ;

      let sum = 0 ;
      for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array[i].length; j++) {
            if(array[i][j] === number){
              sum++;
            }
        }
      }
      return sum;
    },
    getFilterData(numData , num , j ,k, number){

      for (let l = 0; l < numData.length; l++) {
        for (let m = 0; m < numData[l].length; m++) {
          let total = 0 ;

          if(parseInt(numData[l][m]) === 1){
            let length = this.data.length;
            for (let n = 0; n < this.data.length; n++) {
              for (let o = 0; o < this.data[0].length; o++) {

                if(numData[(l + n)] === undefined  || numData[(l + n) ][(m+ o) % length ] === undefined )
                  continue;
                if(this.data[(j + n)] === undefined  || this.data[(j + n) ][(k + o) % length] === undefined )
                  continue;
                if(this.data[(j + n)][(k + o)% length] === number && parseInt(numData[(l + n)][(m + o)% length]) === 1 ){

                  total++;
                }
              }

              if(l + n > length || j + n > length){
                break;
              }
            }
            return total === num;

          }
        }
      }
      return false;
    },
    getCellByNum(data,number){

      let num = this.sumNumber(data,number);
      if (num === 0 ) return -1;
      let filterData = [];
      for (let i = 0; i < this.cellList.length; i++) {
            if(parseInt(this.cellList[i].gird) === num && parseInt(this.cellList[i].color) === this.selectColor){
                filterData.push(this.cellList[i]);
            }
      }

      let numData = [];
      for (let j = 0; j < data.length; j++) {
        for (let k = 0; k < data[j].length; k++) {


          if(data[j][k] === number){

            for (let i = 0; i < filterData.length; i++) {
              numData  = filterData[i].position.split("-");

              for (let l = 0; l < numData.length; l++) {
                numData[l] = [...numData[l]];
              }
              //

              let checkArray = JSON.parse(JSON.stringify(numData));


              if(this.getFilterData(mArray.clone(checkArray) , num, j, k,  number) ){
                return {"no":parseInt(filterData[i].no),"y":j,"x":k,"rotate":0};
              }else if(this.getFilterData(this.rotate2DArray(90,mArray.clone(checkArray)) , num, j, k,  number)){
                return {"no":parseInt(filterData[i].no),"y":j,"x":k,"rotate":90};
              }else if(this.getFilterData(this.rotate2DArray(180, mArray.clone(checkArray)), num, j, k, number)){
                return {"no":parseInt(filterData[i].no),"y":j,"x":k,"rotate":180};
              }else if(this.getFilterData(this.rotate2DArray(270,mArray.clone(checkArray)), num, j, k, number)){
                return {"no":parseInt(filterData[i].no),"y":j,"x":k,"rotate":270};
              }

            }
            return 0
          }
        }
      }

    }

  }

};



export default mHandleDataPixi;
