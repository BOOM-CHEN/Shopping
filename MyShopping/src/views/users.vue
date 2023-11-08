<script setup>
import {useUserStore} from '@/stores/index';
import { onMounted, watch } from 'vue';
import {Plus} from '@element-plus/icons-vue'
const userStore = useUserStore()
const table = ref('')
const select = ref('all')
const userHeader = ['用户名','邮箱','密码','角色','头像','电话','收货地址']
//头像上传
const upload = ref('')
const beforeUpload = (rawFile) =>{
    if (rawFile.type !== 'image/png' && rawFile.type !== 'image/jpeg' && rawFile.type !== 'image/jpg') {
        ElMessage.error('不支持该类型的头像')
        return false
    } else if (rawFile.size / 1024 / 1024 > 2) {
        ElMessage.error('头像图片大小不能超过2MB')
        return false
      }
    return true
}
const onchange = (uploadFile, uploadFiles) =>{
    if (uploadFile.raw.type !== 'image/png' && uploadFile.raw.type !== 'image/jpeg' && uploadFile.raw.type !== 'image/jpg') {
        ElMessage.error('不支持该类型的头像')
        upload.value.clearFiles()
    } else if (uploadFile.size / 1024 / 1024 > 2) {
        ElMessage.error('头像图片大小不能超过2MB')
        upload.value.clearFiles()
    }else{
        UserAdd.value.UserAvatar = "https://localhost:7157/avatar/"+uploadFile.name
    }
    
}
const onRemove = (uploadFile, uploadFiles) =>{
    UserAdd.value.UserAvatar = ''
    console.log("图片上传取消");
}
const onprogress = (evt, uploadFile, uploadFiles) =>{
    console.log("图片上传中");
}
const onSuccess = (response) =>{
    console.log("图片上传成功");
}
const onerror = (error, uploadFile,uploadFiles) =>{
    console.log("图片上传失败:"+error);
}

const limit = ref({
    skip:0,
    take:8
})
const drawerShow = ref(false)
const UserAdd = ref({
    UserName:'',
    UserEmail:'',
    UserPassword:'',
    UserPhoneNumber:'',
    UserRecieveAddress:'',
    UserAvatar:'',
    Role:'user'
})
const filter = async () =>{
    switch(select.value){
        case 'all': await userStore.GetAllUsers(limit.value); break;
        case 'root': await userStore.GetAllroot(limit.value); break;
        case 'admin': await userStore.GetAlladmin(limit.value); break;
        case 'user': await userStore.GetAlluser(limit.value); break;
    }
}
const UserPassword = ref('')
//分页
const currentChange = async (e) =>{
    limit.value.skip = (e-1)*limit.value.take
    switch(userStore.mine.Role){
        case 'root': 
            switch(select.value){
                case 'all': await userStore.GetAllUsers(limit.value); break;
                case 'root': await userStore.GetAllroot(limit.value); break;
                case 'admin': await userStore.GetAlladmin(limit.value); break;
                case 'user': await userStore.GetAlluser(limit.value); break;
            };
        break;
        case 'admin': await userStore.GetAlluser(limit.value); break;
    }
}

const InsertUser = async () =>{
    if(UserAdd.value.UserName === '' || UserAdd.value.UserEmail === '' || UserAdd.value.UserPassword === '' || UserAdd.value.UserRole === ''){
        ElNotification({
            title: '警告',
            message: '存在不可为空输入',
            type: 'warning',
        })
    }else{
        const flag = await userStore.InsertUser(UserAdd.value)
        if(flag === true){//增加成功
            upload.value.submit()//头像开始上传
            flash()   
            drawerShow.value = false
            cancelInsert()//用于清空输入框
        }
    }
}
const deleteUser = async (email) =>{
    await userStore.DeleteUser(email)
    flash()
}
const inputDisabled = ref(true)
const updateShow = ref(false)
const newUser = ref({
    Id:'',
    Role:'user',
    UserAvatar:'',
    UserEmail:'',
    UserName:'',
    UserPhoneNumber:'',
    UserRecieveAddress:'',
    UserPassword:''
})

const compareUser = ref({
    Id:'',
    Role:'user',
    UserAvatar:'',
    UserEmail:'',
    UserName:'',
    UserPhoneNumber:'',
    UserRecieveAddress:'',
    UserPassword:''
})

