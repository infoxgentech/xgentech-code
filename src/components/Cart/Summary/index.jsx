import React from 'react'
import { Flex, Heading, Text, Divider } from 'theme-ui'
import CheckoutButton from '~/components/Cart/CheckoutButton'
import GiftRecipientsButton from '~/components/Cart/GiftRecipientsButton'
import PromoCode from '~/components/Cart/PromoCode'
import { useTranslate } from '~/hooks'

const RowWrapper = ({ children }) => (
  <Flex
    sx={{
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      textAlign: 'left',
      my: '.75rem'
    }}
  >
    {children}
  </Flex>
)

const CartSummary = ({
  displayTotalAvailableStoreCredit,
  displayItemTotal,
  displayTaxTotal,
  displayShipTotal,
  displayTotal,
  promotions,
  orderConfirmed = false,
  eligibleForFreeShipping = false,
  showGiftCardForms,
  setShowGiftCardForms,
  giftCardFormInput,
  giftCardsPresent
}) => {
  const translate = useTranslate()

  const promoCode = promotions ? promotions.find(p => p.code) : null
  const creditAvailable = displayTotalAvailableStoreCredit !== '$0.00'

  return (
    <Flex
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%'
      }}
    >
      <Heading
        as="h3"
        variant="h3"
        sx={{
          marginBottom: ['0.5rem', null, '2rem'],
          textAlign: ['center', null, 'left']
        }}
      >
        {translate('cart.order_summary')}
      </Heading>

      {!orderConfirmed && <PromoCode promotion={promoCode} />}

      {!orderConfirmed && creditAvailable && (
        <>
          <RowWrapper>
            <strong>{translate('cart.store_credit')}</strong>
            <strong>{displayTotalAvailableStoreCredit}</strong>
          </RowWrapper>

          <Divider sx={{ borderColor: '#E3E4E3' }} />
        </>
      )}

      {displayItemTotal && (
        <RowWrapper>
          <Text>{translate('cart.subtotal')}</Text>
          <Text>{displayItemTotal}</Text>
        </RowWrapper>
      )}

      {promotions.map(({ id, label, displayAmount }) => {
        return (
          <RowWrapper key={id}>
            <Text>{label}</Text>
            <Text>{displayAmount}</Text>
          </RowWrapper>
        )
      })}

      {displayTaxTotal && (
        <RowWrapper>
          <Text>
            {orderConfirmed
              ? translate('cart.tax')
              : translate('cart.tax') +
                translate('cart.calculated_at_checkout')}
          </Text>
          <Text>{displayTaxTotal}</Text>
        </RowWrapper>
      )}

      {displayShipTotal && (
        <RowWrapper>
          <Text>
            {orderConfirmed || eligibleForFreeShipping
              ? translate('cart.shipping')
              : translate('cart.shipping') +
                translate('cart.calculated_at_checkout')}
          </Text>
          <Text>
            {eligibleForFreeShipping
              ? translate('cart.free_shipping')
              : displayShipTotal}
          </Text>
        </RowWrapper>
      )}

      {displayTotal && (
        <RowWrapper>
          {!orderConfirmed && <Text>{translate('cart.estimated_total')}</Text>}
          {orderConfirmed && <Text>{translate('cart.total')}</Text>}
          <Text>{displayTotal}</Text>
        </RowWrapper>
      )}

      {!orderConfirmed && (!giftCardsPresent || showGiftCardForms) && (
        <CheckoutButton giftCardFormInput={giftCardFormInput} />
      )}

      {!orderConfirmed && giftCardsPresent && !showGiftCardForms && (
        <GiftRecipientsButton setShowGiftCardForms={setShowGiftCardForms} />
      )}
    </Flex>
  )
}

export default CartSummary
