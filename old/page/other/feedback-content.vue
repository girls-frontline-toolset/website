<template>
    <div >
            <gl-card-left title="提示" :content="prompt"></gl-card-left>
            <gl-title message="問題回報,建議或移除作品"></gl-title>
            <form class="feedback" @submit.prevent="send($event)">
                <span class='gl-label'>Email (選擇填寫):</span>
                <input type="email" name="email">
                <span class='gl-label' >內容:</span>
                <textarea id="feedback" name="content" required  @keyup="addLine($event)" style="  height: 200px"></textarea>
                <input type="submit" value="提交"  class='btn gl-btn-primary'>
                <input type="reset" value="清除" class="btn gl-btn-default">

            </form>
        <div class="col-sm-4"></div>
    </div>
</template>

<script>
    import GlTitle from "../../components/title";
    import GlCardLeft from "../../components/cardLeft";
    export default {
        components: {
            GlCardLeft,
            GlTitle
        },
        name: 'gl-feedback',
        data() {
            return {
                prompt: null
            }
        }, methods:{
            addLine:function (obj){
                let offsetHeight = obj.target.offsetHeight;
                let scrollHeight = obj.target.scrollHeight ;
                let height = obj.target.style.height;
                let heightNum = parseInt(height);


                //console.log(heightNum < scrollHeight);


                while (heightNum < scrollHeight) {
                    heightNum ++ ;
                }

                while (heightNum > scrollHeight) {
                    heightNum -= 20 ;
                }

                if (heightNum <= 200) {
                    heightNum = 200;
                }

                obj.target.style.height = heightNum + "px" ;



            },send:function(obj){
                let _this = this;
                $.ajax({
                        url:"/api/inquiry/email",
                        type:"POST",
                        data:{
                            email: obj.target.email.value,
                            content: obj.target.content.value
                        },
                        success: function(data){
                            data = JSON.parse(data);
                            if(data.status == "success"){
                                glAlert("問題回報或建議","已成功!!感謝你的回報或建議!!");
                            }else{
                                glAlert("問題回報或建議","出現問題 請再試!!");
                            }
                        }
                    }
                )

            }


        }, created: function () {
            $("#feedback").keyup(
                function () {

                    while ($(this).outerHeight() < this.scrollHeight) {
                        $(this).height($(this).height() + 1);
                    }

                    while ($(this).outerHeight() > this.scrollHeight) {
                        $(this).height($(this).height() - 1);
                    }

                    if ($(this).height() <= 200) {
                        $(this).height(200);
                    }

                    //$("#new_post").height($(this).height() + $("#tools_bar").height());
                }
            );

        },
        props: ['promptData'],
        mounted: function () {
            let randomNumber = Math.floor((Math.random() * this.promptData.length) + 1);
            this.prompt  = this.promptData[randomNumber-1];
        }
    }
</script>

<style>
    .feedback input[type=email]:focus, .feedback textarea:focus {
        box-shadow: 0 0 10px hsla(42, 100%, 50%, 0.8);
        border: 1px hsla(42, 100%, 50%, 0.8)solid;
        outline: 0;
    }

    .feedback input[type=email] {
        width: 100%;
    }

    .feedback textarea {
        width: 100%;
        max-width: 100%;
        resize: none;
        overflow: hidden;
    }
</style>
