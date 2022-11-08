/** @jsxImportSource theme-ui */
import { Button, Flex, Text } from 'theme-ui'
import { useTranslate } from '~/hooks'

const ShippingSummary = ({ subscription, openForm }) => {
  const translate = useTranslate()
  return (
    <Flex
      sx={{
        padding: '1rem',
        flexDirection: 'column',
        alignItems: 'center'
      }}
    >
      <Text m="2">{subscription.shipAddress.address1}</Text>
      <Text m="2">{subscription.shipAddress.address2}</Text>
      <Text m="2">{subscription.shipAddress.city}</Text>
      <Text m="2">{subscription.shipAddress.state.name} </Text>

      <Text m="2">
        <strong>{translate('subscriptions.next_shipment')} </strong>
        {subscription.state !== 'canceled'
          ? new Date(subscription.actionableDate).toLocaleDateString()
          : translate('subscriptions.cancelled')}
      </Text>

      <Button
        onClick={openForm}
        type="submit"
        sx={{
          width: '100%',
          display: 'block',
          fontSize: ['13px', null, '16px']
        }}
      >
        {translate('subscriptions.edit')}
      </Button>
    </Flex>
  )
}

export default ShippingSummary
