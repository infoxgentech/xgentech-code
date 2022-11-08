import React from 'react'
import { Box, Grid, Heading } from 'theme-ui'
import ProductCard from '~/components/Product/Card'
import KitCard from '~/components/Kit/Card'
import { useTranslate } from '~/hooks'

const renderGridItems = items => {
  return items.map(item => {
    switch (item.__typename) {
      case 'Product':
        return <ProductCard key={item.slug} product={item} />

      case 'Kit':
        return <KitCard key={item.slug} kit={item} />

      default:
        return null
    }
  })
}

const RelatedProducts = ({ products = [] }) => {
  const translate = useTranslate()
  return (
    <Box
      sx={{
        textAlign: 'center',
        marginTop: ['32px', null, '60px'],
        marginBottom: ['16', null, '32ppx']
      }}
    >
      <Heading
        as="h2"
        variant="h2"
        sx={{
          marginBottom: ['16px', '32px', '60px']
        }}
      >
        {translate('product.related_products')}
      </Heading>
      <Grid
        columns={[1, 2, 3]}
        gap={['0.75rem', '2.25rem']}
        p={['0 0.5rem 2rem 0.5rem', '0 0 6.25rem 0']}
      >
        {renderGridItems(products)}
      </Grid>
    </Box>
  )
}

export default RelatedProducts
