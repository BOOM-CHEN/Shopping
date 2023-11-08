import request from '@/utils/request'
const getAllProduct = () =>{
    return request.get('/api/GetAllProduct')//{skip,take}
}
const insertProduct = (data) =>{
    return request.post('api/InsertProduct',data)
}
const deleteProduct = (data) =>{
    return request.delete('api/DeleteProduct',data)
}
const getAllCategory = () =>{
    return request.get('api/GetAllCategory')
}
const deleteListProduct = (data) =>{
    return request.delete('api/DeleteListProduct',{ 
        data: data
    })
}









export {
    getAllProduct,
    insertProduct,
    deleteProduct,
    getAllCategory,
    deleteListProduct
}