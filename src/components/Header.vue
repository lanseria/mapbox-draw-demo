<script lang="ts" setup>
import { initStartPoint } from '~/composables/store'

const exportImg = () => {
  //
  const map = window.map
  const mapCanvasDiv = map.getCanvasContainer()
  const mapCanvas = mapCanvasDiv.querySelector('canvas')
  const MIME_TYPE = 'image/png'

  const imgURL = mapCanvas!.toDataURL(MIME_TYPE)

  const dlLink = document.createElement('a')
  dlLink.download = 'map.png'
  dlLink.href = imgURL
  dlLink.dataset.downloadurl = [MIME_TYPE, dlLink.download, dlLink.href].join(':')

  document.body.appendChild(dlLink)
  dlLink.click()
  document.body.removeChild(dlLink)
}
</script>

<template>
  <div class="text-white px-3 flex relative">
    <div class="font-extrabold flex items-center tracking-wide text-base">
      地图编辑器
    </div>
    <div class="flex-auto" />
    <div class="flex-grow flex justify-end">
      <div style="height: 42px" />
      <div class="flex items-center" style="font-size: 10px">
        <div class="hidden md:flex pl-3 border-l border-solid border-gray-700 h-full items-center">
          <a-button type="text" @click="initStartPoint()">
            初始化点位
          </a-button>
          <a-button type="text" @click="exportImg()">
            导出图片
          </a-button>
          <a-button type="text">
            保存
          </a-button>
        </div>
      </div>
    </div>
    <div
      class="absolute top-1/2 left-1/2" :style="{
        transform: 'translate(-50%, -50%)',
      }"
    >
      <div>
        <ToolBar />
      </div>
    </div>
  </div>
</template>
