/** @jsxImportSource theme-ui */
import { Box, Container, Spinner } from 'theme-ui'

const PageSpinner = () => {
  return (
    <Container>
      <Box
        sx={{
          textAlign: 'center',
          width: '100%',
          backgroundColor: 'white',
          padding: ['10rem 1.25rem', '12rem 1.25rem'],
          marginRight: [null, '1rem'],
          marginBottom: ['1rem', null]
        }}
      >
        <Spinner size="50" />
      </Box>
    </Container>
  )
}

export default PageSpinner
