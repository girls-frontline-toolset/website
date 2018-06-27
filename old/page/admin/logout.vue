<template>
</template>

<script>
    export default {
        name: 'gl-logout',
        data() {
            return {
                carousel: null
            }
        }, methods: function () {


        },beforeCreate: function () {
            var _this = this;
            $.getJSON('/api/inquiry/logout', function (json) {
                if (json.status === "success") {
                    _this.$router.push({path: '/'});
                }
            });

         }
    }
</script>
