//let cn = require('../../src/lang/cn.json');
// import ja from '../../src/lang/ja.json';
import tw from '../../src/lang/tw.json';

export default function(data){
  let text = data.split(".");
  let d = tw;
  for (const key in text) {
    d = d[text[key]]
  }
  return d
}
