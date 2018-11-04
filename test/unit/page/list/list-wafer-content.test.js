import { mount , createLocalVue   } from '@vue/test-utils'
import MyComponent from '../../../../src/page-vuetifly/list/list-wafer-content.vue'
import Vuetify from 'vuetify';
import { snapshots , mountSetting} from '../../../common/ini.js';


describe('Test wafer list', () => {
  let wrapper;

  beforeAll(() => {
    const localVue = createLocalVue();
    localVue.use(Vuetify);
    mountSetting.localVue = localVue;

    wrapper = mount(MyComponent,mountSetting);

  });

  function init(){
    wrapper.setData({color: {"orange_type":false,"blue_type":false}});
    wrapper.setData({cells:{"cells_1":false,"cells_2":false,"cells_3":false,"cells_4":false,"cells_5":false,"cells_6":false}});
  }

  it("get All cell list", () => {
    // console.log(wrapper.html())
    wrapper.update();
    wrapper.find('[name="all"]').trigger('click');
    wrapper.update();

    snapshots.addSnapshots(wrapper.html(),__filename,"get All cell list");
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("blue and 6 cell", () => {
    init();
    wrapper.vm.color.blue_type = true;
    wrapper.vm.cells.cells_6 = true;
    wrapper.update();
    wrapper.find('[name="search"]').trigger('click');
    wrapper.update();

    snapshots.addSnapshots(wrapper.html(),__filename,"blue and 6 cell");
    expect(wrapper.html()).toMatchSnapshot();
  });


});
