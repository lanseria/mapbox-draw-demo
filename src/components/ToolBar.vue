<script lang="ts" setup>
import { 设定警戒区域, 设置撤离路线, 设置消防车集合点, 设置物资医疗点, 设置警戒点, 设置进入路线 } from '~/composables/store'

const handleSelectPolygon = (v: any) => {
  if (v === '设定警戒区域')
    设定警戒区域()
  if (v === '消防车集合点')
    设置消防车集合点()
}

const handleSelectLineString = (v: any) => {
  if (v === '进入路线')
    设置进入路线()
  if (v === '撤离路线')
    设置撤离路线()
}

const handleSelectPoint = (v: any) => {
  if (v === '警戒点')
    设置警戒点()
  if (v === '物资医疗点')
    设置物资医疗点()
}
</script>

<template>
  <div class="flex">
    <ASpace>
      <a-dropdown @select="handleSelectPoint">
        <a-button>
          <template #icon>
            <icon-location />
          </template>
          Point
        </a-button>
        <template #content>
          <a-doption value="警戒点">
            <template #icon>
              <icon-location />
            </template>
            <template #default>
              警戒点
            </template>
          </a-doption>
          <a-doption value="物资医疗点">
            <template #icon>
              <icon-location />
            </template>
            <template #default>
              物资医疗点
            </template>
          </a-doption>
          <a-doption value="总指挥部">
            <template #icon>
              <icon-location />
            </template>
            <template #default>
              总指挥部
            </template>
          </a-doption>
          <a-doption value="现场指挥部">
            <template #icon>
              <icon-location />
            </template>
            <template #default>
              现场指挥部
            </template>
          </a-doption>
          <a-doption value="安全出口点">
            <template #icon>
              <icon-location />
            </template>
            <template #default>
              安全出口点
            </template>
          </a-doption>
          <a-doption value="紧急逃离点">
            <template #icon>
              <icon-location />
            </template>
            <template #default>
              紧急逃离点
            </template>
          </a-doption>
        </template>
      </a-dropdown>

      <a-dropdown @select="handleSelectLineString">
        <a-button>
          <template #icon>
            <icon-share-alt />
          </template>
          Line
        </a-button>
        <template #content>
          <a-doption value="进入路线">
            <template #icon>
              <icon-share-alt />
            </template>
            <template #default>
              进入路线
            </template>
          </a-doption>
          <a-doption value="撤离路线">
            <template #icon>
              <icon-share-alt />
            </template>
            <template #default>
              撤离路线
            </template>
          </a-doption>
        </template>
      </a-dropdown>

      <a-dropdown @select="handleSelectPolygon">
        <a-button>
          <template #icon>
            <icon-relation />
          </template>
          Polygon
        </a-button>
        <template #content>
          <a-doption value="设定警戒区域">
            <template #icon>
              <icon-relation />
            </template>
            <template #default>
              设定警戒区域
            </template>
          </a-doption>
          <a-doption value="消防车集合点">
            <template #icon>
              <icon-relation />
            </template>
            <template #default>
              消防车集合点
            </template>
          </a-doption>
        </template>
      </a-dropdown>
    </ASpace>
  </div>
</template>
