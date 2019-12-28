<template>
    <div class="addCard">
        <gl-ui-image-card ref="addCard" :completedFunction="completed" :item="item"/>
        <div class="twitter-tag image-tag" v-if="item.tagAdd.length != 0">
            <v-chip label color="primary" class="c-p no-select" style="height: 20px;" small text-color="white"  v-for="t,tIndex in item.tagAdd" @click="tagClick(index,tIndex)" :key="tIndex">#{{t.name}} X</v-chip>
        </div>
        <div class="twitter-tag">

            <select :id="index+'_type'" @change="changeOption(index,0)">
                <option value="">選擇</option>
                <option value="HG">HG</option>
                <option value="SMG">SMG</option>
                <option value="RF">RF</option>
                <option value="AR">AR</option>
                <option value="MG">MG</option>
                <option value="SG">SG</option>
                <option value="sangvis">鐵血</option>
                <option value="military">正規軍</option>
                <option value="eild">感染者</option>
                <option value="whiteforces">帕拉帝斯</option>
                <option value="GK">其他</option>
            </select>

            <select :id="index+'_star'" @change="changeOption(index,1)">
                <option value="">選擇</option>
                <option :value="sItem.val" v-for="sItem in selectOption">{{sItem.text}}</option>
            </select>

            <select :id="index+'_girls'">
                <option value="">選擇</option>
                <option :value="itemTagList.no" v-for="itemTagList in tagList">{{itemTagList.name}}</option>
            </select>
            <button class="gl-btn-default" @click="enterTag(index)">加入</button>
        </div>

    </div>
</template>

<script>
    import GlUiImageCard from "./imageCard";
    export default {
        components: {GlUiImageCard},
        props:['del','completed','item','tagClick','changeOption','index','selectOption','tagList','enterTag'],
        name: 'gl-ui-image-add-card',
        data() {
            return {
                data:[],
            }
        }, mounted: function () {
            this.data[0] = this.item;
        }
    }
</script>

<style>
    .addCard select{
        outline: unset;
        border: 1px solid #ffb300;
        cursor: pointer;
        margin: 0;
        -moz-appearance: menulist;
        -webkit-appearance: menulist;


    }

    .addCard .gl-btn-default{
        color: rgba(255,179,0,.8);
        background: #fff;
        border: 1px solid rgba(255,179,0,.8);
        font-weight: 700;
        font-size: 15px;
    }
</style>
