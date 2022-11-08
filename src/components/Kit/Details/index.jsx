/** @jsxImportSource theme-ui */
import { useState } from 'react'
import { Box, Flex, Heading } from 'theme-ui'
import ReactMarkdown from 'react-markdown'
import IncludedProducts from '~/components/Kit/IncludedProducts'
import ProductAddToCartButton from '~/components/Product/AddToCartButton'
import ProductIngredients from '~/components/Product/Ingredients'
import ProductOutOfStock from '~/components/Product/OutOfStock'
import ProductQuantitySelector from '~/components/Product/QuantitySelector'
import { useVariantAvailability } from '~/hooks'

const KitDetails = ({ kit, ...props }) => {
  const { name, description, price, regularPrice, ingredients = null } = kit

  const { items: products } = kit.productsCollection

  const [selectedQuantity, setSelectedQuantity] = useState(1)

  // Initialize the current sku with the first variant available
  // for each product in the kit
  const [currentSku, setCurrentSku] = useState(
    products
      .map(({ variantsCollection }) => variantsCollection.items[0].sku)
      .sort()
      .join('|')
  )

  const { isAvailable } = useVariantAvailability({
    sku: currentSku
  })

  return (
    <Box
      {...props}
      sx={{
        textAlign: ['center', null, 'left'],
        margin: 'auto',
        marginTop: ['8px', null, '48px'],
        maxWidth: ['650px !important', null, '50% !important']
      }}
    >
      <Heading
        as="h1"
        variant="h2"
        sx={{
          marginTop: ['20px', null, '0'],
          marginBottom: ['4px', null, '24px'],
          maxWidth: ['100%', null, '75%']
        }}
      >
        {name}
      </Heading>

      <Flex
        py="3"
        sx={{
          display: 'inline-flex',
          marginLeft: ['-10px', null, 0]
        }}
      >
        <ProductQuantitySelector
          handleChange={value => setSelectedQuantity(parseInt(value))}
        />
        <ProductAddToCartButton
          sx={{
            marginLeft: ['12px', null, '16px']
          }}
          price={price}
          quantity={selectedQuantity}
          regularPrice={regularPrice}
          sku={currentSku}
        />
      </Flex>

      {!isAvailable && <ProductOutOfStock product={kit} />}

      {description && (
        <div
          sx={{
            '& p': {
              marginTop: '8px',
              marginBottom: '28px'
            }
          }}
        >
          <ReactMarkdown>{description}</ReactMarkdown>
        </div>
      )}

      {products && (
        <IncludedProducts
          products={products}
          handleProductChange={setCurrentSku}
        />
      )}

      {ingredients && <ProductIngredients ingredients={ingredients} />}
    </Box>
  )
}

export default KitDetails
