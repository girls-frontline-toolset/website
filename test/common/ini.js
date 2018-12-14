import t from './lang.js'
import snapshots from './snapshots.js'
import g from './global.js';

let ga = {
  event(...ags){
    console.log(ags)
  }
};


let s = {
  less600(){
    return false;
  }
};


let mountSetting = { mocks:{ $g:g, $t:t, $ga:ga ,$s:s },
  propsData: {
  promptData: ["1231"]
}
};

export {t,ga,snapshots,g,mountSetting}
