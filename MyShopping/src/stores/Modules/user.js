import {defineStore} from 'pinia'
import {login} from '@/apis/login'
import {GetMineInfoByEmail} from '@/apis/GetMineInfo';
import {getLimitUser,getUserTotal,GetAllLimitroot,getrootTotal,getAllLimitadmin,getadminTotal,getAllLimituser,getuserTotal} from '@/apis/root'
import {deleteUser,insertUser,updateUserBaseInfo} from '@/apis/root'
export const useUserStore = defineStore('user',()=>{
    const token = ref('')
    const mine = ref('')
    const users = ref([])
    const total =ref('')
    //登录
    const Login = async (data) =>{
        let flag = false
        await login(data).then( res =>{
            if(res.data.Status === 200 && res.data.Success === true){
                ElMessage({
                    showClose:true,
                    message: res.data.Message,
                    type: 'success',
                    duration:1000
                })
                token.value = res.data.Data
                flag = true
            }else{
                ElMessage({
                    showClose:true,
                    message: res.data.Message,
                    type: 'error',
                    duration:1000
                })
                flag = false
            }
        })
        return flag
    }
    //获取个人信息
    const GetMineInfo = async (data) =>{
        await GetMineInfoByEmail(data).then(res=>{
            mine.value = res.data.Data
        })
    }
    //root
    const GetAllUsers = async (data) =>{
        try{
            await getLimitUser(data).then(async res=>{
                users.value = res.data.Data
                await GetUserTotal()
            });
        }catch(e){
            
        }
    }
    const GetAlluser = async (data) =>{
        try{
            await getAllLimituser(data).then(async res=>{
                users.value = res.data.Data
                await GetuserTotal()
            }) 
        }catch(e){

        }
        
    }
    const GetAlladmin = async (data) =>{
        try{
            await getAllLimitadmin(data).then(async res=>{
                users.value = res.data.Data
                await GetadminTotal()
            }) 
        }catch(e){
            
        }
    }
    const GetAllroot = async (data) =>{
        try{
            await GetAllLimitroot(data).then(async res=>{
                users.value = res.data.Data
                await GetrootTotal()
            }) 
        }catch(e){
            
        }
    }
    const GetUserTotal = async() =>{
        try {
            await getUserTotal().then(res=>{
                total.value = res.data.Data
            });
        } catch (e) {
            
        }
    }
    const GetuserTotal = async() =>{
        try {
            await getuserTotal().then(res=>{
                total.value = res.data.Data
            });
        } catch (e) {
           
        }
    }
    const GetadminTotal = async() =>{
        try {
            await getadminTotal().then(res=>{
                total.value = res.data.Data
            });
        } catch (e) {
            
        }
    }
    const GetrootTotal = async() =>{
        try {
            await getrootTotal().then(res=>{
                total.value = res.data.Data
            });
        } catch (e) {
            
        }
    }
    const DeleteUser = async (email)=>{
        await deleteUser(email).then(res=>{
            if(res.data.Status === 200 && res.data.Success === true){
                ElMessage({
                    showClose:true,
                    message: res.data.Message,
                    type: 'success',
                    duration:2000
                })
            }else{
                ElMessage({
                    showClose:true,
                    message: res.data.Message,
                    type: 'error',
                    duration:2000
                })
            }
        })
    }
    const InsertUser = async (user)=>{
        let flag = false
        await insertUser(user).then(res=>{
            if(res.data.Status === 200 && res.data.Success === true){
                ElMessage({
                    showClose:true,
                    message: res.data.Message,
                    type: 'success',
                    duration:2000
                })
                flag = true
            }else{
                ElMessage({
                    showClose:true,
                    message: res.data.Message,
                    type: 'warning',
                    duration:2000
                })
            }
        })
        return flag
    }
    const UpdateUserBaseInfo = async (data) =>{
        let flag = false
        await updateUserBaseInfo(data).then(res =>{
            if(res.data.Status === 200 && res.data.Success === true){
                ElMessage({
                    showClose:true,
                    message: res.data.Message,
                    type: 'success',
                    duration:2000
                })
                flag = true
            }else{
                ElMessage({
                    showClose:true,
                    message: res.data.Message,
                    type: 'error',
                    duration:2000
                })
            }
        })
        return flag
    }


    const exit = () =>{
        token.value = ''
        mine.value = ''
        users.value = ''
        total.value = ''
    }
    return {
        Login,
        GetMineInfo,
        token,
        mine,
        exit,
        GetAllUsers,
        GetAlluser,
        users,
        GetAlladmin,
        GetAllroot,
        total,
        DeleteUser,
        InsertUser,
        UpdateUserBaseInfo
    }
},{
    persist:true
})