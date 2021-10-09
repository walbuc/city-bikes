/** @jsxImportSource theme-ui */

import {Button as ThemeButton} from '@theme-ui/components'
import {variant} from 'styled-system'
import styled from '@emotion/styled'

function ErrorMessage({error, ...props}) {
  return (
    <div role="alert" sx={{color: 'danger'}} {...props}>
      <span>There was an error: </span>
      <pre
        sx={{
          whiteSpace: 'break-spaces',
          margin: '0',
          marginBottom: -5,
          display: 'inline-block',
        }}
      >
        {error.message}
      </pre>
    </div>
  )
}

function FullPageErrorFallback({error}) {
  return (
    <div
      role="alert"
      css={{
        color: 'danger',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <p>Uh oh... There's a problem. Try refreshing the app.</p>
      <pre>{error.message}</pre>
    </div>
  )
}

export const BUTTON_MODIFIERS = {
  large: () => ({
    padding: [2, 3],
    fontSize: 3,
  }),
}

export const size = variant({
  prop: 'size',
  variants: {
    small: {
      fontSize: [1],
      px: 4,
      py: 2,
    },
    medium: {
      fontSize: [2],
      px: 6,
      py: 3,
    },
    large: {
      fontSize: [4],
      px: 3,
      py: 3,
    },
  },
})

const Button = styled(ThemeButton)(size)

export {FullPageErrorFallback, ErrorMessage, Button}
