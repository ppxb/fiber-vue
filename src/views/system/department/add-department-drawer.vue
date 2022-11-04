<template>
  <n-drawer v-model:show="show" :width="400" :on-update:show="updateShow">
    <n-drawer-content :header-style="headerStyle" :body-style="bodyStyle">
      <template #header>
        <div class="flex color-[#333] text-3xl font-700 mb-16">新增部门</div>
        <div class="color-[#666] text-4">
          添加新部门至少需要设置相关的基础信息。
        </div>
      </template>
      <n-collapse arrow-placement="right" :default-expanded-names="['1']">
        <n-form ref="formRef" :model="modelRef" :rules="rules" size="large">
          <n-collapse-item name="1">
            <template #header>
              <div class="text-4 font-700">基本信息</div>
            </template>

            <n-form-item path="name" label="部门名称">
              <n-input
                v-model:value="modelRef.name"
                placeholder="请输入部门名称"
              />
            </n-form-item>
            <n-form-item path="level" label="部门层级">
              <n-select
                v-model:value="modelRef.level"
                :options="departmentOptions"
                placeholder="请选择部门所属层级"
              />
            </n-form-item>
            <div class="color-[#666] mb-4">
              目前还未开放项目级部门或组织的新增规则。
            </div>
            <n-form-item path="level" label="上级部门">
              <n-select
                v-model:value="modelRef.parentId"
                :options="parentOptions"
                placeholder="请选择上级部门"
              />
            </n-form-item>
            <n-form-item label="部门负责人" :show-feedback="false">
              <n-select
                v-model:value="modelRef.headerId"
                :options="headOptions"
                :render-label="renderLabel"
                :render-tag="renderSingleSelectTag"
                placeholder="请选择部门负责人"
                filterable
                clearable
              >
                <template #empty>
                  <div class="text-4 color-[#666]">抱歉，没有找到相关数据</div>
                </template>
              </n-select>
            </n-form-item>
          </n-collapse-item>
        </n-form>
      </n-collapse>
      <div class="flex justify-end mt-8">
        <n-button
          class="mr-2"
          type="primary"
          color="#7047EB"
          size="large"
          @click="handleSubmit"
        >
          新增
        </n-button>
        <n-button
          type="primary"
          color="#dc2626"
          size="large"
          @click="resetReactive(modelRef)"
        >
          重置
        </n-button>
      </div>
    </n-drawer-content>
  </n-drawer>
</template>

<script lang="ts" setup>
  import { FormRules, NAvatar, NText } from 'naive-ui'
  import { h, reactive, ref, watch } from 'vue'
  import { resetReactive } from '@/utils'
  import { create as createDept } from '@/api/system'

  const props = defineProps({
    show: {
      type: Boolean,
      retuired: true
    }
  })

  interface ModelType {
    name: string | null
    level: number | null
    headerId: string | null
    parentId: string | null
  }

  const modelRef = reactive<ModelType>({
    name: null,
    level: null,
    headerId: null,
    parentId: null
  })

  const handleSubmit = async () => {
    const res = await createDept({
      ...modelRef,
      ...{
        headerId: modelRef.headerId || '',
        parentId: modelRef.parentId || ''
      }
    })
    updateShow()
    resetReactive(modelRef)
  }

  const headOptions = [
    {
      label: '陈善麓',
      desc: '副部长',
      value: 'sa1da5s4d6asd',
      avatar:
        'https://img2.woyaogexing.com/2022/07/06/27a8b19270dcc2f9!400x400.jpg'
    },
    {
      label: '潘乐',
      desc: '部长',
      value: 'sa1da524d6asd',
      avatar:
        'https://img2.woyaogexing.com/2022/07/05/51c7c0b9a3514dac!400x400.jpg'
    },
    {
      label: '陈孝国',
      desc: '资产管理岗',
      value: 'ssdda524d6asd',
      avatar:
        'https://img2.woyaogexing.com/2022/06/12/486ebe52e53d5f45!400x400.jpg'
    }
  ]

  const parentOptions = [
    {
      label: '成都经开园区投资有限公司',
      value: 'sa1da5s4d6asd'
    },
    {
      label: '成都经开数运城市运营管理有限公司',
      value: 'sda21312321as'
    }
  ]

  const renderLabel = (option: any) => {
    return h(
      'div',
      {
        style: {
          display: 'flex',
          alignItems: 'center'
        }
      },
      [
        h(NAvatar, {
          src: option.avatar,
          round: true,
          size: 'medium'
        }),
        h(
          'div',
          {
            style: {
              marginLeft: '12px',
              padding: '4px 0'
            }
          },
          [
            h('div', null, [option.label as string]),
            h(NText, { depth: 3, tag: 'div' }, { default: () => option.desc })
          ]
        )
      ]
    )
  }

  const renderSingleSelectTag = ({ option }: any) => {
    return h(
      'div',
      {
        style: {
          display: 'flex',
          alignItems: 'center'
        }
      },
      [
        h(NAvatar, {
          src: option.avatar,
          round: true,
          size: 24,
          style: {
            marginRight: '12px'
          }
        }),
        option.label as string
      ]
    )
  }

  const rules: FormRules = {
    name: [
      {
        required: true,
        message: '该项为必填项'
      }
    ],
    level: [
      {
        required: true,
        message: '该项为必选项'
      }
    ]
  }

  const departmentOptions = [
    {
      label: '公司级',
      value: 1
    },
    {
      label: '部门级',
      value: 2
    },
    {
      label: '项目级',
      value: 3,
      disabled: true
    }
  ]

  const emit = defineEmits(['update-show'])

  const show = ref(props.show)

  const updateShow = () => {
    show.value = false
    emit('update-show', false)
  }

  watch(
    () => props.show,
    () => (show.value = props.show)
  )

  const headerStyle = {
    border: 'none',
    padding: '24px 48px 16px 48px'
  }

  const bodyStyle = {
    padding: '0 24px'
  }
</script>

<style scoped>
  :deep(.n-form-item .n-form-item-label) {
    font-size: 1rem;
    font-weight: 600;
    margin-bottom: 4px;
  }

  :deep(.n-input .n-input__input-el) {
    font-weight: 600;
  }

  :deep(.n-input) {
    border-radius: 10px;
  }

  :deep(.n-base-selection__border) {
    border-radius: 10px;
  }
  :deep(.n-base-selection) {
    border-radius: 10px;
    font-weight: 600;
  }

  :deep(.n-base-selection-placeholder__inner) {
    font-weight: 100;
  }

  :deep(.n-base-selection-overlay__wrapper) {
    font-weight: 100;
  }

  :deep(.n-base-selection-overlay__wrapper div) {
    font-weight: 600;
  }

  :deep(.n-button) {
    border-radius: 12px;
  }
</style>
