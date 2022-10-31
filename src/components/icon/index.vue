<template>
  <i ref="iconRef" :class="iconClass" :style="styles" :data-icon="name"></i>
</template>

<script lang="ts" setup>
  import { computed, onMounted, ref, watch } from 'vue'
  import Iconify from '../../../node_modules/@purge-icons/generated'

  export interface IconProps {
    name: string
    size?: number | string
    spin?: boolean
    color?: string
  }

  const iconRef = ref<Nullable<HTMLElement>>(null)

  const props = withDefaults(defineProps<IconProps>(), {
    size: 16,
    spin: false
  })

  const fontSize = computed(() => `${props.size}px`)

  const styles = computed(() => ({
    fontSize: fontSize.value,
    color: props.color ? props.color : 'inherit'
  }))

  const iconClass = computed(() => ({
    'fiber-icon': true,
    'fiber-icon-spin': props.spin
  }))

  watch(
    () => props.name,
    () => {
      update()
    },
    { flush: 'post' }
  )

  const update = async () => {
    const el = iconRef.value as Element
    if (el) {
      const svg = Iconify.renderSVG(props.name, {})
      if (svg) {
        el.textContent = ''
        el.appendChild(svg)
      } else {
        const span = document.createElement('span')
        span.className = 'iconify'
        span.dataset.icon = props.name
        el.textContent = ''
        el.appendChild(span)
      }
    }
  }

  onMounted(() => {
    update()
  })
</script>
