<script lang="ts" setup>
import * as turf from '@turf/turf'
import { c04Point } from '~/composables/store'

const handleStart = () => {
  const map = window.map
  window.map.flyTo({
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
const handleSetCircle = () => {
  //
  const draw = window.draw
  const point = turf.point(c04Point)
  const circleFeature = turf.buffer(point, 500, { units: 'meters' })
  const featureIds = draw.add(circleFeature)
  console.log(featureIds)
  // draw.changeMode('draw_circle', { initialRadiusInKm: 0.5 })
}
</script>

<template>
  <div class="p-2">
    <div class="p-2 border text-center cursor-pointer" @click="handleStart()">
      开始作画C04
    </div>
    <div class="mt-20px flex justify-evenly">
      <div class="p-2 border w-10 h-10 text-center cursor-pointer" @click="handleSetCircle()">
        设置警戒区
      </div>
      <div class="p-2 border w-10 h-10 text-center cursor-pointer">
        线
      </div>
      <div class="p-2 border w-10 h-10 text-center cursor-pointer">
        点
      </div>
    </div>
  </div>
</template>
