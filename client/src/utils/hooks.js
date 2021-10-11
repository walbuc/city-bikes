import {useEffect, useState} from 'react'
import {socket} from './io'

function useBikes(location) {
  const [bikes, setBikes] = useState({})
  const [isReplaying, setIsReplying] = useState(false)

  const [connected, setIsConnected] = useState(false)

  function clearListeners() {
    socket.off('connect')
    socket.off('disconnect')
    socket.off('message')
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

    socket.on('reply data', (date, data) => {
      const {network} = data
      const bikes = {
        ...network,
        location: [network.location.latitude, network.location.longitude],
      }
      setBikes(bikes)
    })

    //from server
    socket.on('stop reply', () => {
      setIsReplying(false)
    })

    return clearListeners
  }, [setBikes, isReplaying, socket])

  return {bikes}
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