const updateUser = (user) =>{
    for (const key in user) {
        newUser.value[key] = user[key]
        compareUser.value[key] = user[key]
    }
    updateShow.value = true
}
const UpdateUser = async () =>{
    if(newUser.value.UserPassword!='' && newUser.value.UserPassword != compareUser.value.UserPassword){
        console.log("密码修改成功");
    }
    if(newUser.value.Role != compareUser.value.Role && newUser.value.Role != ''){
        console.log("权限修改成功");
    }
    const flag = await userStore.UpdateUserBaseInfo({
        id:newUser.value.Id,
        userName:newUser.value.UserName === compareUser.value.UserName || newUser.value.UserName === '' ? compareUser.value.UserName : newUser.value.UserName,
        userEmail:newUser.value.UserEmail === compareUser.value.UserEmail || newUser.value.UserEmail === '' ? compareUser.value.UserEmail : newUser.value.UserEmail,
        userPhoneNumber:newUser.value.UserPhoneNumber === compareUser.value.UserPhoneNumber || newUser.value.UserPhoneNumber === '' ? compareUser.value.UserPhoneNumber : newUser.value.UserPhoneNumber,
        userRecieveAddress:newUser.value.UserRecieveAddress === compareUser.value.UserRecieveAddress || newUser.value.UserRecieveAddress === '' ? compareUser.value.UserRecieveAddress : newUser.value.UserRecieveAddress
    })
    if(flag===true){
        flash()
        for (const key in newUser.value) {
            compareUser.value[key] = newUser.value[key]
        }
        updateShow.value = false
    }
    
}
const CancelUpdate = () =>{
    for (const key in compareUser.value) {
        newUser.value[key] = compareUser.value[key]
    }
    updateShow.value = false
}

const cancelInsert = () =>{
    drawerShow.value = false
    UserAdd.value = {
        UserName:'',
        UserEmail:'',
        UserPassword:'',
        UserPhoneNumber:'',
        UserRecieveAddress:'',
        UserAvatar:'',
        Role:'user'
    }
    upload.value.clearFiles()
}

