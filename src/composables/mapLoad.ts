import { pulsingDot } from './point'

export const mapLoad = () => {
  const map = window.map
  if (map.hasImage('pulsing-dot'))
    map.removeImage('pulsing-dot')
  map.addImage('pulsing-dot', pulsingDot(200), { pixelRatio: 2 })
}
