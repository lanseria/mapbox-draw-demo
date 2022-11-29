<script lang="ts" setup>
import { 设定警戒区域 } from '~/composables/store'

const handleSelectPolygon = (v: any) => {
  console.log(v)
  if (v === '设定警戒区域')
    设定警戒区域()
}
</script>

<template>
  <div class="flex">
    <ASpace>
      <a-dropdown>
        <a-button>
          <template #icon>
            <icon-location />
          </template>
          Point
        </a-button>
        <template #content>
          <a-doption>
            <template #icon>
              <icon-location />
            </template>
            <template #default>
              警戒点
            </template>
          </a-doption>
          <a-doption>
            <template #icon>
              <icon-location />
            </template>
            <template #default>
              物资医疗点
            </template>
          </a-doption>
          <a-doption>
            <template #icon>
              <icon-location />
            </template>
            <template #default>
              总指挥部
            </template>
          </a-doption>
          <a-doption>
            <template #icon>
              <icon-location />
            </template>
            <template #default>
              现场指挥部
            </template>
          </a-doption>
          <a-doption>
            <template #icon>
              <icon-location />
            </template>
            <template #default>
              安全出口点
            </template>
          </a-doption>
          <a-doption>
            <template #icon>
              <icon-location />
            </template>
            <template #default>
              紧急逃离点
            </template>
          </a-doption>
        </template>
      </a-dropdown>

      <a-dropdown>
        <a-button>
          <template #icon>
            <icon-share-alt />
          </template>
          Line
        </a-button>
        <template #content>
          <a-doption>
            <template #icon>
              <icon-share-alt />
            </template>
            <template #default>
              进入路线
            </template>
          </a-doption>
          <a-doption>
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
