import Metadata from '~/components/Metadata'
import ProductPage from '~/components/Product/Page'
import { getProduct, getCatalog } from '../../graphql-cms/queries'
import nextContentWrapper from 'graphql-cms/nextContentWrapper'

export async function getStaticPaths() {
  const catalog = await getCatalog({ slug: 'catalog' })

  const products = catalog.collections.flatMap(
    collection => collection.productsCollection.items
  )

  const paths = products.map(p => `/products/${p.slug}`) || []

  return {
    paths,
    fallback: false
  }
}

export const getStaticProps = nextContentWrapper.getStaticProps(
  async ({ params }) => {
    const slug = params.slug
    return {
      props: {
        product: await getProduct({ slug }),
        key: slug
      }
    }
  }
)

const Product = props => {
  const { product } = props

  if (!product) return null

  return (
    <>
      <Metadata title={product.name} description={product.shortDescription} />
      <ProductPage product={product} />
    </>
  )
}

export default Product
