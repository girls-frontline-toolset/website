import mArray from '../../../src/mixin/mArray.js'

describe('Test wafer list', () => {
  let array2D = [[1,1,5,8,6,1,8,2],[1,1,5,8,6,1,8,99],[1,1,5,8,6,1,8,2],[1,1,5,-5,6,1,8,2],[1,1,5,8,6,1,8,2],[1,1,5,8,6,1,8,2]];
  let array1D = [0,1,5,9,44,50,100,-1];


  it("Get Max Num For 2D", () => {
    expect(mArray.getMaxNum(array2D)).toEqual(99);
  });

  it("Get Max Num For 2D Max array", () => {
    expect(mArray.getMaxNum2D(array2D)).toEqual(99);
  });

  it("Get Max Num For 1D", () => {
    expect(mArray.getMaxNum(array1D)).toEqual(100);
  });

  it("Get Max Num For 1D Max array", () => {
    expect(mArray.getMaxNum1D(array1D)).toEqual(100);
  });

  it("Get min Num For 2D", () => {
    expect(mArray.getMinNum(array2D)).toEqual(-5);
  });

  it("Get min Num For 1D", () => {
    expect(mArray.getMinNum(array1D)).toEqual(-1);
  });

  it("Get Mix Num For 1D Mix array", () => {
    expect(mArray.getMinNum1D(array1D)).toEqual(-1);
  });

  it("Get Mix Num For 2D Mix array", () => {
    expect(mArray.getMinNum2D(array2D)).toEqual(-5);
  });


});

