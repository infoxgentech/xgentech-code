/** @jsxImportSource theme-ui */
import Link from '~/components/Generic/Link'
import ResponsiveImage from '~/components/Generic/Image'
import { useEffect } from 'react'
import { Flex, Heading } from 'theme-ui'
import ProductOptions from '~/components/Product/Options'
import { useProductVariants } from '~/hooks'
import ProductLink from '~/components/Product/Link'

const IncludedProduct = ({ product, handleVariantChange }) => {
  const { slug } = product

  const { items: variants } = product.variantsCollection
  const { items: optionTypes } = product.optionTypesCollection

  const { currentVariant, selectVariant } = useProductVariants(variants)

  // get all the available choices from the variants
  const allVariantOptions = variants.flatMap(
    v => v.optionValuesCollection.items
  )

  const uniqueVariantOptions = allVariantOptions.reduce((acc, option = {}) => {
    return acc.find(o => o.slug === option.slug) ? acc : [...acc, option]
  }, [])

  // build a list of option types, restricting choices to those available via our variants
  const allowedOptionTypes = optionTypes.map(optionType => ({
    name: optionType.name,
    optionValues: uniqueVariantOptions.reduce((acc, option = {}) => {
      const slug = option.linkedFrom.optionTypeCollection.items[0].slug
      return slug === optionType.slug ? [...acc, option] : acc
    }, []),
    presentation: optionType.presentation,
    slug: optionType.slug
  }))

  const { name, mainImage } = currentVariant

  useEffect(() => {
    handleVariantChange(product, currentVariant)
  }, [handleVariantChange, product, currentVariant])

  return (
    <Flex
      key={slug}
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        margin: 0,
        border: '1px solid',
        backgroundColor: 'white',
        height: '100%'
      }}
    >
      <ProductLink product={product} sx={{ width: '180px' }}>
        {mainImage && <ResponsiveImage image={mainImage} />}
      </ProductLink>

      <Flex
        sx={{
          flexDirection: ['column', 'column', 'column'],
          alignItems: 'flex-start',
          margin: '0 1rem'
        }}
      >
        <Link
          sx={{
            display: 'block',
            textTransform: 'none'
          }}
          href={`/products/${slug}/`}
        >
          <Heading as="h4">{name}</Heading>
        </Link>

        {allowedOptionTypes && (
          <ProductOptions
            allOptions={allowedOptionTypes}
            currentValues={currentVariant.optionValuesCollection.items}
            handleChange={option => selectVariant(option)}
          />
        )}
      </Flex>
    </Flex>
  )
}

export default IncludedProduct
