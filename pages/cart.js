import React from 'react'
import CartPage from '~/components/Cart/Page'
import Metadata from '~/components/Metadata'
import { useTranslate } from '~/hooks'
import nextContentWrapper from 'graphql-cms/nextContentWrapper'

export const getStaticProps = nextContentWrapper.getStaticProps(async () => {
  return {
    props: {}
  }
})

const Cart = () => {
  const translate = useTranslate()

  return (
    <>
      <Metadata title={translate('cart.page_title')} />
      <CartPage />
    </>
  )
}

export default Cart
