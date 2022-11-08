import { FOOTER_FRAGMENT } from 'graphql-cms/fragments'
import { fetchGraphQL } from '../api'

export const getFooterSection = async ({ slug }) => {
  const query = `query {
    navigationBarCollection(where: {slug: "${slug}" }, limit: 1)  {
      items {
        ${FOOTER_FRAGMENT}
      }
    }
  }`

  const response = await fetchGraphQL(query)

  const footerSection = response.data.navigationBarCollection.items
    ? response.data.navigationBarCollection.items[0]
    : null

  return footerSection
}
