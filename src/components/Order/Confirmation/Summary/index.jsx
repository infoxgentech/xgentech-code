/** @jsxImportSource theme-ui */
import { Card } from 'theme-ui'
import CartSummary from '~/components/Cart/Summary'
import { getAllCartPromotionsForDisplay } from '~/utils/promotions'

const OrderConfirmationSummary = ({ cart = {} }) => {
  const { displayTotal, displayItemTotal, displayTaxTotal, displayShipTotal } =
    cart

  const promotions = getAllCartPromotionsForDisplay(cart)

  return (
    <Card
      sx={{
        width: '100%',
        marginBottom: '1.5rem',
        padding: ['32px 18px', '1.5rem']
      }}
    >
      <CartSummary
        displayItemTotal={displayItemTotal}
        displayTaxTotal={displayTaxTotal}
        displayShipTotal={displayShipTotal}
        displayTotal={displayTotal}
        promotions={promotions}
        orderConfirmed={true}
      />
    </Card>
  )
}

export default OrderConfirmationSummary
