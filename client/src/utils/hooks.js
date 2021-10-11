import React, {useEffect, useState} from 'react'
import {socket} from './io'

function useBikes(location) {
  const [bikes, setBikes] = useState({})
  const [isReplaying, setIsReplaying] = useState(false)
  const [connected, setIsConnected] = useState(false)

  function clearListeners() {
    socket.off('connect')
    socket.off('disconnect')
    socket.off('list bikes')
    socket.off('re play data')
    socket.off('re play stop')
  }

  useEffect(() => {
    socket.on('connect', () => {
      setIsConnected(true)
    })

    socket.on('disconnect', () => {
      setIsConnected(false)
    })

    socket.on('list bikes', data => {
      if (!isReplaying) {
        const {network} = data
        const bikes = {
          ...network,
          location: [network.location.latitude, network.location.longitude],
        }
        setBikes(bikes)
      }
    })

    socket.on('re play data', (date, data) => {
      if (isReplaying) {
        const {network} = data
        const bikes = {
          ...network,
          date,
          location: [network.location.latitude, network.location.longitude],
        }
        setBikes(bikes)
      }
    })

    socket.on('re play stop', () => {
      setIsReplaying(false)
    })

    return clearListeners
  }, [setBikes, isReplaying, setIsReplaying, socket])

  return {bikes, isReplaying, setIsReplaying}
}

function useDates() {
  const [dates, setDates] = useState([])

  function clearListeners() {
    socket.off('dates-re-play')
  }

  useEffect(() => {
    socket.on('dates-re-play', dates => {
      setDates(dates)
    })

    return clearListeners
  }, [setDates, socket])

  return {dates}
}

export {useBikes, useDates}
