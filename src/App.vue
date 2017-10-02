<template>
    <div>
        <app-menu/>
        <div id="page-wrapper">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-lg-12">
                        <h1 class="page-header">Blank</h1>
                    </div>
                </div>
            </div>
            <router-view/>
        </div>
    </div>
</template>

<script>

import menu from './components/menu.vue'

export default {
    components: {
        'app-menu': menu
    },
}
</script>

<style scoped>
body {
    padding: 0px;
    margin: 0px;
}

* {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    color: #333;
}
</style>
