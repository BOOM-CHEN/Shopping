<script setup>
import {useUserStore,useProductStore,useRouterStore} from '@/stores/index'
const userStore = useUserStore()
const productStore = useProductStore()
const RouterStore = useRouterStore()
const layerout = [
    {name:'个人信息管理',target:'/mineInfoManage'},
    {name:'用户管理',target:'/userManage'},
    {name:'轮播图管理',target:'/carouselManage'},
    {name:'产品管理',target:'/productManage'},
    {name:'类别管理',target:'/categoryManage'},
    {name:'订单管理',target:'/orderManage'}
]
const exit = () =>{
    userStore.exit()
    productStore.exit()
    RouterStore.exit()
}
</script>
<template>
    <div class="index">
        <div class="NavigationBar-left">
            <div class="NavigationBar-avatar">
                <div class="NavigationBar-avatar-center">
                    <el-avatar :size="100" fit="cover" :src="userStore.mine.UserAvatar"></el-avatar>
                    <div style="text-align: center;font-size: 20px;">{{userStore.mine.UserName}}({{userStore.mine.Role}})</div>
                </div>
            </div>
            <div><el-link :underline="false" class="Navigation-item Navigation-item-text" href="/overview">商业情况总览</el-link></div>
            <div class="Navigation-item-text">基本管理</div>
            <div class="Navigation-item-sec">
                <el-link v-for="(item,index) in layerout" :key="index" class="Navigation-item-thr" :underline="false" :href="item.target">{{ item.name }}</el-link>
            </div>
            <div v-if="userStore.mine.Role === 'root'">
                <div class="Navigation-item-text">系统管理</div>
            </div>
            <div id="exit">
                <el-link id="exitBtn" href="/Login" :underline="false" @click="exit">退出登录</el-link>
            </div>
        </div>
        <div class="content">
            <router-view></router-view>
        </div>
    </div>
</template>
<style lang="less" scoped>
.NavigationBar-avatar{
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 30px;
}

.Navigation-item:hover{
    color: rgb(64, 158, 255);
}
.Navigation-item-text{
        margin-top: 30px;
        font-size: 20px;
        margin-left: 10px;
        color: black;
}
.Navigation-item-sec{
    margin-top: 10px;
    margin-left: 20px; 
    display: flex;
    flex-direction: column;
    justify-content: start;
}
.Navigation-item-thr{
    margin-top: 5px;
    justify-content: start;
}
.index{
    width: 95vw;
    height: 95vh;
    display: flex;
    justify-content: center;
    flex-basis: 0;
    // flex-grow: 1;
}
.NavigationBar-left{
    width: 20vw;
    height: 95vh;
    background: rgb(180, 178, 178,0.6);
    display: flex;
    flex-direction: column;
    overflow: auto;
}
.content{
    width: 75vw;
    height: 95vh;
    display: flex;
    justify-content: center;
}


#exitBtn{
    font-size: 20px;
    margin-left: 10px;
    color: black;
}
#exitBtn:hover{
    color: rgb(64, 158, 255);
}
</style>