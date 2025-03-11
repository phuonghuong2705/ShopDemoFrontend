<template>
  <router-view></router-view>
</template>

<script setup>
</script>

<style lang="scss">
  body {
      margin: 0;
      font-family: "Roboto", sans-serif !important;
  }
  ::-webkit-scrollbar {
  width: 6px;
  height: 6px;
  }
  div::-webkit-scrollbar-track {
      background: rgba(213, 213, 213, 0.3);
      opacity: 0.6;
  }
  div::-webkit-scrollbar-thumb {
      background: rgba(164, 164, 164, 0.5);
      opacity: 0.6;
  }
</style>