<script lang="ts" setup>
import * as turf from '@turf/turf'
import type { Feature } from 'geojson'
import { c04Point } from '~/composables/store'

//
const draw = window.draw
const map = window.map

const taskList = ref({
  警戒区: false,
})

const 警戒区大小 = ref(100)
const 其他警戒区大小 = ref(100)

// computed
const polygonList = computed(() => {
  if (polygonFeatureCollection)
    return polygonFeatureCollection.value[0]?.features

  else
    return []
})
const handleStart = () => {
  map.flyTo({
    center: c04Point,
  })
  if (map.getLayer('layer-with-pulsing-dot'))
    map.removeLayer('layer-with-pulsing-dot')

  if (map.getSource('dot-point'))
    map.removeSource('dot-point')

  map.addSource('dot-point', {
    type: 'geojson',
    data: {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'Point',
            coordinates: c04Point, // icon position [lng, lat]
          },
        },
      ],
    },
  })
  map.addLayer({
    id: 'layer-with-pulsing-dot',
    type: 'symbol',
    source: 'dot-point',
    layout: {
      'icon-image': 'pulsing-dot',
    },
  })
}

const getAllPolygon = () => {
  const all = draw.getAll()
  polygonFeatureCollection.value = [all]
}
const handleSetCircle = () => {
  if (!taskList.value.警戒区) {
    const point = turf.point(c04Point)
    const circleFeature = turf.buffer(point, 警戒区大小.value, { units: 'meters' })
    circleFeature.properties = {
      type: '警戒区',
      center: c04Point,
      isCircle: true,
      radiusInKm: 警戒区大小.value / 1000,
    }
    draw.add(circleFeature)
    // const 警戒区feature = draw.get(featureIds[0])!
    // polygonList.value.push(警戒区feature)
    taskList.value.警戒区 = true
    getAllPolygon()
  // draw.changeMode('draw_circle', { initialRadiusInKm: 0.5 })
  }
}
const handleAddCircle = () => {
  draw.changeMode('draw_circle', { initialRadiusInKm: 其他警戒区大小.value / 1000 })
}
const handleDelPolygonById = (item: Feature) => {
  if (item.id) {
    draw.delete(item.id.toString())
    if (item.properties!.type === '警戒区')
      taskList.value.警戒区 = false
  }
}
const formatter = (value: any) => {
  return `${Math.round(value)}米`
}
onMounted(() => {
  // 加载draw
  if (polygonFeatureCollection.value[0]) {
    console.log(polygonFeatureCollection.value)
    draw.set(polygonFeatureCollection.value[0])
    const has警戒区 = polygonFeatureCollection.value[0].features.some(m => m.properties!.type === '警戒区')
    if (has警戒区)
      taskList.value.警戒区 = true
  }

  // 加载监听
  map.on('draw.create', getAllPolygon)
  map.on('draw.update', getAllPolygon)
  map.on('draw.delete', getAllPolygon)
})
</script>

<template>
  <div class="p-2">
    <div class="p-2 border border-[var(--color-neutral-3)] text-center cursor-pointer">
      {{ drawMode }}
    </div>
    <div class="p-2 border border-[var(--color-neutral-3)] text-center cursor-pointer" @click="handleStart()">
      开始作画C04
    </div>
    <div class="mt-20px flex flex-col">
      <div class="p-2 border border-[var(--color-neutral-3)] mt-2 text-center">
        <div class="cursor-pointer" @click="handleSetCircle()">
          设置警戒区
        </div>
        <a-slider v-model="警戒区大小" :max="1000" :style="{ width: '200px' }" :format-tooltip="formatter" show-input />
      </div>
      <div class="p-2 border border-[var(--color-neutral-3)] mt-2 text-center">
        <div class="cursor-pointer" @click="handleAddCircle()">
          添加其他警戒区
        </div>
        <a-slider v-model="其他警戒区大小" :max="1000" :style="{ width: '200px' }" :format-tooltip="formatter" show-input />
      </div>
      <div class="p-2 border border-[var(--color-neutral-3)] mt-2 text-center">
        <div class="cursor-pointer" @click="getAllPolygon()">
          获取全部
        </div>
      </div>
    </div>
    <div class="mt-5">
      <a-list>
        <template #header>
          图层
        </template>
        <a-list-item v-for="(item) in polygonList" :key="item.id">
          <a-list-item-meta
            :title="`${item.properties!.radiusInKm * 1000}米`"
            :description="item.properties!.type"
          >
            <template #avatar>
              <a-avatar shape="square">
                <img
                  alt="avatar"
                  src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp"
                >
              </a-avatar>
            </template>
          </a-list-item-meta>
          <template #actions>
            <icon-edit />
            <icon-delete @click="handleDelPolygonById(item)" />
          </template>
        </a-list-item>
      </a-list>
    </div>
  </div>
</template>
