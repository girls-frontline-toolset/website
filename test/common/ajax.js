const https = require('https');
const http = require('http');

let request = require('sync-request');


export default {
  fail(callback){

  },
  getJSON(url , callback){
    let obj ;
    if(url.indexOf("https") > -1 ){
      obj = https;
    }else{
      obj = http;
    }

    let res = request('GET', url);

    // noinspection ES6ShorthandObjectProperty
    let rs  = res.getBody().toString('utf8');
    callback(JSON.parse(rs));

    // obj.get(url , (res) => {
    //   res.on('data', (d) => {
    //     let rs  = d.toString('utf8');
    //     callback(JSON.parse(rs));
    //   });
    //
    // }).on('error', (e) => {
    //   console.error(e);
    // });

    return this
  }
};
