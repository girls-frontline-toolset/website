let mHandlePixi = {
  data (){
    return {
      img: {width: 282, height: 156},
      app: {view:null,stage :null},
      start: {x: 10, y: 10},
      width: 47,
      debug: false,
      fillData: [
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
      ],
      data: [
          [-1, -1, 0, 0, -1, -1, -1, -1],
          [-1, 0, 0, 0, 0, -1, -1, -1],
          [0, 0, 0, 0, 0, 0, -1, -1],
          [0, 0, 0, 0, 0, 0, 0, -1],
          [-1, 0, 0, 0, 0, 0, 0, 0],
          [-1, -1, 0, 0, 0, 0, 0, 0],
          [-1, -1, -1, 0, 0, 0, 0, -1],
          [-1, -1, -1, -1, 0, 0, -1, -1],
      ],
      // data: [
      //   [-1, -1, -1, -1, -1, -1, -1, -1],
      //   [-1, -1, 0, -1, -1, 0, -1, -1],
      //   [-1, 0, 0, 0, 0, 0, 0, -1],
      //   [0, 0, 0, 0, 0, 0, 0, 0],
      //   [0, 0, 0, 0, 0, 0, 0, 0],
      //   [-1, 0, 0, 0, 0, 0, 0, -1],
      //   [-1, -1, 0, -1, -1, 0, -1, -1],
      //   [-1, -1, -1, -1, -1, -1, -1, -1],
      // ],

      checkPoint: [],
      selectPoint: [],
      color: {blue: {bg: "0x5f6ea5", fill: "0x495377"}, orange: {bg: "0xb55a3f", fill: "0x763f2a"}},
      select: {type: null, errorCell: null},
      wafer: [],
      scale:1.2,
      pos:null,
      pixiApp:{width: 0, height: 0}
    }
  },
  methods: {
    init() {
      let _this = this;
      this.scale = this.$refs.app.offsetWidth / (this.width * this.data.length + this.start.x * 2);
      this.pixiApp = {width:(this.width * this.data.length + this.start.x * 2 ) * this.scale,height:(this.width * this.data[0].length + this.start.y * 2 ) *  this.scale}
      this.app = new PIXI.Application(this.pixiApp.width,this.pixiApp.height);
      this.$refs.app.appendChild(this.app.view );
        this.app.view.addEventListener("drop", function( event ) {
        event.preventDefault();
        let data = event.dataTransfer.getData("data");
            //console.log(pos);
        if(data ){
          data = JSON.parse(data);
          data.polygon = eval(data.polygon);
          _this.createWafer(data.gird, data.position, data.color,data.polygon);
        }
      }, false);

      this.app.view.addEventListener("dragover", function( event ) {
        event.preventDefault();
      }, false);

      this.app.stage = new PIXI.display.Stage();
      this.app.stage.group.enableSort = true;

      this.app.stage.scale.x = this.scale;
      this.app.stage.scale.y = this.scale;

      this.generateLayer();
      this.generateContainer();
      this.generateGird();
      this.generateWatermark();
      this.getCanvas().classList += "no-select";
      //this.createWafer("6", "111111-000000-000000-000000-000000-000000",[0,55, 282,55, 282,102, 0,102, 0,55]);
      //this.createWafer("6", "111000-011000-001000-000000-000000-000000", 1,[71,8, 212,8, 212,148, 165,148, 165,102, 118,102, 118,55, 71,55, 71,8]);

      if (this.debug){
        for (const type in this.checkPoint) {
            let line = new PIXI.Graphics();
            line.lineStyle(2, 0xFFFFFF, 1);

            line.beginFill(0xFFFFFF);

            line.drawRect(0, 0, 2, 2);
            line.x = this.checkPoint[type].x;
            line.y = this.checkPoint[type].y;

            line.parentGroup = this.layer.debug;
            this.container.debug.addChild(line);
        }
      }

    },
    createWafer: function (gird, position, color, points, angle = 0) {
      this.$ga.event('make-wafer', 'create-wafer');
      this.drawer = false;
      let _this = this;

      let cell = new PIXI.Sprite(PIXI.Texture.fromImage('/common/cell/game/' + gird + '/' + position + "-" + color + ".png"));
      cell.dataPosition = position;

      cell.objDate = {gird: gird, position: position, color: color, points: points};
      cell.parentGroup = this.layer.data;
      cell.interactive = true;
      cell.waferIndex = this.pushWafer(cell);
      cell.hitArea = new PIXI.Polygon(points);
      cell.x = (this.app.view.width / 2 - this.img.width / 2) / this.scale;
      cell.y = (this.app.view.height / 2 - this.img.height / 2) / this.scale;
      cell.on('mousedown', onDragStart)
        .on('touchstart', onDragStart)
        .on('mouseup', onDragEnd)
        .on('mouseupoutside', onDragEnd)
        .on('touchend', onDragEnd)
        .on('touchendoutside', onDragEnd)
        .on('mousemove', onDragMove)
        .on('touchmove', onDragMove);
      this.container.data.addChild(cell);

      function onDragStart(event) {
        if (!this.dragging) {
          if (_this.select.errorCell !== null) {
            if (_this.select.errorCell !== this.waferIndex) {
              _this.$s.glDialogText("提示", "晶片出現問題!");
              return
            }
          }
          _this.removeData(this);
          this.data = event.data;
          this.oldGroup = this.parentGroup;
          this.parentGroup = _this.layer.move;
          this.dragging = true;
          this.move = false;
          this.dragPoint = event.data.getLocalPosition(this.parent);
          this.dragPoint.x -= this.x;
          this.dragPoint.y -= this.y;
        }
      }

      function onDragEnd() {

        if (this.dragging) {
          _this.initMessage(2);
          this.dragging = false;
          this.parentGroup = this.oldGroup;
          let newPosition = this.data.getLocalPosition(this.parent);
          this.data = null;
          _this.addData(this, _this.paste(this));

          if (!this.move) {
            _this.initMessage(1);
            _this.rotation(this);
          }
        }
      }

      function onDragMove() {

        if (this.dragging) {
          let newPosition = this.data.getLocalPosition(this.parent);
          this.move = true;
          this.x = newPosition.x - this.dragPoint.x;
          this.y = newPosition.y - this.dragPoint.y;

          _this.initMessage(1);
          _this.check(this)
        }
      }

      if (angle !== 0) {
        cell.dataRotation = angle;
        this.rotation(cell);
      }
      return cell;
    },
    initMessage(type) {
      switch (type) {
        case 1:
          while (this.container.error.children[0]) {
            this.container.error.removeChild(this.container.error.children[0]);
          }
        case 2:
          while (this.container.message.children[0]) {
            this.container.message.removeChild(this.container.message.children[0]);
          }
          break;
        default:

      }
    },
    removeData(obj) {
      for (let i = 0; i < this.data.length; i++) {
        for (let j = 0; j < this.data[i].length; j++) {
          if (this.data[i][j] === obj.waferIndex + 1) {
            this.data[i][j] = 0;
          }

        }
      }
    },
    pinterError(x, y) {
      let point = {x: this.start.x, y: this.start.y};
      let line = new PIXI.Graphics();
      line.beginFill(0xFF0000, 0.5);

      line.drawRect(0, 0, this.width, this.width);
      line.x = point.x + ((this.width) * y);
      line.y = point.y + ((this.width) * x);
      line.parentGroup = this.layer.error;
      this.container.error.addChild(line);
      this.fillData[x][y] = 1;
      return true;
    },
    addData(obj, point) {
      if (!point) {
        this.select.errorCell = null;
        return;
      }


      let starPoint = 0, isInit = false;
      let position = obj.dataPosition;
      let data = position.split("-");

      for (let i = 0; i < data.length; i++) {
        let tmp = [];
        for (let j = 0; j < data[i].length; j++) {
          tmp.push(data[i][j]);
        }
        data[i] = tmp;
      }
      data = this.rotate2DArray(obj.dataRotation - 90, data);

      let line = 0, haveError = false;

      for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data[i].length; j++) {

          if (data[i][j] === "1") {
            if (!isInit) {
              if (this.data[point.col][point.row] !== 0) {
                this.pinterError(point.col, point.row);
                haveError = true;
              } else {
                this.data[point.col][point.row] = obj.waferIndex + 1;
              }
              line = 0;
              starPoint = point.row - j;
              isInit = true
            } else {
              if (this.data[point.col + line]) {

                if (this.data[point.col + line][j + starPoint] !== 0) {
                  this.pinterError(point.col + line, j + starPoint);
                  haveError = true;
                } else {
                  this.data[point.col + line][j + starPoint] = obj.waferIndex + 1;
                }

              }
            }
          }
        }
        line++;
      }
      if (haveError) {
        this.select.errorCell = obj.waferIndex
      } else {
        this.select.errorCell = null
      }


    },
    rotate2DArray(angle, array) {
      if (angle === undefined) angle = 0;
      if (array[0][0] === undefined) return null;

      //fill 2D array
      let length = (array.length > array[0].length) ? array.length : array[0].length;
      for (let i = 0; i < length; i++) {
        if (array[i] === undefined)
          array[i] = [];
        for (let j = 0; j < length; j++) {
          if (array[i][j] === undefined) {
            array[i][j] = 0
          }
        }
      }

      function rotate(matrix) {
        const n = matrix.length;
        const x = Math.floor(n / 2);
        const y = n - 1;
        for (let i = 0; i < x; i++) {
          for (let j = i; j < y - i; j++) {
            let k = matrix[i][j];
            matrix[i][j] = matrix[y - j][i];
            matrix[y - j][i] = matrix[y - i][y - j];
            matrix[y - i][y - j] = matrix[j][y - i];
            matrix[j][y - i] = k;
          }
        }
      }

      switch (angle) {
        case 270:
          rotate(array);
        case 180:
          rotate(array);
        case 90:
         rotate(array);
        case 0:
      }
      return array;
    },
    pushWafer(obj) {
      for (let i = 0; i < this.wafer.length; i++) {
        if (this.wafer[i] == null) {
          this.$set(this.wafer,i,obj);
          this.$set(this.fab,i,false);
          return i;
        }
      }
      this.wafer.push(obj);
      this.fab[this.wafer.length- 1] = false;
      return this.wafer.length - 1
    },
    polygonRotation(polygon, angle) {
      if (!angle) {
        return rotation = {x: 0, y: 0, point: polygon, width: 0, height: 0};
      }

      let rotation = {x: 0, y: 0, point: [], width: 0, height: 0};
      switch (angle - 90) {
        case 0:
          return rotation = {x: 0, y: 0, point: polygon, width: 0, height: 0};
          break;
        case 90:
          for (let i = 0; i < polygon.length; i += 2) {
            rotation.point[i] = Math.round(this.img.height - polygon[i + 1]);
            rotation.point[i + 1] = Math.round(polygon[i]);
            rotation.width = -this.img.height;
            rotation.x = this.img.height;
          }
          break;
        case 180:
          for (let i = 0; i < polygon.length; i += 2) {
            rotation.point[i] = Math.round((polygon[i] - this.img.width) * -1);
            rotation.point[i + 1] = Math.round((polygon[i + 1] - this.img.height) * -1);

            rotation.width = -this.img.width;
            rotation.height = -this.img.height;
            rotation.x = (this.img.width);
            rotation.y = +this.img.height;
          }
          break;
        case 270:
          for (let i = 0; i < polygon.length; i += 2) {
            rotation.point[i] = Math.round(polygon[i + 1]);
            rotation.point[i + 1] = Math.round((this.img.width - polygon[i]));
            rotation.height = -this.img.width;
            rotation.y = +this.img.width;
          }
          break;

      }
      return rotation;
    },
    paste(cell,pasteX = null,pasteY = null) {
      let rotation = this.polygonRotation(cell.hitArea.points, cell.dataRotation);
      let point = rotation.point;
      let min = {x: null, y: null};
      //get this min
      for (let i = 1; i < point.length; i += 2) {
        if (min.y == null) {
          min = {x: point[i - 1], y: point[i]}
        }

        if (point[i] < min.y) {
          min = {x: point[i - 1], y: point[i]}
        }
      }

      for (let i = 0; i < point.length; i += 2) {
        if (min.y === point[i + 1]) {
          if (point[i] < min.x) {
            min.x = point[i]
          }
        }

      }

      let girdPoint = null;
        if(pasteX === null){
          girdPoint = this.getGirdByPoint(cell.x + rotation.width + min.x, cell.y + min.y + rotation.height);
        }else{
          girdPoint = this.getGirdByColRow(pasteX,pasteY)
        }

      if (girdPoint) {
        cell.x = girdPoint.x - min.x + rotation.x - this.width;
        cell.y = girdPoint.y - min.y + rotation.y;


        return {col: girdPoint.col, row: girdPoint.row}
      }
      return null;
    },
    getGirdByColRow(row,col){
      let point = {x: this.start.x, y: this.start.y};
      return {
        col:col ,
        row:row ,
        x:(point.x + row * this.width + this.width),
        y:(point.y + col * this.width)
      }

    },
    getGirdByPoint(x, y) {
      let xO = x;
      let point = {x: this.start.x, y: this.start.y};
      let isNextFill = false;

      for (let i = 0; i < this.data.length; i++) {
        for (let j = 0; j <= this.data[i].length; j++) {
          if (x >= point.x && x <= (point.x + this.width)) {
            if (y >= point.y && y <= (point.y + this.width)) {
              if (this.fillData[i][j - 1] !== 1) {
                x += this.width;
                isNextFill = true;
              } else {
                return {col: i, row: (j - 1), x: point.x, y: point.y}
              }
            }
          }
          point.x += this.width;
        }
        if (isNextFill) {
          x = xO;
          y += this.width;
        }

        point.x = this.start.x;
        point.y += this.width;
      }

    },
    check() {

      this.fillData = [
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
      ];
      this.selectPoint = [];
      let canvas = this.getCanvas().getContext('2d');
      let scale = this.scale;
      let outOfBoxX = 0 ,  outOfBoxY = 0 ;

      //console.log(this.scale);

      if(canvas == null){
      scale = 1 ;

        let can = this.app.renderer.extract.canvas(this.app.stage);

        canvas = can.getContext('2d');

        for (let i = 0; i < this.wafer.length; i++) {
          let x = this.wafer[i].x;
          let y = this.wafer[i].y;
          if(this.wafer[i].dataRotation){
            // console.log(this.wafer[i].dataRotation -90);
            switch (this.wafer[i].dataRotation -90) {
              case 90:
                x -= this.img.height ;
                break;
              case 180:
                x -= this.img.width ;
                y -= this.img.height;
                break;
              case 270:
                y -= this.img.width;
                break;
            }
          }
          if(x < outOfBoxX ){
            outOfBoxX  = x
          }
          if(y < outOfBoxY ){
            outOfBoxY = y
          }

        }
      }
      for (const type in this.checkPoint) {
        let color = canvas.getImageData(this.checkPoint[type].x  * scale - outOfBoxX , this.checkPoint[type].y * scale - outOfBoxY, 1, 1).data;
        switch (color.join(",")) {
          case "73,83,119,255":
          case "95,110,165,255":
          case "181,90,63,255":
          case "118,63,42,255":
            break;
          default:
            if (this.fillGrid(parseInt(type.split("-")[0]), parseInt(type.split("-")[1]))) {
              this.selectPoint.push({
                x: parseInt(type.split("-")[0]),
                y: parseInt(type.split("-")[1])
              })
            }
        }
      }

      canvas = null;

    },
    getCanvas() {
      if (this.canvas) {
        return this.canvas;
      } else {
        this.canvas = this.app.view;
        return this.canvas;
      }
    },
    fillGrid(x, y) {
      if (this.data[x][y] !== 0) return false;
      let point = {x: this.start.x, y: this.start.y};
      let line = new PIXI.Graphics();
      line.lineStyle(2, 0x303231, 1);
      line.beginFill(this.select.type.fill);
      line.drawRect(0, 0, this.width, this.width);
      line.x = point.x + ((this.width) * y);
      line.y = point.y + ((this.width) * x);
      line.parentGroup = this.layer.message;
      this.container.message.addChild(line);
      this.fillData[x][y] = 1;
      return true;
    },
    rotation(sprite) {
      if (!sprite.dataRotation)
        sprite.dataRotation = 90;

      switch (sprite.dataRotation) {
        case 90:
          sprite.rotation = 90 * (Math.PI / 180);
          sprite.x += ((this.img.width / 2 + this.img.height / 2));
          sprite.y -= this.img.height / 4;
          sprite.dataRotation += 90;
          break;
        case 180:
          sprite.rotation = 180 * (Math.PI / 180);
          sprite.x += (this.img.height / 4);
          sprite.y += ((this.img.width / 2 + this.img.height / 2));
          sprite.dataRotation += 90;
          break;
        case 270:
          sprite.rotation = 270 * (Math.PI / 180);
          sprite.x -= ((this.img.width / 2 + this.img.height / 2));
          sprite.y += this.img.height / 4;
          sprite.dataRotation += 90;
          break;
        case 360:
          sprite.rotation = 0;
          sprite.x -= this.img.height / 4;
          sprite.y -= ((this.img.width / 2 + this.img.height / 2));
          sprite.dataRotation = 0;
          break;
      }


    },
    drop(event){
        event.preventDefault();

    },
    deleteWafer(obj){

      if (this.select.errorCell !== null) {
        if (this.select.errorCell !== obj.waferIndex) {
          this.$s.glDialogText("提示", "不能刪除非出現片問題!");
          return
        }
      }

      this.initMessage(1);
      this.select.errorCell = null;
      let children = this.container.data.children;
      for (let i = 0; i < children.length; i++) {
        if(children[i].waferIndex === obj.waferIndex){
          this.container.data.removeChild(this.container.data.children[i])
          break;
        }
      }
      this.$set(this.wafer,obj.waferIndex,null);
      this.removeData(obj);
    }
  }
};


export default mHandlePixi;
