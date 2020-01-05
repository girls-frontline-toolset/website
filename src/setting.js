import axios from 'axios'
import qs from 'qs'

const setting = {
    less768: (window.innerWidth <= 768),
    less540: (window.innerWidth <= 540),
    less600: function(){
        return window.innerWidth < 600;
    },
    less960: function(){
        return window.innerWidth < 960;
    },
    domain:"https://www.ntw-20.com",
    make_device:"",
    make:"",
    h_make_device:"",
    h_make:"",
    announcement:"",
    glDialogText:function(title,text,type){
        this.glDialog.glDialogText(title,text,type);
    },
    glDialogImg:function(title,img){
        this.glDialog.glDialogImg(title,img);
    },
    load:function(isStart){
        this.loadBar.process(isStart);
    },
    glDialog:null,
    loadBar:null,
    app:false,
    appVue:undefined,
    serverError:function () {
      //  window.location = "https://www1.ntw-20.com" + window.location.pathname;
    },
    getJSON:function(url,callback,callbackFail){
      axios.get(url)
        .then((response)=>callback(response.data))
        .catch((error)=>callbackFail(error));
    },
    getTxtFile:function(url,callback,callbackFail){
     axios.get(url)
       .then((response)=>callback(response.data))
        .catch((error)=>callbackFail(error));
    },
    postData:function(url,data,callback,callbackFail){

      let params;
      if(data instanceof FormData){
        params = data;
      }else{
       params = qs.stringify(data)
      }

      let request = {
        method: 'post',
        url: url,
        data: params
      };

      if(data instanceof FormData){
        request.headers = {'Content-Type': 'multipart/form-data'};
      }

      axios(request).then(function (response) {
          callback(response.data)
        })
        .catch(function (error) {
          callbackFail(error)
        });
    },
    getDefine(callback){
      let _this = this;
      if (this.announcement === "") {
        this.getJSON('/common/data/define.json', function (json) {
          _this.make_device = json['time/make_device']['updateTime'];
          _this.make = json['time/make']['updateTime'];
          _this.h_make = json['time/h_make']['updateTime'];
          _this.h_make_device = json['time/h_make_device']['updateTime'];
          _this.announcement = json.announcement;
          callback();
        });
      }else{
        callback();
      }
    }
};

export default setting;
