<script setup lang="ts">
import mapboxgl from 'mapbox-gl'
import MapboxDraw from '@mapbox/mapbox-gl-draw'

import { mapStyle } from '~/constant/map'
import 'mapbox-gl/dist/mapbox-gl.css'
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css'
import { collapsed } from '~/composables/store'
import { mapLoad } from '~/composables/mapLoad'

import DrawLineString from '~/draw/linestring'
import DrawRectangle from '~/draw/rectangle'

import drawStyles from '~/draw/styles'

const keys = useMagicKeys()

mapboxgl.accessToken
  = 'pk.eyJ1IjoibGFuc2VyaWEiLCJhIjoiY2wxMGo5ZWk3MTF3dTNkcnRwcDMyMXowOSJ9.kxLDvTThtaU0uiBOXanNvA'

let map: mapboxgl.Map | null = null
const mapContainer = ref()

const drawing = false

const updateMap = () => {
  //
}

onMounted(() => {
  map = new mapboxgl.Map({
    container: mapContainer.value,
    style: mapStyle,
    center: c04Point,
    zoom: 15,
  })
  window.map = map

  const draw = new MapboxDraw({
    displayControlsDefault: false,
    userProperties: true,
    modes: {
      ...MapboxDraw.modes,
      draw_line_string: DrawLineString,
      draw_rectangle: DrawRectangle,
    },
    styles: drawStyles,
  })
  window.draw = draw

  map.addControl(new mapboxgl.NavigationControl())
  map.addControl(draw, 'top-left')
  // map.addControl(new window.MapboxLanguage({ defaultLanguage: "zh-Hans" }));

  map.on('load', () => {
    mapLoad()
    updateMap()
  })
  map.on('draw.create', (e) => {
    pushPolygon(e.features[0])
    draw.deleteAll()
  })
})
whenever(() => keys.Delete.value || keys.Backspace.value, () => {
  console.warn('esc/Backspace have been pressed')
  window.draw.trash()
})
const handleCollapsed = () => {
  if (drawing)
    console.warn('drawing')

  collapsed.value = !collapsed.value
  setTimeout(() => {
    window.map.resize()
  }, 300)
}
</script>

<template>
  <div
    ref="mapContainer"
    class="h-full w-full top-0 bottom-0 left-0 right-0 relative"
  >
    <div class="sidebar-handle absolute right-0 bottom-9 px-4 py-1 bg-dark cursor-pointer hidden md:block z-10" @click="handleCollapsed()">
      <div v-if="collapsed" class="i-carbon:caret-right" />
      <div v-else class="i-carbon:caret-left" />
    </div>
  </div>
</template>
