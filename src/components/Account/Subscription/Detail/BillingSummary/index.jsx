/** @jsxImportSource theme-ui */
import { Button, Flex, Text } from 'theme-ui'
import { useTranslate } from '~/hooks'

const BillingSummary = ({ subscription, openForm }) => {
  const translate = useTranslate()

  return (
    <Flex
      sx={{
        padding: '1rem',
        flexDirection: 'column',
        alignItems: 'center'
      }}
    >
      <Text m="2">{subscription.billAddress.address1}</Text>
      <Text m="2">{subscription.billAddress.address2}</Text>

      <Text m="2">{subscription.billAddress.city}, </Text>
      <Text m="2"> {subscription.billAddress.state.name}</Text>

      <Text m="2">
        <Text>
          <strong>{translate('subscriptions.payment_method')} </strong>
          XXXX XXXX XXXX {subscription.payment.source.lastDigits}
        </Text>
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

export default BillingSummary
