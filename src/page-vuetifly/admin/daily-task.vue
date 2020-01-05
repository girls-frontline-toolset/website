<template>
    <v-container grid-list-md pt-0>
        <v-layout row wrap>
            <v-flex xs12>
                <gl-ui-title text="每日提示管理" h1/>
            </v-flex>
            <v-flex xs12>
              <v-form ref="form" v-model="valid" >
                <gl-ui-date-picker :date.sync="task.start" text="開始" />
                <gl-ui-date-picker :date.sync="task.end" text="結束" />

              <v-chip label color="primary" class="c-p no-select" style="height: 20px;" small text-color="white"  v-for="(t,tIndex) in type" @click="tagClick(t)" :key="tIndex">{{t}}</v-chip>
              <v-text-field
                v-model="task.type"
                type="text"
                :label="'類型'"
                required
                :rules="[() => !!task.type || $t('register.must') ]"
              />
              <v-text-field
                v-model="task.text"
                type="text"
                :label="'文字'"
                required
                :rules="[() => !!task.text || $t('register.must') ]"
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
        name: 'gl-ui-update-log',
        data() {
            return {
              type:[],
              task:{"type":"","text":"","start":"","end":""},
              valid:false
            }
        }, methods: {
        tagClick(tag) {
          this.task.type = tag;

        },
        add() {
          let _this = this;
          this.$s.postData("/api/inquiry/notification/add",
            {
              start: _this.task.start,
              end: _this.task.end,
              type: _this.task.type,
              text: _this.task.text
            },
            function(data){
              if(data.status === "success"){
                _this.$s.glDialogText("添加每日任務", "已成功!!");
                _this.clear();
              }else{
                _this.$s.glDialogText("添加每日任務", "出現問題!!", 1);
              }
            }
          );
        },
        clear() {
          this.task = {"type":"","text":"","start":"","end":""};
        }
        }, created() {
        let _this = this;

        this.$s.getJSON("/api/inquiry/notification/getNotificationType",
          function (data) {
            if (data.status === "success") {
              for (let i = 0; i < data.data.length; i++) {
                _this.type.push(data.data[i].type)
              }
              console.log(_this.type);
            }
          }
        );
      }
    }
</script>
