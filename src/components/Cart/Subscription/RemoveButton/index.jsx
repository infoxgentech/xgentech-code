import { useCart } from '@chordcommerce/react-autonomy'
import { useTranslate } from '~/hooks'
import React, { useEffect, useState } from 'react'
import { Button, Spinner, Text } from 'theme-ui'

const SubscriptionRemoveButton = ({ lineItemId }) => {
  const translate = useTranslate()

  const { removeFromCart } = useCart()
  const [buttonIsLoading, setButtonIsLoading] = useState(false)
  const [apiError, setApiError] = useState(null)

  useEffect(() => setButtonIsLoading(false), [lineItemId])

  const handleSubmit = async event => {
    if (event) event.preventDefault()

    setButtonIsLoading(true)
    setApiError(null)

    try {
      await removeFromCart({ lineItemId })
    } catch (error) {
      setApiError(translate('error.api.default'))
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Button type="submit" sx={{ flexShrink: 0 }}>
        {translate('subscriptions.remove_from_cart')}
        {buttonIsLoading && <Spinner size="15" color="inherit" />}
      </Button>
      {apiError && (
        <Text color="errorDark" variant="textLink" mt="1.5rem">
          {apiError.toString()}
        </Text>
      )}
    </form>
  )
}

export default SubscriptionRemoveButton
