import { buildKitVariants } from '@chordcommerce/product-rss-feed/dist/resolvers/autonomy/utils'
import { getCatalog } from '../../../../../../graphql-cms/queries/catalog'

const getContentfulProducts = async ({ reporter }, catalogSlug) => {
  const catalog = await getCatalog({ slug: catalogSlug })

  if (!catalog) {
    reporter.panic(
      'Invalid Contentful Catalog query. Failed to generate products feed.'
    )
  }

  const collections = catalog.collections

  if (collections.length === 0) {
    reporter.panic(
      'Contentful Catalog query does not return any collection. Failed to generate products feed.'
    )
  }

  const kits = collections
    .flatMap(c => c.kitsCollection)
    .filter(kc => kc.items.length > 0)
    .flatMap(kc => kc.items)
    .map(kc => {
      const { productsCollection, ...kit } = kc
      const products = (productsCollection.items || []).map(p => {
        const variants = (p.variantsCollection?.items || []).map(vc => ({
          ...vc,
          optionValues: vc.optionValuesCollection.items || []
        }))
        return { ...p, variants }
      })
      return { ...kit, products }
    })
    .map(buildKitVariants)
    .flatMap(kv => kv)

  const products = collections
    .flatMap(c => c.productsCollection)
    .filter(pc => pc.items.length > 0)
    .flatMap(pc => pc.items)
    .filter(
      p =>
        !!p &&
        p.variantsCollection.items.length &&
        !p.giftCard &&
        !p.sample &&
        !p.hidden
    )
    .map(p => {
      const variants = (p.variantsCollection?.items || []).map(vc => ({
        ...vc,
        optionValues: vc.optionValuesCollection.items || []
      }))
      return { ...p, variants }
    })
    .reduce(
      (acc, product = {}) =>
        acc.find(p => p.slug === product.slug) ? acc : [...acc, product],
      []
    )

  return [...products, ...kits]
}

export default getContentfulProducts
