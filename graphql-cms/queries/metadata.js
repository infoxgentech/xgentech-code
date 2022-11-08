import { METADATA_FRAGMENT } from 'graphql-cms/fragments'
import { fetchGraphQL } from '../api'

export const getSiteMetadata = async ({ slug }) => {
  const query = `query {
    siteMetadataCollection(where: {slug: "${slug}" }, limit: 1)  {
      items {
        ${METADATA_FRAGMENT}
      }
    }
  }`

  const response = await fetchGraphQL(query)

  const site = response.data.siteMetadataCollection.items
    ? response.data.siteMetadataCollection.items[0]
    : null

  return site
}
