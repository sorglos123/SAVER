import { createRouter, createWebHistory } from 'vue-router';
import Login from '../views/Login.vue';

const routes = [{
        path: '/',
        name: 'login',
        component: Login
    },
    {
        path: '/register',
        name: 'register',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/Register.vue')
    },
    {
        path: '/home',
        name: 'home',
        component: () =>
            import ('../views/Home.vue'),
        children: [{
                path: '/dashboard',
                component: () =>
                    import ('../views/home/Dashboard.vue')
            },
            {
                path: '/receipts',
                component: () =>
                    import ('../views/home/Receipts.vue')
            },
            {
                path: '/upload',
                component: () =>
                    import ('../views/home/Upload.vue')
            },
            {
                path: '/statistics',
                component: () =>
                    import ('../views/home/Statistics.vue')
            },
            {
                path: '/calendar',
                component: () =>
                    import ('../views/home/Calendar.vue')
            },
            {
                // Eventuell path: '/user/:id'
                path: '/user',
                component: () =>
                    import ('../views/home/User.vue')
            },
        ]
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router