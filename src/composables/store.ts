import type { Ref } from 'vue'

export const c04Point: [number, number] = [122.1373164810982, 29.952575962927767]

export const mapCenter = useStorage('aoshan-map-center', c04Point) as Ref<mapboxgl.LngLatLike>
export const mapZoom = useStorage('aoshan-map-zoom', 15) as Ref<number>
