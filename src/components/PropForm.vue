<script lang="ts" setup>
import * as turf from '@turf/turf'
import { TypeEnum, TypeEnumMap, currentProperties } from '~/composables/store'
const isShowForm = computed(() => {
  return currentProperties.value !== null
})
const handleUpdate = () => {
  // 查询当前ID的feature
  const featureIdx = mapFeatureCollection.value[0].features.findIndex(item => item.properties!.id === currentProperties.value.id)
  if (featureIdx >= 0) {
    let polygon = mapFeatureCollection.value[0].features[featureIdx]
    if (currentProperties.value.type === TypeEnum.警戒区) {
      polygon = turf.buffer(turf.point(c04Point.value), currentProperties.value.radius, {
        units: 'meters',
      })
    }
    // 所有属性重新赋值
    polygon.properties = {
      ...currentProperties.value,
    }
    mapFeatureCollection.value[0].features[featureIdx] = polygon
  }
  else { console.warn('找不到该geojson') }

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
      <a-form-item v-if="currentProperties['fill-color']" field="fill-color" label="填充颜色">
        <input v-model="(currentProperties['fill-color'])" type="color">
      </a-form-item>
      <a-form-item v-if="currentProperties['fill-opacity']" field="fill-opacity" label="填充透明度">
        <a-slider v-model="(currentProperties['fill-opacity'])" :style="{ display: 'flex' }" :min="0.1" :max="1" :step="0.1" show-input />
      </a-form-item>

      <a-form-item v-if="currentProperties['line-color']" field="line-color" label="线条颜色">
        <input v-model="(currentProperties['line-color'])" type="color">
      </a-form-item>
      <a-form-item v-if="currentProperties['line-opacity']" field="line-opacity" label="线条透明度">
        <a-slider v-model="(currentProperties['line-opacity'])" :style="{ display: 'flex' }" :min="0.1" :max="1" :step="0.1" show-input />
      </a-form-item>
      <a-form-item v-if="currentProperties['line-width']" field="line-width" label="线条宽度">
        <a-slider v-model="(currentProperties['line-width'])" :style="{ display: 'flex' }" :min="1" :max="10" :step="1" show-input />
      </a-form-item>

      <a-form-item v-if="currentProperties['icon-size']" field="icon-size" label="图标大小">
        <a-slider v-model="(currentProperties['icon-size'])" :style="{ display: 'flex' }" :min="0.1" :max="1" :step="0.1" show-input />
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
