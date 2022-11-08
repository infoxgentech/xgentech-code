/** @jsxImportSource theme-ui */
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useAuth } from '@chordcommerce/react-autonomy'
import { Box, Container, Flex, Spinner } from 'theme-ui'

const PrivateRoute = ({ children }) => {
  const { isLoggedIn, isFetching } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoggedIn && !isFetching) {
      router.push('/login')
    }
  }, [isLoggedIn, isFetching, router])

  if (!isLoggedIn && isFetching) {
    return (
      <Container>
        <Flex
          sx={{
            flexDirection: 'column',
            marginBottom: ['1.5rem', null, '4.5rem'],
            marginTop: ['0', null, '42px']
          }}
        >
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
        </Flex>
      </Container>
    )
  }

  if (!isLoggedIn && !isFetching) {
    return null
  }

  return children
}

export default PrivateRoute
