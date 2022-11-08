import { fetchGraphQL } from '../api'
import { COLLECTION_FRAGMENT } from 'graphql-cms/fragments'

const PAGE_SIZE = 1

export const getCatalog = async ({ slug }) => {
  const totalCollections = await getNumberOfCollectionsInCatalog({ slug })
  const totalPages = Math.ceil(totalCollections / PAGE_SIZE)
  const collections = await Promise.all(
    [...Array(totalPages).keys()]
      .map(p => p + 1)
      .map(page => getPaginatedCollections(page))
  )

  return { slug: 'catalog', collections }
}

/**
 * Fetch the total number of collections in a catalog
 */
const getNumberOfCollectionsInCatalog = async ({ slug }) => {
  const query = `
      {
        catalogCollection(where: { slug: "${slug}" }, limit: 1) {
          items {
            collectionsCollection {
              total
            }
          }
        }
      }
    `

  const response = await fetchGraphQL(query)

  return (
    response.data?.catalogCollection?.items?.[0]?.collectionsCollection
      ?.total ?? 0
  )
}

/**
 * Fetch n collections.
 *
 * This method accepts a parameter of a page number that calculates
 * how many collections to skip in the GraphQL query.
 *
 * Set your desired page size with PAGE_SIZE
 *
 * param: page (number)
 *
 */
export const getPaginatedCollections = async page => {
  /**
   * Calculate the skip parameter for the query based on the incoming page number.
   * For example, if page === 2, and your page length === 3,
   * the skip parameter would be calculated as 3 (the length of a page)
   * therefore skipping the results of page 1.
   */
  const skipMultiplier = page === 1 ? 0 : page - 1
  const skip = skipMultiplier > 0 ? PAGE_SIZE * skipMultiplier : 0

  const query = `{
    catalogCollection(where: { slug: "catalog" }, limit: 1) {
      items {
        collectionsCollection(limit: ${PAGE_SIZE}, skip: ${skip}) {
          ${COLLECTION_FRAGMENT}
        }
      }
    }
  }`

  const response = await fetchGraphQL(query)
  const collectionItems =
    response.data?.catalogCollection?.items?.[0]?.collectionsCollection
      ?.items?.[0] ?? null

  return collectionItems
}
