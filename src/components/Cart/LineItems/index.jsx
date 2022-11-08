/** @jsxImportSource theme-ui */
import { useTranslate } from '~/hooks'
import { toUsdCurrency } from '~/utils'
import { Box, Flex, Heading } from 'theme-ui'
import LineItem from '~/components/Cart/LineItem'

const LineItems = ({
  items = [],
  orderConfirmed = false,
  amountNeededForFreeShipping,
  eligibleForFreeShipping = false,
  showGiftCardForms,
  setGiftCardFormInput
}) => {
  const translate = useTranslate()

  items = items.filter(item => item && !item.variant.sample)

  const itemCount = items.reduce((acc, item) => {
    return acc + item.quantity
  }, 0)

  return (
    <Flex
      sx={{
        flexDirection: 'column',
        justifyContent: 'center',
        width: '100%'
      }}
    >
      <Heading
        as="h3"
        variant="h3"
        sx={{
          marginBottom: ['0.5rem', null, '2.5rem'],
          textAlign: ['center', null, 'left']
        }}
      >
        {translate('cart.your_items')} ({itemCount})
      </Heading>

      {!orderConfirmed && (
        <Flex
          sx={{
            alignItems: 'center',
            height: '3rem',
            justifyContent: 'space-around'
          }}
        >
          {eligibleForFreeShipping
            ? translate('cart.shipping_banner_free')
            : translate('cart.shipping_banner_not_free', {
                amount: toUsdCurrency(amountNeededForFreeShipping)
              })}
        </Flex>
      )}

      {items.map((li, index) => (
        <Box
          key={index}
          sx={{
            borderBottom: '1px solid',
            borderBottomColor: '#E3E4E3'
          }}
        >
          <LineItem
            id={li.id}
            sku={li.variant && li.variant.sku}
            slug={li.variant && li.variant.slug}
            name={li.variant && li.variant.name}
            options={li.variant && li.variant.optionsText}
            image={li.variant?.images?.[0]}
            quantity={li.quantity}
            displayAmount={li.displayAmount}
            singleDisplayAmount={li.singleDisplayAmount}
            orderConfirmed={orderConfirmed}
            subscriptions={li.subscriptionLineItems}
            giftCards={li.giftCards}
            showGiftCardForms={showGiftCardForms}
            setGiftCardFormInput={setGiftCardFormInput}
            lineItem={li}
          />
        </Box>
      ))}
    </Flex>
  )
}

export default LineItems
