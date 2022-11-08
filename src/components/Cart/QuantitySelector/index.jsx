import React, { useEffect, useState } from 'react'
import { useCart } from '@chordcommerce/react-autonomy'
import QuantitySelector from '~/components/Generic/QuantitySelector'

const CartQuantitySelector = ({ quantity, lineItemId, ...props }) => {
  const { modifyLineItem, removeFromCart } = useCart()
  const [isLoading, setIsLoading] = useState(false)

  const maxQuantity = Math.max(quantity, 20)
  const options = [{ name: '0 - Remove', value: 0 }].concat(
    [...Array(maxQuantity)].map((_, i) => ({
      name: (i + 1).toString(),
      value: i + 1
    }))
  )

  const updateQuantity = async quantity => {
    setIsLoading(true)
    const intQuantity = parseInt(quantity)
    try {
      if (intQuantity === 0) {
        await removeFromCart({ lineItemId })
      } else {
        await modifyLineItem({
          lineItemId,
          attributes: {
            quantity: intQuantity
          }
        })
      }
    } catch (error) {
      console.log('error: ', error)
    }
  }

  useEffect(() => setIsLoading(false), [quantity, lineItemId])

  return (
    <QuantitySelector
      defaultValue={quantity}
      isLoading={isLoading}
      handleChange={updateQuantity}
      options={options}
      {...props}
    />
  )
}

export default CartQuantitySelector
