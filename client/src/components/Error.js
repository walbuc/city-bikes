/** @jsxImportSource theme-ui */

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
      sx={{
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

export {FullPageErrorFallback, ErrorMessage}
