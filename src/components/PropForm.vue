<script lang="ts" setup>
import { TypeEnum, TypeEnumMap, currentProperties } from '~/composables/store'
const isShowForm = computed(() => {
  return currentProperties.value !== null
})
</script>

<template>
  <div class="p-5">
    <a-form v-if="isShowForm" :model="currentProperties" layout="vertical">
      <a-form-item field="type" label="要素类型">
        <a-input disabled :model-value="TypeEnumMap[currentProperties.type as TypeEnum]" />
      </a-form-item>
      <a-form-item v-if="currentProperties.radius" field="radius" label="半径(米)">
        <a-input-number v-model="currentProperties.radius" placeholder="请输入半径" mode="button" />
      </a-form-item>
      <a-form-item>
        <a-button>更新</a-button>
      </a-form-item>
    </a-form>
    <div v-else>
      请选择元素
    </div>
  </div>
</template>
