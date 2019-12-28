<template>
    <v-container grid-list-md pa-0 mt-1>
        <v-layout row wrap>
            <v-flex xs12>
                <gl-ui-title text="實用文庫管理" h1/>
            </v-flex>
            <v-flex xs12>
                <gl-ui-title text="添加文章" h2/>
                <v-form ref="form" v-model="valid" >
                <v-select label="種類" item-text="text" item-value="docList_id" :items="docList"
                          v-model="data.type"
                          name="text"
                          required  :rules="[() => data.type !== '0' || $t('register.must') ]"
                />
                <v-text-field
                        v-model="data.title"
                        type="text"
                        name="title"
                        label="標題"
                        required
                        :rules="[() => !!data.title|| $t('register.must') ]"
                />
                <v-text-field  multi-line label="內容:"
                               :rules="[() => !!data.content || $t('register.must') ]"
                               v-model="data.content" required/>
                <v-text-field
                        name="url"
                        v-model="data.url"
                        type="text"
                        label="網址"
                        required
                        :rules="[() => !!data.url|| $t('register.must') ]"
                />
                <v-btn color="primary" @click="add()" :disabled="!valid">{{$t('register.register')}}</v-btn>
                <v-btn color="primary" outline @click="clear()">{{$t('register.clear')}}</v-btn>
                </v-form>
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
        name: 'gl-ui-doc',
        data() {
            return {
                docList:null,
                data:{type:'1',content:'',title:'',url:''},
                valid:false
            }
        }, methods: {
            add(){
                let _this = this;
                $.ajax({
                        url:"/api/inquiry/doc/addDocList",
                        type:"POST",

                        data:{
                            content: _this.data.content,
                            title: _this.data.title,
                            type: _this.data.type,
                            url: _this.data.url
                        },
                        success: function(data){
                            data = JSON.parse(data);
                            if(data.status === "success"){
                                _this.$s.glDialogText("添加文章", "已成功!!");
                                _this.data = {type:'1',content:'',title:'',url:''} ;
                            }else{
                                _this.$s.glDialogText("添加文章", "出現問題!!", 1);
                            }
                        }
                    }
                );
            },
            clear(){
                this.data = {type:'1',content:'',title:'',url:''} ;
            }

        }, created() {
            this.$g.getDocList('docList',this);
        }
    }
</script>
