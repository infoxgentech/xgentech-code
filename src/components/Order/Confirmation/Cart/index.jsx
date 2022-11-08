/** @jsxImportSource theme-ui */
import { Card } from 'theme-ui'
import LineItems from '~/components/Cart/LineItems'

const OrderConfirmationCart = ({ cart = {} }) => {
  const { lineItems } = cart

  return (
    <Card
      sx={{
        width: '100%',
        marginBottom: '1.5rem',
        padding: ['1.5rem 1rem', '2.5rem']
      }}
    >
      <LineItems items={lineItems} orderConfirmed={true} />
    </Card>
  )
}

export default OrderConfirmationCart
