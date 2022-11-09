<template>
  <div>
    <n-space vertical :size="12">
      <n-space justify="space-between">
        <div>
          <n-form-item label="项目筛选" :show-feedback="false">
            <n-tree-select
              filterable
              :options="projectFilterOptions"
              v-model:value="filterProject"
              label-field="name"
              key-field="name"
              placeholder="请选择项目"
              @update:value="handleProjectFilter"
              clearable
            />
          </n-form-item>
        </div>
        <n-space>
          <n-button @click="">添加资产</n-button>
          <n-button @click="showImport = true">批量导入</n-button>
          <n-button @click="">导出报表</n-button>
        </n-space>
      </n-space>
      <n-data-table
        :style="{ height: '700px' }"
        :scroll-x="2400"
        :columns="columns"
        :data="data"
        :pagination="pagination"
        :loading="loading"
        :row-props="rowProps"
        :bordered="false"
        :render-cell="renderCell"
        @update:page="handlePageChange"
        flex-height
        remote
      />
    </n-space>
    <import-assets-drawer :show="showImport" @update-show="updateShowImport" />
  </div>
</template>

<script lang="ts" setup>
  import { h, onMounted, reactive, ref } from 'vue'
  import ImportAssetsDrawer from './import-assets-drawer.vue'
  import { DataTableColumns, NText } from 'naive-ui'
  import { getAssetList, getProjectList, getFilterAssetList } from '@/api/asset'
  import { getTreeDataTable } from '@/utils/form'

  type RowData = {
    uuid: string
    serial: string
    name: string
    projectName: string
    sonProjectName: string
    partProjectName: string
    type: string
    kind: string
    subDistrict: string
    brand: string
    specs: string
    unit: string
    value: number
    address: string
    iotNetSerial: string
    emeterSerial: string
  }

  const columns: DataTableColumns<RowData> = [
    {
      title: 'UUID',
      key: 'uuid',
      fixed: 'left',
      width: '180',
      ellipsis: {
        tooltip: true
      }
    },
    {
      title: '资产编号',
      key: 'serial',
      fixed: 'left',
      width: '180',
      ellipsis: {
        tooltip: true
      }
    },
    {
      title: '资产名称',
      key: 'name',
      fixed: 'left',
      width: '200'
    },
    {
      title: '所属项目',
      key: 'projectName',
      width: '300'
    },
    {
      title: '所属子项目',
      key: 'sonProjectName'
    },
    {
      title: '所属分部',
      key: 'partProjectName'
    },
    {
      title: '资产类别',
      key: 'type'
    },
    {
      title: '资产属性',
      key: 'kind'
    },
    {
      title: '所处街道',
      key: 'subDistrict'
    },
    {
      title: '品牌',
      key: 'brand'
    },
    {
      title: '型号',
      key: 'specs'
    },
    {
      title: '单位',
      key: 'unit'
    },
    {
      title: '价值',
      key: 'value'
    },
    {
      title: '地址',
      key: 'address',
      width: '300',
      ellipsis: {
        tooltip: true
      }
    },
    {
      title: '物联网卡 / 网络开户号',
      key: 'iotNetSerial',
      width: '200'
    },
    {
      title: '电表号',
      key: 'emeterSerial'
    }
  ]

  const showImport = ref(false)
  const updateShowImport = async () => {
    showImport.value = false
    await fetch()
  }

  const data = ref<RowData[]>()
  const loading = ref(true)
  const showDetail = ref(false)
  const selectItem = ref<RowData>()
  const pagination = reactive({
    page: 1,
    pageCount: 1,
    pageSize: 20,
    itemCount: 0,
    prefix({ itemCount }: any) {
      return `总计 ${itemCount}`
    }
  })

  const savedProjects = ref()
  const projectFilterOptions = ref(null)
  const filterProject = ref()

  const handleProjectFilter = async (v: any) => {
    const p = savedProjects.value.find((item: any) => item.name == v)
    await fetch({
      name: p.name,
      level: p.level
    })
  }

  const renderCell = (value: string | number) => {
    if (!value) return h(NText, { depth: 3 }, { default: () => '-' })
    return value
  }

  const handlePageChange = async (currentPage: number) => {
    loading.value = true
    pagination.page = currentPage
    await fetch()
  }

  const rowProps = (row: RowData) => {
    return {
      style: 'cursor:pointer;',
      onClick: () => {
        selectItem.value = row
        showDetail.value = true
      }
    }
  }

  const fetch = async (query = {}) => {
    let res
    if (filterProject.value) {
      res = await getFilterAssetList({
        page: pagination.page - 1,
        pageSize: pagination.pageSize,
        ...query
      })
    } else {
      res = await getAssetList({
        page: pagination.page - 1,
        pageSize: pagination.pageSize
      })
    }
    data.value = res.data.assets
    pagination.pageCount = Math.ceil(res.data.total / 10)
    pagination.itemCount = res.data.total
    if (!projectFilterOptions.value) {
      const projectListRes = await getProjectList({
        page: 0,
        pageSize: 20
      })
      savedProjects.value = projectListRes.data.projects
      projectFilterOptions.value = getTreeDataTable(
        projectListRes.data.projects
      )
    }
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
