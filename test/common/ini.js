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

let route = {
  path:"/"
}



let mountSetting = { mocks:{ $g:g, $t:t, $ga:ga ,$s:s ,$route:route,document:document},
  propsData: {
  promptData: ["1231"]
},
  sync: false
};

export {t,ga,snapshots,g,mountSetting}
