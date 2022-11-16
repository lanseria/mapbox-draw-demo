export const updateArea = (e: any) => {
  if (e.type === 'draw.render')
    return
  if (e.type === 'draw.create') {
    // console.log(e)
  }
  if (e.type === 'draw.changeMode')
    drawMode.value = e.mode

  // console.log(e)
}
