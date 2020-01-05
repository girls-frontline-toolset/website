<template>
</template>

<script>
    export default {
        name: 'gl-logout',
        data() {
            return {
                carousel: null
            }
        },beforeCreate() {
            var _this = this;
        this.$s.getJSON('/api/inquiry/logout', function (json) {
                if (json.status === "success") {
                    _this.$router.push({path: '/'});
                }
            });

         }
    }
</script>
