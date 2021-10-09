/** @jsxImportSource theme-ui */
import {Fragment} from 'react'
import {Global} from '@emotion/react'

const Layout = ({children}) => (
  <Fragment>
    <Global styles={{body: {margin: 0}}} />
    <header
      sx={{bg: 'primary', color: 'background', fontFamily: 'heading', p: 3}}
    >
      Real Time bikes
    </header>
    <main sx={{mx: 'auto', maxWidth: 960, width: '90vw'}}>{children}</main>
  </Fragment>
)

export default Layout
