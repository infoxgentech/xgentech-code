/** @jsxImportSource theme-ui */
import { Card, Heading } from 'theme-ui'
import { useState } from 'react'
import SubscriptionDetailsAddressForm from '~/components/Account/Subscription/Detail/AddressForm'
import BillingSummary from '~/components/Account/Subscription/Detail/BillingSummary'

const BillingCard = ({ title, subscription }) => {
  const [isFormOpen, setIsFormOpen] = useState(false)

  return (
    <Card sx={{ width: '100%', margin: '2rem', padding: '2rem' }}>
      <Heading>{title}</Heading>

      {isFormOpen ? (
        <SubscriptionDetailsAddressForm
          addressType={'billAddress'}
          subscription={subscription}
          close={() => setIsFormOpen(false)}
        />
      ) : (
        <BillingSummary
          openForm={() => setIsFormOpen(true)}
          subscription={subscription}
        />
      )}
    </Card>
  )
}

export default BillingCard
