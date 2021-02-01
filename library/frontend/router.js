import Vue from 'vue'
import VueRouter from 'vue-router'
import BasePage from './src/App'
import Login from "@/components/Login";
import Registration from "@/components/Registration";
import LibraryView from "@/components/LibraryView";
import CreateForm from "@/components/CreateForm";

const routes = [
    {
        path: 'app/',
        name: 'base',
        component: BasePage,
        redirect: '*',
    },
    {
        path: '/login',
        name: 'login',
        component: Login,
    },
    {
        path: '/register',
        name: 'register',
        component: Registration,
    },
    {
        path: '/library',
        name: 'library',
        component: LibraryView,
    },
    {
        path: '/create-form',
        name: 'create-form',
        component: CreateForm,
    },
    {
        path: '/edit-form/:id',
        name: 'edit-form',
        component: CreateForm,
    },

]

const router = new VueRouter({routes})

Vue.use(VueRouter)

export default router
