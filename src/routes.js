let route = []

//--------------   USER MODULE   --------------//

import addUser from './modules/users/add.vue'
route.push({
    path: '/add-user',
    component: addUser
})

import listOfUsers from './modules/users/list.vue'
route.push({
    path: '/list-of-users',
    component: listOfUsers
})

import editUser from './modules/users/edit.vue'
route.push({
    path: '/edit-user/:id',
    component: editUser
})

import userDetail from './modules/users/detail.vue'
route.push({
    path: '/user-detail/:id',
    component: userDetail
})

export default route;
