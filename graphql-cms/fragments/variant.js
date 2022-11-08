import { IMAGE_FRAGMENT } from './image'
import { OPTION_VALUE_FRAGMENT } from './option-value'

const VARIANT_FRAGMENT = `
  name
  sku
  globalTradeItemNumber
  price
  regularPrice
  size
  weight
  optionValuesCollection(limit: 5) {
    items {
      ${OPTION_VALUE_FRAGMENT}
    }
  }
  mainImage {
    ${IMAGE_FRAGMENT}
  }
  imagesCollection(limit: 5) {
    items {
      ${IMAGE_FRAGMENT}
    }
  }
`

export { VARIANT_FRAGMENT }
