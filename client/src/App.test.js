import React from 'react'
import App from './App'
import AppProviders from './context'
import {render, screen} from '@testing-library/react'

test('render home page successfully', () => {
  const Wrapper = ({children}) => <AppProviders>{children}</AppProviders>
  render(<App />, {wrapper: Wrapper})
  const message = screen.getByText(/welcome to city bikes/i)
  const realTimeMessage = screen.getByText(/real time bikes/i)
  expect(message).toHaveTextContent('Welcome to City Bikes')
  expect(realTimeMessage).toHaveTextContent('Real Time bikes')
})
