<template>
  <div>
    <n-space vertical :size="12">
      <n-space justify="end">
        <n-button @click="showAdd = true">新增项目</n-button>
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
    <add-project-drawer :show="showAdd" @update-show="updateShowAdd" />
  </div>
</template>

<script lang="ts" setup>
  import { onMounted, reactive, ref } from 'vue'
  import { list } from '@/api/asset'
  import { RowData } from 'naive-ui/es/data-table/src/interface'
  import addProjectDrawer from './add-project-drawer.vue'

  const createColumns = () => {
    return [
      {
        title: '名称',
        key: 'name'
      },
      {
        title: '项目ID',
        key: 'id'
      }
    ]
  }

  const showAdd = ref(false)
  const updateShowAdd = () => (showAdd.value = false)

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
    // const res = await list({
    //   page: currentPage
    // })
    // pagination.page = currentPage
    // data.value = res.data.list
    loading.value = false
  }

  onMounted(async () => {
    // const res = await list({
    //   page: 1
    // })
    // data.value = res.data.list
    // pagination.pageCount = res.data.total / 10
    // loading.value = false
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
