import {io} from 'socket.io-client'
const socket = io(`${window.location}`, {
  transports: ['websocket', 'polling', 'flashsocket'],
})

export {socket}
