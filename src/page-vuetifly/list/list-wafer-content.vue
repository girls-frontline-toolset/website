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
            </v-layout>
        </v-container>
        <v-btn color="primary" @click="getList()">{{$t('t.search')}}</v-btn>


        <div class="cell_list_output">
                <img v-for="item in itemData" :src='"/common/cell/"+item.gird + "/" + item.position + "-" + item.color + ".png" ' :alt='item.no' :title='item.no'>
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
    export default {
        components: {GlUiError, GlUiIconButton, GlUiCardLeft, GlUiTitle},
        mixins: [mPrompt],
        props: [''],
        commponents: {},
        name: 'gl-ui-list-wafer-content',
        data() {
            return {
                star: {"star_2": false, "star_3": false, "star_4": false, "star_5": false },
                color: {"orange_type":false,"blue_type":false},
                cells:{"cells_1":false,"cells_2":false,"cells_3":false,"cells_4":false,"cells_5":false,"cells_6":false},
                cellList:null,
                error:0,
                errorText:"not-text",
                itemData:[]
            }
        }, methods: {
            setData(a, b, c) {
                this.$set(this[a], b, c);
            },
            getList(){
                this.$ga.event('list', 'cell_list');
                let list = [];
                let mapColor = ["orange_type","blue_type"];

                for(let i = 0 ; i < this.cellList.length ; i++) {
                    if(this.color[mapColor[this.cellList[i].color]]) {
                        if (this.cells["cells_" + this.cellList[i].gird]) {
                            list.push(this.cellList[i])
                        }
                    }
                }
                this.itemData = list;
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

</style>
