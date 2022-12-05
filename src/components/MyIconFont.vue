<script>
</script>

<script setup>
import { Icon } from '@arco-design/web-vue'
defineProps({
  name: {
    type: String,
    required: true,
  },
  size: {
    type: Number,
    default: 20,
  },
})

const IconFont = Icon.addFromIconFontCn({ src: '//at.alicdn.com/t/c/font_3492252_q2l6lx8u5sn.js' })
</script>

<template>
  <IconFont :type="name" :size="size" />
</template>
