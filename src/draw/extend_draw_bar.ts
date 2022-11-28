import type { Map } from 'mapbox-gl'

// from https://jsfiddle.net/fxi/xf51zet4/
class extendDrawBar {
  draw: MapboxDraw
  map: Map | undefined
  buttons: any[]
  onAddOrig: any
  onRemoveOrig: any
  elContainer: any
  constructor(opt: any) {
    this.draw = opt.draw
    this.buttons = opt.buttons || []
    this.onAddOrig = opt.draw.onAdd
    this.onRemoveOrig = opt.draw.onRemove
  }

  onAdd(map: Map) {
    this.map = map
    this.elContainer = this.onAddOrig(map)
    this.buttons.forEach((b) => {
      this.addButton(b)
    })
    return this.elContainer
  }

  onRemove(map: Map) {
    this.buttons.forEach((b) => {
      this.removeButton(b)
    })
    this.onRemoveOrig(map)
  }

  addButton(opt: any) {
    const elButton = document.createElement('button')
    elButton.className = 'mapbox-gl-draw_ctrl-draw-btn'
    if (Array.isArray(opt.classes)) {
      opt.classes.forEach((c: any) => {
        elButton.classList.add(c)
      })
    }
    elButton.addEventListener(opt.on, opt.action)
    elButton.title = opt.title
    this.elContainer.appendChild(elButton)
    opt.elButton = elButton
  }

  removeButton(opt: any) {
    opt.elButton.removeEventListener(opt.on, opt.action)
    opt.elButton.remove()
  }
}
export default extendDrawBar
