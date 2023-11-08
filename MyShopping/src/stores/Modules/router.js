import {defineStore} from 'pinia'
export const useRouterStore = defineStore('router',()=>{
    const currentPage = ref('')

    const exit = () =>{
        currentPage.value = ''
    }
    return {
        currentPage,
        exit
    }
},{
    persist:true
})