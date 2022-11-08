import React from 'react'
import promiseHash from 'promise-hash'
import Metadata from '~/components/Metadata'
import ContentFaqPage from '~/components/Content/Faq'
import { getPage, getFaq } from 'graphql-cms/queries'
import nextContentWrapper from 'graphql-cms/nextContentWrapper'

export const getStaticProps = nextContentWrapper.getStaticProps(async () => {
  return {
    props: await promiseHash({
      page: getPage({ slug: 'faq' }),
      faq: getFaq({ slug: 'faq' })
    })
  }
})

const Faq = ({ faq, page }) => {
  return (
    <>
      <Metadata title={page.name} />
      <ContentFaqPage faq={faq} page={page} />
    </>
  )
}

export default Faq
