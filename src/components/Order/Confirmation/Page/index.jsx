/** @jsxImportSource theme-ui */
import { useEffect, useState } from 'react'
import { Box, Container, Flex, Heading, Spinner } from 'theme-ui'
import { useCheckout, useUser } from '@chordcommerce/react-autonomy'
import { useTranslate } from '~/hooks'

import dynamic from 'next/dynamic'

const OrderConfirmationReferralPrompt = dynamic(() =>
  import('~/components/Order/Confirmation/ReferralPrompt')
)
const OrderConfirmationSummary = dynamic(() =>
  import('~/components/Order/Confirmation/Summary')
)
const OrderConfirmationCart = dynamic(() =>
  import('~/components/Order/Confirmation/Cart')
)
const OrderConfirmationDetails = dynamic(() =>
  import('~/components/Order/Confirmation/Details')
)
const OrderConfirmationContact = dynamic(() =>
  import('~/components/Order/Confirmation/Contact')
)
const CrossSellContainer = dynamic(() =>
  import('~/components/Order/CrossSell/Container')
)

const OrderConfirmationPage = ({
  orderNumber,
  checkoutSessionId,
  collections
}) => {
  const { loadUserReferralIdentifier } = useUser()
  const { finalizeCheckout } = useCheckout()
  const [cart, setCart] = useState(null)
  const [referralPurl, setReferralPurl] = useState(null)
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [showCrossSell, setShowCrossSell] = useState(true)

  useEffect(() => {
    const finalizeCheckoutAsync = async () => {
      try {
        const cart = await finalizeCheckout({ orderNumber, checkoutSessionId })
        setCart(cart)
        setIsLoading(false)
      } catch (error) {
        setError(error)
      }
    }

    if (!cart) {
      finalizeCheckoutAsync()
    }
  }, [cart, checkoutSessionId, finalizeCheckout, orderNumber])

  useEffect(() => {
    if (cart?.email && !referralPurl) {
      loadUserReferralIdentifier({ email: cart.email })
        .then(({ purl }) => setReferralPurl(purl))
        .catch(e => console.warn('could not load user purl', e))
    }
  }, [loadUserReferralIdentifier, cart?.email, referralPurl])

  if (error) return <ConfirmationError error={error} />
  if (isLoading || !cart) return <ConfirmationLoading />

  return (
    <ConfirmationContainer cart={cart}>
      <Container>
        <Flex
          sx={{
            flexDirection: ['column', null, 'row']
          }}
        >
          <Flex
            sx={{
              width: ['100%', null, '60%'],
              flexDirection: 'column',
              paddingRight: [null, null, '0.75rem'],
              textAlign: ['center', null, 'left']
            }}
          >
            <OrderConfirmationDetails cart={cart} />

            {showCrossSell && (
              <CrossSellContainer
                cart={cart}
                setCart={setCart}
                setShowCrossSell={setShowCrossSell}
                collections={collections}
              />
            )}

            {referralPurl && (
              <OrderConfirmationReferralPrompt purl={referralPurl} />
            )}

            <OrderConfirmationContact />
          </Flex>

          <Flex
            sx={{
              width: ['100%', null, '40%'],
              flexDirection: 'column',
              paddingLeft: [null, null, '0.75rem']
            }}
          >
            <OrderConfirmationSummary cart={cart} />
            <OrderConfirmationCart cart={cart} />
          </Flex>
        </Flex>
      </Container>
    </ConfirmationContainer>
  )
}

const ConfirmationLoading = () => {
  return (
    <ConfirmationContainer loaded={false}>
      <Container>
        <Box
          sx={{
            textAlign: 'center',
            width: '100%',
            backgroundColor: 'white',
            padding: ['1.25rem', '12rem 1.25rem'],
            marginRight: [null, '1rem'],
            marginBottom: ['1rem', null]
          }}
        >
          <Spinner size="50" />
        </Box>
      </Container>
    </ConfirmationContainer>
  )
}

const ConfirmationError = () => {
  const translate = useTranslate()

  return (
    <ConfirmationContainer loaded={false}>
      <Container>
        <Box
          sx={{
            width: '100%',
            backgroundColor: 'white',
            padding: '1rem',
            minHeight: '50vh'
          }}
        >
          <Heading variant="h3" color="errorDark">
            {translate('error.api.default')}
          </Heading>
        </Box>
      </Container>
    </ConfirmationContainer>
  )
}

const ConfirmationContainer = ({ children, cart = {}, loaded = true }) => {
  const translate = useTranslate()
  const name = cart.billAddress && cart.billAddress.name

  const thankYou = name
    ? `${translate('confirmation.title')}, ${name}.`
    : translate('confirmation.title')

  return (
    <Container>
      <Flex
        sx={{
          flexDirection: 'column',
          padding: ['24px 0', null, '48px 0']
        }}
      >
        {loaded && (
          <Heading
            as="h2"
            variant="h2"
            sx={{
              marginBottom: ['24px', null, '64px'],
              textAlign: 'center'
            }}
          >
            {thankYou}
          </Heading>
        )}
        {children}
      </Flex>
    </Container>
  )
}

export default OrderConfirmationPage
