<template>
    <div class="filter">
        <div class="title">
            Bộ lọc
        </div>
        <a-flex class="filter-group" align="start" justify="space-evenly">
            <a-select
                v-model:value="value"
                show-search
                placeholder="Nhà xuất bản"
                class="filter-option"
                :options="options"
                :filter-option="filterOption"
                @focus="handleFocus"
                @blur="handleBlur"
                @change="handleChange"
            ></a-select>
            <a-select
                v-model:value="value"
                show-search
                placeholder="Tác giả"
                class="filter-option"
                :options="options"
                :filter-option="filterOption"
                @focus="handleFocus"
                @blur="handleBlur"
                @change="handleChange"
            ></a-select>
            <a-select
                v-model:value="value"
                show-search
                placeholder="Thể loại"
                class="filter-option"
                :options="options"
                :filter-option="filterOption"
                @focus="handleFocus"
                @blur="handleBlur"
                @change="handleChange"
            ></a-select>
            <a-select
                v-model:value="value"
                show-search
                placeholder="Sắp xếp"
                class="filter-option"
                :options="options"
                :filter-option="filterOption"
                @focus="handleFocus"
                @blur="handleBlur"
                @change="handleChange"
            ></a-select>
        </a-flex>
        <a-button class="reset-button">Đặt lại</a-button>
    </div>
</template>

<script setup>

</script>
<style lang="scss" scoped>
.filter{
    display: flex;
    flex-direction: column;
    background-color: white;
    width: 1100px;
    margin-top: 15px;
    border-radius: 8px;
    justify-content: center;
    align-items: flex-end;
    .title{
        width: 100%;
        margin-top: 20px;
        padding-left: 36px;
        font-size: 16px;
        font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    }
    .filter-group{
        width: 100%;
        .filter-option{
            margin-top: 8px;
            margin-bottom: 15px;
            width: 230px;
            border-radius: 15px;
            :deep(.ant-select-selector){
                border-radius: 15px;
            }
        }
    }
    .reset-button{
        width: 120px;
        margin-right: 36px;
        margin-bottom: 20px;
        border-radius: 15px;
    }
}
</style>