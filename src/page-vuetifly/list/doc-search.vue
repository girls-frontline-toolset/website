<template>
    <v-layout row wrap >
        <v-flex xs12>
            <gl-ui-title text="搜尋" h1 ></gl-ui-title>
        </v-flex>
        <v-flex xs12  class="f-18 u-line search-text" >
            <div v-for="item in list" style="margin-bottom: 10px">
                <a :href="'/referrer?url=' + decode(item.url)" target="_blank" class="s-title"><div style="font-size: 20px;" v-html="setTitle(decode(item.title))"></div></a>
                <div><a :href="'/referrer?url=' + decode(item.url)" target="_blank">{{decode(item.url)}}</a></div>
                <div v-html="setText(decode(item.content))"></div>
            </div>
        </v-flex>
        <v-flex xs12>
            <div class="text-xs-center" ><v-pagination v-if="count > 1" v-model="page" :length="count" :total-visible="7" @input="click" ></v-pagination></div>
            <v-btn v-if="isEmpty" block color="error">!!沒有相關結果!!</v-btn>
        </v-flex>
    </v-layout>
</template>

<script>
    import GlUiTitle from "../../components-ui/title";
    import mMeta from "../../mixin/mMeta.js";
    export default {
        components: {GlUiTitle},
        mixins: [mMeta],
        props: [''],
        commponents: {},
        name: 'gl-list-doc-search-content',
        data() {
            return {
                query:null,
                type:null,
                isEmpty:false,
                list:null,
                more:false,
                page:0,
                count:0
            }
        }, methods: {
            click(){
               this.$router.push({path: '/list/doc/search?query=' + this.query + '&page=' + this.page});
            },
            decode(data){
                var elem = document.createElement('textarea');
                elem.innerHTML = data;
                return elem.value;
            },
            setText(data){
                data =  data.replace(new RegExp(this.query , 'g'),'<em>' + this.query + '</em>');
                return data.replace(new RegExp('\n', 'g'),'<br>');
            },
            setTitle(data){
                data =  data.replace(new RegExp(this.query , 'g'),'<b>' + this.query + '</b>');
                return data.replace(new RegExp('\n', 'g'),'<br>');
            },
            search(){
                let _this = this;
                $.ajax({
                        url:"/api/inquiry/doc/search",
                        type:"POST",

                        data:{
                            type: _this.type,
                            index: _this.page,
                            query: _this.query
                        },
                        success: function(data){
                                data = JSON.parse(data);
                            if(data.status === "success"){

                                _this.page += 1;
                                _this.list = data.data;
                                _this.count = Math.ceil((parseFloat(data.count) / 5));
                                if(data.data.length >4){
                                    _this.more = true;
                                }else{
                                    _this.more = false;
                                }
                                _this.isEmpty = false;
                            }else{
                                _this.list = null;
                                _this.page = 0;
                                _this.isEmpty = true;
                            }
                        }
                    }
                );

            }
        }, beforeCreate() {
        }, created() {
                if (this.$route.query.query !== undefined) {
                    this.query = this.$route.query.query;
                }

                if (this.$route.query.type !== undefined){
                    this.type = this.$route.query.type;
                }

                if (this.$route.query.page !== undefined){
                    this.page = parseFloat(this.$route.query.page) -1;
                }


                if(this.$route.query.query === undefined && this.$route.query.type === undefined ){
                    return ;
                }

                this.search();


        }, beforeMount() {
        }, mounted() {
        }, beforeUpdate() {
        }, updated() {
        }, render() {
        },beforeRouteUpdate (to, from, next) {
            if(to.query !== undefined){

                if(to.query.page !== undefined){
                    this.page = parseFloat(to.query.page) -1 ;
                }else{
                    this.page = 0;
                }
                //this.$router.push({path: '/list/doc/search?query=' + to.query});
                this.query = to.query.query;
                this.search();
                next();
            }else{
                next();
            }

        }
    }
</script>

<style>
    .search-text em{
        font-weight: bold;
        font-style:unset;
        color: #dd4b39;
    }

    .search-text .s-title{
        color: black;
        text-decoration: none;

    }
</style>
