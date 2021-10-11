/** @jsxImportSource theme-ui */
import {MapContainer, TileLayer} from 'react-leaflet'
import {FullPageSpinner} from './Spinner'
import StationsList from './StationsList'
import {useBikesContext} from '../context/BikesContext'

BikesMaps.propTypes = {}

function BikesMaps() {
  const {
    isReplaying,
    bikes: {location, stations},
  } = useBikesContext()

  return (
    <>
      {location ? (
        <MapContainer
          center={location}
          zoom={13}
          scrollWheelZoom={false}
          style={{width: '100%'}}
        >
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <StationsList stations={stations} />
        </MapContainer>
      ) : (
        <FullPageSpinner sx={{height: '60vh', fontSize: [4, 5, 6]}} />
      )}
    </>
  )
}

export default BikesMaps
