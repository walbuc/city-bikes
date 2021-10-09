import * as React from 'react'
import ThemeProvider from './theme-context'

function AppProviders({children}) {
  return <ThemeProvider>{children}</ThemeProvider>
}

export default AppProviders
