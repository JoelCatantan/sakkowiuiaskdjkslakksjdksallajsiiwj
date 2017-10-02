export default {
    sideNavigation: [
        {
            label: 'Users',
            icon: '<i class="fa fa-users"></i>',
            role: 'admin',
            url: '/#',
            submenus: [
                {
                    label: 'Add User',
                    url: '/add-user'
                },{
                    label: 'List of Users',
                    url: '/list-of-users'
                },
            ]
        }
    ]
};
