<template>
  <div>
    <n-space vertical :size="12">
      <n-space justify="end">
        <n-button @click="showAdd = true">新增项目</n-button>
      </n-space>
      <n-data-table
        :columns="columns"
        :data="data"
        :row-key="rowKey"
        :loading="loading"
        :bordered="false"
        remote
      >
        <template #empty>
          <div class="color-[#666] mt-4">当前无项目</div>
        </template>
      </n-data-table>
    </n-space>
    <add-project-drawer
      :show="showAdd"
      @update-show="updateShowAdd"
      :data="data"
      :update="fetch"
    />
  </div>
</template>

<script lang="ts" setup>
  import { onMounted, ref } from 'vue'
  import { getProjectList } from '@/api/asset'
  import addProjectDrawer from './add-project-drawer.vue'
  import type { DataTableColumns } from 'naive-ui'
  import { getTreeDataTable } from '@/utils/form'

  type RowData = {
    name: string
    uuid: string
    parentProjectId: string
    createdAt: string
    children?: RowData[]
  }

  const columns: DataTableColumns<RowData> = [
    {
      title: '项目名称',
      key: 'name'
    },
    {
      title: 'UUID',
      key: 'uuid'
    },
    {
      title: '创建时间',
      key: 'createdAt'
    }
  ]

  const rowKey = (row: RowData) => row.uuid
  const updateShowAdd = () => (showAdd.value = false)

  const data = ref<RowData[]>([])
  const showAdd = ref(false)
  const loading = ref(true)
  const showDetail = ref(false)

  const fetch = async () => {
    const res = await getProjectList({
      page: 0,
      pageSize: 20
    })
    data.value = getTreeDataTable(res.data.projects)
    loading.value = false
  }

  onMounted(async () => await fetch())
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
