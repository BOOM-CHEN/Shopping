<script setup>
import { useProductStore } from '@/stores/index';
import { onMounted, ref } from 'vue';
const ProductStore = useProductStore()
const search = ref('')
const filterArray = []//{text:'',value:''}
const btnabled = ref(true)
const selectedProduct = ref([])
const showDrawer = ref(false)
const Product = ref({
    ProductImage:'',
    ProductName:'',
    ProductDescription:'',
    ProductPrice:'',
    ProductDiscount:'',
    ProductInventory:'',
    ProductCategory:''

})
const filterMethod = (value,row,column) =>{
    const property = column['property']
    return row[property] === value
}
const querySearch = () =>{

}
const handleSearch = () =>{

}
const AddProduct = () =>{
    for (const key in Product.value) {
        if (Product.value[key]==='') {
            ElMessage({
                showClose:true,
                message:'你有尚未填写的字段',
                type: 'warning',
                duration:2000
            })
            return
        }
    }
    ProductStore.InsertProduct(Product.value)
    CancelAddProduct()
}
const CancelAddProduct = () =>{
    showDrawer.value = false
    Product.value = {
        ProductImage:'',
        ProductName:'',
        ProductDescription:'',
        ProductPrice:'',
        ProductDiscount:'',
        ProductInventory:'',
        ProductCategory:''
    }
}
const handleSelectionChange = (data) =>{
    if(data!=''){
        btnabled.value = false
        selectedProduct.value = data
    }else{
        btnabled.value = true
    }
}
const deleteListProduct = () =>{
    ProductStore.DeleteListProduct(selectedProduct.value)
}
const deleteProduct = (PID) =>{
    ProductStore.DeleteProduct({
        params:{
            Id:PID
        }
    })
}
const filters = (data) =>{
    for (const key in data) {
        filterArray.push({
            text:data[key].CategoryName,
            value:data[key].CategoryName
        })
    }
}
onMounted(()=>{
    if(ProductStore.AllProduct === ''){
        ProductStore.GetAllProduct()
    }
    if(ProductStore.Category === ''){
        ProductStore.GetAllCategory()
        filters(ProductStore.Category)
    }
    
})
</script>
<template>
    <div id="product">
        <div id="btn">
            <el-button @click="showDrawer=true">新增</el-button>
            <el-button @click="deleteListProduct" :disabled="btnabled">删除选中</el-button>
        </div>
        <div id="table-box">
            <el-table :data="ProductStore.AllProduct" style="width: 70vw;" max-height="90vh" @selection-change="handleSelectionChange"> 
                <el-table-column type="selection" width="55" />
                <el-table-column prop="Id" label="编号" width="150" :show-overflow-tooltip="true"/>
                <el-table-column prop="ProductImage" label="图片" width="150" />
                <el-table-column prop="ProductName" label="产品名称" width="150" />
                <el-table-column prop="ProductDescription" label="产品描述" width="150" :show-overflow-tooltip="true"/>
                <el-table-column prop="ProductPrice" label="产品价格" sortable width="120" />
                <el-table-column prop="ProductDate" label="上架时间" sortable width="160" />
                <el-table-column prop="ProductDiscount" label="当前折扣" width="100" />
                <el-table-column prop="ProductInventory" label="库存" sortable width="100" />
                <el-table-column prop="ProductCategory" label="产品类别" width="100" :filters="filterArray" :filter-method="filterMethod"></el-table-column>
                <el-table-column fixed="right" label="  " width="160">
                <template #header>
                    <el-autocomplete
                        v-model="search"
                        :fetch-suggestions="querySearch"
                        :trigger-on-focus="false"
                        clearable
                        placeholder=" Type to Search"
                        @select="handleSearch"
                    />
                </template>
                <template #default="scope">
                    <el-button link type="primary" size="small" @click="deleteProduct(scope.row.Id)">删除</el-button>
                    <el-button link type="primary" size="small">修改</el-button>
                </template>
                </el-table-column>
            </el-table>
        </div>
        <el-drawer v-model="showDrawer" direction="rtl" :with-header="false">
            <template #default>
                <el-form label-width="auto"> 
                    <el-form-item label="产品名" :rules="[{required:true,message:'该项不能为空'}]"><el-input v-model.trim="Product.ProductName"/></el-form-item>
                    <el-form-item label="产品描述" :rules="[{required:true,message:'该项不能为空'}]"><el-input v-model.trim="Product.ProductDescription" :autosize="{minRows:1,maxRows:4}" type="textarea"/></el-form-item>
                    <el-form-item label="产品图像" :rules="[{required:true,message:'该项不能为空'}]"><el-input v-model.trim="Product.ProductImage"/></el-form-item>
                    <el-form-item label="产品价格" :rules="[{required:true,message:'该项不能为空'},{type:'number',message:'只能为数字'}]"><el-input v-model.number="Product.ProductPrice" type="number" /></el-form-item>
                    <el-form-item label="产品折扣" :rules="[{required:true,message:'该项不能为空'},{type:'number',message:'只能为数字'}]"><el-input v-model.number="Product.ProductDiscount" type="number" /></el-form-item>
                    <el-form-item label="产品库存" :rules="[{required:true,message:'该项不能为空'},{type:'number',message:'只能为数字'}]"><el-input v-model.number="Product.ProductInventory" type="number" /></el-form-item>
                    <el-form-item label="产品类别" :rules="[{required:true,message:'该项不能为空'}]">
                        <el-select v-model="Product.ProductCategory" placeholder="请选择">
                            <el-option v-for="category in ProductStore.Category" :key="category" :label="category.CategoryName" :value="category.CategoryName"/>
                        </el-select>
                    </el-form-item>
                </el-form>
            </template>
            <template #footer>
                <el-button @click="AddProduct()">提交</el-button>
                <el-button @click="CancelAddProduct()">取消</el-button>
            </template>
        </el-drawer>
    </div>
</template>
<style lang="less" scoped>
    #product{
        width: 75vw;
        height: 95vh;
        display: flex;
        flex-direction: column;
        justify-content: start;
    }
    #btn{
        width: 70vw;
        margin-left: 50px;
        display: flex;
        justify-content: space-between;
    }
    #table-box{
        display: flex;
        justify-content: center;
    }
    :deep(.el-drawer__body){
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
</style>