/** @jsxImportSource theme-ui */
import { Box, Flex, Heading } from 'theme-ui'
import { useTranslate } from '~/hooks'
import AccountProfileForm from './../Form'

const AccountProfilePage = () => {
  const translate = useTranslate()

  return (
    <Box
      sx={{
        margin: ['0 auto 1.5rem auto', null, '42px auto 4.5rem auto'],
        maxWidth: '600px'
      }}
    >
      <Flex
        sx={{
          flexDirection: 'column',
          marginBottom: ['1.5rem', null, '4.5rem'],
          marginTop: ['0', null, '42px'],
          textAlign: ['center', null, 'left'],
          padding: ['24px 16px', null, '42px 36px']
        }}
      >
        <Heading
          as="h1"
          sx={{
            lineHeight: '1em',
            textAlign: 'left',
            paddingBottom: '1rem',
            marginBottom: '1rem'
          }}
        >
          {translate('profile.page_title')}
        </Heading>
        <AccountProfileForm />
      </Flex>
    </Box>
  )
}

export default AccountProfilePage
