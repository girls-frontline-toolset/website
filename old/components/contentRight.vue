<template>
    <div id="gl-contentRight">
        <div id="card">
            <gl-card-button-new v-for="item in cardList" :message="item.message"
                            :title="item.title" :button="item.button" :href="item.href"
                            :src="item.src" :icon="item.icon"></gl-card-button-new>
        </div>



        <gl-share></gl-share>
        <gl-facebook></gl-facebook>
    </div>
</template>

<script>
    import GlCardButton from "./cardButton";
    import GlFacebook from "./facebook";
    import GlShare from "./share";
    import GlCardButtonNew from "./cardButtonNew";
    export default {
        components: {
            GlCardButtonNew,
            GlShare,
            GlFacebook,
            GlCardButton},
        name: 'gl-contentRight',
        data() {
            return {
                cardList: [],
                alertData: ""
            }
        }, beforeCreate: function () {
            var _this = this;

            $.when(
                $.getJSON('/api/inquiry/UpdateLog'),
                $.getJSON('/common/data/info.json')
            ).done(function(result1, result2) {

                result2[0].announcement.message = result1[0].data;
                _this.$set(_this.cardList,0,_this.cardList[0] = (result2[0].announcement));
                _this.$set(_this.cardList,1, _this.cardList[1] = (result2[0].message));

                for(let i = 0; i < _this.cardList[0].message.length ; i++){
                    var text = "";

                   switch (_this.cardList[0].message[i].type){
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

                    let date = _this.cardList[0].message[i].date.split("-");
                    text += "[" + date[1] +"月" +  date[2]+ "日" + "]";
                    text += _this.cardList[0].message[i].info ;

                    if(_this.cardList[0].message[i].type === "0"){

                    text =  "<span class='highlight'>" +text + "</span>";
                    }
                    _this.alertData += text + "<br>";

                }

            });
        }
    }
</script>
