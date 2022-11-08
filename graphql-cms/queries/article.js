import { ARTICLE_FRAGMENT } from 'graphql-cms/fragments'
import { fetchGraphQL } from '../api'

export const getArticles = async () => {
  const query = `query {
    articleCollection(where: { slug_exists: true }, order: publishDate_DESC, limit: 20) {
      items {
        ${ARTICLE_FRAGMENT}
      }
    }
  }`

  const response = await fetchGraphQL(query)

  const articles = response.data.articleCollection.items
    ? response.data.articleCollection.items
    : []

  return articles
}

export const getArticle = async ({ slug }) => {
  const query = `query {
    articleCollection(where: {slug: "${slug}" }, limit: 1)  {
      items {
        ${ARTICLE_FRAGMENT}
      }
    }
  }`

  const response = await fetchGraphQL(query)

  const article = response.data.articleCollection.items
    ? response.data.articleCollection.items[0]
    : null

  return article
}
