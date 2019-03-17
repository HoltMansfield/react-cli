/*
  To use this hook
    import { useSocket } from '@dol/react-app-essentials'
    const { lastTransmission, listenToEvent } = useSocket('subscribeToTimer', 1000)
    useEffect(() => {
      listenToEvent('timer')
    },[])
    console.log(lastTransmission)
*/

import { useState, useEffect } from 'react'
import openSocket from 'socket.io-client'


const useSocket = (subscriptionEventName, eventValue) => {
  // note: when I tested I had the socket connection opening up right below the import statements ie: not in the hook
  const socket = openSocket('http://localhost:8000')
  const [lastTransmission, setLastTransmission] = useState(null)

  useEffect(() => {
    socket.emit(subscriptionEventName, eventValue)
  },[])

  const listenToEvent = (eventName) => {
    socket.on(eventName, data => setLastTransmission(data))
  }

  return { lastTransmission, listenToEvent }
}

export { useSocket }
