import { pulsingDot } from './point'

export const mapLoad = () => {
  window.map.addImage('pulsing-dot', pulsingDot(200), { pixelRatio: 2 })
}