const flash = async () =>{
    if(userStore.mine.Role === 'root'){
        switch(select.value){
            case 'all': await userStore.GetAllUsers(limit.value); break;
            case 'root': await userStore.GetAllroot(limit.value); break;
            case 'admin': await userStore.GetAlladmin(limit.value); break;
            case 'user': await userStore.GetAlluser(limit.value); break;
        }
    }else{
        await userStore.GetAlluser(limit.value)
    }
}
onMounted(async ()=>{
    if(userStore.users === ''){
        if(userStore.mine.Role === 'root'){
            await userStore.GetAllUsers(limit.value)
        }else{
            await userStore.GetAlluser(limit.value)
        }
    }
    
})
</script>
<template>
    <div id="users">
        <div id="radio">
            <el-radio-group v-model="select" v-if="userStore.mine.Role === 'root'" @change="filter">
                <el-radio-button label="all"/>
                <el-radio-button label="root" />
                <el-radio-button label="admin" />
                <el-radio-button label="user" />
            </el-radio-group>
            <el-button @click="drawerShow = true">新增数据</el-button>
        </div>
        <div id="table">
            <table rules="rows" frame="below" cellpadding="10">
                <tr><td v-for="header in userHeader" :key="header" v-text="header"></td></tr>
                <tr v-for="(user,index) in userStore.users" :key="index">
                    <td><el-input v-model="user.UserName" input-style="width:5vw" :disabled="inputDisabled"/></td>
                    <td><el-input v-model="user.UserEmail" input-style="width:10vw" maxlength="25" :disabled="inputDisabled"/></td>
                    <td><el-input v-model="UserPassword" input-style="width:10vw" maxlength="18" :disabled="inputDisabled"/></td>
                    <td>
                        <el-select v-model="user.Role"  placeholder="请选择" id="role" v-if="userStore.mine.Role === 'root'" :disabled="inputDisabled">
                            <el-option label="root" value="root"/>
                            <el-option label="admin" value="admin"/>
                            <el-option label="user" value="user"/>
                        </el-select>
                        <el-text v-if="userStore.mine.Role === 'admin'">{{ user.Role }}</el-text>
                    </td>
                    <td>
                        <el-image :src="user.UserAvatar" :preview-src-list="[user.UserAvatar]" fit="fill" />
                    </td>
                    <td><el-input v-model="user.UserPhoneNumber" input-style="width:6vw" maxlength="11" :disabled="inputDisabled"/></td>
                    <td><el-input v-model="user.UserRecieveAddress" input-style="width:10vw" maxlength="100" :disabled="inputDisabled"/></td>
                    <td><el-link :underline="false" @click="deleteUser(user.UserEmail)">删除</el-link></td>
                    <td><el-link :underline="false" @click="updateUser(user)">修改</el-link></td>
                </tr>
            </table>
        </div>
        <div id="limit">
            <el-pagination :default-page-size="8" layout="prev, pager, next" :total="userStore.total" @current-change="currentChange"/>
            <el-text>共计{{ userStore.total }}条数据</el-text>
        </div>
        <el-drawer v-model="drawerShow" direction="btt" size="30vh" :with-header="false">
            <template #default>
                <div id="AddUserTable">
                    <table>
                        <tr><td v-for="header in userHeader" :key="header" v-text="header"></td></tr>
                        <tr>
                            <td><span class="require">*</span><el-input v-model="UserAdd.UserName" input-style="width:5vw" /></td>
                            <td><span class="require">*</span><el-input v-model="UserAdd.UserEmail" input-style="width:10vw" maxlength="25"/></td>
                            <td><span class="require">*</span><el-input v-model="UserAdd.UserPassword" input-style="width:10vw" maxlength="18"/></td>
                            <td>
                                <el-select v-model="UserAdd.Role" placeholder="请选择" id="role"  v-if="userStore.mine.Role === 'root'">
                                    <el-option label="root" value="root"/>
                                    <el-option label="admin" value="admin"/>
                                    <el-option label="user" value="user"/>
                                </el-select>
                                <el-text v-if="userStore.mine.Role === 'admin'">{{ UserAdd.Role }}</el-text>
                            </td>
                            <td>
                                <el-upload
                                    action="https://localhost:7157/api/Upload"
                                    ref="upload"
                                    list-type="picture"
                                    :limit="1"
                                    :auto-upload="false"
                                    :before-upload="beforeUpload" 
                                    :on-success="onSuccess" 
                                    :on-change="onchange"
                                    :on-error="onerror" 
                                    :on-progress="onprogress"
                                    :on-remove="onRemove"
                                >
                                    <el-icon v-if="UserAdd.UserAvatar === ''"><Plus /></el-icon>
                                </el-upload>
                            </td>
                            <td><el-input v-model.number="UserAdd.UserPhoneNumber" input-style="width:6vw" maxlength="11"/></td>
                            <td><el-input v-model="UserAdd.UserRecieveAddress" input-style="width:10vw" maxlength="100"/></td>
                        </tr> 
                    </table>
                </div>
            </template>
            <template #footer>
                <div style="flex: auto">
                    <el-button @click="cancelInsert">取消</el-button>
                    <el-button type="primary" @click="InsertUser">新增</el-button>
                </div>
            </template>
        </el-drawer>
        <el-drawer v-model="updateShow"  direction="ltr" size="35vw" :with-header="false">
            <template #default>
                <div id="updateUserBox">
                    <table cellpadding="10px">
                        <tr>
                            <td><label for="userNameInput">用户名:</label></td>
                            <td><el-input v-model="newUser.UserName" input-style="width:20vw"/></td>
                        </tr>
                        <tr>
                            <td><label for="UserEmailInput">邮箱:</label></td>
                            <td><el-input v-model="newUser.UserEmail" input-style="width:20vw"/></td>
                        </tr>
                        <tr>
                            <td><label for="UserPasswordInput">密码:</label></td>
                            <td><el-input v-model="newUser.UserPassword" input-style="width:20vw"/></td>
                        </tr>
                        <tr>
                            <td><label>级别</label></td>
                            <td>
                                <el-select v-model="newUser.Role" placeholder="请选择" v-if="userStore.mine.Role === 'root'">
                                    <el-option label="root" value="root"/>
                                    <el-option label="admin" value="admin"/>
                                    <el-option label="user" value="user"/>
                                </el-select>
                                <el-text v-if="userStore.mine.Role === 'admin'">{{ newUser.Role }}</el-text>
                            </td>
                        </tr>
                        <tr>
                            <td><label for="UserAvatarInput">头像:</label></td>
                            <td><el-image :src="newUser.UserAvatar" :preview-src-list="[newUser.UserAvatar]" fit="fill" /></td>
                        </tr>
                        <tr>
                            <td><label for="UserPhoneNumberInput">手机:</label></td>
                            <td><el-input v-model="newUser.UserPhoneNumber" input-style="width:20vw"/></td>
                        </tr>
                        <tr>
                            <td><label for="UserAddressInput">地址:</label></td>
                            <td><el-input v-model="newUser.UserRecieveAddress" input-style="width:20vw"/></td>
                        </tr>
                        <tr>
                            <td><el-button @click="UpdateUser">保存</el-button></td>
                            <td><el-button @click="CancelUpdate">退出</el-button></td>
                        </tr>
                    </table>
                </div>
            </template>
        </el-drawer>
    </div>
</template>
<style lang="less" scoped>
#users{
    width: 70vw;
    height: 95vh;
    display: flex;
    flex-direction: column;
    align-items: center;
}
#radio{
    width: 70vw;
    display: flex;
    justify-content: space-between;
}
#table{
    width: 70vw;
    display: flex;
    justify-content: center;
    overflow: auto;
    table{
        width: 70vw;
        border-color: rgb(220, 223, 230);
    }
}
#limit{
    width: 70vw;
    display: flex;
}
#AddUserTable{
    display: flex;
    justify-content:space-evenly;
    align-items: center;
    table{
        width: 90vw;
    }
}

.require{
    color: red;
}
:deep(.el-image__inner){
    height: 40px;
}
:deep(.el-upload){
    display: block;
}
:deep(.el-upload-list__item){
    width: 60px;
    height: 30px;
    margin-bottom: 5px;
}
:deep(.el-upload--picture-card){
    width: 40px;
    height: 40px;
}
:deep(.el-input){
    width: 6vw;
}
:deep(.el-drawer__header){
    margin-bottom: 0px;
}
</style>