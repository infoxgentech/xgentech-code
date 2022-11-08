import { IMAGE_FRAGMENT } from './image'
import { CATALOG_PRODUCT_FRAGMENT } from './catalog-product'

const CATALOG_KIT_FRAGMENT = `
  mainImage {
    ${IMAGE_FRAGMENT}
  }
  name
  price
  regularPrice
  shortDescription
  slug
  productsCollection(limit: 3) {
    items {
      ${CATALOG_PRODUCT_FRAGMENT}
    }
  }
`

export { CATALOG_KIT_FRAGMENT }
