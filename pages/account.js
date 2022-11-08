import React from 'react'
import dynamic from 'next/dynamic'
import PrivateRoute from '~/components/Account/PrivateRoute'
import nextContentWrapper from 'graphql-cms/nextContentWrapper'

const AccountPage = dynamic(() => import('~/components/Account/Page'))

export const getStaticProps = nextContentWrapper.getStaticProps(async () => {
  return {
    props: {}
  }
})

const Account = () => {
  return (
    <>
      <PrivateRoute>
        <AccountPage />
      </PrivateRoute>
    </>
  )
}

export default Account
