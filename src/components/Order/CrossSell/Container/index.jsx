/** @jsxImportSource theme-ui */
import { Card, Text, Grid } from 'theme-ui'
import { useTranslate } from '~/hooks'
import { Ticker } from '~/components/Generic/Ticker'
import CheckoutButton from '../CheckoutButton'
import CrossSellProduct from '../CrossSellProduct'
import { useState } from 'react'

const CrossSellContainer = ({
  cart = {},
  setCart,
  setShowCrossSell,
  collections
}) => {
  const translate = useTranslate()
  const { crossSellDetails } = cart

  const [lineItemsAttributes, setLineItemsAttributes] = useState([])

  const onAddToCart = lineItem => {
    setLineItemsAttributes(state => {
      return [...state, lineItem]
    })
  }

  const futureDate =
    crossSellDetails.crossSellable && new Date(crossSellDetails.crossSellEndsAt)

  // Selected first collection for demo purposes
  const selectedCollection = collections[0]
  const { items: products } = selectedCollection.productsCollection
  const selectedProducts = [products.at(-1)]
  const selectedSubscriptions = [products[0]]
  const subscriptionsInterval = { length: 1, unit: 'month' }

  return (
    crossSellDetails.crossSellable && (
      <Card
        sx={{
          width: '100%',
          marginBottom: '1.5rem',
          padding: ['32px 18px', '2.5rem']
        }}
      >
        <Text as="p" sx={{ marginBottom: '0.5rem' }}>
          <strong>{translate('confirmation.limited_offer')}</strong> -{' '}
          {translate('confirmation.limited_offer_text', { off_text: '15%' })}
          <Ticker styles={{ color: '#9F1908' }} futureDate={futureDate} />
        </Text>
        {selectedProducts && selectedProducts.length > 0 && (
          <Grid
            columns={[1, 2]}
            gap={['0.75rem', '2.25rem']}
            p={['0 0.5rem 2rem 0.5rem', '0 0 2.25rem 0']}
          >
            {selectedProducts.map(product => (
              <CrossSellProduct
                key={product.slug}
                product={product}
                onAddToCart={onAddToCart}
              />
            ))}
            {selectedSubscriptions.map(product => (
              <CrossSellProduct
                key={product.slug}
                product={product}
                onAddToCart={onAddToCart}
                interval={subscriptionsInterval}
              />
            ))}
          </Grid>
        )}
        <CheckoutButton
          cart={cart}
          lineItemsAttributes={lineItemsAttributes}
          setCart={setCart}
          setShowCrossSell={setShowCrossSell}
        ></CheckoutButton>
      </Card>
    )
  )
}

export default CrossSellContainer
