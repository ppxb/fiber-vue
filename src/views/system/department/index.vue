<template>
  <div>
    <n-space vertical :size="12">
      <n-space justify="end">
        <n-button @click="showAdd = true">新增部门</n-button>
      </n-space>
      <n-data-table
        :columns="createColumns()"
        :data="departments"
        :loading="loading"
        :row-props="rowProps"
        :bordered="false"
        remote
      />
    </n-space>
    <add-department-drawer :show="showAdd" @update-show="updateShowAdd" />
  </div>
</template>

<script lang="ts" setup>
  import { h, onMounted, reactive, ref } from 'vue'
  import { RowData } from 'naive-ui/es/data-table/src/interface'
  import addDepartmentDrawer from './add-department-drawer.vue'
  import { NAvatar, NAvatarGroup } from 'naive-ui'

  const showAdd = ref(false)

  const updateShowAdd = () => (showAdd.value = false)

  const createColumns = () => {
    return [
      {
        title: 'UUID',
        key: 'uuid',
        width: 400
      },
      {
        title: '部门名称',
        key: 'name',
        width: 300
      },
      {
        title: '序号',
        key: 'sort'
      },
      {
        title: '层级',
        key: 'level'
      },
      {
        title: '负责人',
        key: 'leader',
        render(row) {
          const { leader } = row
          return h(
            NAvatar,
            {
              round: true,
              size: 38,
              color: leader.color
            },
            {
              default: () => leader.name
            }
          )
        }
      },
      {
        title: '成员',
        key: 'member',
        render(row) {
          const { member } = row
          return h(NAvatarGroup, {
            options: member,
            size: 38,
            max: 4
          })
        }
      },

      {
        title: '创建时间',
        key: 'createAt'
      }
    ]
  }

  const departments = [
    {
      name: '成都经开园区投资有限公司',
      key: 'jkyq',
      sort: 0,
      level: '公司级',
      leader: {
        name: '杨菲',
        color: '#6366f1'
      },
      createAt: '2022-11-11T09:23:04+08:00',
      uuid: 'c08a4b7e-00c6-46b9-b474-00a31179c9f9'
    },
    {
      name: '智慧事业部',
      key: 'zhsyb',
      sort: 1,
      level: '部门级',
      leader: {
        name: '陈善麓',
        color: '#3b82f6'
      },
      member: [
        {
          name: '张三',
          src: 'https://img2.woyaogexing.com/2022/11/10/2352819e68392bb0!400x400.jpg'
        },
        {
          name: '王五',
          src: 'https://img2.woyaogexing.com/2022/11/10/5ffbc309c80627ab!400x400.jpg'
        },
        {
          name: '王五',
          src: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Finews.gtimg.com%2Fnewsapp_bt%2F0%2F12917180531%2F1000&refer=http%3A%2F%2Finews.gtimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1670720997&t=a1f131da91563743d98172024dff959b'
        }
      ],
      createAt: '2022-11-11T09:23:04+08:00',
      uuid: 'c08a4b7e-00c6-46b9-b474-00a31179c9f9'
    },
    {
      name: '招商运营部',
      key: 'zhsyb',
      sort: 1,
      level: '部门级',
      leader: {
        name: '潘乐',
        color: '#3b82f6'
      },
      member: [
        {
          name: '张三',
          src: 'https://img2.woyaogexing.com/2022/11/10/92fb06263fbec231!400x400.jpg'
        },
        {
          name: '王五',
          src: 'https://img2.woyaogexing.com/2022/11/09/4b2d06b907bd6c4d!400x400.jpg'
        },
        {
          name: '王五',
          src: 'https://img2.woyaogexing.com/2022/11/09/0bc9f47186285e58!400x400.jpg'
        }
      ],
      createAt: '2022-11-11T09:23:04+08:00',
      uuid: 'c08a4b7e-00c6-46b9-b474-00a31179c9f9'
    },

    {
      name: '成都经开数字城市运营管理有限公司',
      key: 'jkyq',
      sort: 0,
      level: '公司级',
      leader: {
        name: '杨菲',
        color: '#6366f1'
      },
      createAt: '2022-11-11T09:23:04+08:00',
      uuid: 'c08a4b7e-00c6-46b9-b474-00a31179c9f9'
    },
    {
      name: '数字项目部',
      key: 'zhsyb',
      sort: 1,
      level: '部门级',
      leader: {
        name: '张林军',
        color: '#3b82f6'
      },
      member: [
        {
          name: '张三',
          src: 'https://img2.woyaogexing.com/2022/11/09/b781ee7b224dc4c9!400x400.jpg'
        },
        {
          name: '王五',
          src: 'https://img2.woyaogexing.com/2022/11/09/8fc352a0cc0f8e16!400x400.jpg'
        },
        {
          name: '王五',
          src: 'https://img2.woyaogexing.com/2022/11/09/d978cf92a887feda!400x400.jpg'
        },
        {
          name: '张三',
          src: 'https://img2.woyaogexing.com/2022/11/09/932da674f5cd33fa!400x400.jpg'
        },
        {
          name: '王五',
          src: 'https://img2.woyaogexing.com/2022/11/09/7c8b6ba329005b44!400x400.jpg'
        },
        {
          name: '王五',
          src: 'https://img2.woyaogexing.com/2022/11/09/c180210202902e5d!400x400.jpg'
        },
        {
          name: '王五',
          src: 'https://img2.woyaogexing.com/2022/11/08/16efd3f7648471bd!400x400.jpg'
        }
      ],
      createAt: '2022-11-11T09:23:04+08:00',
      uuid: 'c08a4b7e-00c6-46b9-b474-00a31179c9f9'
    }
  ]

  const data = ref([])
  const loading = ref(false)
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

  // const handlePageChange = async (currentPage: number) => {
  //   loading.value = true
  //   const res = await list({
  //     page: currentPage
  //   })
  //   pagination.page = currentPage
  //   data.value = res.data.list
  //   loading.value = false
  // }

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
