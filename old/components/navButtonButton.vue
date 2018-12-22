<template>
    <div class="gl-nav-button-button" >
        <router-link :to="langUrl() + 'href'">
            <div class="nav-button-button-gl">
                <div class="icon"></div>
                {{ message }}
            </div>
        </router-link>
    </div>
</template>

<script>
    export default {
        props: ['message', 'href'],
        name: 'gl-nav-button-button'
    }
</script>

