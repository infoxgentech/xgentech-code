import Metadata from '~/components/Metadata'
import ArticlePage from '~/components/Article/Page'
import { getArticles, getArticle } from 'graphql-cms/queries'
import nextContentWrapper from 'graphql-cms/nextContentWrapper'

export async function getStaticPaths() {
  const articles = await getArticles()

  const paths = articles.map(a => `/articles/${a.slug}`) || []

  return {
    paths,
    fallback: false
  }
}

export const getStaticProps = nextContentWrapper.getStaticProps(
  async ({ params }) => {
    const { slug } = params
    return {
      props: {
        article: await getArticle({ slug })
      }
    }
  }
)

const Article = props => {
  const { article } = props

  if (!article) return null

  return (
    <>
      <Metadata title={article.title} />
      <ArticlePage article={article} />
    </>
  )
}

export default Article
