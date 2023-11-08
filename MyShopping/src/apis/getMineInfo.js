import request from "@/utils/request"
export const GetMineInfoByEmail = (data) =>{
    return request.get('api/GetUserByEmail',{
        params:{
            email:data
        }
    })
}