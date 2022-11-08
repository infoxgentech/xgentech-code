/** @jsxImportSource theme-ui */
import { useTranslate } from '~/hooks'
import { Flex, Text } from 'theme-ui'

const SubscriptionDetails = ({
  subscription,
  singleDisplayAmount,
  displayAmount
}) => {
  const translate = useTranslate()

  const { quantity, intervalLength, intervalUnits } = subscription

  return (
    <Flex
      sx={{
        alignItems: 'flex-start',
        textAlign: 'left',
        flexDirection: 'column',
        marginTop: '1rem',
        marginBottom: '1rem'
      }}
    >
      <Text
        sx={{
          marginBottom: '0.5rem',
          variant: 'text.body'
        }}
      >
        {translate('subscriptions.items', {
          total_price: displayAmount,
          quantity: quantity,
          unit_price: singleDisplayAmount
        })}
      </Text>

      <Text
        sx={{
          marginBottom: '0.5rem',
          variant: 'text.body'
        }}
      >
        {translate('subscriptions.auto_renew_interval', {
          length: intervalLength,
          unit: intervalLength === 1 ? intervalUnits : `${intervalUnits}s`
        })}
      </Text>
    </Flex>
  )
}

export default SubscriptionDetails
