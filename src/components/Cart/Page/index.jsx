import { useAnalytics, useCart } from '@chordcommerce/react-autonomy'
import { useEffect } from 'react'
import { getAllCartPromotionsForDisplay } from '~/utils/promotions'

import dynamic from 'next/dynamic'

const CartLoading = dynamic(() => import('~/components/Cart/Page/CartLoading'))
const CartEmpty = dynamic(() => import('~/components/Cart/Page/CartEmpty'))
const CartNotEmpty = dynamic(() =>
  import('~/components/Cart/Page/CartNotEmpty')
)

const CartPage = () => {
  const { cart, isLoaded, isFetching } = useCart()
  const { trackCartViewed } = useAnalytics()

  useEffect(() => {
    if (isLoaded) {
      trackCartViewed({
        products: cart?.lineItems ?? []
      })
    }
    // Only track isLoaded so that this only fires once.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoaded])

  const amountNeededForFreeShipping = parseFloat(
    process.env.FREE_SHIPPING_THRESHOLD
  )
  const eligibleForFreeShipping = amountNeededForFreeShipping === 0

  if (isFetching && cart?.lineItems && cart.lineItems.length === 0)
    return <CartLoading />
  if (!cart?.lineItems || cart.lineItems.length === 0) return <CartEmpty />

  const {
    displayTotalAvailableStoreCredit,
    displayTotal,
    displayItemTotal,
    displayTaxTotal,
    displayShipTotal,
    lineItems,
    number,
    email,
    state
  } = cart

  const promotions = getAllCartPromotionsForDisplay(cart)

  return (
    <CartNotEmpty
      displayTotalAvailableStoreCredit={displayTotalAvailableStoreCredit}
      lineItems={lineItems}
      displayTotal={displayTotal}
      displayItemTotal={displayItemTotal}
      displayTaxTotal={displayTaxTotal}
      displayShipTotal={displayShipTotal}
      promotions={promotions}
      orderNumber={number}
      orderEmail={email}
      orderStatus={state}
      amountNeededForFreeShipping={amountNeededForFreeShipping}
      eligibleForFreeShipping={eligibleForFreeShipping}
    />
  )
}

export default CartPage
