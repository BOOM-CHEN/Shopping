import request from '@/utils/request'
export const getLimitUser = (data) =>{
    return request.get('api/GetLimitUser',{
        params:{
            skip:data.skip,
            take:data.take
        }
    })
}
export const getUserTotal = () =>{
    return request.get('api/GetAllUserTotal')
}
// 
export const GetAllLimitroot = (data) =>{
    return request.get('api/GetAllLimitroot',{
        params:{
            skip:data.skip,
            take:data.take
        }
    })
}
export const getrootTotal = () =>{
    return request.get('api/GetrootTotal')
}
// 
export const getAllLimitadmin = (data) =>{
    return request.get('api/GetAllLimitadmin',{
        params:{
            skip:data.skip,
            take:data.take
        }
    })
}
export const getadminTotal = () =>{
    return request.get('api/GetadminTotal')
}
// 
export const getAllLimituser = (data) =>{
    return request.get('api/GetAllLimituser',{
        params:{
            skip:data.skip,
            take:data.take
        }
    })
}
export const getuserTotal = () =>{
    return request.get('api/GetuserTotal')
}
//
export const deleteUser = (email) =>{
    return request.delete('api/DeleteUserByEmail',{
        params:{
            email:email
        }
    })
}
export const insertUser = (user) =>{
    return request.post('api/InsertUser',user)
}
export const updateUserBaseInfo = (data) =>{
    return request.put('api/UpdateUserUser',data)
}