<template>
    <div class="content">
        <a-card hoverable @click="redirectTo('Education')" class="feature-card">
            <template #title><span class="title">Giáo dục</span></template>
            <template #extra><ShopOutlined /></template>
            <p>Khơi nguồn tri thức, truyền cảm hứng học tập và phát triển toàn diện cho mọi lứa tuổi qua những cuốn sách giáo dục thiết thực và giá trị.</p>
        </a-card>
        <a-card hoverable @click="redirectTo('LifeSkills')" class="feature-card">
            <template #title><span class="title">Kỹ năng sống</span></template>
            <template #extra><AuditOutlined /></template>
            <p>Trang bị cho bạn những kỹ năng mềm quan trọng như giao tiếp, quản lý thời gian, tư duy tích cực và giải quyết vấn đề để làm chủ cuộc sống.</p>
        </a-card>
        <a-card hoverable @click="redirectTo('Business')" class="feature-card">
            <template #title><span class="title">Kinh doanh</span></template>
            <template #extra><ShoppingOutlined /></template>
            <p>Khám phá tư duy lãnh đạo, chiến lược kinh doanh, khởi nghiệp và quản lý tài chính qua những cuốn sách từ các doanh nhân và chuyên gia hàng đầu.</p>
        </a-card>
        <a-card hoverable @click="redirectTo('Entertainment')" class="feature-card">
            <template #title><span class="title">Giải trí</span></template>
            <template #extra><UserOutlined /></template>
            <p>Mang đến những giây phút thư giãn đầy màu sắc với truyện cười, tiểu thuyết lãng mạn, hành động, phiêu lưu và nhiều thể loại hấp dẫn khác.</p>
        </a-card>
        <a-card hoverable @click="redirectTo('Academic')" class="feature-card">
            <template #title><span class="title">Học thuật</span></template>
            <template #extra><SettingOutlined /></template>
            <p>Tổng hợp những công trình nghiên cứu, tài liệu chuyên sâu và kiến thức nền tảng từ nhiều lĩnh vực học thuật như khoa học, xã hội, công nghệ và nhân văn.</p>
        </a-card>
        <a-card hoverable @click="redirectTo('Lifestyle')" class="feature-card">
            <template #title><span class="title">Đời sống</span></template>
            <template #extra><LineChartOutlined /></template>
            <p>Phản ánh những câu chuyện thường nhật, giá trị gia đình, tình yêu, sức khỏe, ẩm thực và các khía cạnh đa dạng của cuộc sống đương đại.</p>
        </a-card>
    </div>
</template>
<script setup>
import { AuditOutlined, ShopOutlined, SettingOutlined, LineChartOutlined, ShoppingOutlined, UserOutlined } from '@ant-design/icons-vue';
import {ref} from 'vue'
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

const redirectTo = (name) => {
    router.push({
        name: name,
    });
}
</script>
<style lang="scss" scoped>
    .content{
        padding: 80px;
        display: flex;
        gap: 40px;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
        flex-wrap: wrap;
        .feature-card{
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            width: 30%;
            .title{
                font-weight: 600;
                font-size: 20px;
            }
        }
    }
</style>