import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Detailed from "@/views/Detailed";

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomeView
    },
    {
        path: '/detail/:id',
        name: 'detail',
        component: Detailed,
        props: true
    },
    {
        path: '/account',
        name: 'account',
        component: () => import('../views/Account'),
        children: [
            {
                path: 'face',
                component: () => import('../components/account/face'),
            },
            {
                path: 'home',
                component: () => import('../components/account/home'),
            },
            {
                path: 'setting',
                component: () => import('../components/account/setting'),
            },
            {
                path: 'ideaUpdate',
                component: () => import('../components/account/ideaUpdate'),
            }
        ]
    },
    {
        path: '/create',
        name: 'create',
        component: () => import('../views/Create'),
    },
    {
        path: '/demo',
        name: 'demo',
        component: () => import('../components/SmallSearch')
    },
    {
        path: '/search/:keyword',
        name: 'search',
        component: () => import('../views/Search'),
        props: true
    },
    {
        path: '/user/:id',
        name: 'user',
        component: () => import('../views/User'),
        props: true
    },
    {
        path: '/edit/:id',
        name:'edit',
        component: ()=>import('../views/Edit'),
        props: true
    }
]

const router = new VueRouter({
    routes
})

export default router
