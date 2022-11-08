import React from 'react'
import ContentPage from '~/components/Content/Page'
import Metadata from '~/components/Metadata'
import { getPage } from 'graphql-cms/queries'
import nextContentWrapper from 'graphql-cms/nextContentWrapper'

export const getStaticProps = nextContentWrapper.getStaticProps(async () => {
  return {
    props: {
      page: await getPage({ slug: 'articles' })
    }
  }
})

const Articles = ({ page }) => {
  return (
    <>
      <Metadata title={page.name} />
      <ContentPage page={page} />
    </>
  )
}

export default Articles
