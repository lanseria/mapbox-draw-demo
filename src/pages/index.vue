<script setup lang="ts">
import mapboxgl from 'mapbox-gl'
import { mapStyle } from '~/constant/map'

mapboxgl.accessToken
  = 'pk.eyJ1IjoibGFuc2VyaWEiLCJhIjoiY2wxMGo5ZWk3MTF3dTNkcnRwcDMyMXowOSJ9.kxLDvTThtaU0uiBOXanNvA'

const SCALE = 14
let map: any = null
let geoControl: any = null
const mapContainer = ref()

const updateMap = () => {
  //
}

onMounted(() => {
  map = new mapboxgl.Map({
    container: mapContainer.value,
    style: mapStyle,
    center: [122.1373164810982, 29.952575962927767],
    zoom: SCALE,
  })

  // map.addControl(new window.MapboxLanguage({ defaultLanguage: "zh-Hans" }));

  map.on('load', () => {
    updateMap()
  })

  map.on('click', 'layer', (e: any) => {
    //
  })

  map.on('mouseenter', 'layer', () => {
    map.getCanvas().style.cursor = 'pointer'
  })

  map.on('mouseleave', 'layer', () => {
    map.getCanvas().style.cursor = ''
  })

  geoControl = new mapboxgl.GeolocateControl({
    positionOptions: {
      enableHighAccuracy: true,
    },
    trackUserLocation: true,
  })

  map.addControl(geoControl)

  geoControl.on('geolocate', (e: any) => {
    //
  })
})
</script>

<template>
  <div class="h-full w-full relative">
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
  </div>
</template>
