/** @jsxImportSource theme-ui */
import {ThemeProvider} from 'theme-ui'
import theme from './theme'

export default function ThemeProviderWrapper({children}) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}
