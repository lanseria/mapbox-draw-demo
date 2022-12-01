import type { FeatureCollection } from 'geojson'
import { nanoid } from 'nanoid'
import type mapboxgl from 'mapbox-gl'
import * as turf from '@turf/turf'
import type { Ref } from 'vue'
import { Message } from '@arco-design/web-vue'
import type { Feature, LineString, Point, Polygon } from '@turf/turf'

export enum TypeEnum {
  初始化点 = 'InitPoint',
  //
  警戒区 = 'AreaOfWarning',
  消防车集合点 = 'AreaOfFFE',
  //
  进入路线 = 'LineOfIn',
  撤离路线 = 'LineOfOut',
  //
  警戒引导点 = 'PointOfWarning',
  物资医疗点 = 'PointOfMedicalSupplies',
  总指挥部 = 'PointOfHeadOffice',
  现场指挥部 = 'PointOfFieldCommandOffice',
  安全出口点 = 'PointOfSafetyExit',
  紧急逃离点 = 'PointOfEmergencyEscape',
}

export const TypeEnumMap = {
  [TypeEnum.初始化点]: '初始化点',
  [TypeEnum.警戒区]: '警戒区',
  [TypeEnum.消防车集合点]: '消防车集合点',
  //
  [TypeEnum.进入路线]: '进入路线',
  [TypeEnum.撤离路线]: '撤离路线',
  //
  [TypeEnum.警戒引导点]: '警戒引导点',
  [TypeEnum.物资医疗点]: '物资医疗点',
  [TypeEnum.总指挥部]: '总指挥部',
  [TypeEnum.现场指挥部]: '现场指挥部',
  [TypeEnum.安全出口点]: '安全出口点',
  [TypeEnum.紧急逃离点]: '紧急逃离点',
}

export const TypeEnumList = [
  {
    label: TypeEnumMap[TypeEnum.初始化点],
    value: TypeEnum.初始化点,
    isShow: false,
    type: 'Point',
  },
  //
  {
    label: TypeEnumMap[TypeEnum.警戒区],
    value: TypeEnum.警戒区,
    isShow: true,
    type: 'Polygon',
    properties: {
      'fill': 'rgba(255, 100, 100, 0.7)',
      'fill-opacity': 0.5,
      'stroke': 'rgba(255, 100, 100, 0.2)',
      'stroke-width': 2,
      'stroke-opacity': 1,
      'radius': 150,
    },
  },
  {
    label: TypeEnumMap[TypeEnum.消防车集合点],
    value: TypeEnum.消防车集合点,
    isShow: true,
    type: 'Polygon',
    properties: {
      'fill': '#e88b4d',
      'fill-opacity': 0.8,
      'stroke': 'rgba(224, 190, 40, 1)',
      'stroke-width': 2,
      'stroke-opacity': 1,
    },
  },
  //
  {
    label: TypeEnumMap[TypeEnum.进入路线],
    value: TypeEnum.进入路线,
    isShow: true,
    type: 'LineString',
    properties: {
      'stroke': '#ee6b3b',
      'stroke-width': 6,
      'stroke-opacity': 1,
      'line-cap': 'round',
      'line-join': 'round',
    },
  },
  {
    label: TypeEnumMap[TypeEnum.撤离路线],
    value: TypeEnum.撤离路线,
    isShow: true,
    type: 'LineString',
    properties: {
      'stroke': '#ee4a3a',
      'stroke-width': 6,
      'stroke-opacity': 1,
      'line-cap': 'round',
      'line-join': 'round',
    },
  },
  //
  {
    label: TypeEnumMap[TypeEnum.警戒引导点],
    value: TypeEnum.警戒引导点,
    isShow: true,
    type: 'Point',
  },
  {
    label: TypeEnumMap[TypeEnum.物资医疗点],
    value: TypeEnum.物资医疗点,
    isShow: true,
    type: 'Point',
  },
  {
    label: TypeEnumMap[TypeEnum.总指挥部],
    value: TypeEnum.总指挥部,
    isShow: true,
    type: 'Point',
  },
  {
    label: TypeEnumMap[TypeEnum.现场指挥部],
    value: TypeEnum.现场指挥部,
    isShow: true,
    type: 'Point',
  },
  {
    label: TypeEnumMap[TypeEnum.安全出口点],
    value: TypeEnum.安全出口点,
    isShow: true,
    type: 'Point',
  },
  {
    label: TypeEnumMap[TypeEnum.紧急逃离点],
    value: TypeEnum.紧急逃离点,
    isShow: true,
    type: 'Point',
  },
]

