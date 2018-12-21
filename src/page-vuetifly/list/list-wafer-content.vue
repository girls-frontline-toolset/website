<template>
    <div>
        <gl-ui-card-left :content="prompt" icon="notifications"></gl-ui-card-left>
        <gl-ui-title :text="$t('title.h1.list.wafer')" h1 icon="icon-equipment"></gl-ui-title>


        <v-container grid-list-md>
            <v-layout row wrap>
                <v-flex xs12 pa-1>
                    <gl-ui-title h2 :text="$t('t.color') + ':'"></gl-ui-title>
                    <gl-ui-icon-button v-for="item,key in color" :key="key" :opacity="item" type="color" :name="key" ></gl-ui-icon-button>
                </v-flex>
                <v-flex xs12 pa-1>
                    <gl-ui-title h2 :text="$t('t.cells') + ':'"></gl-ui-title>
                    <gl-ui-icon-button v-for="item,key in cells" :key="key" :opacity="item" type="cells" :name="key" ></gl-ui-icon-button>
                </v-flex>

                <v-flex xs12 pa-1 v-if="cells['cells_5']">
                    <gl-ui-title h2 :text="$t('t.type') + ':'" style="display: block;width: 80px;margin-top: 2px;float: left;"></gl-ui-title><v-icon style="padding: 4px 0 0;" class="c-p" @click="showHelp()">help</v-icon>
                </v-flex>
                <v-flex xs12 pa-1 class="input-sangvis" v-if="cells['cells_5']">
                    <span class="get no-select" @click="click('type',key)" :style="isClick('type',key)"
                        v-for="(item, key, index) in type" :alt="item.name">{{$t(item.name)}}</span>
                </v-flex>
            </v-layout>
        </v-container>
        <v-btn color="primary" @click="getList()" name="search">{{$t('t.search')}}</v-btn>
        <v-btn color="primary" @click="getAll()" name="all">{{$t('t.all')}}</v-btn>

        <div class="cell_list_output">
                <img data-rot="0" @click="rotate($event)" v-for="item in itemData" :src='"/common/cell/"+item.gird + "/" + item.position + "-" + item.color + ".png" ' :alt='item.no' :title='item.no'>
        </div>

        <gl-ui-error :error="error" :text="errorText"></gl-ui-error>
    </div>
</template>

<script>
    import mPrompt from "../../mixin/mPrompt.js";
    import GlUiTitle from "../../components-ui/title";
    import GlUiCardLeft from "../../components-ui/cardLeft";
    import GlUiIconButton from "../../components-ui/iconButton";
    import GlUiError from "../../components-ui/error";
    import mMeta from "../../mixin/mMeta.js";
    export default {
        components: {GlUiError, GlUiIconButton, GlUiCardLeft, GlUiTitle},
        mixins: [mPrompt,mMeta],
        props: [''],
        commponents: {},
        name: 'gl-ui-list-wafer-content',
        data() {
            return {
                color: {"orange_type":false,"blue_type":false},
                cells:{"cells_1":false,"cells_2":false,"cells_3":false,"cells_4":false,"cells_5":false,"cells_6":false},
                cellList:null,
                type: [{"name": "make.type1", "s": true}, {"name": "make.type2", "s": true}],
                error:0,
                errorText:"not-text",
                itemData:[]
            }
        }, methods: {
            setData(a, b, c) {
              if(b === "cells_5" && !c){
                this.$set(this.type[0],"s",true);
                this.$set(this.type[1],"s",true);
              }

              this.$set(this[a], b, c);
            },
            showHelp: function () {
                this.$s.glDialogText("關於","5格分為兩類，5格1類和6格一樣好，比5格2類參數高一些。<br>5星6格 = 5星5格1类(1.0) > 5星5格2类(0.92) > 5星4格 = 4星6格 = 4星5格1类(0.8) > 5星3格(0.76) > 4星5格2类(0.72)。<br><a href='http://nga.178.com/read.php?tid=14732027&fav=c56e1723'>來源</a>");
            },
            getAll(){
                this.color = {"orange_type": true,"blue_type": true};
                this.cells = {"cells_1":true,"cells_2": true,"cells_3": true,"cells_4": true,"cells_5": true,"cells_6": true};
                this.type = [{"name": "一類", "s": true}, {"name": "二類", "s": true}];

                this.getList();
            },
            click: function (type, num) {
            switch (type) {
                case "type":
                    this.$set(this.type[num], "s", !this.type[num].s);
                    break;
                }
            },
            isClick: function (type, num) {
                switch (type) {
                    case 'type':
                        if (this.type[num].s) {
                            return {"opacity": 1};
                        } else {
                            return null;
                        }
                 break;
                }
            },getList(){
                this.$ga.event('list', 'cell_list');
                let list = [];
                let allType = (this.type[0].s && this.type[1].s);
                let mapColor = ["orange_type","blue_type"];
                for(let i = 0 ; i < this.cellList.length ; i++) {
                    if(this.color[mapColor[this.cellList[i].color]]) {
                        if (this.cells["cells_" + this.cellList[i].gird]) {
                            if(allType || (this.cellList[i].type != 0 &&  this.type[this.cellList[i].type - 1].s)){
                                list.push(this.cellList[i])
                            }
                        }
                    }
                }
                this.itemData = list;
            },
            rotate(event){
                let dom = event.target;
                switch (dom.getAttribute("data-rot")) {
                    case "0":
                        dom.className = "rotate90";
                        dom.setAttribute("data-rot","1");
                        break;
                    case "1":
                        dom.className = "rotate180";
                        dom.setAttribute("data-rot","2");
                        break;
                    case "2":
                        dom.className = "rotate270";
                        dom.setAttribute("data-rot","3");
                        break;
                    case "3":
                        dom.className = "";
                        dom.setAttribute("data-rot","0");
                }
            }
        }, beforeCreate() {
        }, created() {
            this.$g.getCellList('cellList', this);
        }, beforeMount() {
        }, mounted() {
        }, beforeUpdate() {
        }, updated() {
        }, render() {
        }
    }
</script>

<style>
    .cell_list_output img{
        cursor: pointer;
    }

    .rotate90 {
        -webkit-transform: rotate(90deg);
        -moz-transform: rotate(90deg);
        -o-transform: rotate(90deg);
        -ms-transform: rotate(90deg);
        transform: rotate(90deg);
    }

    .rotate180 {
        -webkit-transform: rotate(180deg);
        -moz-transform: rotate(180deg);
        -o-transform: rotate(180deg);
        -ms-transform: rotate(180deg);
        transform: rotate(180deg);
    }

    .rotate270 {
        -webkit-transform: rotate(270deg);
        -moz-transform: rotate(270deg);
        -o-transform: rotate(270deg);
        -ms-transform: rotate(270deg);
        transform: rotate(270deg);
    }

</style>
