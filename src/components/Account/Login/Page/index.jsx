/** @jsxImportSource theme-ui */
import { Box, Heading } from 'theme-ui'
import { useRouter } from 'next/router'
import { useTranslate } from '~/hooks'
import AuthLoginForm from '~/components/Auth/LoginForm'

const AccountLoginPage = () => {
  const translate = useTranslate()
  const router = useRouter()

  const onLogin = () => {
    router.push('/account')
  }

  return (
    <Box
      sx={{
        margin: ['0 auto 1.5rem auto', null, '42px auto 4.5rem auto'],
        maxWidth: '600px'
      }}
    >
      <Heading
        as="h1"
        variant="h1"
        sx={{
          textAlign: 'center',
          marginTop: ['16px', null, '36px'],
          marginBottom: ['8px', null, '32px']
        }}
      >
        {translate('login.page_title')}
      </Heading>
      <Box
        sx={{
          margin: ['0 auto 1.5rem auto', null, '42px auto 4.5rem auto'],
          maxWidth: '600px'
        }}
      >
        <AuthLoginForm onSuccess={onLogin} />
      </Box>
    </Box>
  )
}

export default AccountLoginPage
