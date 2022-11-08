/** @jsxImportSource theme-ui */
import ResponsiveImage from '~/components/Generic/Image'
import { Box, Card, Flex, Heading } from 'theme-ui'
import ProductAddToCartButton from '~/components/Product/AddToCartButton'
import ProductChooseVariantButton from '~/components/Product/ChooseVariantButton'
import ProductLink from '~/components/Product/Link'
// import dynamic from 'next/dynamic';

// const ProductDetails = dynamic(() => import('~/components/Product/Details'))

const ProductCard = ({ product }) => {
  const { mainImage, name, shortDescription } = product
  const { items: variants } = product.variantsCollection
  // const [variant, setVariant] = useState(variants)

  // each product have at least one variant (enforced by Contentful model)
  const { price, regularPrice, size, sku } = variants[0]

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
      {/* <Box>
      <ProductDetails
            product={product}
            sx={{
              maxWidth: ['100%', '100%', '50%'],
              paddingLeft: ['1rem', null, '2rem'],
              paddingRight: ['1rem', null, '2rem']
            }}
            handleVariantChange={variant => setVariant(variant)}
          />
      </Box> */}
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
        {variants.length === 1 ? (
          <ProductAddToCartButton
            price={price}
            quantity={1}
            regularPrice={regularPrice}
            sku={sku}
            sx={{ width: '100%' }}
          />
        ) : (
          <ProductChooseVariantButton product={product} />
        )}
      </Box>
    </Card>
  )
}

export default ProductCard
