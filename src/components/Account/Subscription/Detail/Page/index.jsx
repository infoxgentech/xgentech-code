/** @jsxImportSource theme-ui */
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Spinner,
  Text,
  Divider
} from 'theme-ui'
import { useSubscription } from '@chordcommerce/react-autonomy'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import { useTranslate } from '~/hooks'
import ShippingCard from '~/components/Account/Subscription/Detail/ShippingCard'
import BillingCard from '~/components/Account/Subscription/Detail/BillingCard'
import { Fragment, useMemo } from 'react'
import SubscriptionDetailsPauseForm from '~/components/Account/Subscription/Detail/PauseForm'
import Link from '~/components/Generic/Link'
import { serializeProductOrKit } from '~/utils/chord/serialize'

const AccountSubscriptionDetailPage = ({ subscriptionId, catalog }) => {
  const translate = useTranslate()
  const {
    isLoaded,
    isFetching,
    subscription,
    skipSubscription,
    cancelSubscription,
    resumeSubscription,
    pauseSubscription
  } = useSubscription({ subscriptionId: parseInt(subscriptionId) })

  const subscriptionProducts = useMemo(() => {
    if (!subscription) return []
    const slugs = subscription.lineItems.map(li => li.productSlug)
    return catalog
      .reduce((acc, pk) => {
        if (!slugs.includes(pk.slug)) return acc
        acc = [...acc, ...(pk.products ? pk.products : [pk])]
        return acc
      }, [])
      .map(serializeProductOrKit)
  }, [catalog, subscription])

  if (!isLoaded) return null

  return (
    <Container>
      <Flex
        sx={{
          width: '100%',
          flexDirection: 'column',
          marginBottom: ['1.5rem', null, '4.5rem'],
          textAlign: ['center', null, 'center'],
          padding: ['24px 16px', null, '42px 36px']
        }}
      >
        <Heading
          as="h1"
          sx={{
            lineHeight: '1em',
            textAlign: 'left',
            paddingBottom: '1rem',
            marginBottom: '1rem'
          }}
        >
          {translate('subscriptions.details')}
        </Heading>

        {subscription.state !== 'canceled' && (
          <SubscriptionActions
            isFetching={isFetching}
            skipSubscription={skipSubscription}
            cancelSubscription={cancelSubscription}
            isPaused={subscription.state === 'paused'}
            resumeSubscription={resumeSubscription}
            pauseSubscription={pauseSubscription}
            products={subscriptionProducts}
          />
        )}

        <Divider />

        <Addresses subscription={subscription} />

        <Divider />

        <LineItems subscription={subscription} />
      </Flex>
    </Container>
  )
}

const SubscriptionActions = ({
  isFetching,
  skipSubscription,
  cancelSubscription,
  isPaused,
  resumeSubscription,
  pauseSubscription,
  products
}) => {
  const translate = useTranslate()

  return (
    <Flex
      sx={{
        flexDirection: ['column', 'row'],
        justifyContent: ['space-between', 'flex-end'],
        marginBottom: '1rem'
      }}
    >
      {isFetching && <Spinner color="inherit" />}

      {!isFetching && (
        <Fragment>
          {isPaused ? (
            <SubscriptionDetailsPauseForm
              action={date =>
                resumeSubscription({
                  actionableDate: date,
                  products
                })
              }
              actionType={'resume'}
            />
          ) : (
            <Fragment>
              <SubscriptionDetailsPauseForm
                action={date =>
                  pauseSubscription({
                    actionableDate: date,
                    products
                  })
                }
                actionType={'pause'}
              />
              <Button m="0.5rem" onClick={() => skipSubscription({ products })}>
                {translate('subscriptions.skip')}
              </Button>
            </Fragment>
          )}
          <Button m="0.5rem" onClick={() => cancelSubscription({ products })}>
            {translate('subscriptions.cancel')}
          </Button>
        </Fragment>
      )}
    </Flex>
  )
}

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
const stripePromise = loadStripe(process.env.STRIPE_PK_KEY)

const Addresses = ({ subscription }) => {
  const translate = useTranslate()

  return (
    <Elements stripe={stripePromise}>
      <Flex
        sx={{
          flexDirection: ['column', 'column', 'row'],
          justifyContent: 'space-around',
          alignItems: 'flex-start'
        }}
      >
        <ShippingCard
          title={translate('subscriptions.shipping')}
          subscription={subscription}
        />
        <BillingCard
          title={translate('subscriptions.billing')}
          subscription={subscription}
        />
      </Flex>
    </Elements>
  )
}

const LineItems = ({ subscription }) => {
  const translate = useTranslate()
  const { state, lineItems, intervalLength, intervalUnits, actionableDate } =
    subscription

  return (
    <Box
      sx={{
        marginTop: ['20px', '45px'],
        marginBottom: ['20px', '45px'],
        flexDirection: ['column', 'row'],
        justifyContent: 'space-around'
      }}
    >
      <Heading>{translate('subscriptions.products')}</Heading>
      <Flex
        sx={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Text mr="1rem">
          {translate('subscriptions.status', {
            status: state
          })}
        </Text>
        <Text mr="1rem">|</Text>
        <Text mr="1rem">
          {translate('subscriptions.auto_renew_interval', {
            length: intervalLength,
            unit: intervalUnits
          })}
        </Text>
        {actionableDate && (
          <Fragment>
            <Text mr="1rem">|</Text>
            <Text mr="1rem">
              {translate('subscriptions.action_date', {
                action_date: actionableDate
              })}
            </Text>
          </Fragment>
        )}
      </Flex>
      {lineItems && (
        <ul sx={{ display: 'flex', justifyContent: 'center' }}>
          {lineItems
            .sort((a, b) => a.id - b.id)
            .map(lineItem => (
              <li key={lineItem.id} sx={{ textAlign: 'left' }}>
                <Link
                  href={`/${
                    lineItem.sku.includes('|') ? 'bundles' : 'products'
                  }/${lineItem.slug}/`}
                  slug={lineItem.productSlug}
                  sku={lineItem.sku}
                  sx={{ ':hover': { textDecoration: 'underline' } }}
                >
                  {lineItem.sku}
                </Link>
              </li>
            ))}
        </ul>
      )}
    </Box>
  )
}

export default AccountSubscriptionDetailPage
