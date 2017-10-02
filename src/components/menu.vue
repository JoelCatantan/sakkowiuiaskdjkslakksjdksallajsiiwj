<template>
    <nav class="navbar navbar-default navbar-static-top" role="navigation" style="margin-bottom: 0">
        <div class="navbar-header">
            <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand" href="index.html">SB Admin v2.0</a>
        </div>
        <top-navigation/>
        <side-navigation/>
    </nav>
</template>

<script>

import sideNav from './side_navigation.vue'
import topNav from './top_navigation.vue'
import menus from '../config/menus.js'

export default {
    created() {
        sideNav.menus = menus.sideNavigation;
    },

    components: {
        'side-navigation': sideNav,
        'top-navigation': topNav
    }
}
</script>
