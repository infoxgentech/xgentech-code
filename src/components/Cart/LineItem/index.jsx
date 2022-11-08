/** @jsxImportSource theme-ui */
import { useAnalytics } from '@chordcommerce/react-autonomy'
import Link from '~/components/Generic/Link'
import ResponsiveImage from '~/components/Generic/Image'
import { Box, Flex, Text } from 'theme-ui'
import QuantitySelector from '~/components/Cart/QuantitySelector'
import SubscriptionDetails from '~/components/Cart/Subscription/Details'
import SubscriptionRemoveButton from '~/components/Cart/Subscription/RemoveButton'
import GiftCardForm from '~/components/Cart/GiftCardForm'

const LineItem = ({
  id,
  sku,
  slug,
  name,
  options,
  quantity,
  displayAmount,
  singleDisplayAmount,
  orderConfirmed = false,
  subscriptions = [],
  giftCards = [],
  showGiftCardForms,
  setGiftCardFormInput,
  image,
  lineItem
}) => {
  const { trackProductClicked } = useAnalytics()
  const path = sku.includes('|') ? 'bundles' : 'products'
  const url = `/${path}/${slug}/`

  const giftCardsPresent = giftCards.length > 0

  const giftCardDetailsText =
    !showGiftCardForms &&
    giftCardsPresent &&
    giftCards.map(giftCard => (
      <Text
        sx={{
          marginBottom: '0.5rem',
          fontSize: '0.75rem'
        }}
        key={giftCard.id}
      >
        {`Value: ${giftCard.amount}, Recipient: ${giftCard.recipientEmail}, Delivery date: ${giftCard.sendEmailAt}`}
      </Text>
    ))

  return (
    <>
      <Flex
        sx={{
          flexDirection: ['column', 'row'],
          marginBottom: ['12px', '20px'],
          marginTop: ['12px', '20px'],
          justifyContent: 'space-between'
        }}
      >
        <Flex
          sx={{
            flexDirection: ['row']
          }}
        >
          {image && (
            <Box
              sx={{
                width: '100px'
              }}
            >
              <Link
                href={url}
                onClick={() => trackProductClicked({ product: lineItem })}
              >
                <ResponsiveImage
                  image={{
                    url: image.smallUrl,
                    title: image.alt,
                    height: image.attachmentHeight,
                    width: image.attachmentWidth
                  }}
                />
              </Link>
            </Box>
          )}
          <Flex
            sx={{
              flexDirection: 'column',
              flexGrow: 1,
              height: '100%',
              marginLeft: '1rem'
            }}
          >
            <Text
              sx={{
                marginBottom: '0.5rem',
                variant: 'text.h4'
              }}
            >
              {name}
            </Text>

            {!giftCardsPresent && (
              <Text
                sx={{
                  marginBottom: '0.5rem',
                  variant: 'text.h4'
                }}
              >
                {options}
              </Text>
            )}

            {giftCardDetailsText}

            {subscriptions.length === 0 && (
              <Text variant="body">{singleDisplayAmount}</Text>
            )}

            {subscriptions.length > 0 && (
              <Box sx={{ marginTop: '2rem' }}>
                <Text
                  sx={{
                    variant: 'text.h4'
                  }}
                >
                  Subscription Summary:
                </Text>
                {subscriptions.map((subscription, index) => (
                  <SubscriptionDetails
                    key={index}
                    subscription={subscription}
                    singleDisplayAmount={singleDisplayAmount}
                    displayAmount={displayAmount}
                  />
                ))}
              </Box>
            )}
          </Flex>
        </Flex>
        <Flex
          sx={{
            flexDirection: ['row', 'column'],
            alignItems: ['center', 'flex-end'],
            justifyContent: 'space-between',
            height: ['48px', '160px'],
            marginTop: ['12px', '0']
          }}
        >
          {orderConfirmed && <Text>{quantity}</Text>}

          <Text variant="body">{displayAmount}</Text>

          {!orderConfirmed && subscriptions.length === 0 && (
            <QuantitySelector
              quantity={quantity}
              lineItemId={id}
              sx={{
                marginRight: ['0', null, '4px'],
                width: ['96px', '128px']
              }}
            />
          )}

          {!orderConfirmed && subscriptions && subscriptions.length > 0 && (
            <SubscriptionRemoveButton lineItemId={id} />
          )}
        </Flex>
      </Flex>
      {showGiftCardForms && giftCardsPresent && (
        <GiftCardForm
          setGiftCardFormInput={setGiftCardFormInput}
          giftCardDetails={giftCards}
          key={id}
        />
      )}
    </>
  )
}

export default LineItem
