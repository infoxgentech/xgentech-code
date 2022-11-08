/** @jsxImportSource theme-ui */
import { Divider, Flex } from 'theme-ui'
import LineItems from '~/components/Cart/LineItems'
import CartSummary from '~/components/Cart/Summary'
import CartContainer from '~/components/Cart/Page/CartContainer'
import { useState } from 'react'
import TerminalButton from '~/components/Cart/TerminalButton'
import CancelButton from '~/components/Checkout/CancelButton/CancelButton'
import DisplayStatus from '~/components/Checkout/DisplayStatus/DisplayStatus'
import { useTerminal } from '~/hooks'
import DisplayReaders from '~/components/Checkout/DisplayReaders/DisplayReaders'
import DisconnectButton from '~/components/Checkout/DisconnectButton/DisconnectButton'
import StartPaymentButton from '~/components/Checkout/StartPaymentButton/StartPaymentButton'
import UpdateOrderButton from '~/components/Checkout/UpdateOrderButton/UpdateOrderButton'
import FormInputWithLabel from '~/components/Generic/Form/InputWithLabel'
import DisplayLocations from '~/components/Checkout/DisplayLocations/DisplayLocations'
import ChangeLocationButton from '~/components/Checkout/ChangeLocationButton/ChangeLocationButton'

const initializeGiftCardFormInput = lineItems => () =>
  lineItems.reduce((acc, li) => {
    const lineItemGiftCardFormData = li.giftCards.reduce(
      (acc, item) => ({
        ...acc,
        [item.id]: item
      }),
      {}
    )
    return {
      ...acc,
      ...lineItemGiftCardFormData
    }
  }, {})

const CartNotEmpty = ({
  displayTotalAvailableStoreCredit,
  lineItems,
  displayTotal,
  displayItemTotal,
  displayTaxTotal,
  displayShipTotal,
  promotions,
  eligibleForFreeShipping,
  amountNeededForFreeShipping,
  orderNumber,
  orderEmail,
  orderStatus
}) => {
  const {
    displayStatus,
    readers,
    readerStatus,
    location,
    locations,
    setLocation,
    collectPayment,
    connectToReader,
    disconnectReader,
    updateOrder
  } = useTerminal()
  const [showTerminal, setShowTerminal] = useState(false)
  const [showGiftCardForms, setShowGiftCardForms] = useState(false)
  const [giftCardFormInput, setGiftCardFormInput] = useState(
    initializeGiftCardFormInput(lineItems)
  )
  const [email, setEmail] = useState(orderEmail || '')
  const giftCardsPresent =
    lineItems.filter(item => item.giftCards?.length > 0).length > 0

  const cancel = async () => {
    if (readerStatus === 'connected') await disconnectReader()
    setShowTerminal(false)
  }

  return (
    <CartContainer>
      <Flex
        sx={{
          flexDirection: ['column', null, 'row'],
          justifyContent: 'space-around'
        }}
      >
        <Flex
          sx={{
            flexGrow: 1,
            height: '100%',
            maxWidth: [null, null, '60%'],
            backgroundColor: 'white',
            padding: ['24px 16px', null, '42px 36px'],
            marginRight: [null, null, '1rem'],
            marginBottom: '1rem'
          }}
        >
          <LineItems
            items={lineItems}
            amountNeededForFreeShipping={amountNeededForFreeShipping}
            eligibleForFreeShipping={eligibleForFreeShipping}
            showGiftCardForms={showGiftCardForms}
            setGiftCardFormInput={setGiftCardFormInput}
          />
        </Flex>
        <Flex
          sx={{
            flexGrow: 1,
            height: '100%',
            backgroundColor: 'white',
            padding: ['16px', null, '36px'],
            maxWidth: [null, null, '40%']
          }}
        >
          <div sx={{ width: '100%' }}>
            {!showTerminal && (
              <>
                <CartSummary
                  displayTotalAvailableStoreCredit={
                    displayTotalAvailableStoreCredit
                  }
                  displayItemTotal={displayItemTotal}
                  displayTaxTotal={displayTaxTotal}
                  displayShipTotal={displayShipTotal}
                  displayTotal={displayTotal}
                  promotions={promotions}
                  eligibleForFreeShipping={eligibleForFreeShipping}
                  setShowGiftCardForms={setShowGiftCardForms}
                  showGiftCardForms={showGiftCardForms}
                  giftCardFormInput={giftCardFormInput}
                  giftCardsPresent={giftCardsPresent}
                />
                {process.env.NEXT_PUBLIC_CHORD_POS_ENABLED === 'true' && (
                  <TerminalButton handleClick={() => setShowTerminal(true)} />
                )}
              </>
            )}

            {showTerminal && (
              <>
                <DisplayStatus status={displayStatus} />
                <DisplayStatus
                  status={`Order Status - ${orderStatus.toUpperCase()} - ${orderNumber}`}
                />
                {readerStatus === 'not_connected' && location === null && (
                  <DisplayLocations
                    locations={locations}
                    handleSelect={location => setLocation(location)}
                  />
                )}
                {readerStatus === 'not_connected' && location !== null && (
                  <DisplayReaders
                    readers={readers}
                    handleSelect={reader => connectToReader(reader)}
                  />
                )}
                <Divider />
                {readerStatus === 'connected' && (
                  <>
                    <div>
                      <FormInputWithLabel
                        name="email"
                        label="Email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                      />
                    </div>
                    <UpdateOrderButton
                      handleClick={() => updateOrder(orderNumber, email)}
                      disabled={orderStatus.toLowerCase() === 'confirm'}
                    />
                    {orderEmail && (
                      <StartPaymentButton
                        displayTotal={displayTotal}
                        displayTaxTotal={displayTaxTotal}
                        handleClick={() => collectPayment(orderNumber)}
                        disabled={orderStatus.toLowerCase() === 'confirm'}
                      />
                    )}
                    <DisconnectButton handleClick={disconnectReader} />
                  </>
                )}
                {readerStatus === 'not_connected' && location !== null && (
                  <ChangeLocationButton handleClick={() => setLocation(null)} />
                )}
                <CancelButton handleClick={cancel} />
              </>
            )}
          </div>
        </Flex>
      </Flex>
    </CartContainer>
  )
}

export default CartNotEmpty
