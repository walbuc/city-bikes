import React from 'react'
import Marker from './Marker'

function getColor(free_bikes) {
  return free_bikes > 5
    ? 'green'
    : free_bikes <= 5 && free_bikes > 0
    ? 'yellow'
    : 'red'
}

function StationsList({stations = []}) {
  return (
    <>
      {stations.map(
        ({id, name, latitude, longitude, empty_slots, free_bikes}) => (
          <Marker
            key={id}
            name={name}
            latitude={latitude}
            longitude={longitude}
            emptySlots={empty_slots}
            freeBikes={free_bikes}
            color={getColor(free_bikes)}
            size={40}
          />
        ),
      )}
    </>
  )
}

export default StationsList
