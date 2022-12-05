<script lang="ts" setup>
import type { TypeEnum } from '~/composables/store'
import { 设置区域, 设置点, 设置路线 } from '~/composables/store'

const pointList = TypeEnumList.filter(m => m.isShow && m.type === 'Point')
const lineStringList = TypeEnumList.filter(m => m.isShow && m.type === 'LineString')
const polygonList = TypeEnumList.filter(m => m.isShow && m.type === 'Polygon')

const handleSelectPolygon = (item: any) => {
  设置区域(item)
}

const handleSelectLineString = (item: any) => {
  设置路线(item)
}

const handleSelectPoint = (v: any) => {
  设置点(v as TypeEnum)
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
          点
        </a-button>
        <template #content>
          <a-doption v-for="(item) in pointList" :key="item.value" :value="item.value">
            <template #icon>
              <MyIconFont :name="item.iconName" />
            </template>
            <template #default>
              {{ item.label }}
            </template>
          </a-doption>
        </template>
      </a-dropdown>

      <a-dropdown @select="handleSelectLineString">
        <a-button>
          <template #icon>
            <icon-share-alt />
          </template>
          线
        </a-button>
        <template #content>
          <a-doption v-for="(item) in lineStringList" :key="item.value" :value="item">
            <template #icon>
              <icon-share-alt />
            </template>
            <template #default>
              {{ item.label }}
            </template>
          </a-doption>
        </template>
      </a-dropdown>

      <a-dropdown @select="handleSelectPolygon">
        <a-button>
          <template #icon>
            <icon-relation />
          </template>
          面
        </a-button>
        <template #content>
          <a-doption v-for="(item) in polygonList" :key="item.value" :value="item">
            <template #icon>
              <icon-relation />
            </template>
            <template #default>
              {{ item.label }}
            </template>
          </a-doption>
        </template>
      </a-dropdown>
    </ASpace>
  </div>
</template>
