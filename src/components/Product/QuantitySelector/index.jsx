import React from 'react'
import QuantitySelector from '~/components/Generic/QuantitySelector'

const ProductQuantitySelector = ({ handleChange, ...props }) => {
  const maxQuantity = 20
  const options = [...Array(maxQuantity)].map((_, i) => ({
    name: (i + 1).toString(),
    value: i + 1
  }))

  return (
    <QuantitySelector
      handleChange={handleChange}
      options={options}
      {...props}
    />
  )
}

export default ProductQuantitySelector
