import * as turf from '@turf/turf'
import { svgBase64警戒引导点 } from './mapSvg'
import { pulsingDot } from './point'
import { isSet初始化点, isSet消防车集合点, isSet警戒区 } from './store'

const addSource = () => {
  const map = window.map
  const source: any = map.getSource('MapSource')
  const initSetStatus = () => {
    isSet初始化点.value = false
    isSet警戒区.value = false
    isSet消防车集合点.value = false
  }
  initSetStatus()
  const features = mapFeatureCollection.value[0]
  if (mapFeatureCollection.value.length > 0) {
    turf.propEach(features, (currentProperties: any, featureIndex) => {
      // console.warn(currentProperties, featureIndex)
      if (currentProperties.type === TypeEnum.初始化点)
        isSet初始化点.value = true
      if (currentProperties.type === TypeEnum.警戒区)
        isSet警戒区.value = true
      if (currentProperties.type === TypeEnum.消防车集合点)
        isSet消防车集合点.value = true
    })
    if (source) { source.setData(mapFeatureCollection.value[0]) }
    else {
      map.addSource('MapSource', {
        type: 'geojson',
        data: mapFeatureCollection.value[0],
      })
    }
  }
}

const handleLinestringOrPolygonClick = (e: any) => {
  // prevent this popup from opening when the original click was on a marker
  const el = e.originalEvent.target
  // console.log(e)
  const [feature] = e.features
  // console.warn(feature)
  const draw = window.draw
  const mode = draw.getMode()
  console.log(mode)
  if (mode === 'draw_line_string' || mode === 'draw_polygon' || mode === 'draw_point')
    return
  if (el.nodeName !== 'CANVAS')
    return
  // 设置完立即显示其当前要素属性
  activeTab.value = 'edit'
  currentProperties.value = {
    ...feature.properties,
  }
  // prevent this popup from opening when drawing new features
  // if (drawing)
  //   return

  // bindPopup(e, context, writable)
}

// 画面（包含填充与轮廓线）
const drawPolygon = () => {
  const map = window.map
  const source: any = map.getSource('MapSource')
  if (!source)
    return
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
  const map = window.map
  const source: any = map.getSource('MapSource')
  if (!source)
    return
  if (map.getLayer('LayerWithLineString'))
    map.removeLayer('LayerWithLineString')
  if (map.getLayer('LayerWithLineStringArrow'))
    map.removeLayer('LayerWithLineStringArrow')

  map.addLayer({
    id: 'LayerWithLineString',
    type: 'line',
    source: 'MapSource', // reference the data source
    layout: {
      'line-cap': ['coalesce', ['get', 'line-cap'], 'round'],
      'line-join': ['coalesce', ['get', 'line-cap'], 'round'],
    },
    paint: {
      'line-color': ['coalesce', ['get', 'stroke'], '#000'],
      'line-width': ['coalesce', ['get', 'stroke-width'], 2],
      'line-opacity': ['coalesce', ['get', 'stroke-opacity'], 1],
    },
    filter: ['==', ['geometry-type'], 'LineString'],
  })

  map.on('click', 'LayerWithLineString', handleLinestringOrPolygonClick)
}

// 画点
const drawPoint = () => {
  const map = window.map
  const source: any = map.getSource('MapSource')
  if (!source)
    return
  if (map.getLayer('LayerWithPoint'))
    map.removeLayer('LayerWithPoint')
  map.addLayer({
    id: 'LayerWithPoint',
    type: 'symbol',
    source: 'MapSource',
    layout: {
      'icon-image': ['coalesce', ['get', 'icon-image'], 'pulsing-dot'],
      'icon-size': ['coalesce', ['get', 'icon-size'], 1],
      // 'icon-allow-overlap': ['coalesce', ['get', 'icon-allow-overlap'], false],
    },
    filter: ['==', ['geometry-type'], 'Point'],
  })
  map.on('click', 'LayerWithPoint', handleLinestringOrPolygonClick)
}

export const reloadSource = () => {
  addSource()
  drawPolygon()
  drawLine()
  drawPoint()
}

const loadSvg = (name: string, base64: string) => {
  const map = window.map
  const imageIcon = new Image(100, 100)
  imageIcon.src = base64
  imageIcon.onload = function () {
    if (map.hasImage(name))
      map.removeImage(name)
    map.addImage(name, imageIcon)
  }
}

export const mapLoad = () => {
  const map = window.map
  if (map.hasImage('pulsing-dot'))
    map.removeImage('pulsing-dot')
  map.addImage('pulsing-dot', pulsingDot(200), { pixelRatio: 2 })

  loadSvg('警戒引导点Icon', svgBase64警戒引导点)

  setTimeout(() => {
    reloadSource()
  }, 1000)
}
