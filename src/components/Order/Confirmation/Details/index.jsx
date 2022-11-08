/** @jsxImportSource theme-ui */
import { Card, Heading, Box, Text } from 'theme-ui'
import { useTranslate } from '~/hooks'

const OrderConfirmationDetails = ({ cart = {} }) => {
  const translate = useTranslate()

  const { email, number, payments, shipAddress } = cart

  return (
    <Card
      sx={{
        width: '100%',
        marginBottom: '1.5rem',
        padding: ['32px 18px', '2.5rem']
      }}
    >
      <Heading
        as="h3"
        variant="h3"
        sx={{ marginBottom: ['1.5rem', null, '3rem'] }}
      >
        {translate('confirmation.text')} <strong>{number}</strong>
      </Heading>

      <Heading as="p" variant="link" sx={{ marginBottom: '0.5rem' }}>
        {translate('confirmation.details.title')}
      </Heading>

      <Text as="p" sx={{ marginBottom: '0.5rem' }}>
        {translate('confirmation.details.text')} <strong>{email}</strong>.
      </Text>

      <Text
        as="p"
        variant="small"
        sx={{ marginBottom: ['2rem', null, '3rem'] }}
      >
        {translate('confirmation.details.subtitle')}
      </Text>

      <Heading as="p" variant="link" sx={{ marginBottom: '0.5rem' }}>
        {translate('confirmation.details.shipping')}
      </Heading>

      <Text as="p" sx={{ marginBottom: ['2rem', null, '3rem'] }}>
        {shipAddress.fullName}
        <br />
        {shipAddress.address1},{' '}
        {shipAddress.address2 && `${shipAddress.address2}, `}
        {shipAddress.city}, {shipAddress.stateText}, {shipAddress.zipcode}
      </Text>

      {payments && payments.length > 0 && (
        <Box>
          <Heading as="p" variant="link" sx={{ marginBottom: '0.5rem' }}>
            {translate('confirmation.details.payment')}
          </Heading>

          {payments
            .filter(p => p.state === 'completed')
            .map(payment => {
              if (payment.sourceType === 'Spree::CreditCard') {
                return (
                  <Text
                    as="p"
                    sx={{ textTransform: 'capitalize' }}
                    key={payment.id}
                  >
                    {payment.source.ccType} (**** {payment.source.lastDigits})
                  </Text>
                )
              }
              return null
            })}
        </Box>
      )}
    </Card>
  )
}

export default OrderConfirmationDetails
