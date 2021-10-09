import React from 'react'
import App from './App'
import AppProviders from './context'
import {render, screen} from '@testing-library/react'

test('render home page successfully', () => {
  const Wrapper = ({children}) => <AppProviders>{children}</AppProviders>
  render(<App />, {wrapper: Wrapper})
  const message = screen.getByText(/welcome home/i)
  const realTimeMessage = screen.getByText(/real time/i)
  expect(message).toHaveTextContent('Welcome Home')
  expect(realTimeMessage).toHaveTextContent('Real Time bikes')
})
