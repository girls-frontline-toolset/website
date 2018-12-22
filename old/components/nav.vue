<template>
    <nav class="navbar navbar-gl" id="nav">
        <div class="container-fluid container-fluid-gl">
            <div class="navbar-header">
                <router-link :to="langUrl() + '/'" @click.native="collapseHide()" class="navbar-brand navbar-brand-gl" style="color: #fff ;font-size: 25px;" >少女前線 工具集</router-link>
                <button type="button" class="navbar-toggle navbar-toggle-gl" data-toggle="collapse"
                        data-target="#myNavbar">
                    <span class="icon-bar icon-bar-gl"></span>
                    <span class="icon-bar icon-bar-gl"></span>
                    <span class="icon-bar icon-bar-gl"></span>
                </button>
            </div>
            <div class="collapse navbar-collapse navbar-collapse-gl" id="myNavbar">
                <ul class="nav navbar-nav" v-for="data in list" :class="data.class">
                    <li class="dropdown">
                        <a class="dropdown-toggle" data-toggle="dropdown" href="#">{{ data.text }}<span
                                class="caret"></span></a>
                        <ul class="dropdown-menu">
                            <li v-for="li in data.list"> <router-link :to="langUrl() + li.href" @click.native="collapseHide()">{{li.text}}</router-link></li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script>
    export default {
        name: 'gl-nav',
        data (){
            return {
                list:null,
                isShow:true
            }
        }, beforeCreate: function () {
            if (this.$route.query.fn !== undefined){
                if(this.$route.query.fn === "nbar"){
                    this.isShow = false;
                }
            }

            var _this = this;
            $.getJSON('/common/data/nav.json', function (json) {
                _this.list = json;
            });

        }, methods:{
            collapseHide:function(){
                $(".collapse").collapse("hide");
            }
        }
    }
</script>

<style>
    /** .dropdown-menu li a:hover{
         background-color: hsla(42, 100%, 50%, 1);
     }


</style>

