import axios from "axios";
import {useUserStore} from '@/stores/index'
import Router from '@/router/index'

const baseURL = 'https://localhost:7157'
const instance = axios.create({
    baseURL,
    timeout:2000,
})

instance.interceptors.request.use(
    (config) =>{
        const userStore = useUserStore()
        config.headers.Authorization = `Bearer ${userStore.token}`;
        return config
    },
    (err) => Promise.reject(err)
)

instance.interceptors.response.use(
    (res) => {
            return res
    },
    (err) => {
        const userStore = useUserStore()
        if(err.response.status === 401){
            ElMessage({
                showClose:true,
                message:'你的登录已过期,请重新登录',
                type: 'warning',
                duration:2000
            })
            userStore.token = ''
            Router.push('/Login')
        }
        return Promise.reject(err)
    }
)
export default instance
export {baseURL}