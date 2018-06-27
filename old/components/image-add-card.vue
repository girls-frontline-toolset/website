<template>
    <div >
        <gl-card-twitter ref="addCard" :completedFunction="completed" :item="item"
        ></gl-card-twitter>
        <div class="image-tag" v-if="item.tagAdd.length != 0">
                  <span class='tag label label-warning' v-for="t,tIndex in item.tagAdd" @click="tagClick(index,tIndex)">
                      #{{t.name}}<span class="glyphicon glyphicon-remove"></span></span>
        </div>
        <div class="image-add-tag">

            <select :id="index+'_type'" @change="changeOption(index,0)">
                <option value="">選擇</option>
                <option value="HG">HG</option>
                <option value="SMG">SMG</option>
                <option value="RF">RF</option>
                <option value="AR">AR</option>
                <option value="MG">MG</option>
                <option value="SG">SG</option>
                <option value="sangvis">鐵血</option>
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
    import GlCardTwitter from "./card-twitter";
    export default {
        components: {GlCardTwitter},
        props:['del','completed','item','tagClick','changeOption','index','selectOption','tagList','enterTag'],
        name: 'gl-image-add-card',
        data() {
            return {
                data:[],
            }
        }, mounted: function () {
            //console.log("mounted");
            this.data[0] = this.item;
            ///console.log(this.item);
            //console.log(this.completed);

            //this.getPixivTwitterImg(0);


            //console.log(this.$refs);
            var _this = this;

        }
    }
</script>