import React from 'react'
import Metadata from '~/components/Metadata'
import OrderConfirmationPage from '~/components/Order/Confirmation/Page'
import { useTranslate } from '~/hooks'
import { getCatalog } from 'graphql-cms/queries/catalog'
import nextContentWrapper from 'graphql-cms/nextContentWrapper'

export const getStaticProps = nextContentWrapper.getStaticProps(async () => {
  return {
    props: {
      catalog: await getCatalog({ slug: 'catalog' })
    }
  }
})

/**
 * This is left for backwards compatibility only.
 *
 * New Starters should instead use Next dynamic routes!
 * See /src/pages/order/confirmation/[number]/[id].js
 *
 * Note: Switching to this new dynamic routing system will require that you set your
 * Chord OMS `STRIPE_SUCCESS_URL_FORMAT` environment variable to 'path' in your
 * Admin Store settings:
 *
 * STRIPE_SUCCESS_URL_FORMAT=path
 */
const OrderConfirmation = ({ catalog }) => {
  const translate = useTranslate()

  return (
    <>
      <Metadata title={translate('confirmation.page_title')} />
      <OrderConfirmationPage collections={catalog} />
    </>
  )
}

export default OrderConfirmation
