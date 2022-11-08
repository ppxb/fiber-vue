<template>
  <n-drawer v-model:show="show" :width="500" :on-update:show="updateShow">
    <n-drawer-content :header-style="headerStyle" :body-style="bodyStyle">
      <template #header>
        <div class="flex color-[#333] text-3xl font-700 mb-16">批量导入</div>
        <div class="color-[#666] text-4">批量导入目前只支持 Excel 格式。</div>
      </template>
      <n-collapse arrow-placement="right" :default-expanded-names="['1']">
        <n-collapse-item name="1">
          <template #header>
            <div class="text-4 font-700">导入数据</div>
          </template>
          <div class="font-700 color-red-700">
            * 请不要修改模板中的字段名称和工作簿名称，以免数据无法正确识别。
          </div>
          <div class="font-700 mb-4 color-red-700">
            * 上传文件不能大于 20MB。
          </div>
          <n-upload
            ref="modelRef"
            action="/api/asset/import"
            :max="1"
            :default-upload="false"
            response-type="json"
            @before-upload="beforeUpload"
          >
            <n-upload-dragger>
              <div class="mb-8">
                <n-icon size="48" :depth="3">
                  <upload-icon />
                </n-icon>
              </div>
              <n-text class="text-4"> 点击或者拖动文件到该区域来上传 </n-text>
              <n-p depth="3" class="mt-2">
                请按照模板中的要求完成批量上传，否则无法识别项目
              </n-p>
            </n-upload-dragger>
          </n-upload>
        </n-collapse-item>
      </n-collapse>
      <div class="flex justify-end mt-8">
        <n-button
          class="mr-2"
          color="#7047EB"
          size="large"
          @click="handleSubmit"
        >
          上传
        </n-button>
      </div>
    </n-drawer-content>
  </n-drawer>
</template>

<script lang="ts" setup>
  import { ref, watch } from 'vue'
  import { CloudUploadSharp as UploadIcon } from '@vicons/ionicons5'
  import { UploadFileInfo, UploadInst, useMessage } from 'naive-ui'

  const props = defineProps({
    show: {
      type: Boolean,
      retuired: true
    }
  })

  const message = useMessage()
  const modelRef = ref<UploadInst | null>(null)

  const handleSubmit = async () => {
    modelRef.value?.submit()
    updateShow()
  }

  const beforeUpload = async (data: {
    file: UploadFileInfo
    fileList: UploadFileInfo[]
  }) => {
    if (
      data.file.file?.type !=
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    ) {
      message.error('只能上传 xlsx 文件，请检查后重试')
      return false
    } else if (data.file.file?.size > 10 << 20) {
      message.error('文件大于20M，请拆分文件后上传')
      return false
    }
    return true
  }

  const emit = defineEmits(['update-show'])

  const show = ref(props.show)

  const updateShow = () => {
    show.value = false
    modelRef.value = null
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
  :deep(.n-button) {
    border-radius: 12px;
  }
</style>
