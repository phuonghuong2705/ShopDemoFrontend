<template>
    <div class="content">
        <a-flex vertical :gap="10" style="width: 90%; display: flex; height: 105%; align-content: center; justify-content: center;">
            <a-flex class="background">
                <a-flex align="flex-start" vertical :gap="20" style="width: 45%; padding: 0px 0px 0px 20px;">
                    <a-flex :gap="20" style="width: 100%;">
                        <div class="img-cover">
                            <input :disabled="!ableUpdate" type="file" :id="('Image')" style="display: none;" accept="image/*" @change="loadFile($event, 'cover')">
                            <a-tooltip placement="top">
                                <template #title>
                                    <span>Vui lòng sử dụng file .gif, .png, .jpg, .jpeg và dung lượng dưới 10MB.</span>
                                </template>
                                <label :for="('Image')" style="cursor: pointer;" >
                                    <img style="width: 200px; height: 250px; object-fit: contain;" :id="('Image')" :src="coverUrl == '' ? '/public/img/book_cover.png' : coverUrl" />
                                    <div v-if="coverUrl === ''" class="add-img"><FileImageOutlined style="font-size: 30px; color: black;"/></div>
                                </label>
                            </a-tooltip>
                        </div>
                        <a-flex vertical style="width: 100%;" :gap="10">
                            <a-flex vertical>
                                <span class="title">Tên sách<span style="color: red;">*</span></span>
                                <a-input :disabled="!ableUpdate" placeholder="Nhập tên sách" v-model:value="productName"></a-input>
                            </a-flex>
                            <a-flex vertical>
                                <span class="title">Danh mục sách<span style="color: red;">*</span></span>
                                <a-select 
                                    placeholder="Chọn danh mục"
                                    :options="listCategory"
                                    style="width: 100%"
                                    :disabled="!ableUpdate"
                                    v-model:value="selectedCategory"
                                    @change="handleCategoryChange"
                                />
                            </a-flex>
                            <a-flex vertical>
                                <span class="title">Thể loại sách<span style="color: red;">*</span></span>
                                <a-select 
                                    placeholder="Chọn thể loại"
                                    :options="listSubGender"
                                    style="width: 100%"
                                    
                                    v-model:value="selectedSubGenre"
                                    :disabled="!selectedCategory || !ableUpdate"
                                    @change="handleSubgenreChange"
                                />
                            </a-flex>
                            <a-flex vertical>
                                <span class="title">Tác giả<span style="color: red;">*</span></span>
                                <a-input :disabled="!ableUpdate" placeholder="Nhập tên tác giả" v-model:value="author"></a-input>
                            </a-flex>
                        </a-flex>
                    </a-flex>
                    <a-flex vertical style="width: 100%;">
                        <span class="title">Mô tả sách</span>
                        <a-textarea :disabled="!ableUpdate" style="width: 100%;" v-model:value="description" placeholder="Basic usage" :rows="8" />
                    </a-flex>
                </a-flex>
                <a-divider type="vertical" style="height: 95%; margin-left: 20px; background-color: gray" />
                <a-flex vertical align="flex-start" style="width: 55%; gap: 15px; padding: 0px 0px 0px 20px;">
                    <a-flex vertical style="width: 95%;" :gap="10">
                        <a-flex justify="space-between" align="center" style="min-height: 32px;">
                            <span class="title">Danh sách phiên bản</span>
                            <a-button type="link" v-if="isUpdate && !ableUpdate && permissions" @click="confirmUpdate">Chỉnh sửa</a-button>
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
                                                :grid="{column: 5}"
                                                :data-source="item.img"
                                                v-if="item.img?.length"
                                                style="align-items: flex-end; width: 400px; height: 85px; overflow-y: auto; overflow-x: hidden; padding-top: 5px;"
                                            >
                                                <template #renderItem="{ item, index: imgIndex }">
                                                    <a-flex 
                                                        vertical align="flex-start" 
                                                        justify="center"
                                                        style="position: relative; height: 80px; width: 70px"
                                                        
                                                    >
                                                        <a-button style="position: absolute; width: 70px; height: 70px; top: 0; opacity: 0; cursor: pointer;" @click="previewImage(item)"></a-button>
                                                        <div class="chatbox-media-remove" @click="deleteImage(index, imgIndex)">
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
                                                <label :for="('ListImage') + index" v-if="item.img?.length < 5">
                                                    <a-tooltip placement="top">
                                                        <template #title>
                                                            <span>Vui lòng sử dụng file .gif, .png, .jpg, .jpeg và dung lượng dưới 10MB.</span>
                                                        </template>
                                                        <span class="add-img-button"
                                                            :style="{color: !ableUpdate ? 'rgba(0, 0, 0, 0.25)' : 'white', backgroundColor: !ableUpdate ? 'rgba(0, 0, 0, 0.04)' : '#1677ff', border: !ableUpdate ? '1px solid rgba(0, 0, 0, 0.25)' : 'none', cursor: !ableUpdate ? 'not-allowed' : 'pointer'}"
                                                        >
                                                            Thêm ảnh
                                                        </span>
                                                    </a-tooltip>
                                                </label>
                                                <input type="file" :disabled="!ableUpdate" :id="('ListImage') + index" style="display: none;" multiple accept=".gif, .png, .jpg, .jpeg" @change="loadFile($event, 'img', index)">
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
                <a-button :disabled="!ableUpdate && isUpdate" type="primary" @click="handleProduct">{{ isUpdate? 'Cập nhật sản phẩm' : 'Thêm sản phẩm' }}</a-button>
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
import { ref, onMounted, computed } from 'vue';
import { FileImageOutlined, CloseCircleFilled } from '@ant-design/icons-vue';
import { useRoute, useRouter } from 'vue-router';
import { message } from 'ant-design-vue';
import { useProductStore } from '@/stores/product';
import { useAuthStore } from '@/stores/auth';

