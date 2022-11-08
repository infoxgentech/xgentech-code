import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useTranslate } from '~/hooks'
import Metadata from '~/components/Metadata'
import OrderConfirmationPage from '~/components/Order/Confirmation/Page'
import { getCatalog } from 'graphql-cms/queries/catalog'
import nextContentWrapper from 'graphql-cms/nextContentWrapper'

export const getServerSideProps = nextContentWrapper.getServerSideProps(
  async () => {
    return {
      props: {
        catalog: await getCatalog({ slug: 'catalog' })
      }
    }
  }
)

const OrderConfirmation = ({ catalog }) => {
  const translate = useTranslate()

  const [data, setData] = useState({})

  const router = useRouter()

  useEffect(() => {
    if (!router.isReady) return
    setData({ id: router.query.id, number: router.query.number })
  }, [router.isReady, router.query.id, router.query.number])

  if (!router.isReady || (!data.id && !data.number)) {
    return <></>
  }

  return (
    <>
      <Metadata title={translate('confirmation.page_title')} />
      <OrderConfirmationPage
        orderNumber={data.number}
        checkoutSessionId={data.id}
        collections={catalog.collections}
      />
    </>
  )
}

export default OrderConfirmation
