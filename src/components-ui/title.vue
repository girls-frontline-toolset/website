<script>
  import { VBtn, VLayout,VFlex,VIcon } from 'vuetify/lib'
  export default {
        props: {h1:Boolean,h2:Boolean,h3:Boolean,text:{type:String,default:"Default text"},icon:String,button:String,clickF:Function,item:String},
        name: 'gl-ui-title',
        components:{VBtn, VLayout,VFlex,VIcon},
         methods: {
            click(){
                this.clickF(this.item)
            }
        },
        render: function (h) {
            let el,icon,btn;
            if(this.button){
                btn =  h('v-btn',{'attrs':{'depressed':true,'small':true,'color':'primary','style':'float: right;margin: 0;'},'on':{click:()=>{this.click()}}},[this.button]);
            }

            if(this.icon) icon = h("v-icon",{'class':['s35']},[this.icon,btn]);
            switch (true){
                case this.h1:
                    el = h("h1",{'class':['bb','headline']},[icon,this.text,btn]);
                    break;
                case this.h2:
                    el = h("h2",{'class':['gl-lf','title']},[this.text,btn]);
                    break;
                case this.h3:
                default:
                    el = h("h3",{'class':['gl-lf','subheading']},[this.text,btn]);
                    break;
            }

            return h('v-layout', {'row':true},[h("v-flex",{"xs12":true,"pa-0":true},[el])]);
        }
    }
</script>

<style>
    .gl-lf{
        border: 0 solid #eee;
        border-left-width: .45rem;
        padding-left: 10px;
        border-left-color: #ffb300;
        margin-bottom: 5px;
    }

    .bb{
        color: #ffb300;
        padding: 0 0 0 10px;
        border-bottom: 2px solid rgba(255,179,0,.8);
        /** font-weight: bolder; **/
    }

    .s35:before{
        font-size: 35px !important;
    }

    .s35{
        color: #ffb300!important;
        font-size: 35px !important;
    }

</style>
