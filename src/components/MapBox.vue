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
import DrawCircle from '~/draw/circle'

import drawStyles from '~/draw/styles'

import ExtendDrawBar from '~/draw/extend_draw_bar'

const keys = useMagicKeys()
const esc = keys.esc

mapboxgl.accessToken
  = 'pk.eyJ1IjoibGFuc2VyaWEiLCJhIjoiY2wxMGo5ZWk3MTF3dTNkcnRwcDMyMXowOSJ9.kxLDvTThtaU0uiBOXanNvA'

let map: mapboxgl.Map | null = null
const mapContainer = ref()

let drawing = false

const updateMap = () => {
  //
}

onMounted(() => {
  map = new mapboxgl.Map({
    container: mapContainer.value,
    style: mapStyle,
    center: [122.1373164810982, 29.952575962927767],
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
      draw_circle: DrawCircle,
    },
    styles: drawStyles,
  })
  window.draw = draw

  const drawControl = new ExtendDrawBar({
    draw: window.draw,
    buttons: [
      {
        on: 'click',
        action: () => {
          drawing = true
          window.draw.changeMode('draw_point')
        },
        classes: ['mapbox-gl-draw_ctrl-draw-btn', 'mapbox-gl-draw_point'],
        title: '画点 (m)',
      },
      {
        on: 'click',
        action: () => {
          drawing = true
          window.draw.changeMode('draw_line_string')
        },
        classes: ['mapbox-gl-draw_ctrl-draw-btn', 'mapbox-gl-draw_line'],
        title: '画线 (l)',
      },
      {
        on: 'click',
        action: () => {
          drawing = true
          window.draw.changeMode('draw_polygon')
        },
        classes: ['mapbox-gl-draw_ctrl-draw-btn', 'mapbox-gl-draw_polygon'],
        title: '画多边形 (p)',
      },
      {
        on: 'click',
        action: () => {
          drawing = true
          window.draw.changeMode('draw_rectangle')
        },
        classes: [
          'mapbox-gl-draw_ctrl-draw-btn',
          'mapbox-gl-draw_rectangle',
        ],
        title: '画矩形 (r)',
      },
      // {
      //   on: 'click',
      //   action: () => {
      //     drawing = true
      //     window.draw.changeMode('draw_circle')
      //   },
      //   classes: ['mapbox-gl-draw_ctrl-draw-btn', 'mapbox-gl-draw_circle'],
      //   title: '画圆圈 (c)',
      // },
    ],
  })

  map.addControl(new mapboxgl.NavigationControl())

  map.addControl(drawControl, 'top-right')

  // map.addControl(new window.MapboxLanguage({ defaultLanguage: "zh-Hans" }));

  map.on('load', () => {
    mapLoad()
    updateMap()
  })
})
whenever(() => keys.Delete.value || keys.Backspace.value, () => {
  console.log('esc/Backspace have been pressed')
  window.draw.trash()
})
const handleCollapsed = () => {
  if (drawing)
    console.log('drawing')

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
