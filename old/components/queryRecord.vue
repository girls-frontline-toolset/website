<template>
    <div>
        <gl-title message="查詢記錄" buttonText="清除" :clickFunction="clickFunctoin"></gl-title>
        <div v-if="showMenuButton"><span class="glyphicon glyphicon-triangle-bottom gl-menu-down-icon" @click="clicked"
                                         ref="showLog"></span></div>
        <div v-if="show" v-html="contentData || isEmpty" class="queryRecord">
        </div>
    </div>
</template>

<script>
    import GlTitle from "./title";
    export default {
        components: {GlTitle},
        props: ['content', 'imageSrc','clickFunctoin','html'],
        name: 'gl-query-record',
        data() {
            return {
                show: true,
                showMenuButton: false,
                contentData: null,
                isEmpty: "<div class='alert alert-warning' role='alert'>沒有相關記錄</div>",
            }
        }, methods: {
            showLog: function () {
                return (window.innerWidth >= 768);
            },
            clicked: function () {
                let showLog = this.$refs.showLog.classList;
                if (showLog.contains("glyphicon-triangle-bottom")) {
                    showLog.remove("glyphicon-triangle-bottom");
                    showLog.add("glyphicon-triangle-top");
                    this.show = true;
                } else {
                    showLog.add("glyphicon-triangle-bottom");
                    showLog.remove("glyphicon-triangle-top");
                    this.show = false;
                }

            },
            clearLog: function () {
                this.contentData = "";
            },
            printData: function () {
                if(!this.content){
                    this.clearLog();
                    return false;
                }

                let obj = JSON.parse(this.content);
                let data = "";

                if(obj.length === 0){
                   this.clearLog();
                  return false
                }

                if (obj[0].data[0].name !== undefined){
                    for (let i = obj.length; i > 0; i--) {

                        data += "<span>" + obj[i-1].time + "</span><div class='deviceRecord'>";
                        for (let ii in obj[i-1].data) {
                            let $data = obj[i-1].data[ii];

                            let star = "";

                            for(let ii = 0 ; ii < $data.star ; ii ++){
                                star += "★";
                            }
                            data += '<div class="div_device"><ol><li class="'+$data.img+' str_'+$data.star+'_bg">'+star+'</li><li class="str_'+$data.star+'">'+$data.name+'</li><li>'+$data.type+'</li><li>'+$data.attribute+'</li></ol></div>'

                            //data += "<img src='" + this.imageSrc + obj[i-1].data[ii] + ".jpg' >";
                        }

                        data +="</div>";
                    }
                }else{
                    for (let i = obj.length; i > 0; i--) {

                        data += "<span>" + obj[i-1].time + "</span>";
                        for (let ii in obj[i-1].data) {
                            data += "<img src='" + this.imageSrc + obj[i-1].data[ii] + ".jpg' >";
                        }
                    }

                }
                this.contentData = data;
            }
        },
        created: function () {
            this.showMenuButton = (window.innerWidth < 768);
            this.show = (window.innerWidth >= 768);
            this.printData();
        },
        watch: {
            content: function (newVal) {
                this.printData();
            }
        }
    }
</script>

<style>
    /**.queryRecord span {
        font-size: 25px;
        border: 0 solid #eee;
        border-left-width: .45rem;
        padding-left: 10px;
        border-left-color: hsla(42, 100%, 50%, 1);

        margin-top: 3px;
        display: block;
        max-width: 100%;
        margin-bottom: 5px;
        font-weight: 700;
    }

    .queryRecord img {
        width: 32%;
    }

    .queryRecord {
        margin-bottom: 10px;
    }

    .deviceRecord{
        overflow: overlay;
    }
</style>

