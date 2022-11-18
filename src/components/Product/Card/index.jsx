/** @jsxImportSource theme-ui */
import ResponsiveImage from '~/components/Generic/Image'
import { Box, Card, Flex, Heading } from 'theme-ui'
import ProductAddToCartButton from '~/components/Product/AddToCartButton'
// import ProductChooseVariantButton from '~/components/Product/ChooseVariantButton'
import ProductQuantitySelector from '~/components/Product/QuantitySelector'
import ProductLink from '~/components/Product/Link'
import SubscriptionChooser from '~/components/Subscription/Chooser'

// import dynamic from 'next/dynamic';

// const ProductDetails = dynamic(() => import('~/components/Product/Details'))

const ProductCard = ({ product }) => {
  
  const { mainImage, name, shortDescription , subscription } = product
  // const { items: variants } = product.variantsCollection
  // const [variant, setVariant] = useState(variants)

  // each product have at least one variant (enforced by Contentful model)


  const { items: optionTypes } = product.variantsCollection || []
  const { items: variants } = product.variantsCollection || []
  
  const { price, regularPrice, size, sku } = variants[0];

  // get all the available choices from the variants

  return (
    <Card
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'left',
        flexDirection: 'column'
      }}
    >
      <Flex
        sx={{
          justifyContent: 'flex-start',
          flexDirection: 'column'
        }}
      >
        <ProductLink product={product}>
          {mainImage && <ResponsiveImage image={mainImage} />}
        </ProductLink>

        <Flex
          pt={['0.5rem', '0.5rem', '1.25rem']}
          sx={{
            justifyContent: 'flex-start',
            alignItems: 'left',
            flexDirection: 'column'
          }}
        >
          <ProductLink product={product}>
            <Heading
              as="h3"
              sx={{
                display: 'block',
                textTransform: 'none',
                variant: ['text.h3', 'text.h3', 'text.h3'],
                textAlign: 'left',
                marginBottom: ['4px', null, '6px']
              }}
            >
              {name}
            </Heading>
          </ProductLink>
          <ProductLink
            sx={{
              display: 'block',
              textTransform: 'none',
              variant: 'text.small',
              textAlign: 'left'
            }}
            product={product}
          >
            {shortDescription}
          </ProductLink>
        </Flex>
      </Flex>
      
      <Box>
        <Flex
          color="primary"
          sx={{
            justifyContent: 'space-between',
            paddingTop: ['6px', null, '12px'],
            paddingBottom: ['8px', '8px', '16px']
          }}
        >
          {size && (
            <ProductLink
              product={product}
              sx={{
                variant: 'text.navLink'
              }}
            >
              {size}
            </ProductLink>
          )}
        </Flex>
        {/* {variants.length === 1 ? (
          <ProductAddToCartButton
            price={price}
            quantity={1}
            regularPrice={regularPrice}
            sku={sku}
            sx={{ width: '100%' }}
          />
        ) : (
          <ProductChooseVariantButton product={product} />
        )} */}
        {/* {optionTypes && (
            <ProductOptions
              allOptions={allowedOptionTypes}
              currentValues={currentVariant.optionValuesCollection.items}
              handleChange={option => selectVariant(option)}
            />
            <h1>testdemo</h1>
          )} */}
          {subscription ? (
          <SubscriptionChooser
            subscription={subscription}
            regularPrice={regularPrice}
            price={price}
            sku={sku}
          />
        ) : (
          <Flex
            py="3"
            sx={{
              display: 'inline-flex'
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
              sku={sku}
            />
          </Flex>
        )}
      </Box>
    </Card>
  )
}

export default ProductCard
