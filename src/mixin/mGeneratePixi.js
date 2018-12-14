import mArray from './mArray';

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
    bestArrange(array,color){
      this.data = array;
      let _this = this;

      function getCellListById(id){
        for (let i = 0; i < _this.cellList.length; i++) {
          if(parseInt(_this.cellList[i].no) === id ){
            return _this.cellList[i];
          }
        }
        return null;
      }

      this.changeGird(array,color);
      let max = mArray.getMaxNum(array);

      let dataList = [];

      for (let i = 1; i <= max; i++) {
        dataList.push(this.getCellByNum(array,i));
      }

      for (let i = 0; i < dataList.length; i++) {
        if(dataList[i] === 0 ) continue;
        let data = getCellListById(dataList[i].no);
        let cell = this.createWafer(data.gird,data.position,this.selectColor,eval(data.polygon),eval(dataList[i].rotate));
        this.paste(cell,dataList[i].x,dataList[i].y)
      }
    },
    changeGird(key,color){
      this.drawer = false;
      this.selectColor = (color === "blue")? 1: 0 ;
      this.select.type = this.color[color];
      this.data = key;

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

      this.generateWatermark()
    },
    generateWatermark(){
      while ( this.container.watermark.children[0]) {
        this.container.watermark.removeChild( this.container.watermark.children[0]);
      }

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
    generateBg(){
      let bg = new PIXI.Graphics();
      bg.beginFill(0x303231);
      bg.x = 0;
      bg.y = 0;
      bg.drawRect(0, 0, 600,600);
      bg.parentGroup = this.layer.gird;
      this.container.gird.addChild(bg);
    },
    generateGird() {
      this.generateBg();
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
