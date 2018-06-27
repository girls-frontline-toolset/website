<template>
    <form @submit.prevent="addPixiv($event)" >
        <div class='addPixivAlert'><span class='gl-label'>Email(可選擇填寫):</span><input type='email' name='email'><br>
            <span class='gl-label'>Illust Id(可在網址在找到):</span><span>https://www.pixiv.net/member_illust.php?mode=medium&illust_id=</span>
            <input type='text' class='illust_id' name='illust' required>
            <br><input type='submit' value='提交' class='btn gl-btn-primary'></div>
    </form>
</template>

<script>
    export default {
        name: 'gl-pixiv-alert',
        methods:{
            addPixiv:function(obj){
                let _this = this;
                $.ajax({
                        url:"/api/inquiry/addPixiv",
                        type:"POST",
                        data:{
                            email: obj.target.email.value,
                            illust: obj.target.illust.value
                        },
                        success: function(data){
                            data = JSON.parse(data);
                            if(data.status == "success"){
                                glAlert("推薦圖片","已成功!!感謝你的推薦!! 請等待批核");
                            }else{
                                glAlert("推薦圖片","出現問題 請再試!! 如再次出現 請回報");
                            }
                        }
                    }
                );

            }

        }, created: function () {

        }
    }
</script>

<style>
    /**  .addPixivAlert{


      }

      .addPixivAlert span{
          addPixivAlert: 10px;

      }


      .addPixivAlert input[type=email]{
          width: 100%;
      }


      .addPixivAlert input[type=email]:focus, .illust_id:focus{
          box-shadow: 0 0 10px hsla(42, 100%, 50%, 0.8);
          border: 1px hsla(42, 100%, 50%, 0.8) solid;
          outline: 0;
      }

      .addPixivAlert .illust_id{
          width: 130px;
      }
</style>
