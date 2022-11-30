<script lang="ts" setup>
import * as turf from '@turf/turf'
import { TypeEnum, TypeEnumMap, currentProperties } from '~/composables/store'
const isShowForm = computed(() => {
  return currentProperties.value !== null
})
const handleUpdate = () => {
  if (currentProperties.value.type === TypeEnum.警戒区) {
    const polygon = turf.buffer(turf.point(c04Point), currentProperties.value.radius, {
      units: 'meters',
    })
    polygon.properties = {
      'fill': 'rgba(255, 100, 100, 0.7)',
      'fill-opacity': 0.5,
      'stroke': 'rgba(255, 100, 100, 0.2)',
      'stroke-width': 2,
      'stroke-opacity': 3,
      'type': TypeEnum.警戒区,
      'radius': currentProperties.value.radius,
    }
    const featureIdx = mapFeatureCollection.value[0].features.findIndex(item => item.properties!.type === TypeEnum.警戒区)
    if (featureIdx >= 0)
      mapFeatureCollection.value[0].features[featureIdx] = polygon
    else
      console.warn('找不到警戒区')
  }
  reloadSource()
  // console.log(currentProperties.value)
}

const handleDelete = () => {
  //
  mapFeatureCollection.value[0].features = mapFeatureCollection.value[0].features.filter(item => item.properties!.id !== currentProperties.value.id)
  reloadSource()
  currentProperties.value = null
}
</script>

<template>
  <div class="p-5">
    <a-form v-if="isShowForm" :model="currentProperties" layout="vertical">
      <a-form-item field="type" label="要素类型">
        <a-input disabled :model-value="TypeEnumMap[currentProperties.type as TypeEnum]" />
      </a-form-item>
      <a-form-item v-if="currentProperties.id" field="id" label="ID">
        <a-input disabled :model-value="currentProperties.id " />
      </a-form-item>
      <a-form-item v-if="currentProperties.radius" field="radius" label="半径(米)">
        <a-input-number v-model="currentProperties.radius" placeholder="请输入半径" mode="button" />
      </a-form-item>
      <a-form-item>
        <ASpace>
          <a-button type="primary" @click="handleUpdate()">
            更新
          </a-button>
          <a-button status="danger" @click="handleDelete()">
            移除
          </a-button>
        </ASpace>
      </a-form-item>
    </a-form>
    <div v-else>
      请选择元素
    </div>
  </div>
</template>
