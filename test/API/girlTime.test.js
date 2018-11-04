import config from '../common/config.js'
import $ from '../common/ajax.js'
console.log(common.getData());
describe('Test get Girl time API', () => {
  let host = "" ;

  beforeEach(() => {
      host  = config.getHost();
  });

  let time  = [
    {"time":"1:10","data":{"status":"success","data":{"star5":[{"no":"96","name":"\u7070\u718aMKV","heavy":"0","src":null}],"star4":"","star3":"","star2":[{"no":"93","name":"IDW","heavy":"0","src":null},{"no":"24","name":"PP-2000","heavy":"0","src":null}]}}},
    {"time":"8:05","data":{"data": {"star2": "", "star3": "", "star4": "", "star5": [{"heavy": "1", "name": "Saiga-12", "no": "160", "src":null}]}, "status": "success"}},
    {"time":"4:11","data":{"data": {"star2": "", "star3": "", "star4": [{"heavy": "0", "name": "K11", "no": "236", "src":null}], "star5": ""}, "status": "success"}},
    {"time":"0:0","data":{"status":"empty"}},
    {"time":"3:40","data":{"data": {"star2": "", "star3": [{"heavy": "0", "name": "M14", "no": "37", "src":null}, {"heavy": "0", "name": "SV-98", "no": "44", "src":null}], "star4": [{"heavy": "0", "name": "G36", "no": "64", "src":null}, {"heavy": "0", "name": "利貝羅勒", "no": "171", "src":null}], "star5": ""}, "status": "success"}},
    {"time":"1:10","data":{"data": {"star2": [{"heavy": "0", "name": "IDW", "no": "93", "src":null}, {"heavy": "0", "name": "PP-2000", "no": "24", "src":null}], "star3": "", "star4": "", "star5": [{"heavy": "0", "name": "灰熊MKV", "no": "96", "src":null}]}, "status": "success"}},
    {"time":"3:50","data":{"data": {"star2": "", "star3": [{"heavy": "0", "name": "漢陽造88式", "no": "95", "src":null}, {"heavy": "1", "name": "OTs-44", "no": "145", "src":null}], "star4": "", "star5": [{"heavy": "0", "name": "95式", "no": "129", "src":null}, {"heavy": "0", "name": "97式", "no": "130", "src":null}]}, "status": "success"}},
    {"time":"3:53","data":{"data": {"star2": "", "star3": "", "star4": [{"heavy": "0", "name": "MDR", "no": "215", "src":null}], "star5": ""}, "status": "success"}},
    {"time":"3:55","data":{"data": {"star2": "", "star3": "", "star4": "", "star5": [{"heavy": "0", "name": "HK416", "no": "65", "src":null}]}, "status": "success"}}
    ];

  for (let i = 0; i < time.length ; i++) {
    let data = time[i];

    it("test time " + time[i].time, done => {
      let apiTime = data.time.split(":");
      apiTime = apiTime[0] + "/" + apiTime[1];

      console.log("Run :" + host + "/api/inquiry/girl/" +  apiTime);

      $.getJSON( host + "/api/inquiry/girl/" +  apiTime,function(rs) {
        expect(rs).toEqual(data.data);
        done();
      });
    });
  }





});
