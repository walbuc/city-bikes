import React from 'react'
import {useBikes} from '../utils/hooks'

const BikesContext = React.createContext()

function BikesProvider(props) {
  const value = useBikes()
  return <BikesContext.Provider {...props} value={value} />
}

function useBikesContext() {
  const context = React.useContext(BikesContext)
  if (!context) {
    return new Error('useBikes must be used within a BikesContext.Provider')
  }
  return context
}

export {useBikesContext, BikesProvider}
