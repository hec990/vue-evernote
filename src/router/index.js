import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from "../components/Login";
import NotebookList from "../components/NotebookList";
import NoteDetail from "../components/NoteDetail";
import TrashDetail from "../components/TrashDetail";

Vue.use(VueRouter)
const routerPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return routerPush.call(this, location).catch(error => error)
}

const routes = [
    {
        path: '/',
        redirect: '/login'
    },
    {
        path: '/login',
        component: Login
    },
    {
        path: "/notebooks",
        component: NotebookList
    },
    {
        path: "/note",
        component: NoteDetail
    },
    {
        path: "/trash",
        component: TrashDetail
    }
]

const router = new VueRouter({
    mode: 'history',
    routes
})

export default router
