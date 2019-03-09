<template>
  <v-container grid-list-md pt-0 pa-0 mt-1>
    <v-form ref="form" v-model="valid" >
    <v-layout row wrap>
      <v-flex xs12>
        <gl-ui-title :text="$t('contributor.img')" h1 icon="icon-friends"></gl-ui-title>
      </v-flex>
      <v-flex xs12>
        <v-text-field
          v-model="user.username"
          type="text"
          name="title"
          :label="$t('t.user-name')"
          required
          :rules="[() => !!user.username|| $t('register.must') ]"
        ></v-text-field>
      </v-flex>
      <v-flex xs12 sm6>
        <input type="file" ref="iconFile" @change="changeIcon($event)" @click="drawLoad()">
        <v-slider step="0.05" v-model="zoom" thumb-label max="5" :label="$t('contributor.zoom')"></v-slider>
      </v-flex >
      <v-flex xs12 sm6>
        <canvas ref="canvas" style="background-color:rgba(158, 167, 184, 0.2);width: 250px;height:250px"  @touchstart="mouseDown($event)" @touchend="mouseUp($event)"  @mousedown="mouseDown($event)" @mouseup="mouseUp($event)"></canvas>
      </v-flex>
      <v-flex xs12 >
        <v-btn color="primary" @click="add()" :disabled="!valid">{{$t('register.register')}}</v-btn>
        <v-btn color="primary" outline @click="clear()">{{$t('register.clear')}}</v-btn>
      </v-flex>
      <v-flex >
        <canvas ref="drawImage" style="display:none;background-color:rgba(158, 167, 184, 0.2);width: 250px;height:250px"></canvas>
      </v-flex>
    </v-layout>
    </v-form>
  </v-container>
</template>

