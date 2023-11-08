<script setup>
import {useUserStore,useRouterStore,useProductStore} from '@/stores/index'
import { useRouter,useRoute } from 'vue-router';
const Router = useRouter()
const Route = useRoute()
const userEmail = ref('')
const userPassword = ref('')
const Login = async () =>{
    if(userEmail.value === '' || userPassword.value === ''){
      ElMessage({
        showClose:true,
        message:'请输入内容',
        type: 'warning',
        duration:1000
      })
    }else{
      let flag = await useUserStore().Login({
        userEmail:userEmail.value,
        userPassword:userPassword.value
      })
      if(flag){
        if(useRouterStore().currentPage===''){
          Router.replace('/')
        }else{
          Router.replace(useRouterStore().currentPage)
        }
        useUserStore().GetMineInfo(userEmail.value)   
      }
    }
}

onMounted(()=>{
  if(useUserStore().token){
    ElMessage({
      showClose:true,
      message: '您已登录请勿再次返回',
      type: 'warning',
      duration:1000
    })
    if(useRouterStore().currentPage===''){
      Router.replace('/')
    }else{
      Router.replace(useRouterStore().currentPage)
    }
    
  }
})
</script>
<template>
    <div class="login">
        <div class="input-fields">
            <div class="input-field">
                <input required type="text" class="userInput" v-model="userEmail"/>
                <label for="userInput">Email</label>
                <span class="userEmailBar"></span>
            </div>
            <div class="input-field">
                <input required type="password" class="userInput" v-model="userPassword"/>
                <label for="userInput">Password</label>
                <span class="userEmailBar"></span>
            </div>
            <div class="btn">
                <el-button @click="Login">登录</el-button>
            </div>
        </div>
    </div>
</template>
<style scoped>
  .login {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 90vh;
  }
  .input-field {
    position: relative;
    margin-bottom: 30px;
  }
  .userInput {
    border: none;
    border-bottom: 1px solid #ccc;
    width: 100%;
    font-size: 16px;
    outline: none;
  }
  
  .userInput:focus {
    border-color: #5264ae;
  }
  
  .userEmailBar {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 3px;
    background: #5264ae;
    transition: width 0.4s ease;
  }
  
  .login input:focus ~ .userEmailBar {
    width: 100%;
  }
  
  .login input:valid ~ label,
  .login input:focus ~ label {
    color: #5264ae;
    transform: translateY(-25px);
    font-size: 14px;
    transition: all 0.3s ease;
  }
  
  label {
    position: absolute;
    top: 0;
    left: 0;
    font-size: 16px;
    pointer-events: none;
    transition: all 0.3s ease;
  }
  .btn{
    display: flex;
    justify-content: center;
  }
  </style>