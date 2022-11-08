/** @jsxImportSource theme-ui */
import { Flex } from 'theme-ui'
import ProductOptionSelector from '~/components/Product/OptionSelector'

const ProductOptions = ({
  allOptions = [],
  currentValues = [],
  handleChange = {}
}) => {
  const getValueForOptionType = ({ slug }) => {
    const results = currentValues.filter(o => {
      const oslug = o.linkedFrom.optionTypeCollection.items[0].slug
      return oslug === slug
    })
    return results.length > 0 ? results[0].slug : ''
  }

  return (
    <Flex
      sx={{
        flexDirection: ['column', 'row'],
        textAlign: 'left'
      }}
    >
      {allOptions.map(option => {
        return (
          <ProductOptionSelector
            sx={{
              marginTop: ['0.75rem', null]
            }}
            key={option.slug}
            type={option.slug}
            title={option.presentation}
            values={option.optionValues}
            selectedValue={getValueForOptionType(option)}
            handleChange={option => handleChange(option)}
          />
        )
      })}
    </Flex>
  )
}

export default ProductOptions
