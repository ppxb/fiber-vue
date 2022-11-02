<template>
  <div>
    <n-space vertical :size="12">
      <n-space justify="end">
        <n-button @click="">添加资产</n-button>
        <n-button @click="">批量导入</n-button>
        <n-button @click="">导出报表</n-button>
      </n-space>
      <n-data-table
        :columns="createColumns()"
        :data="data"
        :pagination="pagination"
        :loading="loading"
        @update:page="handlePageChange"
        :row-props="rowProps"
        :bordered="false"
        remote
      />
    </n-space>
    <n-drawer v-model:show="showDetail" :width="600">
      <n-drawer-content :header-style="headerStyle" :body-style="bodyStyle">
        <template #header>
          <div class="flex justify-between mb-2 w-126">
            <div class="flex items-end">
              <div class="color-[#333] text-3xl font-700">
                {{ selectItem.name }}
              </div>
              <div
                class="color-[#666] text-lg ml-4 flex items-center font-700"
                v-if="selectItem.checked"
              >
                <Icon name="mdi:check-bold" class="mr-1" color="green" /> 已盘点
              </div>
              <div
                class="color-[#666] text-lg ml-4 flex items-center font-700"
                v-else
              >
                <Icon name="mdi:close-thick" class="mr-1" color="#e11d48" />
                未盘点
              </div>
            </div>
            <vue-qrcode
              :value="
                JSON.stringify({
                  name: selectItem.name,
                  value: selectItem.value,
                  address: selectItem.address,
                  id: selectItem.id
                })
              "
              :options="{ width: 100, margin: 0, color: { dark: '#334155' } }"
            />
          </div>

          <div class="color-[#666] text-4">
            {{ selectItem.address }}
          </div>
        </template>
        <div class="flex mb-8">
          <div class="flex flex-col b-r b-[rgba(0,0,0,.05)] mr-8 pr-8">
            <div class="color-[#666] mb-[2px] font-700">入库时间</div>
            <div class="color-dark-900 font-400">
              {{ selectItem.indate }}
            </div>
          </div>
          <div class="flex flex-col b-r b-[rgba(0,0,0,.05)] mr-8 pr-8">
            <div class="color-[#666] mb-[2px] font-700">资产价值</div>
            <div class="color-dark-900 font-400">￥{{ selectItem.value }}</div>
          </div>
          <div class="flex flex-col">
            <div class="color-[#666] mb-[2px] font-700">状态</div>
            <div class="color-dark-900">
              {{ selectItem.status }}
            </div>
          </div>
        </div>

        <n-collapse
          arrow-placement="right"
          :default-expanded-names="['1', '2', '3', '4']"
        >
          <n-collapse-item name="1">
            <template #header>
              <div class="text-lg font-700">项目关系</div>
            </template>
            <div>可以</div>
          </n-collapse-item>
          <n-collapse-item name="2">
            <template #header>
              <div class="text-lg font-700">资产信息</div>
            </template>
            <div>可以</div>
          </n-collapse-item>
          <n-collapse-item name="3">
            <template #header>
              <div class="text-lg font-700">地理位置</div>
            </template>
            <div>很好</div>
          </n-collapse-item>
          <n-collapse-item name="4">
            <template #header>
              <div class="text-lg font-700">操作记录</div>
            </template>
            <div>真棒</div>
          </n-collapse-item>
        </n-collapse>
      </n-drawer-content>
    </n-drawer>
  </div>
</template>

<script lang="ts" setup>
  import { onMounted, reactive, ref } from 'vue'
  import { list } from '@/api/asset'
  import { RowData } from 'naive-ui/es/data-table/src/interface'
  import Icon from '@/components/icon/index.vue'

  const headerStyle = {
    border: 'none',
    height: '200px',
    alignItems: 'flex-end',
    padding: '16px 48px'
  }

  const bodyStyle = {
    padding: '0 24px'
  }

  const createColumns = () => {
    return [
      {
        title: '属性',
        key: 'type'
      },
      {
        title: '所属项目',
        key: 'project'
      },
      {
        title: '所属子项目',
        key: 'sonProject'
      },
      {
        title: '所属分部',
        key: 'part'
      },
      {
        title: '资产编号',
        key: 'id'
      },
      {
        title: '名称',
        key: 'name'
      },

      {
        title: '品牌',
        key: 'brand'
      },
      {
        title: '型号',
        key: 'model'
      }
    ]
  }

  const data = ref([])
  const loading = ref(true)
  const showDetail = ref(false)
  const selectItem = ref<RowData>({})
  const pagination = reactive({
    page: 1,
    pageCount: 1,
    pageSize: 10,
    prefix({ itemCount }: any) {
      return `总计 ${itemCount}`
    }
  })

  const rowProps = (row: RowData) => {
    return {
      style: 'cursor:pointer;',
      onClick: () => {
        selectItem.value = row
        showDetail.value = true
      }
    }
  }

  const handlePageChange = async (currentPage: number) => {
    loading.value = true
    const res = await list({
      page: currentPage
    })
    pagination.page = currentPage
    data.value = res.data.list
    loading.value = false
  }

  onMounted(async () => {
    const res = await list({
      page: 1
    })
    data.value = res.data.list
    pagination.pageCount = res.data.total / 10
    loading.value = false
  })
</script>

<style>
  .n-collapse .n-collapse-item:not(:first-child) {
    border: none;
  }

  .n-collapse .n-collapse-item:first-child > .n-collapse-item__header {
    padding: 10px 20px;
  }

  .n-collapse
    .n-collapse-item.n-collapse-item--active
    .n-collapse-item__header.n-collapse-item__header--active
    .n-collapse-item-arrow {
    margin-left: auto;
  }

  .n-collapse
    .n-collapse-item.n-collapse-item--right-arrow-placement
    .n-collapse-item__header
    .n-collapse-item-arrow {
    margin-left: auto;
  }

  .n-collapse .n-collapse-item .n-collapse-item__header {
    background-color: #f7f7f9;
    border-radius: 10px;
    padding: 10px 20px;
  }
</style>
