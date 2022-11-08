import React from 'react'
import promiseHash from 'promise-hash'
import Metadata from '~/components/Metadata'
import ProductListPage from '~/components/Product/ListPage'
import { getCatalog, getPage } from 'graphql-cms/queries'
import { generateProductFeed } from '../src/utils/product-rss-feed'
import nextContentWrapper from 'graphql-cms/nextContentWrapper'

export const getStaticProps = nextContentWrapper.getStaticProps(async () => {
  await generateProductFeed()

  return {
    props: await promiseHash({
      page: getPage({ slug: 'shop' }),
      catalog: getCatalog({ slug: 'catalog' })
    })
  }
})

const Shop = ({ page, catalog }) => {
  const { collections } = catalog

  return (
    <>
      <Metadata title={page.name} />
      <ProductListPage page={page} collections={collections} />
    </>
  )
}

export default Shop
