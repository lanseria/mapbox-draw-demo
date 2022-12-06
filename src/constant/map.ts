export const mapStyle: mapboxgl.Style = {
  version: 8,
  name: 'Basic',
  glyphs: 'mapbox://fonts/mapbox/{fontstack}/{range}.pbf',
  sources: {
    seaMapUp: {
      tiles: ['/gis/seaMapUp/{z}/{y}/{x}.png'],
      type: 'raster',
      tileSize: 256,
      minzoom: 12,
      maxzoom: 17,
      bounds: [
        122.12783953000002, 29.946920629999987, 122.16249778000001,
        29.962892799999988,
      ],
    },
    seaMapDown: {
      tiles: ['/gis/seaMapDown/{z}/{y}/{x}.png'],
      type: 'raster',
      tileSize: 256,
      minzoom: 12,
      maxzoom: 17,
      bounds: [
        122.12789744999998, 29.946931109999976, 122.16338214,
        29.966026259999982,
      ],
    },
    tianditu: {
      tiles: [
        '//t1.tianditu.gov.cn/DataServer?T=img_w&x={x}&y={y}&l={z}&tk=c64908713d684abbbe549b44d6d4d8bd',
        '//t0.tianditu.gov.cn/DataServer?T=img_w&x={x}&y={y}&l={z}&tk=c64908713d684abbbe549b44d6d4d8bd',
      ],
      type: 'raster',
      tileSize: 256,
      maxzoom: 20,
    },
    osm: {
      tiles: [
        'https://a.tile.openstreetmap.org/{z}/{x}/{y}.png',
      ],
      type: 'raster',
      tileSize: 256,
      maxzoom: 20,
    },
  },
  layers: [
    {
      id: 'background',
      type: 'background',
      paint: {
        'background-color': 'rgba(0,0,0,0.5)',
      },
    },
    {
      id: 'tianditu',
      source: 'tianditu',
      type: 'raster',
    },
    // 底图
    {
      id: 'seaMapDown',
      source: 'seaMapDown',
      type: 'raster',
    },
    // 罐
    {
      id: 'seaMapUp',
      source: 'seaMapUp',
      type: 'raster',
    },
    // {
    //   id: 'osm',
    //   source: 'osm',
    //   type: 'raster',
    // },
  ],
}
