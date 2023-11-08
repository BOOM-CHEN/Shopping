import {defineStore} from 'pinia'
import { getAllProduct,getAllCategory} from '@/apis/productAPI'
import { insertProduct,deleteProduct,deleteListProduct} from '@/apis/productAPI'
export const useProductStore = defineStore('product',()=>{
    const AllProduct = ref('')
    const Category = ref('')

    const GetAllProduct = async () =>{
        await getAllProduct().then(res =>{
            AllProduct.value = res.data.Data
        })
    }
    const InsertProduct = async (data) =>{
        await insertProduct(data).then(res =>{
            if(res.data.Status === 200 && res.data.Success === true){
                ElMessage({
                    showClose:true,
                    message: res.data.Message,
                    type: 'success',
                    duration:2000
                })
                GetAllProduct()
            }else{
                ElMessage({
                    showClose:true,
                    message: res.data.Message,
                    type: 'warning',
                    duration:2000
                })
            }
        })
    }
    const DeleteProduct = async (data) =>{
        await deleteProduct(data).then(res=>{
            if(res.data.Status === 200 && res.data.Success === true){
                ElMessage({
                    showClose:true,
                    message: res.data.Message,
                    type: 'success',
                    duration:2000
                })
                GetAllProduct()
            }else{
                ElMessage({
                    showClose:true,
                    message: res.data.Message,
                    type: 'warning',
                    duration:2000
                })
            }
        })
    }
    const GetAllCategory = async () =>{
        await getAllCategory().then(res=>{
            Category.value = res.data.Data
        })
    }
    const DeleteListProduct = async (data) =>{
        await deleteListProduct(data).then(res =>{
            if(res.data.Status === 200 && res.data.Success === true){
                ElMessage({
                    showClose:true,
                    message: res.data.Message,
                    type: 'success',
                    duration:2000
                })
                GetAllProduct()
            }else{
                ElMessage({
                    showClose:true,
                    message: res.data.Message,
                    type: 'warning',
                    duration:2000
                })
            }
        })
    }

    const exit = () =>{
        AllProduct.value = ''
        Category.value = ''
    }
    return {
        AllProduct,
        Category,
        GetAllProduct,
        InsertProduct,
        DeleteProduct,
        GetAllCategory,
        DeleteListProduct,
        exit
    }
},{
    persist:true
})