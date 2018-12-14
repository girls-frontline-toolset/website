let MArray = {
  getMaxNum(array){
    if(array[0]){
      return this.getMaxNum2D(array)
    }else{
      return this.getMaxNum1D(array)
    }
  },
  getMaxNum2D(array){
    let max  = 0;
    for (let i = 0; i < array.length; i++) {
      for (let j = 0; j < array[0].length; j++) {
        if(max < array[i][j] ){
          max = array[i][j]
        }
      }
    }
    return max;
  },
  getMaxNum1D(array){
    let max  = 0;
    for (let i = 0; i < array.length; i++) {
         if(array[i] > max){
           max = array[i]
      }
    }
    return max;
  },
  getMinNum(array){
    if(array[0]){
      return this.getMinNum2D(array)
    }else{
      return this.getMinNum1D(array)
    }
  },
  getMinNum2D(array) {
    let min = null;
    for (let i = 0; i < array.length; i++) {
      for (let j = 0; j < array[0].length; j++) {
        if(min === null || min > array[i][j] ){
          min = array[i][j]
        }
      }
    }
    return min;
  },
  getMinNum1D(array) {
    let min = null;
    for (let i = 0; i < array.length; i++) {
          if(min === null || array[i] < min){
            min = array[i]
          }
    }
    return min;
  },
  clone(array){
    return JSON.parse(JSON.stringify(array));
  }
};

export default MArray;
