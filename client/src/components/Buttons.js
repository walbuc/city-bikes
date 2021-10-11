/** @jsxImportSource theme-ui */
import {Button as ThemeButton} from '@theme-ui/components'
import {variant} from 'styled-system'
import styled from '@emotion/styled'

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
      px: 5,
      py: 3,
    },
    large: {
      fontSize: [4],
      px: 4,
      py: 4,
    },
  },
})

const Button = styled(ThemeButton)(size)

export {Button}
