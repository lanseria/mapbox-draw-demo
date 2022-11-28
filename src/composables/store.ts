import type { FeatureCollection } from 'geojson'
import type { Ref } from 'vue'

export const c04Point: [number, number] = [122.1373164810982, 29.952575962927767]

export const mapCenter = useStorage('aoshan-map-center', c04Point) as Ref<mapboxgl.LngLatLike>
export const mapZoom = useStorage('aoshan-map-zoom', 15) as Ref<number>

export const drawMode = useStorage('aoshan-map-draw-mode', 'simple_select')

export const polygonFeatureCollection = useStorage('aoshan-map-draw-polygon-featureCollection', []) as Ref<FeatureCollection[]>

export const collapsed = useStorage('aoshan-map-collapsed', false)
export const activeTab = useStorage('aoshan-map-activeTab', 'edit')
