const setting = {
    less768: (window.innerWidth <= 768),
    less540: (window.innerWidth <= 540),
    less600: function(){
        return window.innerWidth < 600;
    },
    less960: function(){
        return window.innerWidth < 960;
    },
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
};


$.ajax({
    async: false,
    url: "/common/data/define.json",
    success: function (data) {
        //console.log(data);
        setting.make_device = data['time/make_device']['updateTime'];
        setting.make = data['time/make']['updateTime'];
        setting.h_make= data['time/h_make']['updateTime'];
        setting.h_make_device = data['time/h_make_device']['updateTime'];
        setting.announcement = data.announcement;
    }
});

export default setting;