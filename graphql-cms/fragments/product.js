import { IMAGE_FRAGMENT } from './image'
import { OPTION_TYPE_FRAGMENT } from './option-type'
import { QUOTE_FRAGMENT } from './quote'
import { RELATED_PRODUCT_FRAGMENT } from './related-product'
import { SUBSCRIPTION_FRAGMENT } from './subscription'
import { VARIANT_FRAGMENT } from './variant'

const PRODUCT_FRAGMENT = `
  name
  slug
  shortDescription
  longDescription
  ingredients
  directions
  mainImage {
    ${IMAGE_FRAGMENT}
  }
  quote {
    ${QUOTE_FRAGMENT}
  }
  optionTypesCollection(limit: 3) {
    items {
      ${OPTION_TYPE_FRAGMENT}
    }
  }
  variantsCollection(limit: 15) {
    total
    items {
      ${VARIANT_FRAGMENT}
    }
  }
  subscription {
    ${SUBSCRIPTION_FRAGMENT}
  }
  relatedProductsCollection(limit: 3) {
    items {
     ${RELATED_PRODUCT_FRAGMENT}
    }
  }
  imagesCollection(limit: 5) {
    items {
      ${IMAGE_FRAGMENT}
    }
  }
`
export { PRODUCT_FRAGMENT }
