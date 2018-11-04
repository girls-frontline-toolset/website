let host = "http://192.168.10.235:8080";
let data = getFormattedDate();
// let host = "https://www.ntw-20.com";

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
   }
 };
