<template>
    <div >
            <gl-ui-tag-list  :select="model"  :items="items"/>
            <gl-ui-card-left :content="prompt" icon="notifications"/>
            <gl-ui-title :text="$t('title.h1.time.girl')" h1 icon="icon-doll"/>
            <gl-ui-hot-time :list="hotTime" :clickF="badge"/>

            <v-container grid-list-md pa-0>
                <form>
                <v-layout row wrap pa1>
                    <v-flex xs4 pa-1>
                            <v-text-field mask="#" type="number" v-model="hh" :label="$t('t.hour')" tabindex="1"
                                          autofocus/>
                        </v-flex>
                        <v-flex xs4 pa-1>
                            <v-text-field mask="##" type="number" v-model="mm" :label="$t('t.minute')" tabindex="2"
                                          @keyup.enter.native="search()"/>
                        </v-flex>
                        <v-flex xs4 pa-1>
                            <v-btn color="primary" block dark @click="search()" tabindex="3">{{$t('t.inquiry')}}</v-btn>
                        </v-flex>
                </v-layout></form>

                <v-layout row wrap pa1>
                  <v-flex xs12 pa-1 class="girl_output">
                    <gl-ui-title v-if="data.length > 0" :text="this.hh + ':' + this.mm" h2/>
                    <a v-for="girl in data" :href='"https://zh.moegirl.org/zh-hant/少女前线:" + girl.name' target='_blank'>
                      <img :class='girl.className'
                           :src='"/common/girl/" + $t("resourcePath")  + "girl_" + girl.number + ".jpg"'
                           :alt='$t(getResourceName(girl.number))' :title='$t(getResourceName(girl.number))'></a>
                  </v-flex>
                  <gl-ui-error :error="error"/>
                  <v-flex xs12 pa-1 v-if="!$s.app">
                    <router-link  :to="langUrl() + '/image/' + girl.name.replace('/','%2F')" v-for="girl in data" :key="girl.number">
                      <v-chip label small color="primary" text-color="white" class="chip-link">
                        <v-icon left small>label</v-icon>
                        <h3 style="font-size: unset">{{$t(getResourceName(girl.number))}}</h3>
                      </v-chip>
                    </router-link>
                  </v-flex>
                </v-layout>
            </v-container>

    </div>
</template>

<script>
    import GlUiTitle from "../../components-ui/title";
    import GlUiHotTime from "../../components-ui/time/hotTime";
    import GlUiCardLeft from "../../components-ui/cardLeft";
    import GlUiError from "../../components-ui/error";
    import GlUiTagList from "../../components-ui/tagList";
    import mPrompt from "../../mixin/mPrompt.js";
    import mTimeTag from "../../mixin/mTimeTag.js";
    import mMeta from "../../mixin/mMeta.js";
    export default {
        mixins: [mPrompt,mTimeTag,mMeta],
        components: {
            GlUiTagList,
            GlUiError,
            GlUiCardLeft,
            GlUiHotTime,
            GlUiTitle,
        },
        name: 'gl-ui-girl-content',
        data() {
            return {
                hh: null,
                mm: null,
                content: '[]',
                hotTime: [],
                error:0,
                model:"tab-0",
                data:[],
                items:[{"t":"time.search","to":"/time/girl","i":"access_time"},{"t":"time.list","to":"/list/girl?f=time&fn=tag","i":"list"}],
                title:""
            }
        },
        methods: {
            badge (obj) {
                [this.hh,this.mm] = this.hotTime[obj].time.split(":");
                this.search();
            },
            search() {
                this.$ga.event('time', 'search_girl');
                var _this = this;

                let hh = (!this.hh)? 0 :this.hh;
                let mm = (!this.mm)? 0 :this.mm;

              this.$s.getJSON("/api/inquiry/girl/" + hh + "/" + mm, function ($data) {
                    if ($data.status === "success") {
                        _this.data = [];
                        let tmpList = [];
                        let getClass = ["no_heavy","is_heavy"];
                        for (let listdata in $data.data) {
                            for (let star in $data.data[listdata]) {
                                let name = $data.data[listdata][star].name;
                              if ($data.data[listdata][star].src != null && $data.data[listdata][star].src !== "") {
                                    name = $data.data[listdata][star].src;
                                }
                                tmpList.push({"name":name,"number":$data.data[listdata][star].no,"className":getClass[$data.data[listdata][star].heavy]});
                            }
                        }
                        _this.$set(_this,"data",tmpList);

                      if (tmpList.length > 0 ) {
                        _this.metaDescription = _this.$t('title.h1.time.girl') + " " + _this.hh + ":" + _this.mm;
                        for (let i = 0; i < tmpList.length; i++) {
                            _this.metaDescription += " " + _this.$t(_this.getResourceName(tmpList[i].number));
                        }

                        _this.metaImage = {
                          url: "/common/girl/girl_" + tmpList[0].number + ".jpg",
                          width: "242",
                          height: "429"
                        };
                      }

                      _this.error = 0;
                    } else if ($data.status === "empty") {
                        _this.data = [];
                        _this.error = 1;
                    }
                },
                function(){
                _this.data = [];
                _this.error = 2;
               })
            }
        },
        created() {
            this.$g.getHotTimeGirl('hotTime', this);
        },
        mounted() {
          let _this = this;
          function updateMeta(){
            _this.metaTitle = _this.hh + ":" + _this.mm + " "  + _this.$t('title.h1.time.girl');
            document.title = _this.metaTitle;
          }

          if (this.$route.query.search !== undefined){
              [this.hh,this.mm] = this.$route.query.search.split(":");
              updateMeta();
              this.search();
            }else if(this.$route.params.HH !== undefined){
              if (!this.$route.params.MM){
                this.hh = 0;
                this.mm = this.$route.params.HH;
              }else{
                this.hh = this.$route.params.HH;
                this.mm = this.$route.params.MM;
              }
              updateMeta();
              this.search();
            }
        }
    }
</script>

<style>
     .fairy_output{
        margin-top: 10px;
    }

     .girl_output {
       margin-top: 0;
     }

    .girl_output img , .fairy_output img{
        margin-right: 5px;
        width: 32%;
    }

    @media (min-width: 600px) {
        .girl_output img ,.fairy_output img{
            width: 20%;
        }
    }

    .is_heavy {
        border: 3px solid #ed7b4a;

    }

    .no_heavy {
        border: 3px solid #a0c11b;
    }

     .chip-link .v-chip__content {
        cursor: pointer !important;
     }

</style>
