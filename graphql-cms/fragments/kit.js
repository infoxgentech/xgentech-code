import { IMAGE_FRAGMENT } from './image'
import { PRODUCT_FRAGMENT } from './product'
import { QUOTE_FRAGMENT } from './quote'
import { RELATED_PRODUCT_FRAGMENT } from './related-product'

const KIT_FRAGMENT = `
  name
  price
  regularPrice
  slug
  description
  shortDescription
  mainImage {
    ${IMAGE_FRAGMENT}
  }
  imagesCollection(limit: 3) {
    items {
      ${IMAGE_FRAGMENT}
    }
  }
  productsCollection(limit: 5) {
    total
    items {
      ${PRODUCT_FRAGMENT}
    }
  }
  ingredients
  quote {
    ${QUOTE_FRAGMENT}
  }
  relatedProductsCollection(limit: 3) {
    items {
      ${RELATED_PRODUCT_FRAGMENT}
    }
  }
`

export { KIT_FRAGMENT }
