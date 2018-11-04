let mGeneratePixi = {
  data (){
    return {
      layer: {message: null, data: null, move: null, error: null, gird: null,debug:null,watermark:null},
      container: {message: null, data: null, error: null, gird: null,debug:null,watermark:null},
    }
  },
  methods: {
    generateLayer(){
      this.layer.gird = new PIXI.display.Group(0, true);
      this.layer.gird.on('sort', function (sprite) {
        sprite.zOrder = -sprite.y;
      });

      this.layer.message = new PIXI.display.Group(1, true);
      this.layer.message.on('sort', function (sprite) {
        sprite.zOrder = -sprite.y;
      });

      this.layer.data = new PIXI.display.Group(2, true);
      this.layer.data.on('sort', function (sprite) {
        sprite.zOrder = +sprite.y;
      });

      this.layer.move = new PIXI.display.Group(3, true);
      this.layer.move.on('sort', function (sprite) {
        sprite.zOrder = +sprite.y;
      });

      this.layer.error = new PIXI.display.Group(4, true);
      this.layer.error.on('sort', function (sprite) {
        sprite.zOrder = +sprite.y;
      });

      this.layer.debug = new PIXI.display.Group(5, true);
      this.layer.debug.on('sort', function (sprite) {
        sprite.zOrder = +sprite.y;
      });

      this.layer.watermark = new PIXI.display.Group(6, true);
      this.layer.watermark.on('sort', function (sprite) {
        sprite.zOrder = +sprite.y;
      });
    },
    changeGird(key,color){
      this.drawer = false;
      this.selectColor = (color === "blue")?0 : 1;

      this.select.type = this.color[color];
      this.data = eval(key);

      while (this.container.gird.children[0]) {
        this.container.gird.removeChild(this.container.gird.children[0]);
      }
      this.generateGird();
      this.initMessage(1);
      this.$set(this.select,"errorCell",null);
      this.$set(this,'wafer',[]);

      while (this.container.data.children[0]) {
        this.container.data.removeChild(this.container.data.children[0]);
      }


    },
    generateWatermark(){
      // let text = new PIXI.Text('www.ntw-20.com', { font: '12px Snippet', fill: this.select.type.bg, align: 'right' });
      let style =  new PIXI.TextStyle({
        fontFamily: "Comic Sans MS",
        fontWeight: "bold",
        fontVariant: "small-caps",
        font: '12px Snippet', fill: this.select.type.bg
      });

      let text = new PIXI.Text('www.ntw-20.com', style);

      let textMetrics = new PIXI.TextMetrics.measureText('www.ntw-20.com', style);

      text.x = textMetrics.maxLineWidth / 2 + 10;
      text.y = textMetrics.height / 2;
      text.anchor.set(0.5);

      console.log(textMetrics);
      console.log(textMetrics.height * this.scale);
      console.log(textMetrics.maxLineWidth * this.scale -20 );

      console.log((this.width * this.data[0].length + this.start.y * 2) * this.scale);
      //  text.position.x = (this.width * this.data.length + this.start.x * 2 ) * this.scale  - textMetrics.height * this.scale;
      // // // text.position.y = (this.width * this.data[0].length + this.start.y * 2 ) * this.scale  - textMetrics;
      //  text.position.y = (this.width * this.data[0].length + this.start.y * 2 ) * this.scale - textMetrics.maxLineWidth * this.scale  ;

      // PIXI.TextMetrics.clearMetrics(text);
      //console.log(text.position.x);
      this.container.watermark.addChild(text);

    },
    generateContainer(){
      this.container.gird = new PIXI.Container();
      this.app.stage.addChild(this.container.gird);

      this.container.message = new PIXI.Container();
      this.app.stage.addChild(this.container.message);

      this.container.data = new PIXI.Container();
      this.app.stage.addChild(this.container.data);

      this.container.error = new PIXI.Container();
      this.app.stage.addChild(this.container.error);

      this.container.debug = new PIXI.Container();
      this.app.stage.addChild(this.container.debug);

      this.container.watermark = new PIXI.Container();
      this.app.stage.addChild(this.container.watermark);
    },
    generateGird() {
      let point = {x: this.start.x, y: this.start.y};

      for (let i = 0; i < this.data.length; i++) {
        for (let ii = 0; ii < this.data[i].length; ii++) {

          let line = new PIXI.Graphics();
          line.lineStyle(2, 0x303231, 1);

          if (this.data[i][ii] === -1) {
            line.beginFill(0x303231);
          } else {
            this.checkPoint[i + "-" + ii] = {
              x: point.x +  (this.width / 4 * 2),
              y: point.y + (this.width / 4 * 2)
            };
            line.beginFill(this.select.type.bg);
          }
          line.drawRect(0, 0, this.width, this.width);
          line.x = point.x ;
          line.y = point.y;

          line.parentGroup = this.layer.gird;
          //console.log(this.container);

          this.container.gird.addChild(line);
          point.x += this.width;
        }
        point.x = this.start.x;
        point.y += this.width;
      }
    },
  }
};


export default mGeneratePixi;
