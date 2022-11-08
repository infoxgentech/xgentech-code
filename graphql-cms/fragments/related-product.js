import { IMAGE_FRAGMENT } from './image'

const RELATED_PRODUCT_FRAGMENT = `
  __typename

  ... on Product {
    name
    slug
    shortDescription
    mainImage {
      ${IMAGE_FRAGMENT}
    }
    variantsCollection(limit: 1) {
      total
      items {
        sku
        price
        regularPrice
        size
      }
    }
  }

  ... on Kit {
    name
    price
    regularPrice
    slug
    shortDescription
    ingredients
    mainImage {
      ${IMAGE_FRAGMENT}
    }
    productsCollection(limit: 3) {
      items {
        variantsCollection(limit: 15) {
          total
          items {
            sku
          }
        }
      }
    }
  }
`

export { RELATED_PRODUCT_FRAGMENT }
