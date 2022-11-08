/** @jsxImportSource theme-ui */
import { Box } from 'theme-ui'
import { useTranslate } from '~/hooks'

const CollectionFilterBarProductCount = ({
  collections,
  currentCollection
}) => {
  const translate = useTranslate()

  let currentCollectionProductCount = 0

  if (currentCollection) {
    const { items: products } = currentCollection.productsCollection

    const productCount = products ? products.length : 0
    currentCollectionProductCount = productCount
  }

  const allProductCount = collections.reduce((acc, collection) => {
    const { items: products } = collection.productsCollection

    const productCount = products ? products.length : 0
    return acc + productCount
  }, 0)

  const productCount = currentCollection
    ? currentCollectionProductCount
    : allProductCount

  return (
    <Box
      sx={{
        display: ['none', 'block'],
        textAlign: 'right'
      }}
    >
      {productCount}{' '}
      {productCount === 1
        ? translate('product.singular')
        : translate('product.plural')}
    </Box>
  )
}

export default CollectionFilterBarProductCount
