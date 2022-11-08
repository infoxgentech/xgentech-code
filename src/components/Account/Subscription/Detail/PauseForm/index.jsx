/** @jsxImportSource theme-ui */
import { Flex, Button, Input, Text } from 'theme-ui'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslate } from '~/hooks'

const SubscriptionDetailsPauseForm = ({ action, actionType }) => {
  const translate = useTranslate()
  const { register, handleSubmit } = useForm()
  const [error, setError] = useState(null)

  const onSubmit = async actionable_date => {
    await action(actionable_date).catch(error => {
      setError(error)
    })
  }

  return (
    <Flex
      as="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ flexDirection: 'column', margin: '0.5rem' }}
    >
      <Button type="submit">{translate(`subscriptions.${actionType}`)}</Button>
      <Text mt="0.5rem">
        {actionType === 'pause'
          ? translate('subscriptions.pause_until')
          : translate('subscriptions.resume_at')}
      </Text>
      <Input mt="0.5rem" type="date" ref={register()} name="actionable_date" />
      {error && <p>{error.message}</p>}
    </Flex>
  )
}
export default SubscriptionDetailsPauseForm
