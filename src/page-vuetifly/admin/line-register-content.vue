<template>
  <v-container grid-list-md pa-0 mt-1>
    <v-layout row wrap>
      <v-flex xs12>
        <gl-ui-title text="Line登記管理" h1></gl-ui-title>
      </v-flex>
      <v-flex xs12>
        <v-container grid-list-md pa-0>
          <v-layout row wrap>
            <v-flex xs12>
              <v-card>
                <v-card-title primary-title pa-1>
                  <v-layout row wrap>
                    <v-flex sm4 xs12>
                      <v-text-field type="text" v-model="token" label="token" tabindex="1"></v-text-field>
                    </v-flex>
                    <v-flex sm4 xs12>
                      <v-text-field type="text" v-model="email" label="email" tabindex="2"></v-text-field>
                    </v-flex>
                    <v-flex sm4 xs12>
                      <v-btn color="primary" block dark @click="search()" tabindex="2">{{$t('t.search')}}</v-btn>
                    </v-flex>
                  </v-layout>
                </v-card-title>
              </v-card>
            </v-flex>
            <v-flex xs12 v-if="data.email === 'null' ">
              <gl-ui-error error="3" text="沒有資料"></gl-ui-error>
            </v-flex>
            <v-flex xs12 v-if="data.email !== '' && data.email !== 'null' ">
              <gl-ui-title text="Line 用戶" h2></gl-ui-title>
              <v-form ref="form" v-model="valid">
                <v-text-field
                  v-model="data.token"
                  type="token"
                  name="token"
                  label="token"
                  readonly
                  filled
                ></v-text-field>
                <v-text-field
                  v-model="data.email"
                  type="Email"
                  name="title"
                  label="Email"
                  required
                  :rules="[() => !!data.email|| $t('register.must') ]"
                ></v-text-field>

                <v-text-field
                  v-model="data.uid"
                  type="text"
                  name="UID"
                  label="UID"
                  required
                  :rules="[() => !!data.uid|| $t('register.must') ]"
                ></v-text-field>


                <img :src="'/common/line/register/' + data.card" alt="card" style="width: 100%;">
                <input type="file" ref="UIDFile" accept="image/*"  >
                <v-text-field
                  v-model="data.lineName" type="text"
                  name="lineName" label="Line Name"
                  required :rules="[() => !!data.lineName|| $t('register.must') ]"
                ></v-text-field>

                <v-btn color="primary" @click="update()" :disabled="!valid">更新</v-btn>
              </v-form>
            </v-flex>
          </v-layout>
        </v-container>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import GlUiTitle from "../../components-ui/title";
  import mMeta from "../../mixin/mMeta.js";
  import GlUiError from "../../components-ui/error";

  export default {
    components: {GlUiError, GlUiTitle},
    mixins: [mMeta],
    props: [''],
    commponents: {},
    name: 'gl-ui-doc',
    data() {
      return {
        token: "",
        email:"",
        docList: null,
        data: {lineName: "", email: "", uid: "", card: "", id: "",token:""},
        valid: false
      }
    }, methods: {
      search() {
        let _this = this;

        $.ajax({
            url: "/api/inquiry/line/getByToken",
            type: "POST",
            data: {
              token: _this.token,
              email: _this.email
            },
            success: function (data) {
              data = JSON.parse(data);
              if (data.status === "success" && data.data.length > 0) {
                _this.data.lineName = data.data[0]['line_name'];
                _this.data.email = data.data[0]['email'];
                _this.data.uid = data.data[0]['uid'];
                _this.data.card = data.data[0]['card'];
                _this.data.id = data.data[0]['id'];
                _this.data.token = data.data[0]['token'];
              }else{
                  _this.data.email = "null";
              }
            }
          }
        )

      },
      update() {
        let _this = this;
        let file = this.$refs.UIDFile;
        let formData = new FormData();

        if (file.files.length > 0) {
          formData.append('file',  file.files[0]);
        }

        formData.append('lineName',  _this.data.lineName);
        formData.append('email',   _this.data.email);
        formData.append('uid',   _this.data.uid);
        formData.append('id',   _this.data.id);
        formData.append('card',   _this.data.card);

        $.ajax({
          url: "/api/inquiry/line/registerUpdate",
          type: "POST",
          data: formData,
          cache: false,
          processData: false,
          contentType: false,
          success: function (data) {
            data = JSON.parse(data);
            if (data.status === "success"){
              _this.$s.glDialogText("Line登記管理", "完成");
            }
          }
        });
      }
      }, beforeCreate() {
      }, created() {
      }, beforeMount() {
      }, mounted() {
      }, beforeUpdate() {
      }, updated() {
      }, render() {
      }
    }
</script>
