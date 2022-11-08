/** @jsxImportSource theme-ui */
import { useState } from 'react'
import { useCart, useCheckout } from '@chordcommerce/react-autonomy'
import { useTranslate } from '~/hooks'
import { Button, Text, Spinner } from 'theme-ui'
import { loadStripe } from '@stripe/stripe-js'

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
const stripePromise = loadStripe(process.env.STRIPE_PK_KEY, {
  stripeAccount: process.env.STRIPE_CONNECTED_ACCOUNT
})

const CheckoutButton = ({ giftCardFormInput }) => {
  const { modifyGiftCards } = useCart()
  const { prepareCheckout } = useCheckout()
  const translate = useTranslate()
  const [buttonIsLoading, setButtonIsLoading] = useState(false)
  const [apiError, setApiError] = useState(null)
  const giftCardsDetails = Object.values(giftCardFormInput)
  const giftCardsFilled = giftCardsDetails.every(
    form => form.recipientEmail != ''
  )

  const handleSubmit = async event => {
    if (event) event.preventDefault()

    setButtonIsLoading(true)
    setApiError(null)

    try {
      await modifyGiftCards({
        giftCards: {
          giftCardsDetails
        }
      })

      const cart = await prepareCheckout()

      const stripe = await stripePromise
      stripe.redirectToCheckout({
        sessionId: cart.checkoutSessionId
      })
    } catch (error) {
      if (giftCardsFilled) {
        setApiError(translate('error.api.default'))
        console.error(error)
      } else {
        setApiError(translate('gift_card.gift_recipients_missing'))
      }
    }

    setButtonIsLoading(false)
  }

  return (
    <form onSubmit={handleSubmit}>
      <Button
        sx={{
          marginTop: '1rem',
          width: '100%'
        }}
      >
        {buttonIsLoading && (
          <Spinner data-testid="spinner" size="15" color="inherit" />
        )}

        {!buttonIsLoading && (
          <Text variant="link">{translate('cart.checkout')}</Text>
        )}
      </Button>

      {apiError && (
        <Text color="errorDark" variant="textLink" mt="1.5rem">
          {apiError}
        </Text>
      )}
    </form>
  )
}

export default CheckoutButton
