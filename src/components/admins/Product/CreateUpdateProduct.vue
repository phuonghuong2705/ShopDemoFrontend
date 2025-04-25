<template>
    <div class="content">
        <a-flex vertical :gap="10" style="width: 90%; display: flex; height: 105%; align-content: center; justify-content: center;">
            <a-flex class="background">
                <a-flex align="flex-start" vertical :gap="20" style="width: 50%; padding: 0px 0px 0px 20px;">
                    <a-flex :gap="20" style="width: 100%;">
                        <div class="img-cover">
                            <input type="file" :id="('Image')" style="display: none;" accept="image/*" @change="loadFile($event, 'cover')">
                            <a-tooltip placement="top">
                                <template #title>
                                    <span>Vui lòng sử dụng file .gif, .png, .jpg, .jpeg và dung lượng dưới 10MB.</span>
                                </template>
                                <label :for="('Image')" style="cursor: pointer;">
                                    <img style="width: 200px; height: 250px; object-fit: contain;" :id="('Image')" :src="coverUrl == '' ? '/public/img/book_cover.png' : coverUrl">
                                    </img>
                                    <div v-if="coverUrl === ''" class="add-img"><FileImageOutlined style="font-size: 30px; color: black;"/></div>
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
                                        <a-flex horizontal align="center" justify="flex-start" style="margin-bottom: 10px;">
                                            <a-list 
                                                :grid="{gutter: [15, 15], column: 5}"
                                                :data-source="item.img"
                                                v-if="item.img?.length"
                                                style="align-items: flex-end; width: 70%; height: 80px; overflow-y: auto; overflow-x: hidden; padding-left: 10px;"
                                            >
                                                <template #renderItem="{ item, index }">
                                                    <a-flex 
                                                        vertical align="flex-start" 
                                                        justify="center"
                                                        style="position: relative; height: 80px;"
                                                        
                                                    >
                                                        <a-button style="position: absolute; width: 70px; height: 70px; top: 0; opacity: 0; cursor: pointer;" @click="previewImage(item)"></a-button>
                                                        <div class="chatbox-media-remove" @click="deleteImage(index)">
                                                            <span title="Xóa ảnh">
                                                                <svg width="5" height="5" viewBox="0 0 5 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <path d="M2.77623 2.50001L4.9428 0.33343C5.01907 0.25715 5.01907 0.133479 4.9428 0.0572094C4.86652 -0.01906 4.74285 -0.0190698 4.66658 0.0572094L2.5 2.22379L0.33343 0.0572094C0.25715 -0.0190698 0.133479 -0.0190698 0.0572094 0.0572094C-0.01906 0.133489 -0.0190698 0.25716 0.0572094 0.33343L2.22378 2.5L0.0572094 4.66658C-0.0190698 4.74286 -0.0190698 4.86653 0.0572094 4.9428C0.0953441 4.98093 0.145334 4.99999 0.195324 4.99999C0.245314 4.99999 0.295295 4.98093 0.333439 4.9428L2.5 2.77623L4.66657 4.9428C4.7047 4.98093 4.75469 4.99999 4.80468 4.99999C4.85467 4.99999 4.90465 4.98093 4.9428 4.9428C5.01907 4.86652 5.01907 4.74285 4.9428 4.66658L2.77623 2.50001Z" fill="white"/>
                                                                </svg>
                                                            </span>
                                                        </div>
                                                        <img :src="item" :id="index" style="width: 70px; height: 70px; background-color: white; margin-bottom: 5px; border: 1px dashed #8C8C8C; border-radius: 8px; object-fit: cover;"/>                       
                                                    </a-flex>
                                                </template>
                                            </a-list>
                                            <div>
                                                <label :for="('ListImage') + index">
                                                    <a-tooltip placement="top">
                                                        <template #title>
                                                            <span>Vui lòng sử dụng file .gif, .png, .jpg, .jpeg và dung lượng dưới 10MB.</span>
                                                        </template>
                                                        <span style="text-decoration: underline; color: var(--primary-color); cursor: pointer;">Thêm ảnh</span>
                                                    </a-tooltip>
                                                </label>
                                                <input type="file" :id="('ListImage') + index" style="display: none;" multiple accept=".gif, .png, .jpg, .jpeg" @change="loadFile($event, 'img', index)">
                                            </div>
                                        </a-flex>
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
        <a-modal
            :open="visibleModalPreviewImage"
            :footer="null"
            :centered="true"
            @cancel="handleCancel"
        >
            <img style="width: 100%; margin-top: 20px; object-fit: cover;" :src="imagePreview" alt="">
        </a-modal>
    </div>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import { FileImageOutlined, CloseCircleFilled } from '@ant-design/icons-vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

const coverUrl = ref('');
const imagePreview = ref('');
const visibleModalPreviewImage = ref(false);
const listEdition = ref([{
    edition: null,
    quantity: null,
    price: null,
    img: [],
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
        img: [],
    })
}
const deleteEdition = (index) => {
    listEdition.value.splice(index, 1);
}
const loadFile = (event, type, index) => {
    console.log(type, index);
    
    if(type == 'cover'){
        const file = event.target.files[0]
        if (file && file.type.startsWith('image/')) {
            coverUrl.value = URL.createObjectURL(file)
        } else {
            coverUrl.value = ''
        }
    } else if(type == 'img'){
        let listFifle = ref();
        let ext0 = ref(event.target.files[0].name.substr(event.target.files[0].name.lastIndexOf('.') + 1).toLowerCase())
        if (!event.target.files.length) {
            return
        } else if (event.target.files.length === 1 && !['gif', 'png', 'jpg', 'jpeg'].includes(ext0.value) ) {
            return message.error('Định dạng không hỗ trợ. Vui lòng sử dụng file .gif, .png, .jpg, .jpeg và dung lượng dưới 10MB.');
        } else {
            listFifle.value = [...event.target.files];
        }
        listFifle.value.forEach(element => { 
            // var output = document.getElementById(index);
            var ext = ref(element.name.substr(element.name.lastIndexOf('.') + 1).toLowerCase());
            if(!['gif', 'png', 'jpg', 'jpeg'].includes(ext.value) || ((element.size / 1024) / 1024) > 10){
                errorCount.value += 1;
            }
            const file = element;
            if (file && file.type.startsWith('image/')) {
                let previewUrl = URL.createObjectURL(file)
                listEdition.value[index].img.push(previewUrl);
            } else {
                previewUrl.value = ''
            }
            // let params = {
            //     type: 1,
            //     file: element
            // }
            // common.uploadMedia(params, 'multipart/form-data')
            // .then(res => {
            //     props.listImage.splice(props.listImage.length, 0, res.link);
            // })
            // .catch((err) =>{
            //     errorCount.value += 1;
            // })
        });
    }
    event.target.value = '';
}

const previewImage = (img) => {
    visibleModalPreviewImage.value = true;
    imagePreview.value = img;
}
const handleCancel = () => {
    visibleModalPreviewImage.value = false;
}

const deleteImage = (index) => {
    console.log(index);
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
    .chatbox-media-remove{
        position: absolute;
        border-radius: 50%;
        background: #454545;
        border: 1px solid #454545;
        width: 15px;
        height: 15px;
        line-height: 7px;
        text-align: center;
        right: 12px;
        top: 0px;
        cursor: pointer;
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