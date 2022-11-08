import { getServerSideSitemap } from 'next-sitemap'
import { getCatalog } from 'graphql-cms/queries'
import config from '~/../site-config'

export const getServerSideProps = async ctx => {
  const catalog = await getCatalog({ slug: 'catalog' })

  const products = catalog.collections.items.flatMap(
    collection => collection.productsCollection.items
  )

  const kits = catalog.collections.items.flatMap(
    collection => collection.kitsCollection.items
  )

  const productFields = products.map(slug => {
    return {
      loc: `${config.siteMetadata.siteUrl}/products/${slug}`,
      lastmod: new Date().toISOString()
    }
  })

  const kitFields = kits.map(slug => {
    return {
      loc: `${config.siteMetadata.siteUrl}/bundles/${slug}`,
      lastmod: new Date().toISOString()
    }
  })

  return getServerSideSitemap(ctx, [...productFields, ...kitFields])
}

// Default export to prevent next.js errors
// eslint-disable-next-line import/no-anonymous-default-export
export default () => {}
