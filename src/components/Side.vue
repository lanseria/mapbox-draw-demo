<script lang="ts" setup>
import MonacoEditor from './MonacoEditor.vue'
import { activeTab, mapFeatureCollection } from '~/composables/store'
interface TabItem {
  label: string
  icon: string
  value: string
}
const tabList: TabItem[] = [
  {
    label: '编辑要素',
    icon: 'i-carbon:edit',
    value: 'edit',
  },
  {
    label: '数据',
    icon: 'i-carbon:data-table',
    value: 'data',
  },
  {
    label: 'JSON',
    icon: 'i-carbon:code',
    value: 'json',
  },
  {
    label: '帮助',
    icon: 'i-carbon:help',
    value: 'help',
  },
]

const code = computed({
  get() {
    return JSON.stringify(mapFeatureCollection.value, null, 2)
  },
  set(newValue) {
    mapFeatureCollection.value = JSON.parse(newValue)
  },
})
const handleActive = (item: TabItem) => {
  activeTab.value = item.value
}
</script>

<template>
  <div class="flex flex-col overflow-x-hidden box-border bg-dark relative">
    <div class="top border-b border-solid border-gray-200">
      <div class="buttons flex">
        <button v-for="item in tabList" :key="item.value" class="grow flex justify-center items-center" :class="{ 'bg-gray-7': activeTab === item.value }" :title="item.label" @click="handleActive(item)">
          <div class="inline-block" :class="item.icon" /><span>{{ item.label }}</span>
        </button>
      </div>
    </div>
    <div class="h-full">
      <PropForm v-if="activeTab === 'edit'" />
      <MonacoEditor v-if="activeTab === 'json'" v-model="code" />
      <DataList v-if="activeTab === 'data'" />
    </div>
  </div>
</template>

<style lang="css" scoped>
.top .buttons button {
  padding: 10px 15px;
  font-weight: normal;
  height: 40px;
  border: 0;
  vertical-align: top;
}
.buttons{
  height: 40px;
}
</style>
