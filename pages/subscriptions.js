import React from 'react'
import PrivateRoute from '~/components/Account/PrivateRoute'
import AccountSubscriptionPage from '~/components/Account/Subscription/Page'
import Metadata from '~/components/Metadata'
import { useTranslate } from '~/hooks'
import nextContentWrapper from 'graphql-cms/nextContentWrapper'

export const getStaticProps = nextContentWrapper.getStaticProps(async () => {
  return {
    props: {}
  }
})

const Subscriptions = () => {
  const translate = useTranslate()

  return (
    <PrivateRoute>
      <Metadata title={translate('subscriptions.page_title')} />
      <AccountSubscriptionPage />
    </PrivateRoute>
  )
}

export default Subscriptions
