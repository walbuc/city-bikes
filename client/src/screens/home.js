/** @jsxImportSource theme-ui */
import Layout from '../components/Layout'
import {Input, Button} from 'theme-ui'
import {ErrorBoundary} from 'react-error-boundary'
import {Button as HomeBtn, ErrorMessage} from '../components/Error'
import BikesList from '../components/BikesList'

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
      <h1>Welcome Home</h1>
      <p
        sx={{
          color: 'primary',
          fontSize: [2, 2, 3],
          mt: 2,
          pt: 2,
          borderTop: t => `1px solid ${t.colors.muted}`,
        }}
      >
        This page show home page.
      </p>
      <form>
        <Input />
        <Button sx={{bg: 'highlight'}}>This is a button</Button>
        <HomeBtn sx={{bg: 'highlight'}}>This is a button</HomeBtn>
      </form>
      <BikesList />
    </ErrorBoundary>
  </Layout>
)

export default HomePage
