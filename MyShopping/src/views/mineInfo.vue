<script setup>
import {useUserStore} from '@/stores/index'
import {Check} from '@element-plus/icons-vue'
const userStore = useUserStore()
const userInfo = ref([
    {inputValue:userStore.mine.UserName,id:'userName',text:'用户名',flag:true,method:(data)=>{console.log(data);}},
    {inputValue:userStore.mine.UserEmail,id:'userEmail',text:'邮箱',flag:true,method:(data)=>{console.log(data);}},
    {inputValue:userStore.mine.UserPhoneNumber,id:'userPhoneNumber',text:'电话',flag:true,method:(data)=>{console.log(data);}},
    {inputValue:userStore.mine.UserRecieveAddress,id:'userRecieveAddress',text:'收货地址',flag:true,method:(data)=>{console.log(data);}},
])
const flag = ref(true)
const UserPassword = ref('')
const changePassword = () =>{
    if(UserPassword.value === ''){
        ElMessage({
            showClose:true,
            message:'请勿提交空值',
            type: 'warning',
            duration:2000
        })
    }
}

</script>
<template>
    <div class="mineInfo">
        <div v-for="(item,index) in userInfo" :key="index" class="input">
            <div>{{ item.text + ':' }}</div><el-input :value="item.inputValue" v-model.trim="item.inputValue" input-style="width:20vw" @input="item.flag = false"/>
            <el-button :icon="Check" circle @click="item.method(item.inputValue)" :disabled="item.flag"></el-button>
        </div>
        <div class="input">
            <div>密码</div><el-input type="password" v-model.trim="UserPassword" input-style="width:20vw" @input="flag = false"/>
            <el-button :icon="Check" circle @click="changePassword" :disabled="flag"></el-button>
        </div>
    </div>
</template>
<style lang="less" scoped>
.mineInfo{
    width: 70vw;
    height: 95vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
</style>