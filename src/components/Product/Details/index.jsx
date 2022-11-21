/** @jsxImportSource theme-ui */
import { useEffect, useState } from 'react'
import { Box, Flex, Heading } from 'theme-ui'
import ReactMarkdown from 'react-markdown'
import ProductAddToCartButton from '~/components/Product/AddToCartButton'
import ProductDirections from '~/components/Product/Directions'
import ProductIngredients from '~/components/Product/Ingredients'
import ProductOptions from '~/components/Product/Options'
import ProductOutOfStock from '~/components/Product/OutOfStock'
import ProductQuantitySelector from '~/components/Product/QuantitySelector'
import SubscriptionChooser from '~/components/Subscription/Chooser'
import { useProductVariants, useVariantAvailability } from '~/hooks';

const ProductDetails = ({
  product,
  collectionName = null,
  handleVariantChange,
  ...props
}) => {
  const { longDescription, ingredients, directions, subscription } = product

  const { items: optionTypes } = product.optionTypesCollection || []
  const { items: variants } = product.variantsCollection || []

  const [selectedQuantity, setSelectedQuantity] = useState(1)

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

  const { sku, name, size, price, regularPrice } = currentVariant

  const { isAvailable } = useVariantAvailability({ sku })

  useEffect(() => {
    handleVariantChange(currentVariant)
  }, [currentVariant, handleVariantChange])
  


  return (
    <Box
      {...props}
      sx={{
        textAlign: ['center', null, 'left'],
        margin: 'auto',
        marginTop: ['8px', null, '48px'],
        maxWidth: ['650px !important', null, '50% !important']
      }}
    >
      {collectionName && (
        <Heading
          as="h3"
          variant="navLink"
          color="primary"
          sx={{
            variant: 'text.navLink',
            marginTop: ['16px', null, '0'],
            marginBottom: ['0', null, '12px']
          }}
        >
          {collectionName}
        </Heading>
      )}
      <Heading as="h1" variant="h2">
        {name}
      </Heading>

      <Heading
        as="h6"
        variant="navLink"
        sx={{
          mt: ['8px', null, '12px'],
          mb: ['8px', null, '20px']
        }}
      >
        {size}
      </Heading>

      <Flex
        sx={{
          flexDirection: 'column'
        }}
      >
        <Flex
          sx={{
            flexDirection: ['column', 'row'],
            textAlign: 'left'
          }}
        >
          {optionTypes && (
            <ProductOptions
              allOptions={allowedOptionTypes}
              currentValues={currentVariant.optionValuesCollection.items}
              handleChange={option => selectVariant(option)}
            />
          )}
        </Flex>

        {subscription ? (
          <SubscriptionChooser
            subscription={subscription}
            regularPrice={regularPrice}
            price={price}
            sku={sku}
          />
        ) : (
          <Flex
            py="3"
            sx={{
              display: 'inline-flex'
            }}
          >
            <ProductQuantitySelector
              handleChange={value => setSelectedQuantity(parseInt(value))}
            />
            <ProductAddToCartButton
              sx={{
                marginLeft: ['12px', null, '16px']
              }}
              price={price}
              quantity={selectedQuantity}
              regularPrice={regularPrice}
              sku={sku}
            />
          </Flex>
        )}
      </Flex>

      {!isAvailable && <ProductOutOfStock product={product} />}

      {longDescription && (
        <div
          sx={{
            '& p': {
              marginTop: '8px',
              marginBottom: '28px'
            }
          }}
        >
          <ReactMarkdown>{longDescription}</ReactMarkdown>
        </div>
      )}

      {ingredients && <ProductIngredients ingredients={ingredients} />}

      {directions && <ProductDirections directions={directions} />}
    </Box>
  )
}

export default ProductDetails
