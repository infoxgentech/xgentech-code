import React from 'react'
import { Grid } from 'theme-ui'
import ProductCard from '~/components/Product/Card'

const ProductList = ({ products }) => (
  <Grid
    columns={[1, 2, 3]}
    gap={['0.75rem', '2.25rem']}
    p={['0 0.5rem 2rem 0.5rem', '0 0 6.25rem 0']}
  >
    {products.map(product => (
      <ProductCard key={product.slug} product={product} />
    ))}
  </Grid>
)

export default ProductList
