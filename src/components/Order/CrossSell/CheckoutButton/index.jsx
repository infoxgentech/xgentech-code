/** @jsxImportSource theme-ui */
import { useState, useEffect, useCallback } from 'react'
import { useCart } from '@chordcommerce/react-autonomy'
import { useTranslate } from '~/hooks'
import { Button, Text, Spinner } from 'theme-ui'

const CheckoutButton = ({
  cart,
  lineItemsAttributes,
  setCart,
  setShowCrossSell
}) => {
  const { addCrossSell } = useCart()
  const translate = useTranslate()
  const [buttonIsLoading, setButtonIsLoading] = useState(false)
  const [apiError, setApiError] = useState(null)

  // cleanup on unmount
  useEffect(() => {
    return () => {
      setApiError(null)
      setButtonIsLoading(false)
    }
  }, [])

  const handleClick = useCallback(async () => {
    setButtonIsLoading(true)
    setApiError(null)

    try {
      const response = await addCrossSell({
        cart: {
          number: cart.number,
          token: cart.token
        },
        lineItemsAttributes
      })

      setCart(response.data)
      setShowCrossSell(false)
    } catch (error) {
      setApiError(translate('error.api.default'))
    }

    setButtonIsLoading(false)
  }, [
    addCrossSell,
    cart,
    lineItemsAttributes,
    translate,
    setCart,
    setShowCrossSell
  ])

  return (
    <>
      <Button
        onClick={handleClick}
        sx={{
          marginTop: '1rem',
          width: '100%'
        }}
      >
        {buttonIsLoading && (
          <Spinner data-testid="spinner" size="15" color="inherit" />
        )}

        {!buttonIsLoading && (
          <Text variant="link"> {translate('confirmation.add_to_order')}</Text>
        )}
      </Button>

      {apiError && (
        <Text color="errorDark" variant="textLink" mt="1.5rem">
          {apiError}
        </Text>
      )}
    </>
  )
}

export default CheckoutButton
