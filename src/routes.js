import addUser from './modules/users/add.vue'
import editUser from './modules/users/edit.vue'
import listOfUsers from './modules/users/list.vue'
import userDetail from './modules/users/detail.vue'

export default [
    {
        path: '/add-user',
        component: addUser
    },{
        path: '/edit-user',
        component: editUser
    },{
        path: '/list-of-users',
        component: listOfUsers
    },{
        path: '/user-detail',
        component: userDetail
    }
]