const route = useRoute();
const router = useRouter();
const productStore = useProductStore();
const authStore = useAuthStore();

const coverUrl = ref('');
const imagePreview = ref('');
const visibleModalPreviewImage = ref(false);
const isUpdate = ref(false);
const ableUpdate = ref(false);

const productName = ref(null);
const author = ref(null);
const description = ref(null);
const selectedCategory = ref(null);
const selectedSubGenre = ref(null);
const listEdition = ref([{
    edition: null,
    quantity: null,
    price: null,
    img: [],
}]);

const listCategory = ref([
    {
        value: 1,
        label: 'Giáo dục',
    },
    {
        value: 2,
        label: 'Kỹ năng sống',
    },
    {
        value: 3,
        label: 'Kinh doanh',
    },
    {
        value: 4,
        label: 'Giải trí',
    },
    {
        value: 5,
        label: 'Học thuật',
    },
    {
        value: 6,
        label: 'Đời sống',
    },

]);
const listSubGender = computed(() => {
    if (selectedCategory.value == 1) {
        return [
            {
                value: 1,
                label: 'Sách giáo khoa',
            },
            {
                value: 2,
                label: 'Sách bài tập',
            },
            {
                value: 3,
                label: 'Sách tham khảo',
            },
            {
                value: 4,
                label: 'Sách luyện thi',
            },
            {
                value: 5,
                label: 'Giáo trình đại học',
            },
        ]
    } else if (selectedCategory.value == 2) {
        return [
            {
                value: 6,
                label: 'Phát triển bản thân',
            },
            {
                value: 7,
                label: 'Quản lý thời gian',
            },
            {
                value: 8,
                label: 'Giao tiếp',
            },
            {
                value: 9,
                label: 'Tài chính cá nhân',
            },
            {
                value: 10,
                label: 'Hướng nghiệp',
            }
        ]
    } else if (selectedCategory.value == 3) {
        return [
            {
                value: 11,
                label: 'Khởi nghiệp',
            },
            {
                value: 12,
                label: 'Quản trị doanh nghiệp',
            },
            {
                value: 13,
                label: 'Marketing và bán hàng',
            },
            {
                value: 14,
                label: 'Tài chính và đầu tư',
            },
            {
                value: 15,
                label: 'Quản lý sản phẩm',
            }
        ]
    } else if (selectedCategory.value == 4) {
        return [
            {
                value: 16,
                label: 'Tiểu thuyết',
            },
            {
                value: 17,
                label: 'Truyện tranh',
            },
            {
                value: 18,
                label: 'Nghệ thuật',
            },
            {
                value: 19,
                label: 'Âm nhạc',
            },
            {
                value: 20,
                label: 'Phim ảnh',
            },
        ]
    } else if (selectedCategory.value == 5) {
        return [
            {
                value: 21,
                label: 'Khoa học tự nhiên',
            },
            {
                value: 22,
                label: 'Khoa học xã hội',
            },
            {
                value: 23,
                label: 'Ngôn ngữ học',
            },
            {
                value: 24,
                label: 'Triết học',
            },
            {
                value: 25,
                label: 'Khoa học máy tính',
            },
        ]
    } else if (selectedCategory.value == 6) {
        return [
            {
                value: 26,
                label: 'Ẩm thực',
            },
            {
                value: 27,
                label: 'Chăm sóc sức khỏe',
            },
            {
                value: 28,
                label: 'Chăm sóc gia đình',
            },
            {
                value: 29,
                label: 'Nội thất và thiết kế',
            },
            {
                value: 30,
                label: 'Làm vườn',
            },
        ]
    } else {
        return [];
    }
});

const permissions = computed(() => {
    if([0, 1].includes(authStore.userInfo?.role)) {
        return true;
    } else {
        return false;
    }
})

onMounted(() => {
    console.log('permissions', permissions.value);
    if(route.name == 'UpdateProduct'){
        isUpdate.value = true;
        getDetailBook();
    } else {
        ableUpdate.value = true;
    }
})