export const c04Point: [number, number] = [122.1373164810982, 29.952575962927767]

// fill: "rgba(255, 100, 100, 0.7)"
// fill-opacity: 0.5
// radius: 100
// stroke: "rgba(255, 100, 100, 0.2)"
// stroke-opacity: 3
// stroke-width: 2
// type: "警戒区"
export const 默认警戒区distance = useStorage('aoshan-map-默认警戒区distance', 100) as Ref<number>
export const isSet初始化点 = useStorage('aoshan-map-isSet初始化点', false) as Ref<boolean>
export const isSet警戒区 = useStorage('aoshan-map-isSet警戒区', false) as Ref<boolean>
export const isSet消防车集合点 = useStorage('aoshan-map-isSet消防车集合点', false) as Ref<boolean>
export const mapCenter = useStorage('aoshan-map-center', c04Point) as Ref<mapboxgl.LngLatLike>
export const mapZoom = useStorage('aoshan-map-zoom', 15) as Ref<number>

export const drawMode = useStorage('aoshan-map-draw-mode', 'simple_select')

export const mapFeatureCollection = useStorage('aoshan-map-draw-featureCollection', []) as Ref<FeatureCollection<Polygon | Point | LineString>[]>

export const collapsed = useStorage('aoshan-map-collapsed', false)
export const activeTab = useStorage('aoshan-map-activeTab', 'edit')

export const currentProperties = ref(null) as Ref<any>

export const initStartPoint = () => {
  const point = turf.point(c04Point, {
    'icon-image': 'pulsing-dot',
    'type': TypeEnum.初始化点,
    'color': '#fa8072',
  })
  mapFeatureCollection.value = []
  mapFeatureCollection.value.push(turf.featureCollection([point]))

  reloadSource()
}

const 判断初始化点位 = () => {
  if (!isSet初始化点.value) {
    Message.warning('请先初始化点位')
    console.warn('请先初始化点位')
    return false
  }
  else {
    return true
  }
}

/**
 * push进入数据
 * @param polygon
 */
export const pushFeatures = (feature: Feature<Polygon | LineString>) => {
  currentProperties.value = {
    id: nanoid(),
    ...currentProperties.value,
  }
  feature.properties = {
    ...currentProperties.value,
  }
  const centerPoint = turf.center(feature)
  const map = window.map
  console.log(`flyTo: ${centerPoint.geometry.coordinates}`)
  setTimeout(() => {
    map.flyTo({
      center: centerPoint.geometry.coordinates as any,
      zoom: 16,
    })
  })
  // TODO: filter type
  mapFeatureCollection.value[0].features.push(feature)
  reloadSource()
}

export const 设置区域 = (item: any) => {
  if (!判断初始化点位())
    return

  // 设置完立即显示其当前要素属性
  activeTab.value = 'edit'
  currentProperties.value = {
    ...item.properties,
    type: item.value,
  }
  if (item.value === TypeEnum.警戒区) {
    if (isSet警戒区.value) {
      Message.warning('已设置警戒区域')
      console.warn('已设置警戒区域')
      return
    }
    const polygon = turf.buffer(turf.point(c04Point), item.properties.radius, {
      units: 'meters',
    })
    // 存入数据
    pushFeatures(polygon)
  }
  if (item.value === TypeEnum.消防车集合点) {
    if (isSet消防车集合点.value) {
      Message.warning('已设置消防车集合点')
      console.warn('已设置消防车集合点')
      return
    }
    const draw = window.draw
    draw.changeMode('draw_polygon')
  }
}

export const 设置路线 = (item: any) => {
  if (!判断初始化点位())
    return
  // 设置完立即显示其当前要素属性
  activeTab.value = 'edit'
  currentProperties.value = {
    ...item.properties,
    type: item.value,
  }
  const draw = window.draw
  draw.changeMode('draw_line_string')
}

export const 设置点 = (type: TypeEnum) => {
  if (!判断初始化点位())
    return
  const name = TypeEnumMap[type]
  // 设置完立即显示其当前要素属性
  activeTab.value = 'edit'
  currentProperties.value = {
    // 加载对应的Icon
    'icon-image': `${name}Icon`,
    'icon-size': 0.3,
    'icon-allow-overlap': true,
    'type': type,
  }
  const draw = window.draw
  draw.changeMode('draw_point')
}
