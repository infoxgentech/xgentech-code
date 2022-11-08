import { KIT_FRAGMENT } from 'graphql-cms/fragments'
import { fetchGraphQL } from '../api'

export const getKits = async () => {
  const query = `query {
    kitCollection(where: { slug_exists: true }) {
      items {
        ${KIT_FRAGMENT}
      }
    }
  }`

  const response = await fetchGraphQL(query)

  const kits = response.data.kitCollection.items
    ? response.data.kitCollection.items
    : []

  return kits
}

export const getKit = async ({ slug }) => {
  const query = `query {
    kitCollection(where: {slug: "${slug}" }, limit: 1)  {
      items {
        ${KIT_FRAGMENT}
      }
    }
  }`

  const response = await fetchGraphQL(query)

  const kit = response.data.kitCollection.items
    ? response.data.kitCollection.items[0]
    : null

  return kit
}
