/** @jsxImportSource theme-ui */
import Link from '~/components/Generic/Link'
import { Box, Button, Container, Text, Flex, Heading } from 'theme-ui'
import { useTranslate } from '~/hooks'

const ErrorNotFoundPage = ({ title }) => {
  const translate = useTranslate()

  return (
    <Box>
      <Container>
        <Flex
          sx={{
            alignItems: 'center',
            padding: ['3rem 0', '8rem 0'],
            flexDirection: 'column',
            minHeight: '80vh',
            textAlign: 'center',
            maxWidth: '850px',
            margin: 'auto'
          }}
        >
          <Heading as="h1" variant="h1" sx={{ marginBottom: '2rem' }}>
            {title ? title : translate('error.not_found.title')}
          </Heading>
          <Text sx={{ marginBottom: ['2rem', null, '4rem'] }}>
            {translate('error.not_found.text')}{' '}
            <Link href="/" sx={{ textDecoration: 'underline' }}>
              {translate('error.not_found.text_homepage_link')}
            </Link>
            .
          </Text>
          <Button as={Link} href="/shop">
            {translate('error.not_found.cta')}
          </Button>
        </Flex>
      </Container>
    </Box>
  )
}

export default ErrorNotFoundPage
