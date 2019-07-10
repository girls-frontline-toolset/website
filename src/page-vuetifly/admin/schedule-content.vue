<template>
    <v-container grid-list-md pt-0>
        <v-layout row wrap>
            <v-flex xs12>
                <gl-ui-title text="增加時間表活動" h1></gl-ui-title>
            </v-flex>
            <v-flex xs12>
                <form>
                <v-form ref="form" v-model="valid" enctype="multipart/form-data">
                <v-menu
                        ref="menu[0]"
                        :close-on-content-click="false"
                        v-model="menu[0]"
                        :nudge-right="40"
                        lazy
                        transition="scale-transition"
                        offset-y
                        full-width
                        max-width="290px"
                        min-width="290px"
                >
                    <v-text-field
                            slot="activator"
                            v-model="data.start"
                            label="'開始時間:'"
                            hint="DD-MM-YYYY format"
                            persistent-hint
                            prepend-icon="event"
                            @blur="date[0] = parseDate(data.start)"
                    ></v-text-field>
                    <v-date-picker v-model="date[0]" no-title @input="menu[0] = false"></v-date-picker>
                </v-menu>
                <v-menu
                        ref="menu[1]"
                        :close-on-content-click="false"
                        v-model="menu[1]"
                        :nudge-right="40"
                        lazy
                        transition="scale-transition"
                        offset-y
                        full-width
                        max-width="290px"
                        min-width="290px"
                >
                    <v-text-field
                            slot="activator"
                            v-model="data.end"
                            label="'結束時間:'"
                            hint="DD-MM-YYYY format"
                            persistent-hint
                            prepend-icon="event"
                            @blur="date[1] = parseDate(data.end)"
                    ></v-text-field>
                    <v-date-picker v-model="date[1]" no-title @input="menu[1] = false"></v-date-picker>
                </v-menu>
                <input ref="file" type="file" id="file" @change="imgChange()"><br>
                <img ref="previewImg" src="/common/img/bg.jpg" alt="Preview Image" style="width: 100%; max-width: 600px;" />
                <v-text-field
                        v-model="data.text"
                        type="text"
                        :label="'文字:'"

                ></v-text-field>
                <v-text-field
                        v-model="data.src"
                        type="text"
                        :label="'網址:'"
                        required
                        :rules="[() => !!data.src || $t('register.must') ]"
                ></v-text-field>
                <v-text-field
                    v-model="data.alt"
                    type="text"
                    :label="'說明:'"
                    required
                    :rules="[() => !!data.src || $t('register.must') ]"
                ></v-text-field>
                <v-btn color="primary" @click="add()" :disabled="!valid" >提交</v-btn>
                <v-btn color="primary" @click="clear()" outline>清除</v-btn>
                </v-form>
                    </form>
            </v-flex>
        </v-layout>
    </v-container>


</template>

<script>
    import GlUiTitle from "../../components-ui/title";
    import MDataFormat from "../../mixin/mDataFormat"
    import mMeta from "../../mixin/mMeta.js";
    export default {
        components: {GlUiTitle},
        mixins: [MDataFormat,mMeta],
        props: [''],
        commponents: {},
        name: 'gl-ui-schedule-content',
        data() {
            return {
                date: [null,null],
                menu: [false,false],
                data:{start:'0-0-1997',end:'0-0-1997',src:"",text:"",alt:""},
                valid:false
            }
        }, methods: {
            add(){
                if(this.$refs.file.files[0] === undefined){
                    this.$s.glDialogText("添加文章", "請選擇文件!!", 1);
                    return;
                }

                let formData = new FormData();
                formData.append('file', this.$refs.file.files[0]);
                formData.append('start',this.data.start);
                formData.append('end',this.data.end);
                formData.append('src',this.data.src);
                formData.append('text',this.data.text);
                formData.append('alt',this.data.alt);

                let _this = this;
                $.ajax({
                        url:"/api/inquiry/schedule/addSchedule",
                        type:"POST",
                        data: formData,
                        cache: false,
                        processData: false,
                        contentType: false,
                        success: function(data){
                            data = JSON.parse(data);
                            if(data.status === "success"){
                                _this.$s.glDialogText("添加時間表", "已成功!!");
                                _this.data = {start:'0-0-1997',end:'0-0-1997',src:"",text:""} ;
                            }else{
                                _this.$s.glDialogText("添加時間表", "出現問題!!", 1);
                            }
                        }
                    }
                );
            },
            clear(){
                this.data = {start:'0-0-1997',end:'0-0-1997',src:"",text:""};
            },
            imgChange() {
              let _this = this ;
              let reader = new FileReader();

              reader.onload = function (e) {
                _this.$refs.previewImg.setAttribute("src",e.target.result);
              };

              reader.readAsDataURL(_this.$refs.file.files[0]);
            }
        }, beforeCreate() {
        }, created() {
        }, beforeMount() {
        }, mounted() {
        }, beforeUpdate() {
        }, updated() {
        }, render() {

        },watch:{
            date:{
                handler: function(newValue) {
                    this.data.start = this.formatDate(newValue[0]);
                    this.data.end  = this.formatDate(newValue[1]);
                }
            }
        }
    }
</script>

<style>

</style>
