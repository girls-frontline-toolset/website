<template>
</template>

<script>
    export default {
        name: 'gl-ui-resource',
        data() {
            return {
                girlList: [],
                exGirlList:[]
            }
        },
        created() {
            let _this = this;
            this.$g.getAllGirlList('girlList', this, function () {
                let tw = {};
                let cn = {};
                let ja = {};
                let en = {};

                for (let i = 0; i < _this.girlList.length; i++) {
                    /** @type ajax.girlList */
                    let data = _this.girlList[i];

                    tw["girl." + data.no] = data.name;
                    cn["girl." + data.no] = (data.cn_name === "")? data.name : data.cn_name;
                    ja["girl." + data.no] = (data.ja_name === "")? data.name : data.ja_name;
                    en["girl." + data.no] = (data.en_name === "")? data.name : data.en_name;

                }

                _this._i18n.mergeLocaleMessage('tw', tw);
                _this._i18n.mergeLocaleMessage('cn', cn);
                _this._i18n.mergeLocaleMessage('ja', ja);
                _this._i18n.mergeLocaleMessage('en', en);
            });

            this.$g.getAllExGirlList('exGirlList', this, function () {
                let tw = {};
                let cn = {};
                let ja = {};
                let en = {};

                for (let i = 0; i < _this.exGirlList.length; i++) {
                    /** @type ajax.exGirlList */
                    let data = _this.exGirlList[i];

                    tw["girlEx." + data.no] = data.name;
                    cn["girlEx." + data.no] = (data.cn_name === "")? data.name : data.cn_name;
                    ja["girlEx." + data.no] = (data.ja_name === "")? data.name : data.ja_name;
                    en["girlEx." + data.no] = (data.en_name === "")? data.name : data.en_name;

                }

                _this._i18n.mergeLocaleMessage('tw', tw);
                _this._i18n.mergeLocaleMessage('cn', cn);
                _this._i18n.mergeLocaleMessage('ja', ja);
                _this._i18n.mergeLocaleMessage('en', en);

            });
        },
    }
</script>
