import { IMAGE_FRAGMENT } from './image'
import { QUOTE_FRAGMENT } from './quote'

const PAGE_FRAGMENT = `
  name
  slug
  hero {
    name
    heading
    subheading
    image {
      ${IMAGE_FRAGMENT}
    }
  }
  sectionsCollection(limit: 3) {
    items {
      sys {
        id
      }
      title
      slug
      description
      mediaCollection(limit: 10) {
        items {
          __typename
          ... on Collection {
            sys {
              id
            }
            title
            slug
            description
            mainImage {
              ${IMAGE_FRAGMENT}
            }
          }
          ... on Article {
            sys {
              id
            }
            title
            slug
            description
            image {
              ${IMAGE_FRAGMENT}
            }
            source: author {
              name
            }
          }
          ... on Quote {
            ${QUOTE_FRAGMENT}
          }
          ... on ContentCard {
            sys {
              id
            }
            label
            title
            description
            media {
              ${IMAGE_FRAGMENT}
            }
          }
          ... on Product {
            mainImage {
              ${IMAGE_FRAGMENT}
            }
            name
            slug
            shortDescription
            variantsCollection(limit: 5) {
              items {
                name
                sku
                globalTradeItemNumber
                price
                regularPrice
                size
                weight
                mainImage {
                  ${IMAGE_FRAGMENT}
                }
              }
            }
          }
        }
      }
    }
  }
`
export { PAGE_FRAGMENT }
