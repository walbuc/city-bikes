import * as React from 'react'
import ThemeProvider from './theme-context'
import {BikesProvider} from './BikesContext'

function AppProviders({children}) {
  return (
    <ThemeProvider>
      <BikesProvider>{children}</BikesProvider>
    </ThemeProvider>
  )
}

export default AppProviders
