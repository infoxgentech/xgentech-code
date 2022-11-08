import { PAGE_FRAGMENT } from 'graphql-cms/fragments'
import { fetchGraphQL } from '../api'

export const getPages = async () => {
  const query = `query {
    pageCollection(where: { slug_exists: true }) {
      items {
        ${PAGE_FRAGMENT}
      }
    }
  }`

  const response = await fetchGraphQL(query)

  const pages = response.data.pageCollection.items
    ? response.data.pageCollection.items
    : []

  return pages
}

export const getPage = async ({ slug }) => {
  const query = `query {
    pageCollection(where: {slug: "${slug}" }, limit: 1)  {
      items {
        ${PAGE_FRAGMENT}
      }
    }
  }`

  const response = await fetchGraphQL(query)

  const page = response.data.pageCollection.items
    ? response.data.pageCollection.items[0]
    : null

  return page
}
