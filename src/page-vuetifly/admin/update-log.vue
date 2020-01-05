<template>
    <v-container grid-list-md pt-0>
        <v-layout row wrap>
            <v-flex xs12>
                <gl-ui-title text="更新記錄管理" h1/>
            </v-flex>
            <v-flex xs12>
              <v-form ref="form" v-model="valid" >
                <gl-ui-date-picker :date.sync="log.date" text="日期" />
              <v-chip label disabled
                       :style="" color="primary" class="c-p no-select" style="height: 20px;" small text-color="white"  v-for="(t,tIndex) in type" @click="tagClick(tIndex)" :key="tIndex">{{t}}</v-chip>
              <v-text-field
                  v-model="log.type"
                  type="text"
                  :label="'類型'"
                  required
                  :rules="[() => !!log.type || $t('register.must') ]"
              />
              <v-text-field
                v-model="log.text"
                type="text"
                :label="'文字'"
                required
                :rules="[() => !!log.text || $t('register.must') ]"
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
  import GlUiDatePicker from "../../components-ui/date-picker";

  export default {
        components: {GlUiDatePicker, GlUiTitle},
        mixins: [mMeta],
        name: 'gl-ui-daily-task',
        data() {
            return {
              type:["更新","圖片","修改","","新增"],
              valid:false,
              log:{date:"",type:"",text:""}
            }
        }, methods: {
        tagClick(index) {
          this.log.type = index;
          switch (index) {
            case 0:
              this.log.text = "新增2名角色時間";
              break;
            case 1:
              this.log.text = "更新圖片 1 張 感謝上載者";
              break;

          }
        },
        add() {
          let _this = this;
          this.$s.postData("/api/inquiry/log/add",
            {
              date: _this.log.date,
              type: _this.log.type,
              text: _this.log.text,
            },
            function (data) {
              if (data.status === "success") {
                _this.$s.glDialogText("添加更新記錄", "已成功!!");
                _this.clear();
              } else {
                _this.$s.glDialogText("添加更新記錄", "出現問題!!", 1);
              }
            });
        },
        clear() {
          this.log = {date:"",type:"",text:""};
        }
    }}
</script>
