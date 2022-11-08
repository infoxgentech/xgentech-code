/** @jsxImportSource theme-ui */
import { Button, Input, Flex, Text, Spinner } from 'theme-ui'
// eslint-disable-next-line no-unused-vars
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useSubscription } from '@chordcommerce/react-autonomy'
import { useTranslate } from '~/hooks'
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'

const inputStyle = {
  maxWidth: '350px',
  flex: 4
}

const flexStyle = {
  flexDirection: ['column', 'row'],
  justifyContent: 'space-between',
  margin: '10px',
  alignItems: ['left', 'center']
}

const textStyle = {
  textAlign: 'left',
  marginRight: '3rem',
  flex: 1
}

const SubscriptionDetailsAddressForm = ({
  addressType,
  subscription,
  close
}) => {
  const translate = useTranslate()
  const stripe = useStripe()
  const elements = useElements()

  const { updateSubscription } = useSubscription({
    subscriptionId: subscription.id
  })

  const address = subscription[addressType]

  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: address.name,
      address1: address.address1,
      address2: address.address2,
      city: address.city,
      state_name: address.state.abbr,
      country_iso: address.country.iso,
      zipcode: address.zipcode
    }
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const isBilling = addressType === 'billAddress'

  const onSubmit = async data => {
    setLoading(true)
    setError(null)

    try {
      const paramsPrefix = `${addressType}Attributes`
      let payload = { [paramsPrefix]: data }

      if (isBilling) {
        if (!stripe || !elements) {
          setLoading(false)
          return
        }

        const cardElement = elements.getElement(CardElement)
        const { error, paymentMethod } = await stripe.createPaymentMethod({
          type: 'card',
          card: cardElement,
          billing_details: {
            name: data.name,
            address: {
              line1: data.address1,
              line2: data.address2,
              city: data.city,
              country: data.country_iso,
              state: data.state_name,
              postal_code: data.zipcode
            }
          }
        })

        if (error) {
          setError(error.message)
          setLoading(false)
          return
        }

        const { card } = paymentMethod
        payload.paymentSourceAttributes = {
          month: card.exp_month,
          year: card.exp_year,
          ccType: card.brand,
          lastDigits: card.last4,
          name: paymentMethod.billing_details.name,
          gateway_payment_profile_id: paymentMethod.id
        }
      }

      await updateSubscription(payload)
      setTimeout(() => close(), 1)
    } catch (error) {
      setError(error)
    }

    setLoading(false)
  }

  return (
    <Flex
      as="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ flexDirection: 'column' }}
    >
      <Flex sx={flexStyle}>
        <Text sx={textStyle}>{translate('address.name')}</Text>
        <Input sx={inputStyle} ref={register({ maxLength: 80 })} name="name" />
      </Flex>

      <Flex sx={flexStyle}>
        <Text sx={textStyle}>{translate('address.address1')}</Text>
        <Input
          sx={inputStyle}
          ref={register({ required: true, maxLength: 80 })}
          name="address1"
        />
      </Flex>

      <Flex sx={flexStyle}>
        <Text sx={textStyle}>{translate('address.address2')}</Text>
        <Input sx={inputStyle} ref={register} name="address2" />
      </Flex>

      <Flex sx={flexStyle}>
        <Text sx={textStyle}>{translate('address.city')}</Text>
        <Input
          sx={inputStyle}
          ref={register({ required: true, maxLength: 80 })}
          name="city"
        />
      </Flex>

      <Flex sx={flexStyle}>
        <Text sx={textStyle}>{translate('address.state')}</Text>
        <Input
          sx={inputStyle}
          ref={register({ required: true, maxLength: 80 })}
          name="state_name"
        />
      </Flex>

      <Flex sx={flexStyle}>
        <Text sx={textStyle}>{translate('address.country')}</Text>
        <Input
          sx={inputStyle}
          ref={register({ required: true, maxLength: 80, hidden: true })}
          name="country_iso"
        />
      </Flex>

      <Flex sx={flexStyle}>
        <Text sx={textStyle}>{translate('address.zip')}</Text>
        <Input
          sx={inputStyle}
          ref={register({ required: true, maxLength: 80 })}
          name="zipcode"
        />
      </Flex>

      {isBilling && (
        <>
          <Flex sx={flexStyle}>
            <Text sx={textStyle}>Card Info</Text>
          </Flex>
          <div style={{ display: 'block', margin: '10px' }}>
            <CardElement options={{ hidePostalCode: true }} />
          </div>
        </>
      )}

      {error && <Text variant="formError">{error.message}</Text>}

      <Flex
        sx={{
          flexDirection: ['column', 'row'],
          justifyContent: ['space-between', 'flex-end'],
          margin: '1rem'
        }}
      >
        <Button m="0.5rem" type="submit">
          {loading && (
            <Spinner data-testid="spinner" size="15" color="inherit" />
          )}
          {!loading && 'Update'}
        </Button>
        <Button m="0.5rem" onClick={close}>
          {translate('address.cancel')}
        </Button>
      </Flex>
    </Flex>
  )
}
export default SubscriptionDetailsAddressForm
