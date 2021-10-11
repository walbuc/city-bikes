/** @jsxImportSource theme-ui */
import {FaSpinner} from 'react-icons/fa'
import styled from '@emotion/styled'
import {keyframes} from '@emotion/react'

const spin = keyframes({
  '0%': {transform: 'rotate(0deg)'},
  '100%': {transform: 'rotate(360deg)'},
})
const Spinner = styled(FaSpinner)({
  animation: `${spin} 1s linear infinite`,
})
Spinner.defaultProps = {
  'aria-label': 'loading',
}

function FullPageSpinner(props) {
  return (
    <div
      sx={{
        fontSize: '4em',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      {...props}
    >
      <Spinner />
    </div>
  )
}
export {Spinner, FullPageSpinner}
