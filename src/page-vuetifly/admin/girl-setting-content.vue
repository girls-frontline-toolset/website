<template>
    <v-container grid-list-md pt-0>
        <v-layout row wrap>
            <v-flex xs12>
                <gl-ui-title text="人型編輯" h1></gl-ui-title>
            </v-flex>
            <v-flex xs3 pa-1>
                <v-text-field v-model="data.no" type="text" :label="'編號:'"
                    mask="####" @input="setData()" ></v-text-field>
            </v-flex>
            <v-flex xs3 pa-1>
                <v-text-field :label="$t('t.type') + ':'" type="text" v-model="select.s.type"
                          ></v-text-field >
            </v-flex>
            <v-flex xs3 pa-1>
                <v-text-field :label="$t('t.star') + ':'" type="text" v-model="select.s.star"
                              ></v-text-field>
            </v-flex>
            <v-flex xs3 pa-1>
                <v-text-field :label="$t('t.character') + ':'" item-text="name" item-value="no" :items="girlSearch"
                          v-model="select.s.girl" @input="($event.no !== undefined)? data.no = $event.no: '' "
                ></v-text-field>
            </v-flex>
             <v-flex xs3 pa-1>
                <img id="img" :src="(data.no > allGirl.length)?'/common/girl/girl_0.jpg' :'/common/girl/girl_' + data.no  + '.jpg'" style="width: 115px;height: 203px">
             </v-flex>
             <v-flex xs3>
                <input type="file" id="girlFile">
             </v-flex>
            <v-flex xs6>
                <v-btn color="primary" @click="addGirl()">提交</v-btn>
                <v-btn color="primary" @click="clearGirl()" outline>清除</v-btn>
            </v-flex>

        </v-layout>
    </v-container>
</template>

<script>
    import GlUiTitle from "../../components-ui/title";
    import mMeta from "../../mixin/mMeta.js";
    export default {
        components: {GlUiTitle},
        mixins: [mMeta],
        props: [''],
        commponents: {},
        name: 'gl-ui-girl-setting',
        data() {
            return {
                data:{no:0},
                valid:false,
                allGirl:null,
                select:{s:{girl:"",star:"",type:""}},
                girlSearch: [{"no": 0, "name": "select"}],
                type: [{"i": '', "t": "select"}, {"i": 'HG', "t": "HG"}, {"i": 'SMG', "t": "SMG"}, {"i": 'RF',"t": "RF"}, {"i": 'AR', "t": "AR"}, {"i": 'MG', "t": "MG"}, {"i": 'SG', "t": "SG"}],
                star: [{"i": '', "t": "select"}, {"i": 5, "t": "5"}, {"i": 4, "t": "4"}, {"i": 3, "t": "3"}, {"i": 2,"t": "2"}],
            }
        }, methods: {
            addGirl(){
                let _this = this;

                //console.log(this.select.s);
                let formData = new FormData();

                if($('#girlFile')[0].files[0] !== undefined){
                    formData.append('file', $('#girlFile')[0].files[0]);
                }

                formData.append('no',this.data.no);
                formData.append('type',this.select.s.type.i || this.select.s.type);
                formData.append('star',this.select.s.star.i || this.select.s.star);
                formData.append('name',this.select.s.girl.name ||this.select.s.girl);


                $.ajax({
                        url:"/api/inquiry/a/updateGirl",
                        type:"POST",
                        data: formData,
                        cache: false,
                        processData: false,
                        contentType: false,
                        success: function(data){
                            //console.log(data);
                            data = JSON.parse(data);
                            if(data.status === "success"){
                                _this.$s.glDialogText("人型編輯", "已成功!!");
                                //_this.data = {type:'1',content:'',title:'',url:''} ;
                            }else{
                                _this.$s.glDialogText("人型編輯", "出現問題!!", 1);
                            }
                        }
                    }
                );
            },
            clearGirl(){
                this.select.s = {girl:"",star:"",type:""};
                this.data = {no:0};
            },
            setData(){
                let data = this.allGirl[this.data.no - 1 ];
                this.select.s = {girl:data.name,star:data.star,type:data.type};
            },
            getGirl: function () {

                let star = this.select.s.star.i;
                let type =  this.select.s.type.t;

                if (!star || !type) {
                    return false;
                }

                let list = [{"no": 0, "name": "選擇"}];

                for (let i = 0; i < this.allGirl.length; i++) {
                    if (this.allGirl[i].type === type && this.allGirl[i].star === "" + star) {
                        list.push({"name": this.allGirl[i].name, "no": this.allGirl[i].no});
                    }
                }

                    this.girlSearch = list;
            }
        }, beforeCreate() {
        }, created() {
            this.$g.getAllGirlList('allGirl',this);
        }, beforeMount() {
        }, mounted() {
            $('#girlFile').change(function() {
                var input = this;
                var url = $(this).val();
                var reader = new FileReader();

                reader.onload = function (e) {
                    $('#img').attr('src', e.target.result);
                }

                reader.readAsDataURL(input.files[0]);
            });
        }, beforeUpdate() {
        }, updated() {
        }, render() {
        }
    }
</script>
