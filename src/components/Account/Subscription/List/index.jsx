/** @jsxImportSource theme-ui */
import { Heading, Grid } from 'theme-ui'
import SubscriptionCard from '~/components/Account/Subscription/SubscriptionCard'
import { useTranslate } from '~/hooks'

const SubscriptionList = ({ subscriptions }) => {
  if (!subscriptions || subscriptions.length === 0) return <EmptyList />

  const sortedSubscriptions = subscriptions.sort(
    (subscription1, subscription2) => {
      return (
        new Date(subscription2.createdAt) - new Date(subscription1.createdAt)
      )
    }
  )

  return (
    <Grid columns={[1, 2, 3]} gap={'3rem'}>
      {sortedSubscriptions.map(subscription => (
        <SubscriptionCard key={subscription.id} subscription={subscription} />
      ))}
    </Grid>
  )
}

const EmptyList = () => {
  const translate = useTranslate()

  return (
    <Heading
      as="h2"
      sx={{
        textAlign: 'center',
        color: 'primary',
        variant: ['text.h3', 'text.h3', 'text.h2'],
        marginTop: ['16px', '16px', '36px'],
        marginBottom: ['16px', null, '32px']
      }}
    >
      {translate('subscriptions.no_subscriptions_yet')}
    </Heading>
  )
}

export default SubscriptionList
