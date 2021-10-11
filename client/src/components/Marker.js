import React from 'react'
import {Marker, Popup} from 'react-leaflet'
import L from 'leaflet'

function getCustomIcon(color, iconSize) {
  switch (color) {
    case 'green':
      return L.icon({
        iconUrl: '/assets/location-green.svg',
        iconSize: iconSize,
      })

    case 'yellow':
      return L.icon({
        iconUrl: '/assets/location-yellow.svg',
        iconSize: iconSize,
      })

    case 'red':
      return L.icon({
        iconUrl: '/assets/location-red.svg',
        iconSize: iconSize,
      })

    default:
      return L.icon({
        iconUrl: '/assets/location.svg',
        iconSize: iconSize,
      })
  }
}

export default function Maker({
  name,
  latitude,
  longitude,
  emptySlots,
  freeBikes,
  color,
  size,
}) {
  return (
    <Marker position={[latitude, longitude]} icon={getCustomIcon(color, size)}>
      <Popup>
        <h3>{name}</h3>
        <p># {emptySlots} Empty Slots</p>
        <p>#{freeBikes} Free Bikes</p>
      </Popup>
    </Marker>
  )
}
