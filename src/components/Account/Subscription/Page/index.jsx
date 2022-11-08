/** @jsxImportSource theme-ui */
import { Container, Flex, Heading } from 'theme-ui'
import { useSubscriptions } from '@chordcommerce/react-autonomy'
import { useTranslate } from '~/hooks'
import SubscriptionList from '~/components/Account/Subscription/List'

const AccountSubscriptionPage = () => {
  const translate = useTranslate()
  const { subscriptions } = useSubscriptions()

  return (
    <Container>
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
          {translate('subscriptions.page_title')}
        </Heading>
        <SubscriptionList subscriptions={subscriptions} />
      </Flex>
    </Container>
  )
}

export default AccountSubscriptionPage
