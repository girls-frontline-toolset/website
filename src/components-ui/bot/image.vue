<template>
  <v-flex xs12 class="line-help">
    <div>
      <v-container grid-list-md pa-0>
          <v-layout row wrap pa0>
            <v-flex xs9 pa-1>
              <v-text-field  v-model="searchText" :label="$t('t.search')"
                            @keyup.enter.native="search()"/>
            </v-flex>
            <v-flex xs3 pa-0>
              <v-btn color="primary" block dark @click="search">{{$t('t.search')}}</v-btn>
            </v-flex>
          </v-layout>
      </v-container>

      <span>不顯示梗圖</span>
      指令:
      <div class="code">:</div>
      例子:
      <div class="example">:萌新求加</div>
      <div class="example">:110</div>
      <span class="high"/>
      <hr>
    </div>
    <div v-for="(item,index) in rs">
      關鍵字:
      <div class="code" v-for="text in item.role" :key="text">{{text}}</div>
      圖片:
      <v-flex xs12 v-if="item.imgUrl.length === 1">
        <img :id="getAlt(item.role,key1)" :alt="getAlt(item.role,key1)" :title="getAlt(item.role,key1)" :src="'/api/line/img/' + img" v-for="(img,key1) in item.imgUrl"
             style="width: 100%">
      </v-flex>
      <v-layout row wrap v-else>
        <v-flex xs12 sm6 v-for="(img,key2) in item.imgUrl" :key="img">
          <img :id="getAlt(item.role,key2)" :alt="getAlt(item.role,key2)" :title="getAlt(item.role,key2)" :src="'/api/line/img/' + img" style="width: 100%">
        </v-flex>
      </v-layout>
      <hr v-show="index + 1  !== role.length">
    </div>
  </v-flex>
</template>

<script>
  export default {
    /** @typedef gl-bot-img.role
     *  @property {array} imgUrl
     *  @property {array} role
     */
    name: 'gl-bot-img',
    data() {
      return {
        role: null,
        rs:[],
        searchText:"",
        name:"",
        index:""
      }
    }, methods: {
      getAlt(a, index,_this) {
        return a.join(':') + ";" + (index + 1);
      },
      search(){
        this.rs = [];

        for (let i = 0; i < this.role.length; i++) {
          if(this.searchText === ""){
            this.rs.push(this.role[i]);
            continue;
          }

          for (let j = 0; j < this.role[i].role.length; j++) {
            if(this.role[i].role[j].indexOf(this.searchText) !== -1){
              this.rs.push(this.role[i]);
              break;
            }
          }
        }
      }
    },
    beforeCreate() {

      this.$ga.event('line', 'image');
      let _this = this;
      this.$s.getJSON('/api/line/text.json', function (json) {

        let list = [];

        for (let i = 0; i < json.role.length; i++) {
          if (json.role[i].imgUrl) {
            if (!Array.isArray(json.role[i].role)) {
              json.role[i].role = [json.role[i].role];
            }
            list.push(json.role[i]);
          }
        }
        _this.role = list;

        _this.name = _this.$route.params.name;
        _this.index = _this.$route.params.index;

        if (_this.name) {

          if(!_this.index){
            _this.index = "1"
          }
          _this.searchText = _this.name;
        }

        _this.search();

        _this.$nextTick(function () {
          let imgList = document.querySelectorAll("img");

          for (let i = 0; i < imgList.length ; i++) {
            let data = imgList[i].id.split(";")[0].split(":");

            for (let j = 0; j < data.length; j++) {
              if (data[j] === _this.name){

                if(imgList[i].id.split(";")[1] === _this.index){
                  imgList[i].onload = function(){
                    let url = new URL(imgList[i].src);
                    _this.$parent.metaImage = {url:url.pathname,height:imgList[i].clientHeight,width:imgList[i].clientWidth};
                    _this.$parent.metaDescription = "少女前線 時間查詢 Line Bot 梗圖表 關鍵字: ";

                    for (let k = 0; k < data.length; k++) {
                      _this.$parent.metaDescription += data[k]+ " ";
                    }
                  };

                }
              }
            }
          }
        });
      });
    }
  }
</script>

<style>
  .line-help {
    font-size: 18px;
    margin-bottom: 5px;
  }

  .line-help span {
    font-weight: bolder;
    display: block;
  }

  .line-help .high {
    font-size: 15px;
    color: #ac2925;
    margin-top: 5px;
  }

  .line-help hr {
    border: 1px hsla(42, 100%, 50%, 0.8) solid;
  }

  .line-help .code {
    margin-left: 20px;
    margin-top: 5px;
    background-color: #f7f7f9;
    padding: 5px;
    border: 1px solid #eee;
    border-radius: .25rem;
  }

  .line-help .example {
    border: 1px solid hsla(42, 100%, 50%, 0.8);
    margin-left: 20px;
    margin-top: 5px;
    background-color: hsla(34, 100%, 63%, 0.45098039215686275);
    padding: 5px;
    border-radius: .25rem;

  }
</style>
