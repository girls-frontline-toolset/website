<template>
  <v-container grid-list-md pa-0 mt-1>
    <v-layout row wrap>
      <v-flex sm12>
        <gl-ui-card-left :content="prompt" icon="notifications"/>
        <gl-ui-title text="LINE 群" h1 icon="icon-line-other"/>
      </v-flex>
      <v-flex sm12>
        <gl-ui-card-left content="少前同好群 歡迎各位新手,大佬和萌新" />
      </v-flex>
      <v-flex sm12 v-if="!$s.app">
        <gl-ui-title text="Line群 加入登記" h2 />
        <v-stepper v-model="e1" vertical>
          <v-stepper-step :complete="e1 > 1" step="1">認證</v-stepper-step>
          <v-stepper-content step="1">
            <div v-for="(quest, qIndex) in  question">
            {{quest.q}}
              <div v-if="quest.i !== ''">
                <br>
                <gl-ui-img :name="quest.i"  alt=""/>
              </div>
            <v-radio-group v-model="radio[qIndex]" row >
              <v-radio
                color="red darken-3"
                v-for="(n,index) in quest.s"
                :key="n"
                :label="n"
                :value="index"
              />
            </v-radio-group>
            </div>
            <v-btn color="primary" @click="submit()">提交</v-btn>
          </v-stepper-content>

          <v-stepper-step :complete="e1 > 2" step="2">少女前線 資料</v-stepper-step>

          <v-stepper-items>
            <v-stepper-content step="2">
              <v-form ref="form" v-model="valid">
                <v-text-field
                  v-model="info.email"
                  type="email"
                  name="email"
                  label="電郵"
                  required
                  :rules="[() => !!info.email|| $t('register.must') ]"
                />
                <v-text-field
                  v-model="info.UID"
                  mask="#################"
                  type="text"
                  name="uid"
                  label="少女前線 UID"
                  required
                  :rules="[() => !!info.UID|| $t('register.must') ]"
                />
                <gl-ui-gl-card-help/>
                <gl-ui-title text="名片圖片" h2 icon="icon-line-other"/>
                <input type="file" ref="UIDFile" accept="image/*"  >
                <br><br>
                <v-btn color="primary" @click="add()" :disabled="!valid">{{$t('register.register')}}</v-btn>
                <v-btn color="primary" outline @click="clear()">{{$t('register.clear')}}</v-btn>
              </v-form>
            </v-stepper-content>

            <v-stepper-step :complete="e1 > 3" step="3">複製代碼</v-stepper-step>

            <v-stepper-content step="3">
              <v-text-field
                v-model="token"
                type="text"
                name="代碼"
                label="代碼"
              />
              <v-btn color="primary" @click="copy()">複製</v-btn>
            </v-stepper-content>

            <v-stepper-step :complete="e1 > 4" step="4">加入Line好友,發送代碼</v-stepper-step>
            <v-stepper-content step="4">
              <span style="color:red;font-weight: bolder;">***加Line好友,發送代碼***</span>
              <div class="bd primary--text">
                <div class="bd-title">
                  Line 名稱: <span>少女前線 工具集</span><br>
                  Line ID: <span>ntw-20-bot</span><br>
                  <a href="line://ti/p/zpjy5ufLw-" target="_blank">
                    <gl-ui-img name="gl-zh-Hant" alt="add line"/>
                  </a>
                </div>
              </div>
              <v-btn color="primary" @click="complete()">完成</v-btn>
              <v-btn color="primary" outline @click="e1 = 3">返回</v-btn>

            </v-stepper-content>
            <v-stepper-step :complete="e1 > 5" step="5">完成</v-stepper-step>
            <v-stepper-content step="5">
              已完成! 請細心等待批核!
            </v-stepper-content>
          </v-stepper-items>
        </v-stepper>
      </v-flex >
      <v-flex sm12 v-else>
        <gl-ui-card-left content="不支援應用程式版本, 請前往網頁版. https://ntw-20.com" />
        <a href="https://ntw-20.com/more/line" target="_blank">
          <v-btn color="primary">
            網頁版
          </v-btn></a>
      </v-flex>
    </v-layout>

  </v-container>
</template>

<script>
  import mPrompt from "../../mixin/mPrompt.js";
  import GlUiTitle from "../../components-ui/title";
  import GlUiCardLeft from "../../components-ui/cardLeft";
  import GlUiGlCardHelp from "../../components-ui/image/glCardHelp.vue";
  import mMeta from "../../mixin/mMeta.js";
  import GlUiImg from "../../components-ui/img";

  export default {
    components: {
      GlUiImg,
      GlUiCardLeft,
      GlUiTitle,
      GlUiGlCardHelp
    },
    name: 'gl-ui-line',
    mixins: [mPrompt, mMeta],
    data() {
      return {
        question:[
          {"q":"IDW 出現的時間是?","a":3,"s":['1:00','08:06','3:53','1:10','7:55'],"i":""},
          {"q":"太太的種類是?","a":1,"s":['AR','RF','RPG','NTR','LOLI'],"i":""},
          {"q":"以下那個角色是最平的?","a":4,"s":['HK416','SPAS-12','AS Val','MP40','UMP45'],"i":""},
          {"q":"請說出圖片中的角色名字","a":4,"s":['能登','貝登','阿登','凡爾登','司登'],"i":"gl-line-register-1"}
        ],
        radio:[0,0,0,0],
        info: {UID: "", email: ""},
        isShow: false,
        valid: false,
        token: "",
        e1: 1,

      }
    }, methods: {
      submit(){
        for (let i = 0; i < this.radio.length; i++) {
          if (this.question[i].a !== this.radio[i]){
            this.$s.glDialogText("Line群 加入登記", "答案不正確", 1);
            this.radio = [0,0,0,0];
            return
          }
        }
        this.e1 = 2
      },
      add() {
        let _this = this;
        let file = this.$refs.UIDFile;
        if (file.files.length < 1) {
          this.$s.glDialogText("Line群 加入登記", "請上載名片圖片", 1);
          return;
        }

        let formData = new FormData();
        formData.append('file',  file.files[0]);
        formData.append('email',  this.info.email);
        formData.append('UID',   this.info.UID);

        this.$s.load(true);
        $.ajax({
            url: "/api/inquiry/line/register",
            type:"POST",
            data: formData,
            cache: false,
            processData: false,
            contentType: false,
            success(data) {
              data = JSON.parse(data);
              _this.$s.load(false);
              switch (data.status) {
                case "typeError":
                  _this.$s.glDialogText("Line群 加入登記", "只支援 jpg,png,gif 圖片", 1);
                  break;
                case "unsuccess":
                  _this.$s.glDialogText("Line群 加入登記", "出現問題!! 請再試", 1);
                  break;
                case "success":
                  _this.token = data.token;
                  _this.e1 = 3;
                  break;
                default:
                  _this.$s.glDialogText("Line群 加入登記", "出現問題!! 請再試", 1);
              }
            }
        }
        );
      },
      clear(){
        this.info =  {UID: "", email: ""};
        let file = this.$refs.UIDFile;
        file.value = "";
      },
      copy() {
        const el = document.createElement('textarea');
        el.value = this.token;
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
        this.$s.glDialogText("複製", "已複製");

        this.e1 = 4;
      },
      complete() {
        this.$s.glDialogText("Line群 加入登記", "已完成! 請等待批核");
        this.e1 = 5;
      }
    }
  }
</script>
