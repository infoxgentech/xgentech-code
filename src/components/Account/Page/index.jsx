/** @jsxImportSource theme-ui */
import Link from '~/components/Generic/Link'
import { Box, Flex, Heading, Button } from 'theme-ui'
import { useAuth, useUser } from '@chordcommerce/react-autonomy'
import { useTranslate } from '~/hooks'

const AccountPage = () => {
  const translate = useTranslate()
  const { user } = useUser()
  const { logout } = useAuth()

  return (
    <Box
      sx={{
        margin: ['0 auto 1.5rem auto', null, '42px auto 4.5rem auto'],
        maxWidth: '600px'
      }}
    >
      <Flex
        sx={{
          display: 'grid',
          gridGap: 4,
          marginTop: ['0', null, '42px'],
          textAlign: ['center', null, 'left'],
          padding: ['24px 16px', null, '42px 36px']
        }}
      >
        <Heading
          as="h1"
          sx={{
            lineHeight: '1em',
            textAlign: 'left'
          }}
        >
          {translate('account.page_title')}: {user.data.email}
        </Heading>
        <Button as={Link} href="/profile">
          {translate('account.edit_profile')}
        </Button>
        <Button as={Link} href="/subscriptions">
          {translate('account.subscriptions')}
        </Button>
        <Button onClick={logout}>{translate('account.logout')}</Button>
      </Flex>
    </Box>
  )
}

export default AccountPage
