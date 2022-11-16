<script setup lang="ts">
import mapboxgl from 'mapbox-gl'
import MapboxDraw from '@mapbox/mapbox-gl-draw'
import * as turf from '@turf/turf'
import {
  CircleMode,
  DirectMode,
  DragCircleMode,
  SimpleSelectMode,
} from 'mapbox-gl-draw-circle'
import { mapStyle } from '~/constant/map'
import 'mapbox-gl/dist/mapbox-gl.css'
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css'
import { mapCenter, mapZoom } from '~/composables/store'
import { mapLoad } from '~/composables/mapLoad'

mapboxgl.accessToken
  = 'pk.eyJ1IjoibGFuc2VyaWEiLCJhIjoiY2wxMGo5ZWk3MTF3dTNkcnRwcDMyMXowOSJ9.kxLDvTThtaU0uiBOXanNvA'

let map: mapboxgl.Map | null = null
const mapContainer = ref()

const updateMap = () => {
  //
}

onMounted(() => {
  map = new mapboxgl.Map({
    container: mapContainer.value,
    style: mapStyle,
    center: mapCenter.value,
    zoom: mapZoom.value,
  })
  window.map = map

  const draw = new MapboxDraw({
    displayControlsDefault: false,
    // Select which mapbox-gl-draw control buttons to add to the map.
    controls: {
      point: true,
      line_string: true,
      polygon: true,
      trash: true,
    },
    modes: {
      ...MapboxDraw.modes,
      draw_circle: CircleMode,
      drag_circle: DragCircleMode,
      direct_select: DirectMode,
      simple_select: SimpleSelectMode,
    },
    // Set mapbox-gl-draw to draw by default.
    // The user does not have to click the polygon control button first.
    defaultMode: 'simple_select',
  })
  window.draw = draw
  map.addControl(draw)

  // map.addControl(new window.MapboxLanguage({ defaultLanguage: "zh-Hans" }));

  map.on('load', () => {
    mapLoad()
    updateMap()
  })
  map.on('draw.create', updateArea)
  map.on('draw.delete', updateArea)
  map.on('draw.update', updateArea)

  function updateArea(e: any) {
    const data = draw.getAll()

    if (data.features.length > 0) {
      const area = turf.area(data)
      // Restrict the area to 2 decimal points.
      const rounded_area = Math.round(area * 100) / 100
      console.warn(`<p><strong>${rounded_area}</strong></p><p>square meters</p>`)
    }
    else {
      if (e.type !== 'draw.delete')
        alert('Click the map to draw a polygon.')
    }
  }
  map.on('click', 'layer', (e: any) => {
    //
  })

  map.on('mouseenter', 'layer', () => {
    map!.getCanvas().style.cursor = 'pointer'
  })

  map.on('mouseleave', 'layer', () => {
    map!.getCanvas().style.cursor = ''
  })

  // geoControl = new mapboxgl.GeolocateControl({
  //   positionOptions: {
  //     enableHighAccuracy: true,
  //   },
  //   trackUserLocation: true,
  // })

  // map.addControl(geoControl)

  // geoControl.on('geolocate', (e: any) => {
  //
  // })
})
</script>

<template>
  <div
    ref="mapContainer"
    :style="{
      height: '100%',
      width: '100%',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
    }"
  />
</template>