const handleCategoryChange = (value) => {

}
const handleSubgenreChange = (value) => {

}

const handleProduct = () => {
    if(!productName.value || !author.value || !description.value || !selectedCategory.value || !selectedSubGenre.value){
        return message.error('Vui lòng nhập đầy đủ thông tin!')
    } else if(listEdition.value.length == 0){
        return message.error('Vui lòng thêm ít nhất 1 phiên bản sách!')
    } else if(listEdition.value.some(item => item.edition == null || item.quantity == null || item.price == null)){
        return message.error('Vui lòng nhập đầy đủ thông tin cho tất cả các phiên bản sách!')
    } else if(listEdition.value.some(item => item.quantity < 0 || item.price < 0)){
        return message.error('Số lượng và giá sách không được âm!')
    }
    let params = {
        title: productName.value,
        author: author.value,
        image: coverUrl.value,
        description: description.value,
        subgenre_id: selectedSubGenre.value,
        book_variants: listEdition.value.map(item => {
            return {
                id: item?.id,
                edition: item.edition,
                stock: item.quantity,
                price: item.price,
                book_variant_images: item.img.map(img => {
                    return {
                        image_url: img
                    }
                })
            }
        })
    }
    if(isUpdate.value){
        updateBook(params, route.params.id);
    } else {
        createBook(params);
    }
}

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
    if(type == 'cover'){
        const file = event.target.files[0]
        if (file && file.type.startsWith('image/')) {
            authStore.uploadFile({
                type: 1,
                file: event.target.files[0]
            })
            .then(res => {
                coverUrl.value = res.link;
            })
            .catch(() =>{
                message.error('Tải file thất bại');
            })
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
                authStore.uploadFile({
                    type: 1,
                    file: event.target.files[0]
                })
                .then(res => {
                    listEdition.value[index].img.push(res.link);
                })
                .catch(() =>{
                    message.error('Tải file thất bại');
                })
            } else {
                previewUrl.value = ''
            }
        });
    }
    event.target.value = '';
}

const getDetailBook = async () => {
    let params = {
        id: route.params.id
    }
    await productStore.getDetailBook(params).then(res => {
        coverUrl.value = res.image;
        productName.value = res.title;
        author.value = res.author;
        description.value = res.description;
        setCategory(res.subgenre_id);
        listEdition.value = res.book_variants.map(item => {
            return {
                id: item.id,
                edition: item.edition,
                quantity: item.stock,
                price: item.price,
                img: item.book_variant_images.map(img => {
                    return img.image_url
                }),
            }
        })
    }).catch(err => {
        message.error('Lấy thông tin sách thất bại!')
    })
}

const updateBook = async (params, id) => {
    await productStore.updateBook(params, id).then(res => {
        message.success('Cập nhật sách thành công!')
        router.push({
            name: 'ListProduct'
        })
    }).catch(err => {
        message.error('Cập nhật sách thất bại!')
    })
}
const createBook = async (params) => {
    await productStore.createBook(params).then(res => {
        message.success('Thêm sách thành công!');
        router.push({
            name: 'ListProduct'
        })
    }).catch(err => {
        message.error('Thêm sách thất bại!')
    })
}

const setCategory = (value) => {
    if([1, 2, 3, 4, 5].includes(value)){
        selectedCategory.value = 1;
        selectedSubGenre.value = value;
    } else if([6, 7, 8, 9, 10].includes(value)){
        selectedCategory.value = 2;
        selectedSubGenre.value = value;
    } else if([11, 12, 13, 14, 15].includes(value)){
        selectedCategory.value = 3;
        selectedSubGenre.value = value;
    } else if([16, 17, 18, 19, 20].includes(value)){
        selectedCategory.value = 4;
        selectedSubGenre.value = value;
    } else if([21, 22, 23, 24, 25].includes(value)){
        selectedCategory.value = 5;
        selectedSubGenre.value = value;
    } else if([26, 27, 28, 29, 30].includes(value)){
        selectedCategory.value = 6;
        selectedSubGenre.value = value;
    } else {
        selectedCategory.value = null;
    }
}

const previewImage = (img) => {
    visibleModalPreviewImage.value = true;
    imagePreview.value = img;
}
const handleCancel = () => {
    visibleModalPreviewImage.value = false;
}

const deleteImage = (index, imgIndex) => {
    if(!ableUpdate.value && isUpdate.value){
        return message.error('Bạn không có quyền xóa ảnh này!')
    }
    else {
        listEdition.value[index].img.splice(imgIndex, 1);
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
                margin-top: 10px;
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
                .add-img-button{
                    padding: 5px 10px;
                    background-color: #1677ff;
                    border-radius: 6px;
                    border: 1px solid #1677ff;
                    color: white;
                }
                .add-img-button:hover{
                    cursor: pointer;
                }
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
        right: -7px;
        top: -2px;
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