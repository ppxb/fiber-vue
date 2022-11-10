<template>
  <div>
    <n-space vertical :size="12">
      <n-space justify="end">
        <n-button @click="showAdd = true">添加用户</n-button>
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
    <add-user-drawer :show="showAdd" @update-show="updateShowAdd" />
  </div>
</template>

<script lang="ts" setup>
  import { onMounted, reactive, ref } from 'vue'
  import { RowData } from 'naive-ui/es/data-table/src/interface'
  import addUserDrawer from './add-user-drawer.vue'

  const showAdd = ref(false)

  const updateShowAdd = () => (showAdd.value = false)

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
      }
    }
  }

  const handlePageChange = async (currentPage: number) => {
    loading.value = true
    loading.value = false
  }
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
