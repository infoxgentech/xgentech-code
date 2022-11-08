import getVariantAvailability from './client'

const getVariantsWithAvailability = async ({ baseApiUrl, products }) => {
  const results = await Promise.all(
    products.map(async p => {
      const productMeta = {
        name: p.name,
        slug: p.slug,
        shortDescription: p.shortDescription,
        productType: p.productType,
        vendor: p.vendor
      }

      // this is a kit
      if (!p.variants) {
        const availability = await getVariantAvailability({
          baseApiUrl,
          sku: p.sku
        })

        const isAvailable =
          availability?.in_stock || availability?.is_backorderable

        return {
          ...p,
          isAvailable,
          product: {
            ...productMeta,
            productType: p.products[0].productType,
            vendor: p.products[0].vendor
          }
        }
      }

      // enrich variants with OMS availability and product metadata
      return await Promise.all(
        p.variants?.map(async v => {
          const availability = await getVariantAvailability({
            baseApiUrl,
            sku: v.sku
          })
          const isAvailable = availability
            ? availability.in_stock || availability.is_backorderable
            : false

          return {
            ...v,
            isAvailable,
            selectedOptions: v.optionValues || [],
            product: productMeta
          }
        })
      )
    })
  )

  return results.flat()
}

export default getVariantsWithAvailability
