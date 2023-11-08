import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '../stores'
import { useRouterStore } from '../stores'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {path:'/',redirect:'/overview',name:'index',component:()=>import('@/views/index.vue'),children:[
      {path:'/overview',name:'overview',component:()=>import('@/views/overview.vue')},
      {path:'/mineInfoManage',name:'mineInfoManage',component:()=>import('@/views/mineInfo.vue')},
      {path:'/userManage',name:'userManage',component:()=>import('@/views/users.vue')},
      {path:'/productManage',name:'productManage',component:()=>import('@/views/product.vue')},
      {path:'/carouselManage',name:'carouselManage',component:()=>import('@/views/carousel.vue')},
      {path:'/categoryManage',name:'categoryManage',component:()=>import('@/views/category.vue')},
      {path:'/orderManage',name:'orderManage',component:()=>import('@/views/order.vue')},
    ]},
    {path:'/index',redirect:'/overview'},
    {path:'/Login',name:'Login',component:()=>import('@/views/Login.vue')},
    {path:'/:catchAll(.*)',component:()=>import('@/views/default.vue')}
  ],
  linkActiveClass:true
})


const auth = ['/','/overview','/mineInfoManage','/userManage','/productManage','/carouselManage','/categoryManage','/orderManage']
router.beforeEach((to,from,next) => {
const token = useUserStore().token
const currentPage = useRouterStore()
  if(to.path.search('/userCenter')===-1 && to.path.search('/player')===-1 && !auth.includes(to.path)){
    next()
    return
  }

  
  
  if(token){
    currentPage.currentPage = to.fullPath
    next()
  }else{
    next('Login')
  }
})

export default router
