<template>
    <div >
            <gl-ui-tag-list  :select="model"  :items="items"></gl-ui-tag-list>
            <gl-ui-card-left :content="prompt" icon="notifications"></gl-ui-card-left>
            <gl-ui-title text="人型製造時間查詢" h1 icon="icon-doll"></gl-ui-title>
            <gl-ui-hot-time :list="hotTime" :clickF="badge"></gl-ui-hot-time>

            <v-container grid-list-md>
                <form>
                <v-layout row wrap pa1>
                    <v-flex xs4 pa-1>
                            <v-text-field mask="#" type="number" v-model="hh" label="小時" tabindex="1"
                                          autofocus></v-text-field>
                        </v-flex>
                        <v-flex xs4 pa-1>
                            <v-text-field mask="##" type="number" v-model="mm" label="分鐘" tabindex="2"
                                          @keyup.enter.native="search()"></v-text-field>
                        </v-flex>
                        <v-flex xs4 pa-1>
                            <v-btn color="primary" block dark @click="search()" tabindex="3">查詢</v-btn>
                        </v-flex>
                </v-layout></form>

                <v-layout row wrap pa1>
                    <v-flex xs12 pa-1 class="girl_output">
                            <a v-for="girl in data" :href='"https://zh.moegirl.org/zh-hant/少女前线:" + girl.name' target='_blank'>
                            <img :class='girl.className' :src='"/common/girl/girl_" + girl.number + ".jpg"' :alt='girl.name' :title='girl.name'></a>
                     </v-flex>
                    <gl-ui-error :error="error"></gl-ui-error>
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
    export default {
        mixins: [mPrompt,mTimeTag],
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
                hotTime: null,
                error:0,
                model:"tab-0",
                data:[],
                items:[{"t":"時間查詢","to":"/time/girl","i":"access_time"},{"t":"時間列表","to":"/list/girl?f=time&fn=tag","i":"list"}],
            }
        },
        methods: {
            badge: function (obj) {
                [this.hh,this.mm] = this.hotTime[obj].time.split(":");
                this.search();
            },
            search: function () {
                this.$ga.event('time', 'search_girl');
                var _this = this;

                let hh = (!this.hh)? 0 :this.hh;
                let mm = (!this.mm)? 0 :this.mm;

                $.getJSON("/api/inquiry/girl/" + hh + "/" + mm, function ($data) {
                    if ($data.status === "success") {
                        _this.data = [];
                        let tmpList = [];
                        let getClass = ["no_heavy","is_heavy"];
                        for (let listdata in $data.data) {
                            for (let star in $data.data[listdata]) {
                                let name = $data.data[listdata][star].name;
                                if ($data.data[listdata][star].src != null) {
                                    name = $data.data[listdata][star].src;
                                }
                                tmpList.push({"name":name,"number":$data.data[listdata][star].no,"className":getClass[$data.data[listdata][star].heavy]});
                            }
                        }
                        _this.$set(_this,"data",tmpList);
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
            this.$g.getHotTimeGirl('hotTime', this);
        }
        ,
        mounted: function () {
            if (this.$route.query.search !== undefined) {
                [this.hh,this.mm] = this.$route.query.search.split(":");
                this.search();
            }
        }
    }
</script>

<style>
    .girl_output , .fairy_output{
        margin-top: 10px;

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

</style>