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
        <a-flex class="filter-group" align="start" justify="space-between">
            <a-select
                v-model:value="value"
                show-search
                placeholder="Năm phát hành"
                class="filter-option"
                style="margin-top: 0px; margin-left: 36px;"
                :options="options"
                :filter-option="filterOption"
                @focus="handleFocus"
                @blur="handleBlur"
                @change="handleChange"
            ></a-select>
            <div class="input-range">
                <div class="title-price"
                        :style="{background: disabled ? 'rgba(0, 0, 0, 0.04)' : '#ffffff' , color: disabled ? 'rgba(0, 0, 0, 0.25)' : ''}"
                >
                    Khoảng giá
                </div>
                <div class="range">   
                    <a-input-number
                        class="input"
                        :bordered="false"
                        placeholder="Từ"
                        :controls="false"
                        v-model:value="value"
                        @blur="checkValidate(item,index)"
                        :disabled="false"
                    ></a-input-number>
                    <div class="icon-to">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                            <g opacity="0.87">
                                <path
                                    d="M22.1422 13.3156L19.5797 10.0656C19.533 10.0063 19.4734 9.95832 19.4055 9.92531C19.3375 9.89229 19.263 9.87509 19.1875 9.875H18.175C18.0703 9.875 18.0125 9.99531 18.0766 10.0781L20.3313 12.9375H10.875C10.8062 12.9375 10.75 12.9938 10.75 13.0625V14C10.75 14.0687 10.8062 14.125 10.875 14.125H21.7484C22.1672 14.125 22.4 13.6438 22.1422 13.3156Z"
                                    fill="black" fill-opacity="0.25"/>
                            </g>
                        </svg>
                    </div>
    
                    <a-input-number
                        class="input"
                        :bordered="false"
                        placeholder="Đến"
                        :controls="false"
                        v-model:value="value"
                        @blur="checkValidate(item,index)"
                        :disabled="false"
                    ></a-input-number>
                </div>
                <div class="unit"
                        :style="{background:'#ffffff'}"
                >
                    đ
                </div>
            </div>
            <a-button class="reset-button">Đặt lại</a-button>
        </a-flex>
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
    .input-range {
        width: 40%;
        display: flex;
        .range {
            display: flex;
            .input {
                width: calc((100% - 60px) / 2);
            }
            background: #ffffff;
            border: 1px solid #d9d9d9;
            border-radius: 0 0 0 0;
            flex: 1;
            z-index: 2;
        }
        .unit {
            line-height: 30px;
            width: 32px;
            border-radius: 0 15px 15px 0;
            text-align: center;
            background-color: rgba(0, 0, 0, 0.02);
            border: 1px solid #d9d9d9;
            margin-left: -1px;
            z-index: 1;
        }
        .title-price {
            line-height: 30px;
            width: 100px;
            border-radius: 15px 0 0 15px;
            text-align: center;
            background-color: rgba(0, 0, 0, 0.02);
            border: 1px solid #d9d9d9;
            margin-left: -1px;
            border-right: 0px;
            z-index: 1;
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