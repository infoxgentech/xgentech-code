import React from 'react'
import { useRouter } from 'next/router'
import PrivateRoute from '~/components/Account/PrivateRoute'
import Metadata from '~/components/Metadata'
import AccountSubscriptionDetailPage from '~/components/Account/Subscription/Detail/Page'
import { useTranslate } from '~/hooks'
import { getCatalog } from 'graphql-cms/queries/catalog'
import nextContentWrapper from 'graphql-cms/nextContentWrapper'

// This page is using getStaticProps/getStaticPaths so that the full catalog can
// be pulled at build time instead of per request at runtime, keeping the CMS
// calls low.
export const getStaticPaths = async () => ({
  paths: [],
  fallback: true
})

export const getStaticProps = nextContentWrapper.getStaticProps(async () => {
  return {
    props: {
      // @TODO Remove this once the subscription endpoints can return detailed
      // product information.
      catalog: await getCatalog({ slug: 'catalog' })
    }
  }
})

const Subscription = ({ catalog }) => {
  const router = useRouter()
  const { id } = router.query
  const translate = useTranslate()
  const flatCatalog =
    catalog?.collections.flatMap(collection => [
      ...collection.kitsCollection.items,
      ...collection.productsCollection.items
    ]) ?? []

  return (
    <PrivateRoute>
      <Metadata title={translate('subscription_details.page_title')} />
      <AccountSubscriptionDetailPage
        subscriptionId={id}
        catalog={flatCatalog}
      />
    </PrivateRoute>
  )
}

export default Subscription
