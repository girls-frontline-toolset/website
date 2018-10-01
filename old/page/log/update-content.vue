<template>
    <div>
    <gl-title message="更新記錄"></gl-title>
    <div v-html="alertData" class="updateLog">
    </div>
    </div>
</template>

<script>
    import GlTitle from "../../components/title";
    export default {
        components: {GlTitle},
        name: 'gl-update',
        data() {
            return {
                alertData: ""
            }
        }, methods: function () {


        },  beforeCreate: function () {
            var _this = this;
            $.getJSON('/api/inquiry/UpdateLog', function (json) {
                for (let i = 0; i < json.data.length; i++) {
                    var text = "";

                    switch (json.data[i].type) {
                        case "0":
                            text += "[更新]";
                            break;
                        case "1":
                            text += "[圖片]";
                            break;
                        case "2":
                            text += "[修改]";
                            break;
                        case "3":
                            text += "[問題]";
                            break;
                        case "4":
                            text += "[新增]";
                            break;
                    }

                    let date = json.data[i].date.split("-");
                    text += "[" + date[1] + "月" + date[2] + "日" + "]";
                    text += json.data[i].info;

                    if (json.data[i].type === "0") {

                        text = "<span class='highlight'>" + text + "</span>";
                    }
                    _this.alertData += text + "<br>";

                }
            });
        }
    }
</script>

<style>
    .updateLog {
        color: hsla(42, 100%, 50%, 0.8);
        font-size: 20px;
        font-weight:bolder;
    }
</style>
