import { PRODUCT_FRAGMENT } from 'graphql-cms/fragments'
import { fetchGraphQL } from '../api'

export const getProducts = async () => {
  const query = `query {
    productCollection(where: { slug_exists: true }) {
      items {
        ${PRODUCT_FRAGMENT}
      }
    }
  }`

  const response = await fetchGraphQL(query)

  const products = response.data.productCollection.items
    ? response.data.productCollection.items
    : []

  return products
}

export const getProduct = async ({ slug }) => {
  const query = `query {
    productCollection(where: {slug: "${slug}" }, limit: 1)  {
      items {
        ${PRODUCT_FRAGMENT}
      }
    }
  }`

  const response = await fetchGraphQL(query)

  const product = response.data.productCollection.items
    ? response.data.productCollection.items[0]
    : null

  return product
}
