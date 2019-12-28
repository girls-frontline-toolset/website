<template>
    <v-container grid-list-md pa-0 mt-1>
        <v-layout row wrap>
            <v-flex xs12>
                <gl-ui-title text="數據板" h1/>
            </v-flex>
          <v-flex xs6 v-for="item in card" :key="item.title">
            <v-card :color="(item.count >10 && item.type !== 'imgCount')?'#ff0000':'#ffb300'" class="white--text" :to="item.url">
              <v-card-title primary-title text-xs-center>
                <div style="width: 100%">{{item.title}}</div>
                <div style="font-size: 40px">{{item.count}}</div>
              </v-card-title>
            </v-card>
          </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    import GlUiTitle from "../../components-ui/title";
    import mMeta from "../../mixin/mMeta.js";
    export default {
        components: {GlUiTitle},
        mixins: [mMeta],
        name: 'gl-ui-data-board',
        data() {
            return {
              card:[{type:"img",title:"圖片庫待批核總數",count:0,url:"/admin/image"},{type:"doc",title:"Doc 待批核總數",count:0,url:"/admin/docMgmt"},{type:"errorImg",title:"問題圖片待處理總數",count:0,url:"/admin/errorImg"},{type:"imgCount",title:"圖片總數",count:0,url:""}]
            }
        }, created() {
        let _this = this;
        $.ajax({
            url: "/api/inquiry/a/getDataBoard",
            type: "POST",
            success: function (data) {
              data = JSON.parse(data);
              if (data.status === "success") {
                for (let key in data.data) {
                  for (let i = 0; i < _this.card.length; i++) {
                    if (_this.card[i].type === key) {
                      if(data.data.hasOwnProperty(key)){
                        _this.card[i].count = data.data[key];
                      }
                      break;
                    }
                  }
                }
              }
            }
          }
        );
        }
    }
</script>
