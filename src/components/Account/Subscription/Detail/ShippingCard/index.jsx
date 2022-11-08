/** @jsxImportSource theme-ui */
import { Card, Heading } from 'theme-ui'
import { useState } from 'react'
import ShippingSummary from '~/components/Account/Subscription/Detail/ShippingSummary'
import SubscriptionDetailsAddressForm from '~/components/Account/Subscription/Detail/AddressForm'

const ShippingCard = ({ title, subscription }) => {
  const [isFormOpen, setIsFormOpen] = useState(false)

  return (
    <Card sx={{ width: '100%', margin: '2rem', padding: '2rem' }}>
      <Heading>{title}</Heading>

      {isFormOpen ? (
        <SubscriptionDetailsAddressForm
          addressType={'shipAddress'}
          subscription={subscription}
          close={() => setIsFormOpen(false)}
        />
      ) : (
        <ShippingSummary
          openForm={() => setIsFormOpen(true)}
          subscription={subscription}
        />
      )}
    </Card>
  )
}

export default ShippingCard
