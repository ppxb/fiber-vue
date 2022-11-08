<template>
  <n-drawer v-model:show="show" :width="400" :on-update:show="updateShow">
    <n-drawer-content :header-style="headerStyle" :body-style="bodyStyle">
      <template #header>
        <div class="flex color-[#333] text-3xl font-700 mb-16">新增项目</div>
        <div class="color-[#666] text-4">
          添加新项目至少需要设置相关的基础信息。
        </div>
      </template>
      <n-collapse arrow-placement="right" :default-expanded-names="['1']">
        <n-form ref="formRef" :model="modelRef" :rules="rules" size="large">
          <n-collapse-item name="1">
            <template #header>
              <div class="text-4 font-700">基本信息</div>
            </template>

            <n-form-item path="name" label="项目名称">
              <n-input
                v-model:value="modelRef.name"
                placeholder="请输入项目名称"
              />
            </n-form-item>
            <n-form-item path="parent" label="上级项目" :show-feedback="false">
              <n-tree-select
                v-model:value="modelRef.parentProjectId"
                :options="parentOptions"
                label-field="name"
                key-field="uuid"
                placeholder="请选择上级项目"
              >
                <template #empty>
                  <div class="text-4 color-[#666]">
                    抱歉，没有找到相关项目或无项目
                  </div>
                </template>
              </n-tree-select>
            </n-form-item>
            <div class="color-[#666] mt-4">
              若未选择上级项目或无上级项目，则建立顶级项目。
            </div>
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
  import { FormRules } from 'naive-ui'
  import { reactive, ref, watch } from 'vue'
  import { resetReactive } from '@/utils'
  import { createProject } from '@/api/asset'
  import { projectReq } from '@/api/asset/types'

  const props = defineProps({
    show: {
      type: Boolean,
      retuired: true
    },
    data: {
      type: Object,
      required: true
    },
    update: {
      type: Function,
      required: true
    }
  })

  const modelRef = reactive<projectReq>({
    name: null,
    parentProjectId: null
  })

  const handleSubmit = async () => {
    await createProject({
      ...modelRef,
      ...{
        parentProjectId: modelRef.parentProjectId || ''
      }
    })
    updateShow()
    props.update()
  }

  const rules: FormRules = {
    name: [
      {
        required: true,
        message: '该项为必填项'
      }
    ]
  }

  const emit = defineEmits(['update-show'])

  const show = ref(props.show)
  const parentOptions = ref()

  const updateShow = () => {
    show.value = false
    resetReactive(modelRef)
    emit('update-show', false)
  }

  watch(
    () => props.show,
    () => (show.value = props.show)
  )

  watch(
    () => props.data,
    () => (parentOptions.value = props.data)
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
