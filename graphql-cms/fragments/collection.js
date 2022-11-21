import { CATALOG_PRODUCT_FRAGMENT } from './catalog-product'
import { CATALOG_KIT_FRAGMENT } from './catalog-kit'
import { SUBSCRIPTION_FRAGMENT } from './subscription';

const COLLECTION_FRAGMENT = `
  total
  items {
    name
    slug
    title
    productsCollection(limit: 50) {
      items {
        ${CATALOG_PRODUCT_FRAGMENT}
        subscription {
          ${SUBSCRIPTION_FRAGMENT}
        }
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
