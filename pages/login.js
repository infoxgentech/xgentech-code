import React from 'react'
import Metadata from '~/components/Metadata'
import AccountLoginPage from '~/components/Account/Login/Page'
import { useTranslate } from '~/hooks'
import nextContentWrapper from 'graphql-cms/nextContentWrapper'

export const getStaticProps = nextContentWrapper.getStaticProps(async () => {
  return {
    props: {}
  }
})

const Login = () => {
  const translate = useTranslate()

  return (
    <>
      <Metadata title={translate('login.page_title')} />
      <AccountLoginPage />
    </>
  )
}

export default Login
