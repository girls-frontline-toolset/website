<template>
    <v-container pa-1>
        <gl-ui-title :text="$t('title.h2.featured-image')" h2></gl-ui-title>
        <v-layout row wrap>
            <v-flex sm4 xs12 md4 v-for="item,key in data" :key="key" :ref="'list-'+key">
                <gl-ui-image-card :completedFunction="completed"
                                  :item="item" :ref="item.id"></gl-ui-image-card>
                <gl-ui-image-go v-if="showBlock[key]"></gl-ui-image-go>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    import GlUiTitle from "./title";
    import mPixivTwitter from "../mixin/mPixivTwitter";
    import GlUiImageCard from "./image/imageCard";
    import GlUiImageGo from "./image/imageGo";

    export default {
        mixins: [mPixivTwitter],
        components: {GlUiImageGo, GlUiImageCard, GlUiTitle},
        props: [''],
        commponents: {},
        name: 'gl-ui-featured-image',
        data() {
            return {
                data: [],
                less600: this.$s.less600(),
                completedNum: 0,
                showBlock: [false, false, false]
            }
        }, methods: {
            completed() {
                this.completedNum++;
                if (this.completedNum === 3) {
                    if (this.less600) {
                        this.$set(this.showBlock, [2], true);
                        return;
                    }
                    let height = [this.$refs["list-0"].clientHeight, this.$refs["list-1"].clientHeight, this.$refs["list-2"].clientHeight];
                    let min = height[0], min_index = 0;

                    for (let i = 0; i < height.length; i++) {
                        if (height[i] < min) {
                            min = height[i];
                            min_index = i;
                        }
                        this.$set(this.showBlock, [min_index], true);
                    }
                }
            }

        }, beforeCreate() {
            let _this = this;
            $.getJSON('/api/inquiry/tImage', function (json) {
                //console.log(json.status);
                if (json.status === "success") {
                    _this.data = json.data;
                    _this.$nextTick(
                        function () {
                            for (let i = 0; i < _this.data.length; i++) {
                                _this.getPixivTwitterImg(i);
                            }
                        }
                    );
                }
            }).fail(function() {
                _this.$s.serverError();
            });
        }, created() {
        }, beforeMount() {
        }, mounted() {
        }, beforeUpdate() {
        }, updated() {
        }, render() {
        }
    }
</script>
