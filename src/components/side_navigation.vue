<template>
    <div class="navbar-default sidebar" role="navigation">
        <div class="sidebar-nav navbar-collapse">
            <ul class="nav" id="side-menu">
                <!-- <li v-for="nav from topNav">
                    <router-link :to="nav.url">
                        <ul v-if="nav.submenus">

                        </ul>
                    </router-link>
                </li> -->
                <!-- <li>
                    <a href="#"><i class="fa fa-sitemap fa-fw"></i> Multi-Level Dropdown<span class="fa arrow"></span></a>
                    <ul class="nav nav-second-level">
                        <li>
                            <a href="#">Second Level Item</a>
                        </li>
                        <li>
                            <a href="#">Second Level Item</a>
                        </li>
                        <li>
                            <a href="#">Third Level <span class="fa arrow"></span></a>
                            <ul class="nav nav-third-level">
                                <li>
                                    <a href="#">Third Level Item</a>
                                </li>
                                <li>
                                    <a href="#">Third Level Item</a>
                                </li>
                                <li>
                                    <a href="#">Third Level Item</a>
                                </li>
                                <li>
                                    <a href="#">Third Level Item</a>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </li> -->
            </ul>
        </div>
    </div>
</template>

<script>
let menuFormat = {
    label: '',
    icon: '',
    role: '',
    submenus: []
}

export default {
    created() {
        let menus = [];
        for(let [key, value] of this.$options.menus) {
            // first layer of menu
            if(typeof value.submenus != 'undefined') {
                for(let [key2, value2] of value) {
                    // second layer of menu
                    if(typeof value2.submenus != 'undefined') {
                        for(let [key3, value3] of value2) {
                            // third layer of menu
                            menus[key][key2][key3] = this.formatting(value3)
                        }
                    }
                    menus[key][key2] = this.formatting(value2)
                }
            }
        }
        /*
        this.$options.menus.map((menu) => {
            // first layer of menu
            if(typeof menu.submenus != 'undefined') {
                // second layer of menu
                menu.map((menu2) => {
                    // third layer of menu
                    if(typeof menu2.submenus != 'undefined') {
                        menu2.map((menu3) => {

                        })
                    }
                })
            }
        });
        */
    },
    methods: {
        formatting(menu) {
            return menu.concat(menuFormat);
        }
    }
}
</script>
