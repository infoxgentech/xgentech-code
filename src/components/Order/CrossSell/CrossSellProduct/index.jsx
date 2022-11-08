/** @jsxImportSource theme-ui */
import ResponsiveImage from '~/components/Generic/Image'
import AddToCartButton from '../AddToCartButton'
import { Box, Card, Flex, Heading, Text } from 'theme-ui'

const CrossSellProduct = ({ product, onAddToCart, interval = null }) => {
  const { mainImage, name, shortDescription } = product
  const { items: variants } = product.variantsCollection

  // Select the first variant for demo purposes and artifically drop price by 15% which should match the set promotion.
  const { regularPrice, size, sku } = variants[0]
  const price = regularPrice - regularPrice * 0.15

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
        {mainImage && <ResponsiveImage image={mainImage} />}

        <Flex
          pt={['0.5rem', '0.5rem', '1.25rem']}
          sx={{
            justifyContent: 'flex-start',
            alignItems: 'left',
            flexDirection: 'column'
          }}
        >
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
          {shortDescription}
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
          {size && <Text>{size}</Text>}
        </Flex>
        <AddToCartButton
          price={price}
          quantity={1}
          regularPrice={regularPrice}
          sku={sku}
          sx={{ width: '100%' }}
          onAddToCart={onAddToCart}
          interval={interval}
        />
      </Box>
    </Card>
  )
}

export default CrossSellProduct
