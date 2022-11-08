import { FAQ_FRAGMENT } from 'graphql-cms/fragments'
import { fetchGraphQL } from '../api'

export const getFaqs = async () => {
  const query = `query {
    faqCollection(where: { slug_exists: true }) {
      items {
        ${FAQ_FRAGMENT}
      }
    }
  }`

  const response = await fetchGraphQL(query)

  const faqs = response.data.faqCollection.items
    ? response.data.faqCollection.items
    : []

  return faqs
}

export const getFaq = async ({ slug }) => {
  const query = `query {
    faqCollection(where: {slug: "${slug}" }, limit: 1)  {
      items {
        ${FAQ_FRAGMENT}
      }
    }
  }`

  const response = await fetchGraphQL(query)

  const faq = response.data.faqCollection.items
    ? response.data.faqCollection.items[0]
    : null

  return faq
}
