import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from "../components/Login";
import NotebookList from "../components/NotebookList";
import NoteDetail from "../components/NoteDetail";
import TrashDetail from "../components/TrashDetail";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Login
  },
  {
    path:'/login',
    component: Login
  },
  {
    path:"/notebooks",
    component: NotebookList
  },
  {
    path:"/note",
    component: NoteDetail
  },
  {
    path:"/trash",
    component: TrashDetail
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
