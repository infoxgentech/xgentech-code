/** @jsxImportSource theme-ui */
import { useTranslate } from '~/hooks'
import { useCallback, useState } from 'react'
import { Box, Grid, Text } from 'theme-ui'
import IncludedProduct from '~/components/Kit/IncludedProduct'
import { objectCompare } from '~/utils/compare'

const IncludedProducts = ({ products = [], handleProductChange }) => {
  const translate = useTranslate()

  const [currentSelection, setCurrentSelection] = useState(
    products.map(p => ({
      slug: p.slug,
      sku: p.variantsCollection.items[0].sku
    }))
  )

  const onVariantChange = useCallback(
    (product, variant) => {
      const selection = { slug: product.slug, sku: variant.sku }

      const newSelection = currentSelection.map(x =>
        selection.slug === x.slug ? selection : x
      )

      if (!objectCompare(currentSelection, newSelection)) {
        setCurrentSelection(newSelection)
        handleProductChange(
          newSelection
            .map(({ sku }) => sku)
            .sort()
            .join('|')
        )
      }
    },
    [handleProductChange, currentSelection]
  )

  return (
    <Box py="1rem">
      <Text
        sx={{
          variant: 'text.body',
          marginBottom: '1rem'
        }}
      >
        {translate('product.included_products')}
      </Text>
      <Grid gap={[2, 3]} columns={1}>
        {products.map((product, index) => (
          <IncludedProduct
            key={index}
            product={product}
            handleVariantChange={onVariantChange}
          />
        ))}
      </Grid>
    </Box>
  )
}

export default IncludedProducts
