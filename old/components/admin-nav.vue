<template>
    <nav class="navbar navbar-default row">
        <div class="container-fluid">
            <div class="navbar-header">
                <router-link to="/admin" class="navbar-brand" >管理面板</router-link>
                <button type="button" class="navbar-toggle navbar-toggle-gl" data-toggle="collapse"
                        data-target="#adminNavbar">
                    <span class="icon-bar icon-bar-gl"></span>
                    <span class="icon-bar icon-bar-gl"></span>
                    <span class="icon-bar icon-bar-gl"></span>
                </button>
            </div>
            <div class="collapse navbar-collapse navbar-collapse-gl" id="adminNavbar">
                <ul class="nav navbar-nav">
                    <li v-for="item in navList">
                        <router-link :to="item.href">{{item.text}}</router-link>
                    </li>
                </ul>
                <ul class="nav navbar-nav navbar-right">
                    <li><router-link to="/logout"><span class="glyphicon glyphicon-log-in"></span> Logout</router-link></li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script>
    export default {
        name: 'gl-admin-nav',
        data() {
            return {
                navList: null
            }
        },beforeCreate: function () {
            var _this = this;
            $.getJSON('/common/data/nav-admin.json', function (json) {
                _this.navList = json;
            });
        }
    }
</script>

<style>
  /**  .navbar .btn-danger {
        float: right;
    }
</style>