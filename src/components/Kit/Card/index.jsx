/** @jsxImportSource theme-ui */
import KitLink from '~/components/Kit/Link'
import ResponsiveImage from '~/components/Generic/Image'
import { Box, Card, Flex } from 'theme-ui'
import ChooseKitButton from '~/components/Kit/ChooseKitButton'
import ProductAddToCartButton from '~/components/Product/AddToCartButton'

const KitCard = ({ kit }) => {
  const { name, shortDescription, price, regularPrice, mainImage } = kit

  const { items: products } = kit.productsCollection

  const hasVariants =
    products.filter(p => p.variantsCollection.total > 1).length > 0

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
          flexDirection: 'column',
          paddingTop: ['6px', null, '12px'],
          paddingBottom: ['8px', '8px', '16px']
        }}
      >
        <KitLink kit={kit}>
          {mainImage && <ResponsiveImage image={mainImage} />}
        </KitLink>
        <Flex
          pt={['0.5rem', '0.5rem', '1.25rem']}
          sx={{
            justifyContent: 'flex-start',
            alignItems: 'left',
            flexDirection: 'column'
          }}
        >
          <KitLink
            kit={kit}
            sx={{
              display: 'block',
              textTransform: 'none',
              variant: ['text.h3', 'text.h3', 'text.h3'],
              textAlign: 'left',
              marginBottom: ['4px', null, '6px']
            }}
          >
            {name}
          </KitLink>
          <Box
            sx={{
              textAlign: 'left',
              variant: 'text.small'
            }}
          >
            {shortDescription}
          </Box>
        </Flex>
      </Flex>

      {hasVariants ? (
        <ChooseKitButton kit={kit} />
      ) : (
        <ProductAddToCartButton
          price={price}
          quantity={1}
          regularPrice={regularPrice}
          sku={products
            .map(({ variantsCollection }) => variantsCollection.items[0].sku)
            .sort()
            .join('|')}
          sx={{ width: '100%' }}
        />
      )}
    </Card>
  )
}

export default KitCard
