import * as turf from '@turf/turf'
import type { Feature } from '@turf/turf'
import { svgBase64安全出口, svgBase64总指挥部, svgBase64物资医疗点, svgBase64现场指挥部, svgBase64紧急逃离, svgBase64线路箭头, svgBase64警戒引导点 } from './mapSvg'
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
    turf.propEach(features, (currentProperties: any, _featureIndex) => {
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
      'fill-color': ['coalesce', ['get', 'fill-color'], '#000'],
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
      'line-color': ['coalesce', ['get', 'line-color'], '#000'],
      'line-width': ['coalesce', ['get', 'line-width'], 2],
      'line-opacity': ['coalesce', ['get', 'line-opacity'], 1],
    },
    filter: ['==', ['geometry-type'], 'Polygon'],
  })

  map.on('click', 'LayerWithPolygonFill', handleLinestringOrPolygonClick)
  map.on('click', 'LayerWithPolygonOutline', handleLinestringOrPolygonClick)
}

const drawLineArrow = () => {
  const lineStringPointFeatures: Feature[] = []
  turf.featureEach(mapFeatureCollection.value[0], (currentFeature) => {
    if (currentFeature.geometry.type === 'LineString') {
      const { coordinates } = currentFeature.geometry
      const lastPoint = coordinates[coordinates.length - 1]
      const last2Point = coordinates[coordinates.length - 2]
      const bearing = turf.bearing(last2Point, lastPoint)
      const point = turf.point(lastPoint, {
        bearing,
        'icon-size': 0.2,
        'icon-image': 'shop-icon',
        'icon-rotation-alignment': 'map',
        'icon-color': currentFeature.properties!['line-color'],
      })
      lineStringPointFeatures.push(point)
    }
  })
  const map = window.map
  if (map.getLayer('LayerWithLineStringArrowBearing'))
    map.removeLayer('LayerWithLineStringArrowBearing')
  if (lineStringPointFeatures.length > 0) {
    const bearingPointsFeatures = turf.featureCollection(lineStringPointFeatures)

    const source: any = map.getSource('LineStringSource')
    if (source) { source.setData(bearingPointsFeatures) }
    else {
      map.addSource('LineStringSource', {
        type: 'geojson',
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        data: bearingPointsFeatures,
      })
    }
    map.addLayer({
      id: 'LayerWithLineStringArrowBearing',
      type: 'symbol',
      source: 'LineStringSource',
      layout: {
        'icon-image': ['coalesce', ['get', 'icon-image'], 'shop-icon'],
        'icon-size': ['coalesce', ['get', 'icon-size'], 0.2],
        'icon-rotate': ['get', 'bearing'],
        'icon-rotation-alignment': 'map',
        'icon-allow-overlap': true,
        'icon-ignore-placement': true,
      },
      paint: {
        'icon-color': ['coalesce', ['get', 'icon-color'], '#000'],
      },
    })
  }
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
    source: 'MapSource',
    layout: {
      'line-cap': ['coalesce', ['get', 'line-cap'], 'round'],
      'line-join': ['coalesce', ['get', 'line-cap'], 'round'],
    },
    paint: {
      'line-color': ['coalesce', ['get', 'line-color'], '#000'],
      'line-width': ['coalesce', ['get', 'line-width'], 2],
      'line-opacity': ['coalesce', ['get', 'line-opacity'], 1],
    },
    filter: ['==', ['geometry-type'], 'LineString'],
  })

  map.addLayer({
    id: 'LayerWithLineStringArrow',
    type: 'symbol',
    source: 'MapSource',
    layout: {
      'symbol-placement': 'line',
      'symbol-spacing': 1, // 图标间隔，默认为250
      'icon-image': '线路箭头Icon', // 箭头图标
      'icon-size': 0.5,
    },
    filter: ['==', ['geometry-type'], 'LineString'],
  })
  drawLineArrow()
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
      'icon-image': ['get', 'icon-image'],
      'icon-size': ['coalesce', ['get', 'icon-size'], 1],
      'icon-allow-overlap': false,
      'icon-ignore-placement': false,
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

const loadSvg = (name: string, base64: string, width = 100, height = 100) => {
  const map = window.map
  const imageIcon = new Image(width, height)
  imageIcon.src = base64
  imageIcon.onload = function () {
    if (map.hasImage(name))
      map.removeImage(name)
    map.addImage(name, imageIcon)
  }
}

const loadImg = (name: string, url = '/shop-15.png') => {
  const map = window.map
  map.loadImage(url, (error, image) => {
    if (error)
      throw error
    image && map.addImage(name, image, { sdf: true })
  })
}

export const mapLoad = () => {
  const map = window.map
  if (map.hasImage('pulsing-dot'))
    map.removeImage('pulsing-dot')
  map.addImage('pulsing-dot', pulsingDot(200), { pixelRatio: 2 })

  loadImg('shop-icon')

  loadSvg('线路箭头Icon', svgBase64线路箭头, 20, 20)
  loadSvg('警戒引导点Icon', svgBase64警戒引导点)
  loadSvg('物资医疗点Icon', svgBase64物资医疗点)
  loadSvg('总指挥部Icon', svgBase64总指挥部)
  loadSvg('现场指挥部Icon', svgBase64现场指挥部)
  loadSvg('安全出口点Icon', svgBase64安全出口)
  loadSvg('紧急逃离点Icon', svgBase64紧急逃离)

  setTimeout(() => {
    reloadSource()
  }, 1000)
}
