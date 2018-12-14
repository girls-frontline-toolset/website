import { mount , createLocalVue   } from '@vue/test-utils'
import MyComponent from '../../../../src/page-vuetifly/make/game-content.vue'
import Vuetify from 'vuetify';
import { snapshots , mountSetting} from '../../../common/ini.js';
import mHandleDataPixi from "../../../../src/mixin/mHandleDataPixi";


describe('test game content, mHandleDataPixi', () => {
  let wrapper, sumNumber, getCellByNum;

  beforeAll(() => {
    const localVue = createLocalVue();
    localVue.use(Vuetify);
    mountSetting.localVue = localVue;

    wrapper = mount(MyComponent,mountSetting);

    sumNumber = wrapper.vm.sumNumber;
    getCellByNum = wrapper.vm.getCellByNum;

    wrapper.setData({data: [
        [-1, -1, 1, 1, -1, -1, -1, -1],
        [-1, 1, 1, 1, 0, -1, -1, -1],
        [0, 0, 0, 0, 0, 0, -1, -1],
        [2, 2, 2, 2, 2, 2, 0, -1],
        [-1, 0, 0, 0, 3, 4, 4, 4],
        [-1, -1, 0, 3, 3, 3, 4, 0],
        [-1, -1, -1, 3, 0, 3, 4, -1],
        [-1, -1, -1, -1, 0, 0, -1, -1],
      ]});

  });

  function init(){
    wrapper.setData({color: {"orange_type":false,"blue_type":false}});
    wrapper.setData({cells:{"cells_1":false,"cells_2":false,"cells_3":false,"cells_4":false,"cells_5":false,"cells_6":false}});
  }

    it('sum number test case 1 ', () => {

      expect(sumNumber(wrapper.vm.data,1)).toBe(5);
    });

    it('sum number test case 2 ', () => {

      expect(sumNumber(wrapper.vm.data,2)).toBe(6);
    });

    it('sum number test case 3 ', () => {

      expect(sumNumber(wrapper.vm.data,3)).toBe(6);
    });

    it('find cell test case 1', () => {

      expect(getCellByNum(wrapper.vm.data,2)).toEqual(  {"no": 21, "rotate": 0, "y": 3, "x": 0});
    });

    it('find cell test case 2', () => {

      expect(getCellByNum(wrapper.vm.data,4)).toEqual( {"no": 49, "rotate": 0, "y": 4, "x": 5});
    });

    it('find cell test case 3', () => {

      expect(getCellByNum(wrapper.vm.data,4)).toEqual( {"no": 49, "rotate": 0, "y": 4, "x": 5});
    });

    it('find cell test case 4, not this number', () => {

      expect(getCellByNum(wrapper.vm.data,-2)).toEqual(-1);
    });

    it('find cell test case 5, rotate 270', () => {

      expect(getCellByNum(wrapper.vm.data,3)).toEqual( {"no": 9, "rotate": 270, "y": 4, "x": 4});
    });

    it('find cell test case 5, rotate 180', () => {


    expect(getCellByNum(wrapper.vm.data,1)).toEqual(  {"no": 24, "rotate": 180, "x": 2, "y": 0});
    });


    it('find All cell', () => {
      let list = [];

      for (let i = 1; i < 5; i++) {
          list.push(getCellByNum(wrapper.vm.data,i))
      }

    expect(list).toEqual(    [{"no": 24, "rotate": 180, "x": 2, "y": 0}, {"no": 21, "rotate": 0, "x": 0, "y": 3}, {"no": 9, "rotate": 270, "x": 4, "y": 4}, {"no": 49, "rotate": 0, "x": 5, "y": 4}]
    )
    });

    it('find cell test case 1, ', () => {
      wrapper.setData({data:
          [[-1, -1, -1, -1, -1, -1, -1, -1],
            [-1, -1, -1, -1, -1, -1, -1, -1],
            [-1, -1, 1, 1, 1, 2, -1, -1],
            [-1, -1, 1, 1, 2, 2, -1, -1],
            [-1, -1, 1, 2, 2, 3, -1, -1],
            [-1, -1, 3, 3, 3, 3, -1, -1],
            [-1, -1, -1, -1, -1, -1, -1, -1],
            [-1, -1, -1, -1, -1, -1, -1, -1]]});
      expect(getCellByNum(wrapper.vm.data,1)).toEqual(  {"no": 13, "rotate": 270, "y": 2, "x": 2});
    });

  it('find cell test case 2, ', () => {
    wrapper.setData({data:
        [[-1, -1, -1, -1, -1, -1, -1, -1],
          [-1, -1, -1, -1, -1, -1, -1, -1],
          [-1, -1, 1, 1, 1, 2, -1, -1],
          [-1, -1, 1, 1, 2, 2, -1, -1],
          [-1, -1, 1, 2, 2, 3, -1, -1],
          [-1, -1, 3, 3, 3, 3, -1, -1],
          [-1, -1, -1, -1, -1, -1, -1, -1],
          [-1, -1, -1, -1, -1, -1, -1, -1]]});
    expect(getCellByNum(wrapper.vm.data,2)).toEqual(  {"no": 25, "rotate": 90, "x": 5, "y": 2});
  });

  it('find cell test case 3, ', () => {
    wrapper.setData({data:
        [[-1, -1, -1, -1, -1, -1, -1, -1],
          [-1, -1, -1, -1, -1, -1, -1, -1],
          [-1, -1, 1, 1, 1, 2, -1, -1],
          [-1, -1, 1, 1, 2, 2, -1, -1],
          [-1, -1, 1, 2, 2, 3, -1, -1],
          [-1, -1, 3, 3, 3, 3, -1, -1],
          [-1, -1, -1, -1, -1, -1, -1, -1],
          [-1, -1, -1, -1, -1, -1, -1, -1]]});
    expect(getCellByNum(wrapper.vm.data,3)).toEqual(  {"no": 13, "rotate": 270, "y": 4, "x": 5});
  });


  describe('test rotate2DArray', () => {
    let da = [[0,0,0,1,1,1,],
      [0,0,0,0,1,1],
      [0,0,0,0,0,1],
      [0,0,0,0,0,0],
      [0,0,0,0,0,0],
      [0,0,0,0,0,0]];

    test("rotate2DArray 0",()=>{
      expect(wrapper.vm.rotate2DArray(0,JSON.parse(JSON.stringify(da)))).toEqual([
        [ 0, 0, 0, 1, 1, 1 ],
        [ 0, 0, 0, 0, 1, 1 ],
        [ 0, 0, 0, 0, 0, 1 ],
        [ 0, 0, 0, 0, 0, 0 ],
        [ 0, 0, 0, 0, 0, 0 ],
        [ 0, 0, 0, 0, 0, 0 ] ]);
    });

    test("rotate2DArray 90",()=> {
      expect(wrapper.vm.rotate2DArray(90, JSON.parse(JSON.stringify(da)))).toEqual([
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 1],
        [0, 0, 0, 0, 1, 1],
        [0, 0, 0, 1, 1, 1]]);
    });

    test("rotate2DArray 180",()=> {
      expect(wrapper.vm.rotate2DArray(180, JSON.parse(JSON.stringify(da)))).toEqual([
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [1, 0, 0, 0, 0, 0],
        [1, 1, 0, 0, 0, 0],
        [1, 1, 1, 0, 0, 0]]);
    });

    test("rotate2DArray 270",()=> {
      expect(wrapper.vm.rotate2DArray(270, JSON.parse(JSON.stringify(da)))).toEqual([
        [1, 1, 1, 0, 0, 0],
        [1, 1, 0, 0, 0, 0],
        [1, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0]]);
    });

  });




});
