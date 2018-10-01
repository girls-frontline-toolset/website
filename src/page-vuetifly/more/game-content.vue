<template>
    <v-container grid-list-md pt-0>
        <div ref="script"></div>
        <v-layout row wrap>
            <v-flex xs12>
                <gl-ui-title text="Game" h1></gl-ui-title>
            </v-flex>
            <v-flex xs12 text--center>
                <v-btn @click="playGame()"> Play Game</v-btn>
            </v-flex>
            <v-flex xs12 ref="app">
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    import GlUiTitle from "../../components-ui/title";
    export default {
        components: {GlUiTitle},
        mixins: [],
        props: [''],
        commponents: {},
        name: 'gl-ui-game',
        data() {
            return {
                width: 256,
                height: 256,
                isVertical:false,
                app:null,
            }
        }, methods: {
            init(){
                let self = this;
              return {
                  Pixi(){
                      self.app = null;
                      PIXI.loader.reset();

                      let type = "WebGL";
                      if(!PIXI.utils.isWebGLSupported()){
                          type = "canvas";
                      }
                      PIXI.utils.sayHello(type);

                      this.heightWidth();

                      self.app = new PIXI.Application(
                          {width:self.width,
                              height:self.height,
                              antialias: true,
                              transparent: false,
                              resolution: 1});
                      self.app.renderer.backgroundColor = 0x061639;
                      self.$refs.app.appendChild(self.app.view);

                      //self.set().background("/common/img/game/bg.jpg");
                      self.set().background("/common/img/game/Screenshot_20180923-191701.png");

                      let line = new PIXI.Graphics();
                      line.lineStyle(4, 0xFFFFFF, 1);
                      line.moveTo(711, 406);
                      line.lineTo(664, 500);
                      line.x = 0 ;
                      line.y = 0;
                      self.app.stage.addChild(line);


                  },
                  heightWidth(){
                      self.width = window.innerWidth;
                      self.height = window.innerHeight;

                      if(self.width < self.height){
                          self.height = self.width *  1.550179211;
                          self.isVertical = true;
                      }else{
                          self.height = self.width / 1.777777778;
                      }
                  }
              }
            },
            set(){
                let self = this;
            return {
                background(src){

                        PIXI.loader
                        .add("/common/img/game/bg.jpg")
                        .load(setup);

                        function setup(){


                        let bg = new PIXI.Sprite(PIXI.loader.resources["/common/img/game/bg.jpg"].texture);

                       var layer = new PIXI.DisplayGroup(0, true);
                        layer.on('add', function (sprite) {
                         sprite.zOrder = -sprite.position.y;
                        });

                         console.log(layer);

                        if(self.isVertical){
                            bg.width = self.height;
                            bg.height = self.width;
                        }else{
                            bg.width = self.width ;
                            bg.height = self.height;
                        }
                        bg.displayGroup = layer;

                        self.spriteVertical(bg);
                        self.app.stage.addChild(bg);
                        }

                }
              }
            },
            playGame(){

                var elem = this.$refs.app;

                    if (elem.requestFullscreen) {
                        elem.requestFullscreen();
                    } else if (elem.mozRequestFullScreen) { /* Firefox */
                        elem.mozRequestFullScreen();
                    } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
                        elem.webkitRequestFullscreen();
                    } else if (elem.msRequestFullscreen) { /* IE/Edge */
                        elem.msRequestFullscreen();
                    }

                this.init().Pixi();
            },
            spriteVertical(sprite){
                if(this.isVertical){
                    sprite.x = this.width;
                    sprite.rotation = 3.14 / 2;
                }
            },

        },
        beforeCreate() {
        }, created() {

        }, beforeMount() {
        }, mounted() {
            document.addEventListener('fullscreenchange', exitHandler);
            document.addEventListener('webkitfullscreenchange', exitHandler);
            document.addEventListener('mozfullscreenchange', exitHandler);
            document.addEventListener('MSFullscreenChange', exitHandler);

            let _this = this;

            function exitHandler() {
                if (!document.fullscreenElement && !document.webkitIsFullScreen && !document.mozFullScreen && !document.msFullscreenElement) {
                    let canvas = document.getElementsByTagName("canvas");
                    if(canvas.length >0){
                        document.getElementsByTagName("canvas")[0].remove();
                    }
                }
            }
        }, beforeUpdate() {
        }, updated() {
        }, render() {
        }
    }
</script>

<style>
</style>
