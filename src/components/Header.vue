<script lang="ts" setup>
import { initStartPoint } from '~/composables/store'
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
          <a-button type="text">
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
