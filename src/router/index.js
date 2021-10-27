import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Home.vue'
import Login from "../components/Login";
import NotebookList from "@/components/NotebookList";
import NoteDetail from "@/components/NoteDetail";
import TashDetail from "@/components/TashDetail";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Home
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
    path:"/note/:noteId",
    component: NoteDetail
  },
  {
    path:"/trash/:noteId",
    component: TashDetail
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
