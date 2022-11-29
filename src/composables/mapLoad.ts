import * as turf from '@turf/turf'
import { pulsingDot } from './point'
import { isSet初始化点, isSet警戒区 } from './store'

const addSource = () => {
  const map = window.map
  const source: any = map.getSource('MapSource')
  if (source) { source.setData(mapFeatureCollection.value[0]) }
  else {
    map.addSource('MapSource', {
      type: 'geojson',
      data: mapFeatureCollection.value[0],
    })
  }
  const features = mapFeatureCollection.value[0]
  const initSetStatus = () => {
    isSet初始化点.value = false
    isSet警戒区.value = false
  }
  initSetStatus()
  turf.propEach(features, (currentProperties: any, featureIndex) => {
    console.log(currentProperties, featureIndex)
    if (currentProperties.type === TypeEnum.初始化点)
      isSet初始化点.value = true
    if (currentProperties.type === TypeEnum.警戒区)
      isSet警戒区.value = true
  })
}

const handleLinestringOrPolygonClick = (e: any) => {
  // prevent this popup from opening when the original click was on a marker
  const el = e.originalEvent.target
  // console.log(e)
  const [feature] = e.features
  console.log(feature)
  // 设置完立即显示其当前要素属性
  activeTab.value = 'edit'
  currentProperties.value = {
    ...feature.properties,
  }
  if (el.nodeName !== 'CANVAS')
    return
  // prevent this popup from opening when drawing new features
  // if (drawing)
  //   return

  // bindPopup(e, context, writable)
}

// 画面（包含填充与轮廓线）
const drawPolygon = () => {
  const map = window.map
  if (map.getLayer('LayerWithPolygonFill'))
    map.removeLayer('LayerWithPolygonFill')
  if (map.getLayer('LayerWithPolygonOutline'))
    map.removeLayer('LayerWithPolygonOutline')

  map.addLayer({
    id: 'LayerWithPolygonFill',
    type: 'fill',
    source: 'MapSource', // reference the data source
    layout: {},
    paint: {
      'fill-color': ['coalesce', ['get', 'fill'], '#000'],
      'fill-opacity': ['coalesce', ['get', 'fill-opacity'], 0.3],
    },
    filter: ['==', ['geometry-type'], 'Polygon'],
  })
  // Add a black outline around the polygon.
  map.addLayer({
    id: 'LayerWithPolygonOutline',
    type: 'line',
    source: 'MapSource',
    layout: {},
    paint: {
      'line-color': ['coalesce', ['get', 'stroke'], '#000'],
      'line-width': ['coalesce', ['get', 'stroke-width'], 2],
      'line-opacity': ['coalesce', ['get', 'stroke-opacity'], 1],
    },
    filter: ['==', ['geometry-type'], 'Polygon'],
  })

  map.on('click', 'LayerWithPolygonFill', handleLinestringOrPolygonClick)
  map.on('click', 'LayerWithPolygonOutline', handleLinestringOrPolygonClick)
}

// 画线
const drawLine = () => {
  //
}

// 画点
const drawPoint = () => {
  //
  const map = window.map
  if (map.getLayer('LayerWithPoint'))
    map.removeLayer('LayerWithPoint')
  map.addLayer({
    id: 'LayerWithPoint',
    type: 'symbol',
    source: 'MapSource',
    layout: {
      'icon-image': ['coalesce', ['get', 'icon-image'], 'pulsing-dot'],
    },
    filter: ['==', ['geometry-type'], 'Point'],
  })
}

export const reloadSource = () => {
  addSource()
  drawPolygon()
  drawLine()
  drawPoint()
}

export const mapLoad = () => {
  const map = window.map
  if (map.hasImage('pulsing-dot'))
    map.removeImage('pulsing-dot')
  map.addImage('pulsing-dot', pulsingDot(200), { pixelRatio: 2 })

  reloadSource()
}
