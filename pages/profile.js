import React from 'react'
import PrivateRoute from '~/components/Account/PrivateRoute'
import AccountProfilePage from '~/components/Account/Profile/Page'
import Metadata from '~/components/Metadata'
import { useTranslate } from '~/hooks'

import nextContentWrapper from 'graphql-cms/nextContentWrapper'

export const getStaticProps = nextContentWrapper.getStaticProps(async () => {
  return {
    props: {}
  }
})

const Profile = () => {
  const translate = useTranslate()

  return (
    <PrivateRoute>
      <Metadata title={translate('profile.page_title')} />
      <AccountProfilePage />
    </PrivateRoute>
  )
}

export default Profile
