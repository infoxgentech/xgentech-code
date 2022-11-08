/** @jsxImportSource theme-ui */
import { useTranslate } from '~/hooks'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Box, Flex, Label, Radio, Select, Text } from 'theme-ui'
import ProductAddToCartButton from '~/components/Product/AddToCartButton'
import ProductQuantitySelector from '~/components/Product/QuantitySelector'
import SubscribeButton from '~/components/Subscription/SubscribeButton'

const SubscriptionChooser = ({
  subscription = {},
  price,
  regularPrice,
  sku
}) => {
  const { register, getValues, unregister, watch } = useForm()

  const name = watch('subscription-type')

  const translate = useTranslate()

  const [selectedQuantity, setSelectedQuantity] = useState(1)
  const [selectedInterval, setSelectedInterval] = useState(null)

  const onChange = () => {
    const interval = subscription.intervalsCollection.items.find(
      v => v.slug === getValues('subscription-interval')
    )
    setSelectedInterval(interval)
  }

  const resetSubscription = () => {
    unregister('subscription-interval')
    setSelectedInterval(null)
  }

  const setDefaultInterval = () => {
    setSelectedInterval(subscription.intervalsCollection.items[0])
  }

  return (
    <Box sx={{ border: '1px solid', p: '1rem', my: '1rem' }}>
      <Flex
        sx={{
          flexDirection: 'column',
          textAlign: 'left',
          marginBottom: '1rem'
        }}
      >
        <Box mt={2} mb={2}>
          <Label
            sx={{
              fontWeight: name === 'subscribe-and-save' ? 'normal' : 'bold'
            }}
          >
            <Radio
              sx={{ fontWeight: 'heading' }}
              name="subscription-type"
              value="one-time-purchase"
              defaultChecked={true}
              ref={register}
              onClick={resetSubscription}
            />
            {translate('subscriptions.one_time_purchase')}
          </Label>
        </Box>

        <Box mt={2} mb={2}>
          <Label
            sx={{
              fontWeight: name === 'subscribe-and-save' ? 'bold' : 'normal'
            }}
          >
            <Radio
              name="subscription-type"
              value="subscribe-and-save"
              ref={register}
              onClick={setDefaultInterval}
            />
            {subscription.presentation}
          </Label>
        </Box>

        {name === 'subscribe-and-save' && (
          <Box mt={2}>
            <Select
              sx={{
                height: '2.5rem'
              }}
              name="subscription-interval"
              onChange={onChange}
              ref={register}
            >
              {subscription.intervalsCollection.items.map(({ slug, name }) => (
                <option key={slug} value={slug}>
                  {name}
                </option>
              ))}
            </Select>
            <Text mt={2} variant="body">
              {selectedInterval.presentation}
            </Text>
          </Box>
        )}
      </Flex>

      <Flex
        sx={{
          display: 'flex'
        }}
      >
        <ProductQuantitySelector
          handleChange={value => setSelectedQuantity(parseInt(value))}
        />
        {name !== 'subscribe-and-save' ? (
          <ProductAddToCartButton
            sx={{
              marginLeft: ['12px', null, '16px']
            }}
            price={price}
            quantity={selectedQuantity}
            regularPrice={regularPrice}
            sku={sku}
          />
        ) : (
          <SubscribeButton
            sx={{
              marginLeft: ['12px', null, '16px']
            }}
            price={price}
            quantity={selectedQuantity}
            regularPrice={regularPrice}
            sku={sku}
            subscription={subscription}
            interval={selectedInterval}
          />
        )}
      </Flex>
    </Box>
  )
}

export default SubscriptionChooser
