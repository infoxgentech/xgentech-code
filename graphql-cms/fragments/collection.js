import { CATALOG_PRODUCT_FRAGMENT } from './catalog-product'
import { CATALOG_KIT_FRAGMENT } from './catalog-kit'

const COLLECTION_FRAGMENT = `
  total
  items {
    name
    slug
    title
    productsCollection(limit: 50) {
      items {
        ${CATALOG_PRODUCT_FRAGMENT}
      }
    }
    kitsCollection(limit: 5) {
      items {
        ${CATALOG_KIT_FRAGMENT}
      }
    }
  }
`

export { COLLECTION_FRAGMENT }
