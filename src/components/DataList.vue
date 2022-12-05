<script lang="ts" setup>
import { TypeEnum } from '~/composables/store'

const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
  },
  {
    title: '要素类型',
    dataIndex: 'propType',
  },
  {
    title: '形状',
    dataIndex: 'type',
  },
]
const data = computed(() => {
  if (mapFeatureCollection.value.length === 0)
    return []

  const crtMapFeatureCollection = mapFeatureCollection.value[0]
  const editableCollection = crtMapFeatureCollection.features.filter(item => item.properties!.type !== TypeEnum.初始化点)
  return editableCollection.map((item) => {
    return {
      id: item.properties!.id,
      type: item.geometry.type,
      propType: TypeEnumMap[item.properties!.type as TypeEnum],
      center: item.properties!.center,
    }
  })
})

const handleRowClick = (record: any) => {
  const map = window.map
  setTimeout(() => {
    map.flyTo({
      center: record.center as any,
      zoom: 17,
    })
  })
}
</script>

<template>
  <div>
    <a-table :columns="columns" :data="data" @row-click="handleRowClick" />
  </div>
</template>
