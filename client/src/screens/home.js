/** @jsxImportSource theme-ui */
import Layout from '../components/Layout'
import {Input, Button, select} from 'theme-ui'
import {ErrorBoundary} from 'react-error-boundary'
import {Button as HomeBtn, ErrorMessage} from '../components/Error'
import BikesMap from '../components/BikesMap'
import RePlay from '../components/RePlay'

function ErrorFallback({error}) {
  return (
    <ErrorMessage
      error={error}
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    />
  )
}

const HomePage = () => (
  <Layout>
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <h1>Welcome to City Bikes</h1>
      <p
        sx={{
          color: 'primary',
          fontSize: [2, 2, 3],
          mt: 2,
          mb: 4,
          pt: 2,
          borderTop: t => `1px solid ${t.colors.muted}`,
        }}
      >
        Live bikes stations status!
      </p>
      <RePlay />
      <BikesMap />
    </ErrorBoundary>
  </Layout>
)

export default HomePage
