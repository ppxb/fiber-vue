<template>
  <n-drawer v-model:show="show" :width="600" :on-update:show="updateShow">
    <n-drawer-content :header-style="headerStyle" :body-style="bodyStyle">
      <template #header>
        <div class="flex color-[#333] text-3xl font-700 mb-16">新增职员</div>
        <div class="color-[#666] text-4">
          添加新职员至少需要设置基础信息，岗位和部门。
        </div>
      </template>
      <n-collapse
        arrow-placement="right"
        :default-expanded-names="['1', '2', '3', '4']"
      >
        <n-form ref="formRef" :model="modelRef" :rules="rules" size="large">
          <n-collapse-item name="1">
            <template #header>
              <div class="text-4 font-700">基本信息</div>
            </template>

            <n-form-item path="name" label="姓名">
              <n-input
                v-model:value="modelRef.name"
                placeholder="请输入员工的真实姓名"
              />
            </n-form-item>
            <n-form-item path="mobile" label="手机号码">
              <n-input
                v-model:value="modelRef.mobile"
                maxlength="11"
                :allow-input="onlyAllowNumber"
                placeholder="请输入员工的手机号码"
              />
            </n-form-item>
            <n-form-item path="email" label="电子邮箱" :show-feedback="false">
              <n-input v-model:value="modelRef.email" disabled />
            </n-form-item>
            <div class="mt-2 color-[#666]">
              该职员的电子邮箱和初始密码由系统自动生成
            </div>
          </n-collapse-item>
          <n-collapse-item name="2">
            <template #header>
              <div class="text-4 font-700">部门岗位</div>
            </template>
            <n-form-item label="部门信息">
              <n-select
                v-model:value="modelRef.dept"
                :options="deptOptions"
                placeholder="请选择职员的部门"
              />
            </n-form-item>
            <n-form-item label="岗位信息" v-if="modelRef.dept">
              <n-select
                v-model:value="modelRef.role"
                :options="roleOptions"
                placeholder="请选择职员的部门"
              />
            </n-form-item>
          </n-collapse-item>
        </n-form>
      </n-collapse>
    </n-drawer-content>
  </n-drawer>
</template>

<script lang="ts" setup>
  import { FormRules } from 'naive-ui'
  import { ref, watch } from 'vue'
  import { generateEmail, onlyAllowNumber } from '@/utils'

  const props = defineProps({
    show: {
      type: Boolean,
      retuired: true
    }
  })

  interface ModelType {
    name: string | null
    mobile: string | null
    email: string | null
    dept: string | null
    role: string | null
  }

  const modelRef = ref<ModelType>({
    name: null,
    mobile: null,
    email: generateEmail(),
    dept: null,
    role: null
  })

  const rules: FormRules = {
    name: [
      {
        required: true,
        message: '该项为必填项'
      }
    ],
    mobile: [
      {
        required: true,
        message: '该项为必填项，手机号码不能超过11位'
      }
    ]
  }

  const deptOptions = [
    {
      label: '技术支持部',
      value: '1'
    },
    {
      label: '招商运营部',
      value: '2'
    }
  ]

  const roleOptions = [
    {
      label: '部长',
      value: '2-1'
    },
    {
      label: '副部长',
      value: '2-2'
    },
    {
      label: '资产管理岗',
      value: '2-3'
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
    font-weight: 700;
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
    font-weight: 700;
  }
</style>
