/** @jsxImportSource theme-ui */
import { useState, Fragment } from 'react'
import { Button, Flex, Text, Spinner } from 'theme-ui'
import { useCart } from '@chordcommerce/react-autonomy'
import { useTranslate, useVariantAvailability } from '~/hooks'
import { toUsdCurrency } from '~/utils'

const ProductAddToCartButton = ({
  disabled = false,
  price,
  quantity,
  regularPrice,
  sku,
  ...props
}) => {
  const translate = useTranslate()
  const { addToCart } = useCart()

  const [buttonIsLoading, setButtonIsLoading] = useState(false)
  const [apiError, setApiError] = useState(null)

  const handleSubmit = async event => {
    if (event) event.preventDefault()
    if (disabled || isFetchingAvailability || !isAvailable) return

    setButtonIsLoading(true)
    setApiError(null)

    try {
      await addToCart({
        sku,
        quantity
      })
    } catch (error) {
      setApiError(translate('error.api.default'))
    }

    setButtonIsLoading(false)
  }

  const {
    isAvailable,
    isFetchingAvailability,
    error: availabilityError
  } = useVariantAvailability({
    sku
  })

  return (
    <form onSubmit={handleSubmit}>
      <Button
        disabled={disabled || isFetchingAvailability || !isAvailable}
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
            {(buttonIsLoading || isFetchingAvailability) && (
              <Spinner data-testid="spinner" size="15" color="inherit" />
            )}
            {!buttonIsLoading && !isFetchingAvailability && (
              <Fragment>
                {isAvailable
                  ? translate('product.add_to_cart')
                  : translate('product.sold_out')}
              </Fragment>
            )}
          </Flex>
          {!buttonIsLoading && !isFetchingAvailability && (
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
      {apiError && (
        <Text color="errorDark" variant="textLink" mt="1.5rem">
          {apiError.toString()}
        </Text>
      )}
      {availabilityError && (
        <Text color="errorDark" variant="textLink" mt="1.5rem">
          {availabilityError.toString()}
        </Text>
      )}
    </form>
  )
}

export default ProductAddToCartButton
