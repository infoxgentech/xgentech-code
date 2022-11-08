/** @jsxImportSource theme-ui */
import { Fragment, useCallback, useState } from 'react'
import { Button, Flex, Text, Spinner } from 'theme-ui'
import { useTranslate, useVariantAvailability } from '~/hooks'
import { toUsdCurrency } from '~/utils'

const AddToCartButton = ({
  onAddToCart,
  disabled = false,
  price,
  quantity,
  regularPrice,
  sku,
  interval = null,
  ...props
}) => {
  const translate = useTranslate()

  const [addedToCart, setAddedToCart] = useState(false)

  const {
    isAvailable,
    isFetchingAvailability,
    error: availabilityError
  } = useVariantAvailability({
    sku
  })

  const subscriptionAttributes = (sku, quantity, interval) => ({
    sku: sku,
    quantity: quantity,
    subscription_line_items_attributes: [
      {
        interval_length: interval.length,
        interval_units: interval.unit
      }
    ]
  })

  const isDisabled = disabled || isFetchingAvailability || !isAvailable

  const handleClick = useCallback(() => {
    if (isDisabled) return

    const data = interval
      ? subscriptionAttributes(sku, quantity, interval)
      : { sku, quantity }

    setAddedToCart(true)
    onAddToCart(data)
  }, [isDisabled, interval, onAddToCart, quantity, sku])

  return (
    <>
      <Button
        onClick={handleClick}
        disabled={isDisabled}
        {...props}
        p={0}
        type="submit"
        sx={{
          width: '100%',
          display: 'block',
          fontSize: ['13px', null, '16px']
        }}
      >
        <Flex sx={{ height: '100%' }}>
          <Flex
            sx={{
              alignItems: 'center',
              flexGrow: 1,
              height: '100%',
              justifyContent: 'center',
              padding: ['0 16px', null, '0 32px']
            }}
          >
            {isFetchingAvailability && (
              <Spinner data-testid="spinner" size="15" color="inherit" />
            )}
            {!isFetchingAvailability && (
              <Fragment>
                {!isAvailable
                  ? translate('product.sold_out')
                  : addedToCart
                  ? translate('product.added_to_cart')
                  : interval
                  ? translate('subscriptions.subscribe')
                  : translate('product.add_to_cart')}
              </Fragment>
            )}
          </Flex>
          {!isFetchingAvailability && (
            <Flex
              sx={{
                height: '100%',
                alignItems: 'center',
                backgroundColor: 'accent',
                padding: ['0 16px', null, '0 32px']
              }}
            >
              {regularPrice !== price ? (
                <Flex
                  sx={{
                    height: '100%',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    padding: '10px 0'
                  }}
                >
                  <Text
                    sx={{
                      textDecoration: 'line-through',
                      color: 'white',
                      opacity: '.7',
                      variant: 'text.formLabel',
                      lineHeight: ['10px', null, '12px'],
                      marginTop: ['4px', null, '0']
                    }}
                  >
                    {toUsdCurrency(regularPrice)}
                  </Text>
                  <Text sx={{ lineHeight: '1.5rem' }}>
                    {toUsdCurrency(price)}
                  </Text>
                </Flex>
              ) : (
                <Text>{toUsdCurrency(price)}</Text>
              )}
            </Flex>
          )}
        </Flex>
      </Button>
      {availabilityError && (
        <Text color="errorDark" variant="textLink" mt="1.5rem">
          {availabilityError.toString()}
        </Text>
      )}
    </>
  )
}

export default AddToCartButton
