import t from './lang.js'
import snapshots from './snapshots.js'
import g from './global.js';

let ga = {
  event(...ags){
    console.log(ags)
  }
};





let mountSetting = { mocks:{ $g:g, $t:t, $ga:ga  },
  propsData: {
  promptData: ["1231"]
}
};

export {t,ga,snapshots,g,mountSetting}
