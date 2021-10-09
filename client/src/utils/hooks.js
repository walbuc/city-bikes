import {useEffect, useState} from 'react'
import {socket} from './io'

function useBikes(location) {
  const [bikes, setBikes] = useState([])
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

    socket.on('list bikes', bikes => {
      setBikes(bikes)
    })

    return clearListeners
  }, [bikes])

  return bikes
}

export {useBikes}
