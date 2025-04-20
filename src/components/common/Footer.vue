<template>
    <div class="custom-footer">
      <a-row :gutter="[32, 16]">
        <!-- Giới thiệu -->
        <a-col :xs="24" :sm="12" :md="6">
          <h3 class="footer-title">📚 BookStore</h3>
          <p class="footer-text">
            Nơi bạn tìm thấy những cuốn sách hay nhất về văn học, kỹ năng sống, kinh tế và hơn thế nữa.
          </p>
        </a-col>
  
        <!-- Liên kết nhanh -->
        <a-col :xs="24" :sm="12" :md="6">
          <h4 class="footer-subtitle">Liên kết nhanh</h4>
          <ul class="footer-list">
            <li><router-link to="/">Trang chủ</router-link></li>
            <li><router-link to="/about">Giới thiệu</router-link></li>
            <li><router-link to="/books">Tất cả sách</router-link></li>
            <li><router-link to="/contact">Liên hệ</router-link></li>
          </ul>
        </a-col>
  
        <!-- Hỗ trợ -->
        <a-col :xs="24" :sm="12" :md="6">
          <h4 class="footer-subtitle">Hỗ trợ</h4>
          <ul class="footer-list">
            <li><router-link to="/faq">Câu hỏi thường gặp</router-link></li>
            <li><router-link to="/shipping">Chính sách vận chuyển</router-link></li>
            <li><router-link to="/returns">Chính sách đổi trả</router-link></li>
            <li><router-link to="/terms">Điều khoản dịch vụ</router-link></li>
          </ul>
        </a-col>
  
        <!-- Liên hệ -->
        <a-col :xs="24" :sm="12" :md="6">
          <h4 class="footer-subtitle">Liên hệ</h4>
          <p class="footer-text">📍 123 Đường Sách, Quận 1, TP.HCM</p>
          <p class="footer-text">📧 support@bookstore.vn</p>
          <p class="footer-text">📞 1900 9999</p>
          <div class="social-icons">
            <a href="#"><i class="fab fa-facebook-f" /></a>
            <a href="#"><i class="fab fa-instagram" /></a>
            <a href="#"><i class="fab fa-twitter" /></a>
          </div>
        </a-col>
      </a-row>
  
      <div class="footer-bottom">
        &copy; 2025 BookStore. All rights reserved.
      </div>
    </div>
  </template>
  
  <script setup>
  // No JS needed
  </script>
  
  <style scoped>
  .custom-footer {
    background: #001529;
    color: #fff;
    overflow-x: hidden;
    padding: 50px 30px 20px;
  }
  
  .footer-title {
    font-size: 22px;
    font-weight: bold;
    margin-bottom: 12px;
  }
  
  .footer-subtitle {
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 12px;
  }
  
  .footer-text {
    color: #ccc;
    font-size: 14px;
    margin-bottom: 8px;
  }
  
  .footer-list {
    list-style: none;
    padding: 0;
  }
  
  .footer-list li {
    margin-bottom: 6px;
  }
  
  .footer-list a {
    color: #bbb;
    transition: color 0.3s;
  }
  
  .footer-list a:hover {
    color: #fff;
  }
  
  .social-icons a {
    color: #ccc;
    margin-right: 10px;
    font-size: 18px;
    transition: color 0.3s;
  }
  
  .social-icons a:hover {
    color: #1890ff;
  }
  
  .footer-bottom {
    text-align: center;
    margin-top: 30px;
    font-size: 13px;
    color: #999;
  }
  </style>
  