/** @jsxImportSource theme-ui */
import { useRouter } from 'next/router'
import { Card, Flex, Button, Text } from 'theme-ui'
import { useTranslate } from '~/hooks'

const SubscriptionCard = ({ subscription }) => {
  const translate = useTranslate()
  const router = useRouter()

  const renewalDate =
    subscription.state !== 'canceled'
      ? new Date(subscription.actionableDate).toLocaleDateString()
      : translate('subscriptions.cancelled')

  return (
    <Card
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'left',
        flexDirection: 'column',
        maxWidth: '900px',
        padding: '2rem'
      }}
    >
      <Flex
        sx={{
          justifyContent: 'center',
          flexDirection: 'column'
        }}
      >
        <Text>{subscription.lineItems.map(li => li.sku).join(', ')}</Text>
        <Text>
          {translate('subscriptions.creation_date', {
            date: new Date(subscription.createdAt).toLocaleDateString()
          })}
        </Text>
        <Text>
          {translate('subscriptions.renewal_date', {
            date: renewalDate
          })}
        </Text>
        <Text>
          {translate('subscriptions.interval', {
            interval: subscription.interval
          })}
        </Text>

        <Button
          onClick={() => router.push(`/subscriptions/${subscription.id}`)}
          type="submit"
          sx={{
            width: '100%',
            display: 'block',
            fontSize: ['13px', null, '16px']
          }}
        >
          {translate('subscriptions.manage')}
        </Button>
      </Flex>
    </Card>
  )
}

export default SubscriptionCard
