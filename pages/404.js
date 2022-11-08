import React from 'react'
import { useTranslate } from '~/hooks'
import Metadata from '~/components/Metadata'
import ErrorNotFoundPage from '~/components/Error/NotFound/Page'
import nextContentWrapper from 'graphql-cms/nextContentWrapper'

export const getStaticProps = nextContentWrapper.getStaticProps(() => ({
  props: {}
}))

const NotFound = () => {
  const translate = useTranslate()

  return (
    <>
      <Metadata title={translate('error.not_found.page_title')} />
      <ErrorNotFoundPage />
    </>
  )
}

export default NotFound
