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
    glDialog:null,
    app:false,
    appVue:undefined,
    serverError:function () {
      //  window.location = "https://www1.ntw-20.com" + window.location.pathname;
    }
};


$.ajax({
    async: false,
    url: "/common/data/define.json",
    success: function (data) {
        setting.make_device = data['time/make_device']['updateTime'];
        setting.make = data['time/make']['updateTime'];
        setting.h_make= data['time/h_make']['updateTime'];
        setting.h_make_device = data['time/h_make_device']['updateTime'];
        setting.announcement = data.announcement;
    },
    error: function (request, status, error) {
        //window.location = "https://www1.ntw-20.com" + window.location.pathname;
    }
});
//test
export default setting;
