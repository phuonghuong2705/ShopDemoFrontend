<template>
    <div class="content">
        <a-flex vertical :gap="10" style="width: 90%; display: flex; height: 105%; align-content: center; justify-content: center;">
            <a-flex class="background">
                <a-flex align="flex-start" vertical :gap="20" style="width: 50%; padding: 0px 0px 0px 20px;">
                    <a-flex :gap="20" style="width: 100%;">
                        <div class="img-cover">
                            <input type="file" :id="('Image')" style="display: none;" accept="image/*" @change="loadFile($event)">
                            <a-tooltip placement="top">
                                <template #title>
                                    <span>Vui lòng sử dụng file .gif, .png, .jpg, .jpeg và dung lượng dưới 10MB.</span>
                                </template>
                                <label :for="('Image')" style="cursor: pointer;">
                                    <img style="width: 200px; height: 250px; object-fit: contain;" :id="('Image')" :src="previewUrl == '' ? '/public/img/book_cover.png' : previewUrl">
                                    </img>
                                    <div v-if="previewUrl === ''" class="add-img"><FileImageOutlined style="font-size: 30px; color: black;"/></div>
                                </label>
                            </a-tooltip>
                        </div>
                        <a-flex vertical style="width: 100%;" :gap="20">
                            <a-flex vertical>
                                <span class="title">Tên sách<span style="color: red;">*</span></span>
                                <a-input placeholder="Nhập tên sách"></a-input>
                            </a-flex>
                            <a-flex vertical>
                                <span class="title">Danh mục sách<span style="color: red;">*</span></span>
                                <a-select
                                    ref="select"
                                    v-model:value="value1"
                                    style="width: 100%"
                                    @focus="focus"
                                    @change="handleChange"
                                    placeholder="Chọn danh mục"
                                />
                            </a-flex>
                            <a-flex vertical>
                                <span class="title">Thể loại sách<span style="color: red;">*</span></span>
                                <a-select
                                    ref="select"
                                    v-model:value="value1"
                                    style="width: 100%"
                                    @focus="focus"
                                    @change="handleChange"
                                    placeholder="Chọn thể loại"
                                />
                            </a-flex>
                        </a-flex>
                    </a-flex>
                    <a-flex vertical style="width: 100%;">
                        <span class="title">Mô tả sách</span>
                        <a-textarea style="width: 100%;" v-model:value="value" placeholder="Basic usage" :rows="8" />
                    </a-flex>
                </a-flex>
                <a-divider type="vertical" style="height: 95%; margin-left: 20px; background-color: gray" />
                <a-flex vertical align="flex-start" style="width: 50%; gap: 15px; padding: 0px 0px 0px 20px;">
                    <a-flex vertical style="width: 95%;" :gap="10">
                        <a-flex justify="space-between" align="center" style="min-height: 32px;">
                            <span class="title">Danh sách phiên bản</span>
                            <a-button type="link" v-if="isUpdate && !ableUpdate" @click="confirmUpdate">Chỉnh sửa</a-button>
                        </a-flex>
                        <div class="edition">
                            <a-list item-layout="horizontal" style="width: 100%;" :data-source="listEdition">
                                <template #renderItem="{ item, index }">
                                <a-list-item>
                                    <a-card :bordered="false" style="width: 100%">
                                        <template #title>
                                            <a-input v-model:value="item.edition" v-if="ableUpdate" style="width: 60%; border: none; box-shadow: none;" placeholder="Nhập tên phiên bản"/>
                                            <span v-else>{{ item.edition }}</span>
                                        </template>
                                        <template #extra>
                                            <a-button type="link" :disabled="!ableUpdate || listEdition.length == 1" @click="deleteEdition(index)">Xóa</a-button>
                                        </template>
                                        <p>{{ index }}</p>
                                        <a-flex :gap="15">
                                            <a-input-number :disabled="!ableUpdate" v-model:value="item.quantity" style="width: 50%;" placeholder="Nhập số lượng sách" />
                                            <a-input-number addonAfter="đ" :disabled="!ableUpdate" v-model:value="item.price" style="width: 50%;" placeholder="Nhập giá sách" />
                                        </a-flex>
                                    </a-card>
                                </a-list-item>
                                </template>
                            </a-list>
                        </div>
                    </a-flex>
                    <a-flex>
                        <a-button type="primary" :disabled="!ableUpdate" @click="addEdition">Thêm phiên bản</a-button>
                    </a-flex>
                </a-flex>
            </a-flex>
            <a-flex justify="flex-end" :gap="20">
                <a-button type="primary">{{ isUpdate? 'Cập nhật sản phẩm' : 'Thêm sản phẩm' }}</a-button>
                <a-button @click="RedirectToListProduct">Hủy</a-button>
            </a-flex>
        </a-flex>
    </div>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import { FileImageOutlined } from '@ant-design/icons-vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

const previewUrl = ref('');
const listEdition = ref([{
    edition: null,
    quantity: null,
    price: null,
}]);
const isUpdate = ref(false);
const ableUpdate = ref(false);

onMounted(() => {
    if(route.name == 'UpdateProduct'){
        isUpdate.value = true;
    } else {
        ableUpdate.value = true;
    }
})

const confirmUpdate = () => {
    ableUpdate.value = true;
}
const addEdition = () => {
    listEdition.value.push({
        edition: null,
        quantity: null,
        price: null,
    })
}
const deleteEdition = (index) => {
    listEdition.value.splice(index, 1);
}
const loadFile = (event) => {
    const file = event.target.files[0]
    if (file && file.type.startsWith('image/')) {
        previewUrl.value = URL.createObjectURL(file)
    } else {
        previewUrl.value = ''
    }
}

const RedirectToListProduct = () => {
    router.push({
        name: "ListProduct"
    })
}

</script>
<style lang="scss" scoped>
    .content{
        color: black;
        display: flex;
        align-content: center;
        justify-content: center;
        width: 100%;
        .background{
            margin-top: 30px;
            padding-top: 20px;
            width: 100%;
            min-width: 1000px;
            background-color: white;
            height: 100%;
            border-radius: 10px;
            display: flex;
            flex-direction: row;
            align-items: flex-start;
            .img-cover{
                align-items: flex-start;
                position: relative;
                border: 1px black solid;
                .add-img{
                    position: absolute;
                    top: 50%;
                    background-color: rgb(131, 127, 127);
                    opacity: 0.5;
                    width: 100%;
                    height: 50%;
                    justify-content: center;
                    align-items: center;
                    display: flex;
                }
            }
            .edition{
                max-height: 450px;
                overflow-y: auto;
                display: flex;
                width: 100%;
                border-radius: 4px; 
                border: 1px solid rgb(193, 193, 193);
                background-color: #f0eded;
            }
            .title{
                font-size: 16px;
                font-weight: 600;
            }
            .table{
                width: 95%;
            }
        }
    }
    :deep(.ant-list-item){
        padding: 10px;
    }
    :deep(.ant-input-number-handler-wrap){
        display: none;
    }
    :deep(.ant-card-head){
        min-height: 45px;
    }
</style>