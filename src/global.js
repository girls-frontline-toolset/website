const ajax = {
    getJson:function(obj,vue,url,name,callback){
        if(vue[name] === undefined ){
            console.error("not " + name);
            return;
        }

        if (obj.data !== "") {
            vue[name] = obj.data;
            if(callback !== undefined ){
                callback(false);
            }
        } else {
            $.getJSON(url, function (json) {
                obj.data = json.data;
                vue[name] = obj.data;
                if(callback !== undefined ){
                    callback(true);
                }
            }).fail(
                function() {
                    vue.error = 2;
                });
        }
    }
};

const global = {
    output:"",
    friendList: {"data":""},
    getFriendList: function (name,vue,callback) {
        ajax.getJson(this.friendList,vue,'/api/inquiry/friendList',name,callback);
    },

    allGirlList:{"data":""},
    getAllGirlList:function(name,vue,callback){
        ajax.getJson(this.allGirlList,vue,'/api/inquiry/allGirl',name,callback);
    },

    allExGirlList:{"data":""},
    getAllExGirlList:function(name,vue,callback){
        ajax.getJson(this.allExGirlList,vue,'/api/inquiry/allExGirl',name,callback);
    },

    allGirlTimeList:{"data":""},
    getAllGirlTime:function(name,vue,callback){
        ajax.getJson(this.allGirlTimeList,vue,'/api/inquiry/allGirlTime',name,callback);
    },
    allHGirlTimeList:{"data":""},
    getAllHGirlMakeTime:function(name,vue,callback){
        ajax.getJson(this.allHGirlTimeList,vue,'/api/inquiry/HGirlMakeTime',name,callback);
    },
    fairyMakeTime:{"data":""},
    getFairyMakeTime:function(name,vue,callback){
        ajax.getJson(this.fairyMakeTime,vue,'/api/inquiry/FairyMarkTime',name,callback);
    },
    girlMakeTime:{"data":""},
    getGirlMakeTime:function(name,vue,callback){
        ajax.getJson(this.girlMakeTime,vue,'/api/inquiry/GirlMakeTime',name,callback);
    },
    deviceMakeTime:{"data":""},
    getDeviceMakeTime:function(name,vue,callback){
        ajax.getJson(this.deviceMakeTime,vue,'/api/inquiry/DeviceMakeTime',name,callback);
    },
    allDevice:{"data":""},
    getAllDevice:function(name,vue,callback){
        ajax.getJson(this.allDevice,vue,'/api/inquiry/AllDevice',name,callback);
    },
    hotTimeGirl:{"data":""},
    getHotTimeGirl:function(name,vue,callback){
        ajax.getJson(this.hotTimeGirl,vue,'/api/inquiry/hotTimeGirl',name,callback);
    },
    hotTimeDevice:{"data":""},
    getHotTimeDevice:function(name,vue,callback){
        ajax.getJson(this.hotTimeDevice,vue,'/api/inquiry/hotTimeDevice',name,callback);
    },
    hotTimeFairy:{"data":""},
    getHotTimeFairy:function(name,vue,callback){
        ajax.getJson(this.hotTimeFairy,vue,'/api/inquiry/hotTimeFairy',name,callback);
    },
    allFairy:{"data":""},
    getAllFairy:function(name,vue,callback){
        ajax.getJson(this.allFairy,vue,'/api/inquiry/AllFairy',name,callback);
    },
    allExFairy:{"data":""},
    getAllExFairy:function(name,vue,callback){
        ajax.getJson(this.allExFairy,vue,'/api/inquiry/AllExFairy',name,callback);
    },
    allTimeFairy:{"data":""},
    getAllTimeFairy:function(name,vue,callback){
        ajax.getJson(this.allTimeFairy,vue,'/api/inquiry/AllTimeFairy',name,callback);
    },
    npcList:{"data":""},
    getNpc:function(name,vue,callback){
    ajax.getJson(this.npcList,vue,'/api/inquiry/npc',name,callback);
    },
    sangvislList:{"data":""},
    getSangvisl:function(name,vue,callback){
        ajax.getJson(this.sangvislList,vue,'/api/inquiry/sangvisl',name,callback);
    },
    docList:{"data":""},
    getDocList:function(name,vue,callback){
        ajax.getJson(this.docList,vue,'/api/inquiry/doc/getDocList',name,callback);
    },
    cellList:{"data":""},
    getCellList:function(name,vue,callback){
        ajax.getJson(this.cellList,vue,'/api/inquiry/cell/getCell',name,callback);
    },
    supportUnitList:{"data":""},
    getSupportUnitList:function(name,vue,callback){
    ajax.getJson(this.supportUnitList,vue,'/api/inquiry/supportUnit/getAll',name,callback);
    },

};

export default global;
