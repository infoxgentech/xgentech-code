import React from 'react'
import { useCart } from '@chordcommerce/react-autonomy'
import NavBar from '~/components/Nav/Bar'

export const Nav = props => {
  const { cart } = useCart()

  const itemCount =
    cart?.lineItems &&
    cart.lineItems.reduce((acc, item) => acc + item.quantity, 0)

  return <NavBar itemCount={itemCount} {...props} />
}

export default Nav
