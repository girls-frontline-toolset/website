const jsdom = require("jsdom").jsdom;
// const { JSDOM } = jsdom;

// const { window } = new JSDOM();
// global.window = window;

var fs = require('fs');
var document = (new jsdom('<!DOCTYPE html><html><head></head><body></body></html>'));



//let host = "http://192.168.10.235:8080";
let data = getFormattedDate();
let host = "https://www.ntw-20.com";


function getFormattedDate() {
    let date = new Date();
    let str = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + "_" +  date.getHours() + "-" + date.getMinutes() + "-" + date.getSeconds();
    return str;
}

global.common = {
  "data":getFormattedDate(),
   getHost(){
     return host;
   },
   getData(){
     return this.data;
   },
 };
global.document = jsdom;

// var _this = this;
// global.document.createElement = function(text){
//   return _this.document.createElement(text);
//
//     switch (text) {
//       case "script":
//         return {
//           setAttribute(a,b){},
//           append(a){}
//         }
//         break;
//     }
// };


global.window.requestAnimationFrame = function(...args){
    console.log(...args);
};
