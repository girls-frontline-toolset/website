<template>
    <v-layout row wrap >
    <v-flex xs12>
        <gl-ui-title text="目錄" h1 />
    </v-flex>
    <v-flex sm6 md4 xs12 v-for="item in docList" :key="item.docList_id" :ref="item.docList_id" class="f-18 u-line">
        <gl-ui-title :text="item.text" h2 button="more" :item="item.docList_id" :clickF="click" style="margin-bottom: 5px;"/>

        <div v-for="doc in list[item.docList_id]" :key="doc.url">
            <a :href="'/referrer?url=' + decode(doc.url)" target="_blank">{{doc.title}}</a>
        </div>
    </v-flex>
    <v-flex xs12>
        <v-btn block color="primary" outline @click="add()">加入新文章</v-btn>
    </v-flex>
    </v-layout>
</template>

<script>
    import GlUiTitle from "../../components-ui/title";
    import mMeta from "../../mixin/mMeta.js";
    export default {
        components: {GlUiTitle},
        mixins: [mMeta],
        name: 'gl-list-doc-index-content',
        data() {
            return {
                docList:null,
                list:null
            }
        }, methods: {
            add(){
                this.$router.push({path: '/list/doc/add'});
            },
            click(data){
                this.$router.push({path: '/list/doc/search?type=' + data});
            },
            decode(data){

                var elem = document.createElement('textarea');
                elem.innerHTML = data;
                return elem.value;
            }
        }, created() {
            let _this = this;
            this.$g.getDocList('docList',this,function(){

              _this.$s.getJSON("/common/data/docList.json",
                function(data){
                  if(data.status === "success"){
                    _this.list = data.data;
                  }
                });
            });

        }
    }
</script>

<style>
    .u-line a:hover{
        text-decoration: underline;
    }

    .u-line a{
        text-decoration: none;
    }
</style>

