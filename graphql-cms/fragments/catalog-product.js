import { IMAGE_FRAGMENT } from './image'

const CATALOG_PRODUCT_FRAGMENT = `
  mainImage {
    ${IMAGE_FRAGMENT}
  }
  name
  slug
  shortDescription
  vendor
  productType {
    name
  }
  giftCard
  sample
  hidden
  variantsCollection(limit: 15) {
    total
    items {
      name
      sku
      globalTradeItemNumber
      price
      regularPrice
      size
      weight
      optionValuesCollection(limit: 3) {
        items {
          name
          slug
          presentation
        }
      }
      mainImage {
        ${IMAGE_FRAGMENT}
      }
    }
  }
`

export { CATALOG_PRODUCT_FRAGMENT }
