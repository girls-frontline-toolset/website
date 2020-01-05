<template>
    <v-container grid-list-md pt-0>
        <v-layout row wrap>
            <v-flex xs12>
                <gl-ui-title text="問題圖片管理" h1/>
            </v-flex>
            <v-flex xs12 v-if="isNone">
                <v-btn block color="error" >!!沒有問題圖片!!</v-btn>
            </v-flex>
            <v-flex xs12 v-else>
                <v-data-table
                        :headers="headers"
                        :items="data"
                        hide-actions
                        class="elevation-1"
                >
                    <template slot="items" slot-scope="props">
                        <td>{{  props.item.type }}</td>
                        <td class="text-xs-right" v-if="props.item.type === 'twitter'"><a target="_blank" :href="'https://twitter.com/statuses/' + props.item.id ">{{props.item.id }}</a></td>
                        <td class="text-xs-right" v-else-if="props.item.type === 'pixiv'"><a target="_blank" :href="'https://www.pixiv.net/member_illust.php?mode=medium&illust_id=' + props.item.id ">{{props.item.id }}</a></td>
                        <td class="text-xs-right" v-else>{{props.item.id }}</td>
                        <td class="text-xs-right">{{  props.item.md5 }}</td>
                        <td class="justify-center layout px-0">
                            <v-btn icon class="mx-0" @click="deleteItem(props.item)">
                                <v-icon color="pink">delete</v-icon>
                            </v-btn>
                            <v-btn icon class="mx-0" @click="removeItem(props.item)">
                                <v-icon color="primary">close</v-icon>
                            </v-btn>
                        </td>
                    </template>
                </v-data-table>
                <v-btn color="primary" @click="deleteAll()">Delete All</v-btn>
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
        name: 'gl-ui-error-image',
        data() {
            return {
                isNone :true,
                data:[],
                headers: [
                    {
                        text: 'Type',
                        align: 'left',
                        sortable: false,
                        value: 'name'
                    },
                    { text: 'Id', value: 'Id' },
                    { text: 'Md5', value: 'Md5' },
                    { text: 'Actions', value: 'Actions' },
                ],
            }
        }, methods: {
            deleteAll(){
                let _this = this;

              this.$s.postData("/api/inquiry/deleteImage",
                {data: _this.data,},
                function (data) {
                  _this.isNone = true;
                }
              );

            },
            deleteItem(item){
                let _this = this;
              this.$s.getJSON('/api/inquiry/deleteOneImage/' + item.type + "/" + item.id,
                        function(json){
                                if(json.status === "success"){
                                    _this.data =  json.data;
                                    _this.isNone = false;
                                }else{
                                    _this.isNone = true;
                                }
                            });
            },
            removeItem(item){
                let _this = this;
              this.$s.getJSON('/api/inquiry/removeImage/' + item.type + "/" + item.id,
                    function(json){
                        if(json.status === "success"){
                            _this.data =  json.data;
                            _this.isNone = false;
                        }else{
                            _this.isNone = true;
                        }
                    });
            },
        },
        beforeCreate: function () {
        let _this = this;
          this.$s.getJSON('/api/inquiry/getErrorImage', function (json) {
            if(json.status === "success"){
                _this.data =  json.data;
                _this.isNone = false;
            }else{
                _this.isNone = true;
            }
        });
        }
    }
</script>