<script>
  import mPrompt from "../../mixin/mPrompt.js";
  import GlUiCardLeft from "../../components-ui/cardLeft";
  import GlUiTitle from "../../components-ui/title";
  import mMeta from "../../mixin/mMeta.js";

  export default {
    mixins: [mPrompt, mMeta],
    components: {
      GlUiTitle,
      GlUiCardLeft
    },
    name: 'gl-ui-contributor-registered',
    data() {
      return {
        valid:false,
        user: {username: ""},
        data: {title: ""},
        rect: {x: 0, y: 0},
        img: {width: 0, height: 0, source: null, x: 0, y: 0},
        mask: {width: 0, height: 0, source: null, x: 0, y: 0},
        ctx: null,
        cut_img_canvas: null,
        draw_width: 100,
        canvas: {x: 0, y: 0},
        zoom: 0.5,
        isOut: false,
        position:{x:0,y:0},
        mouse:{down:{x:0,y:0},up:{x:0,y:0}}
      }
    }, methods: {
      add(){
        let _this = this;
        let drawImage = this.$refs.drawImage;
        drawImage.width = 250;
        drawImage.height = 250;

        let file = this.$refs.iconFile;
        let img1 = "";
        if (file.files.length > 0){
          let drawCtx =  drawImage.getContext('2d');
          drawCtx.globalAlpha =1;
          drawCtx.drawImage(this.img.source, this.position.x,this.position.y, this.img.width * this.zoom, this.img.height * this.zoom);
          img1 = drawImage.toDataURL();
        }

        $.ajax({
            url:"/api/inquiry/contributor/register",
            type:"POST",

            data:{
              name: _this.user.username,
              file: img1,
              email: _this.user.email,
            },
            success: function(data){
              data = JSON.parse(data);
              if(data.status === "success"){
                _this.$s.glDialogText("貢獻者登記","已成功!!");
                _this.clear() ;
                _this.$router.push({path:'/more/about'});
              }else{
                _this.$s.glDialogText("貢獻者登記", "出現問題!!", 1);
              }
            }
          }
        );

      },
      clear(){
          this.user.username = "";
      },
      mouseUp(e) {
        if (this.isOut) {

          if (e.clientX !== undefined){
            this.mouse.up.x = e.clientX;
            this.mouse.up.y = e.clientY;
          }else{
            this.mouse.up.x = e.changedTouches[0].clientX;
            this.mouse.up.y = e.changedTouches[0].clientY;
          }

          document.getElementsByTagName("html")[0].style.overflow = "";

          this.position.x += this.mouse.up.x - this.mouse.down.x;
          this.position.y += this.mouse.up.y - this.mouse.down.y;
          this.drawRect();

          this.isOut = false;
        }
      },
      mouseDown(e) {
        if(this.isOut) return;

        document.getElementsByTagName("html")[0].style.overflow = "hidden";

        this.isOut = true;
        if (e.clientX !== undefined){
          this.mouse.down.x = e.clientX;
          this.mouse.down.y = e.clientY;
        }else{

          this.mouse.down.x = e.touches[0].clientX;
          this.mouse.down.y = e.touches[0].clientY ;
        }

      },
      drawLoad() {
        this.ctx.clearRect(0, 0, this.cut_img_canvas.width, this.cut_img_canvas.height);
        this.ctx.strokeStyle = "#000";
        this.ctx.fillText("loading...",(this.canvas.x * 2) - (this.ctx.measureText("loading...").width / 2), this.canvas.y);
      },
      drawRect() {
        this.ctx.clearRect(0, 0, this.cut_img_canvas.width, this.cut_img_canvas.height);
        this.ctx.strokeStyle = "#000";

        if (this.img.source === undefined || this.img.source === null) {
          this.ctx.font = "20px Georgia";
          this.ctx.fillText("Please select image", (this.canvas.x * 2) - (this.ctx.measureText("Please select image").width / 2), this.canvas.y);
          return;

        } else if (this.img.source === "load") {
          this.ctx.font = "20px Georgia";
          this.ctx.fillText("loading ...... ", 0, this.canvas.y);
          return;
        } else {
          this.ctx.globalAlpha =1;
          this.ctx.drawImage(this.img.source, this.position.x,this.position.y, this.img.width * this.zoom, this.img.height * this.zoom);
        }

        this.ctx.globalAlpha = 0.7;
        this.ctx.drawImage(this.mask.source, 0, 0);
      },
      changeIcon(e) {
        this.drawLoad();
        let _this = this;

        if (e.target.files.length > 0){
          let reader = new FileReader();
          reader.onload = function (event) {

            _this.img.source = new Image();
            _this.img.source.onload = function () {
              _this.img.width = this.width;
              _this.img.height = this.height;

              _this.drawRect();
            };
            _this.img.source.src = event.target.result;

          };

          reader.readAsDataURL(e.target.files[0]);
          this.mask.source = new Image();
          this.mask.source.onload = function () {
            _this.mask.width = this.width;
            _this.mask.height = this.height;
          };
          this.mask.source.src = '/common/img/mask.png';

        }else{
          _this.img.source = null;
          _this.drawRect();
        }
      }
    },
    beforeCreate: function () {
      let key = this.$route.params.id;

      let _this = this;
      $.getJSON('/api/inquiry/contributor/checkKey?key=' + key, function (json) {
        if (json.status === "success") {
          _this.user = json.data;
        } else {
          _this.$router.push({path: '/'});
        }
      });
    },
    mounted: function () {
      this.cut_img_canvas = this.$refs.canvas;
      this.cut_img_canvas.width = 250;
      this.cut_img_canvas.height = 250;

      this.canvas.x = this.cut_img_canvas.width / 4;
      this.canvas.y = this.cut_img_canvas.height / 2;

      this.ctx = this.cut_img_canvas.getContext('2d');
      this.drawRect();
    },
    watch: {
      zoom(data) {
        this.drawRect(this.rect.x + this.draw_width / 2, this.rect.y + this.draw_width / 2);
      }
    }
  }
</script>

