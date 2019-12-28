<template>
  <v-container grid-list-md pa-0 mt-1>
    <v-layout row wrap>
      <v-flex xs12>
        <gl-ui-title text="文庫管理" h1/>
      </v-flex>
    </v-layout>
    <v-layout row wrap v-if="!isNone">
      <v-flex xs12 v-for="doc in docList" :key="doc.id">
        <v-select label="種類" item-text="text" item-value="docList_id" :items="docListType"
                  v-model="doc.docListId  "
                  name="text"
                  required :rules="[() => doc.docListId !== '0' || $t('register.must') ]"
        />
        <v-text-field
          v-model="doc.title"
          type="text"
          name="title"
          label="標題"
          required
          :rules="[() => !!doc.title|| $t('register.must') ]"
        />

        <v-textarea label="內容:"
                    :rules="[() => !!doc.content || $t('register.must') ]"
                    v-model="doc.content" required/>
        <v-text-field
          name="url"
          v-model="doc.url"
          type="text"
          label="網址"
          required
          :rules="[() => !!doc.url|| $t('register.must') ]"
        />
        <v-btn :href="decode(doc.url)" target="_blank" color="primary">Test url</v-btn>
        <v-btn outline color="primary" @click="deleteDoc(doc.id)">delete</v-btn>
        <hr style="border: 1px hsla(42, 100%, 50%, 0.8) solid;">
      </v-flex>
      <v-btn color="primary" @click="add()">{{$t('register.register')}}</v-btn>
      <v-btn color="primary" outline @click="clear()">{{$t('register.clear')}}</v-btn>
    </v-layout>
    <v-layout row wrap v-else>
      <v-btn block color="error" >!!沒有作品!!</v-btn>
    </v-layout>
  </v-container>
</template>

<script>
  import GlUiTitle from "../../components-ui/title";
  import mMeta from "../../mixin/mMeta.js";

  export default {
    components: {GlUiTitle},
    mixins: [mMeta],
    name: 'gl-ui-doc-management',
    data() {
      return {
        docList: [],
        docListType: null,
        isNone:false
      }
    },
    methods: {
      init() {
        let _this = this;
        $.ajax({
            url: "/api/inquiry/doc/getNewDoc",
            type: "POST",
            success: function (data) {
              data = JSON.parse(data);
              if (data.status === "success") {
                _this.docList = data.data;
                _this.isNone = (_this.docList.length === 0 );
              }
            }
          }
        );
      },
      add() {
        let _this = this;
        $.ajax({
            url: "/api/inquiry/doc/update",
            type: "POST",

            data: {
              doc: _this.docList
            },
            success: function (data) {
              data = JSON.parse(data);
              if (data.status === "success") {
                _this.$s.glDialogText("文庫管理", "已成功!!");
                _this.init();
              } else {
                _this.$s.glDialogText("文庫管理", "出現問題!!", 1);
              }
            }
          }
        );
      },
      deleteDoc(id) {
        let _this = this;
        $.ajax({
            url: "/api/inquiry/doc/delete",
            type: "POST",

            data: {
              id: id
            },
            success: function (data) {
              data = JSON.parse(data);
              if (data.status === "success") {
                _this.init();
              } else {
                _this.$s.glDialogText("文庫管理", "出現問題!!", 1);
              }
            }
          }
        );

      },
      decode(data){
        var elem = document.createElement('textarea');
        elem.innerHTML = data;
        return elem.value;
      }
    },
    created() {
      this.$g.getDocList('docListType', this);
      this.init();
    }
  }
</script>
