// import { findProductOrKitOrDefault } from '~/redux/selectors/product/find-product'

/**
 * Serializes a Kit into a Product for react-autonomy methods.
 *
 * @param {any} product
 * @param {string | undefined} kitSku
 * @returns {import('@chordcommerce/react-autonomy').Product}
 */
export const serializeKit = (product = {}, kitSku = undefined) => {
  return {
    imageUrl: product.mainImage?.url,
    name: product.name,
    slug: product.slug,
    // @TODO This is not being sent to Segment because it is silently dropped by
    // chord-js-autonomy
    // https://github.com/chordcommerce/chord-js/blob/main/packages/chord-js-autonomy/src/analytics/serialize.ts#L84
    url: `${
      typeof window !== 'undefined' ? window.location.origin : ''
    }/bundles/${product.slug}/`,
    isBundle: true,
    shortDescription: product?.shortDescription,
    variant: {
      imageUrl: product.mainImage?.url,
      images: [
        {
          largeUrl: product.mainImage?.url
        }
      ],
      name: product.name,
      price: product.price,
      sku: kitSku
        ? kitSku
        : serializeKitSkuFromProducts(product.productsCollection.items),
      slug: product.slug
    }
  }
}

/**
 * Serializes an application Product into a Product for react-autonomy methods.
 *
 * @param {any} product
 * @param {string | undefined} variantSku
 * @returns {import('@chordcommerce/react-autonomy').Product}
 */
export const serializeProduct = (product = {}, variantSku) => {
  const variant = variantSku
    ? product.variantsCollection?.items?.find(({ sku }) => sku === variantSku)
    : product.variantsCollection?.items?.[0]

  return {
    imageUrl: product.mainImage?.url,
    name: product.name,
    slug: product.slug,
    // @TODO This is not being sent to Segment because it is silently dropped by
    // chord-js-autonomy
    // https://github.com/chordcommerce/chord-js/blob/main/packages/chord-js-autonomy/src/analytics/serialize.ts#L84
    url: `${
      typeof window !== 'undefined' ? window.location.origin : ''
    }/products/${product.slug}/`,
    isBundle: false,
    shortDescription: product?.shortDescription,
    variant: {
      imageUrl: variant?.mainImage?.url,
      images: [
        {
          largeUrl: product.mainImage?.url
        }
      ],
      name: variant?.name,
      description: variant?.description ?? product?.shortDescription,
      price: variant?.price ?? product?.price,
      sku: variant?.sku ?? variantSku,
      slug: variant?.slug,
      optionValues: variant?.optionValuesCollection?.items?.map(value => {
        return {
          name: value.name,
          presentation: value.presentation,
          slug: value.slug,
          optionType: value.option_type
        }
      })
    }
  }
}

/**
 * Serializes an application Product or Kit into a Product for react-autonomy
 * methods.
 *
 * @param {any} product
 * @param {string | undefined} variantSku
 * @returns {import('@chordcommerce/react-autonomy').Product}
 */
export const serializeProductOrKit = (product, sku) => {
  return 'productsCollection' in product
    ? serializeKit(product, sku)
    : serializeProduct(product, sku)
}

export const serializeKitSkuFromProducts = products => {
  const skus = products.map(product => product.variantsCollection.items[0].sku)

  return skus.sort().join('|')
}
