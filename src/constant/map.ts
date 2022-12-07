export const mapStyle: mapboxgl.Style = {
  version: 8,
  name: 'Basic',
  glyphs: 'mapbox://fonts/mapbox/{fontstack}/{range}.pbf',
  sources: {
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
      id: 'osm',
      source: 'osm',
      type: 'raster',
    },
  ],
}
