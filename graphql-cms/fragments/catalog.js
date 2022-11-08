import { CATALOG_KIT_FRAGMENT } from './catalog-kit'
import { CATALOG_PRODUCT_FRAGMENT } from './catalog-product'

const CATALOG_FRAGMENT = `
  sys {
    id
  }
  name
  slug
  collectionsCollection(limit: 20) {
    items {
      name
      slug
      title
      productsCollection(limit: 20) {
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
  }
`
export { CATALOG_FRAGMENT }
