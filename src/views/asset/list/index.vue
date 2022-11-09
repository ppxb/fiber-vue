<template>
  <div>
    <n-space vertical :size="12">
      <n-space justify="space-between">
        <div>
          <n-dropdown
            :options="projectFilterOptions"
            placement="bottom-start"
            trigger="click"
            label-field="name"
            key-field="name"
            @select="handleProjectSelect"
          >
            <n-button>项目筛选</n-button>
          </n-dropdown>
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
  import { RowData } from 'naive-ui/es/data-table/src/interface'
  import ImportAssetsDrawer from './import-assets-drawer.vue'
  import { DataTableColumns, NText } from 'naive-ui'
  import { getAssetList, getProjectList } from '@/api/asset'
  import { getTreeDataTable } from '@/utils/form'

  const columns: DataTableColumns = [
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
  const updateShowImport = () => (showImport.value = false)

  const data = ref([])
  const loading = ref(true)
  const showDetail = ref(false)
  const selectItem = ref<RowData>({})
  const pagination = reactive({
    page: 1,
    pageCount: 1,
    pageSize: 20,
    itemCount: 0,
    prefix({ itemCount }: any) {
      return `总计 ${itemCount}`
    }
  })

  const projectFilterOptions = ref(null)

  const renderCell = (value: string | number) => {
    if (!value) return h(NText, { depth: 3 }, { default: () => '-' })
    return value
  }

  const handleProjectSelect = async (key: string) => {
    await fetch({
      name: key
    })
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

  type queryData = {
    name: string
  }

  const fetch = async (query = {} as queryData) => {
    const res = await getAssetList({
      page: pagination.page - 1,
      pageSize: pagination.pageSize,
      query
    })
    data.value = res.data.assets
    pagination.pageCount = Math.ceil(res.data.total / 10)
    pagination.itemCount = res.data.total
    if (!projectFilterOptions.value) {
      const projectListRes = await getProjectList({
        page: 0,
        pageSize: 20
      })
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
