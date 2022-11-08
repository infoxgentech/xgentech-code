import { useState } from 'react'
import { objectCompare } from '~/utils/compare'

const useProductVariants = (variants = []) => {
  const [currentVariant, setCurrentVariant] = useState(variants[0] || {})

  /**
   * Find and set a variant given a change in option values.
   */
  const selectVariant = option => {
    const newOptions = getNewOptionValues(option)

    const results = getVariantForOptionValues(newOptions)

    if (results.length === 0) {
      // TODO: alert users that this combination is not available
      // https://app.clubhouse.io/arfa/story/3318/variants-add-support-to-display-unavailable-option-values
      console.warn(
        `Cannot find variant with options: ${JSON.stringify(
          newOptions.map(o => o.presentation)
        )}`
      )
    } else {
      setCurrentVariant(results[0])
    }
  }

  /**
   * Return a set of option values based on our initial state and a newly selected option.
   */
  const getNewOptionValues = option => {
    const { items: optionValues } = currentVariant.optionValuesCollection

    return optionValues.map(o => {
      return o.linkedFrom.optionTypeCollection.items[0].slug ===
        option.linkedFrom.optionTypeCollection.items[0].slug
        ? option
        : o
    })
  }

  /**
   * Return a variant for a given list of option values.
   */
  const getVariantForOptionValues = options => {
    return variants.filter(v => {
      const { items: optionValues } = v.optionValuesCollection
      return objectCompare(optionValues, options)
    })
  }

  return {
    currentVariant,
    selectVariant
  }
}

export default useProductVariants
