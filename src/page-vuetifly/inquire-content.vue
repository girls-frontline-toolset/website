<template>
  <router-view></router-view>
</template>

<script>
    export default {
        name: 'gl-ui-inquire',
        beforeCreate() {
            if (this.$route.params.lang !== undefined) {
                switch (this.$route.params.lang) {
                    case "tw":
                    case "ja":
                    case "cn":
                    case "en":
                    case "404":
                        break;
                    default:
                        window.location = '/404?url=' + window.location.pathname + window.location.search;
                }
            }
        }
    }
</script>
