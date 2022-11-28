// custom mapbopx-gl-draw mode that extends draw_line_string
// shows a center point, radius line, and circle polygon while drawing
// forces draw.create on creation of second vertex
import * as turf from '@turf/turf'
// const circle = require('@turf/circle').default
// const length = require('@turf/length').default
import type { DrawCustomMode } from '@mapbox/mapbox-gl-draw'
import MapboxDraw from '@mapbox/mapbox-gl-draw'

import type { Feature, LineString } from '@turf/turf'
import { getDisplayMeasurements } from './util'

function circleFromTwoVertexLineString(geojson: Feature<LineString>) {
  const center = geojson.geometry.coordinates[0]
  const radiusInKm = turf.length(geojson)
  return turf.circle(center, radiusInKm)
}

const CircleMode: DrawCustomMode = {
  ...MapboxDraw.modes.draw_line_string,
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  clickAnywhere(state, e) {
    // this ends the drawing after the user creates a second point, triggering this.onStop
    if (state.currentVertexPosition === 1) {
      state.line.addCoordinate(0, e.lngLat.lng, e.lngLat.lat)
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      return this.changeMode('simple_select', { featureIds: [state.line.id] })
    }

    state.line.updateCoordinate(
      state.currentVertexPosition,
      e.lngLat.lng,
      e.lngLat.lat,
    )
    if (state.direction === 'forward') {
      state.currentVertexPosition += 1
      state.line.updateCoordinate(
        state.currentVertexPosition,
        e.lngLat.lng,
        e.lngLat.lat,
      )
    }
    else {
      state.line.addCoordinate(0, e.lngLat.lng, e.lngLat.lat)
    }

    return null
  },

  onStop(state) {
    // remove last added coordinate
    state.line.removeCoordinate('0')
    if (state.line.isValid()) {
      const lineGeoJson = state.line.toGeoJSON()
      const circleFeature = circleFromTwoVertexLineString(lineGeoJson)
      this.map.fire('draw.create', {
        features: [circleFeature],
      })
    }
    else {
      this.deleteFeature(state.line.id, { silent: true })
      this.changeMode('simple_select', {}, { silent: true })
    }
  },

  toDisplayFeatures(state, geojson, display) {
    // Only render the line if it has at least one real coordinate
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    if (geojson.geometry.coordinates.length < 2)
      return null

    display({
      type: 'Feature',
      properties: {
        active: 'true',
      },
      geometry: {
        type: 'Point',
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        coordinates: geojson.geometry.coordinates[0],
      },
    })

    // displays the line as it is drawn
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    geojson.properties.active = 'true'
    display(geojson)

    const displayMeasurements = getDisplayMeasurements(geojson)

    // create custom feature for the current pointer position
    const currentVertex = {
      type: 'Feature',
      properties: {
        meta: 'currentPosition',
        radius: `${displayMeasurements.metric} ${displayMeasurements.standard}`,
        parent: state.line.id,
      },
      geometry: {
        type: 'Point',
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        coordinates: geojson.geometry.coordinates[1],
      },
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    display(currentVertex)

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const circleFeature = circleFromTwoVertexLineString(geojson)

    circleFeature.properties = {
      active: 'true',
    }

    display(circleFeature)

    return null
  },
}

export default CircleMode
