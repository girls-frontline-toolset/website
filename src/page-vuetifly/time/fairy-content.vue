<template>
    <div>
        <gl-ui-tag-list :select="model " :items="items"></gl-ui-tag-list>
        <gl-ui-card-left :content="prompt" icon="notifications"></gl-ui-card-left>
        <gl-ui-title :text="$t('title.h1.time.fairy')" h1 icon="icon-equipment"></gl-ui-title>
        <gl-ui-hot-time :list="hotTime" :clickF="badge"></gl-ui-hot-time>

        <v-container grid-list-md  pa-0>
            <form>
                <v-layout row wrap pa1>
                    <v-flex xs4 pa-1>
                        <v-text-field mask="#" type="number" v-model="hh" :label="$t('t.hour')" tabindex="1"
                                      autofocus></v-text-field>
                    </v-flex>
                    <v-flex xs4 pa-1>
                        <v-text-field mask="##" type="number" v-model="mm" :label="$t('t.minute')" tabindex="2"
                                      @keyup.enter.native="search()"></v-text-field>
                    </v-flex>
                    <v-flex xs4 pa-1>
                        <v-btn color="primary" block dark @click="search()" tabindex="3">{{$t('t.search')}}</v-btn>
                    </v-flex>
                </v-layout>
            </form>

            <v-layout row wrap pa1>
                <v-flex xs12 pa-1 class="fairy_output">
                  <gl-ui-title v-if="data.length > 0" :text="this.hh + ':' + this.mm" h2></gl-ui-title>
                  <img v-for="fairy in data" :src='"/common/fairy/fairy_" + fairy.number + ".jpg"'
                         :alt='fairy.name' :title='fairy.name'>
                </v-flex>
                <gl-ui-error :error="error"></gl-ui-error>
            </v-layout>
        </v-container>


    </div>
</template>

<script>
    import GlUiTagList from "../../components-ui/tagList";
    import GlUiCardLeft from "../../components-ui/cardLeft";
    import GlUiTitle from "../../components-ui/title";
    import GlUiHotTime from "../../components-ui/time/hotTime";
    import GlUiError from "../../components-ui/error";
    import mPrompt from "../../mixin/mPrompt.js";
    import mTimeTag from "../../mixin/mTimeTag.js";
    import mMeta from "../../mixin/mMeta.js";
    export default {
        mixins: [mPrompt,mTimeTag,mMeta],
        components: {GlUiError, GlUiHotTime, GlUiTitle, GlUiCardLeft, GlUiTagList},
        name: 'gl-ui-fairy-content',
        props: ['promptData'],
        data() {
            return {
                content: null,
                hh: null,
                mm: null,
                hotTime: [],
                model: "tab-0",
                error: 0,
                data:[],
                items: [{"t": "time.search", "to": "/time/fairy", "i": "access_time"}, {"t": "time.list", "to": "/list/fairy?f=time&fn=tag", "i": "list"}],
            }
        },
        methods: {
            badge: function (obj) {
                [this.hh,this.mm] = this.hotTime[obj].time.split(":");
                this.search();
            },
            search: function () {
                this.$ga.event('time', 'search_fairy');
                var _this = this;

                let hh = (!this.hh)?0:this.hh;
                let mm = (!this.mm)?0:this.mm;

                $.getJSON("/api/inquiry/fairy/" + hh + "/" + mm, function ($data) {
                    if ($data.status === "success") {
                        let dataList = [];

                        for (let listdata in $data.data) {
                            for (let star in $data.data[listdata]) {
                                dataList.push({"name":$data.data[listdata][star].name,"number":$data.data[listdata][star].no});
                            }
                        }
                        _this.$set(_this,'data',dataList);

                        if(dataList.length > 0){
                          _this.metaDescription = "妖精製造時間查詢 " + _this.hh + ":" + _this.mm;
                          for (let i = 0; i < dataList.length; i++) {
                            _this.metaDescription += " " + dataList[i].name;
                          }

                          _this.metaImage = {
                            url: "/common/fairy/fairy_" + dataList[0].no + ".jpg",
                            width: "246",
                            height: "432"
                          };
                        }

                        _this.error = 0;
                    } else if ($data.status === "empty") {
                        _this.data = [];
                        _this.error = 1;
                    }
                }).fail(function(){
                _this.data = [];
                _this.error = 2;
                });
            }
        },
        created() {
            this.$g.getHotTimeFairy('hotTime', this);
        },
        mounted: function () {
          let _this = this;
          function updateMeta(){
            _this.metaTitle = _this.hh + ":" + _this.mm + " "  + _this.metaTitle;
            document.title = _this.metaTitle;
          }
            if (this.$route.query.search !== undefined) {
                [this.hh,this.mm] = this.$route.query.search.split(":");
                updateMeta();
                this.search();
            }else if(this.$route.params.HH !== undefined){
                this.hh = this.$route.params.HH;
                this.mm = this.$route.params.MM;
                updateMeta();
                this.search();
          }
        }
    }
</script>
