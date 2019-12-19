<template>
  <v-form ref="form" v-model="valid" enctype="multipart/form-data">
    <v-container grid-list-md pt-0>
      <v-layout row wrap>
        <v-flex xs12>
          <gl-ui-title text="連接生成" h1/>
        </v-flex>
        <v-flex xs12 pa-1>
          <v-text-field v-model="data.title" type="text" label="標題:"
                        :rules="[() => !!data.title || $t('register.must') ]"
          />
        </v-flex>
        <v-flex xs12 pa-1>
          <v-text-field v-model="data.locationTo" type="text" label="轉至:"
                        :rules="[() => !!data.locationTo || $t('register.must') ]"
          />
        </v-flex>
        <v-flex xs12 pa-1>
          <v-text-field v-model="data.description" type="text" label="描述:"
                        :rules="[() => !!data.description || $t('register.must') ]"
          />
        </v-flex>
        <v-flex xs12 pa-1>
          <input ref="file" type="file" id="file" @change="imgChange()"><br>
          <img ref="previewImg" src="/common/img/bg.jpg" alt="Preview Image" style="width: 100%; max-width: 600px;"/>
        </v-flex>
        <v-flex xs6>
          <v-btn color="primary" @click="add()">提交</v-btn>
          <v-btn color="primary" @click="clear()" outline>清除</v-btn>
        </v-flex>

      </v-layout>
    </v-container>
  </v-form>
</template>

<script>
  import GlUiTitle from "../../components-ui/title";
  import mMeta from "../../mixin/mMeta.js";

  export default {
    components: {GlUiTitle},
    mixins: [mMeta],
    props: [''],
    commponents: {},
    name: 'gl-ui-link-make-setting',
    data() {
      return {
        data: {locationTo: "https://www.ntw-20.com", title: "", description: ""},
        valid:false
      }
    }, methods: {
      add() {
        if (this.$refs.file.files[0] === undefined) {
          this.$s.glDialogText("添加文章", "請選擇文件!!", 1);
          return;
        }

        let formData = new FormData();
        formData.append('file', this.$refs.file.files[0]);
        formData.append('title', this.data.title);
        formData.append('locationTo', this.data.locationTo);
        formData.append('description', this.data.description);

        let _this = this;
        $.ajax({
            url: "/api/inquiry/link/addLink",
            type: "POST",
            data: formData,
            cache: false,
            processData: false,
            contentType: false,
            success: function (data) {
              data = JSON.parse(data);
              if (data.status === "success") {
                _this.$s.glDialogText("添加連接生成", data.data.url);
                _this.clear();
              } else {
                _this.$s.glDialogText("添加連接生成", "出現問題!!", 1);
              }
            }
          }
        );
      },
      imgChange() {
        let _this = this;
        let reader = new FileReader();

        reader.onload = function (e) {
          _this.$refs.previewImg.setAttribute("src", "" + e.target.result);
        };

        reader.readAsDataURL(_this.$refs.file.files[0]);
      },
      clear() {
        this.data = {locationTo: "https://www.ntw-20.com", title: "", description: ""};
      }
    }
  }
</script>
