/** @jsxImportSource theme-ui */
import { useRouter } from 'next/router'
import { useState } from 'react'
import { Label, Flex, Button, Input, Text, Spinner } from 'theme-ui'
import { useForm } from 'react-hook-form'
import { useUser } from '@chordcommerce/react-autonomy'
import { useTranslate } from '~/hooks'

const AccountProfileForm = () => {
  const translate = useTranslate()
  const router = useRouter()
  const { user, modifyUser } = useUser()

  const { register, handleSubmit } = useForm({
    defaultValues: {
      email: user.data.email
    }
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const onSubmit = async data => {
    setLoading(true)
    setError(null)

    try {
      await modifyUser({
        attributes: {
          ...data,
          id: user.id
        }
      })
      router.push('/account')
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
      <Label htmlFor="email">{translate('profile.email_input_label')}</Label>
      <Input
        ref={register()}
        defaultValue={user.data.email}
        name="email"
        type="email"
        mb="2"
      />
      {error && <Text variant="formError">{error.message}</Text>}
      <Button type="submit" mb="4">
        {loading && <Spinner data-testid="spinner" size="15" color="inherit" />}
        {!loading && translate('profile.submit_button')}
      </Button>
    </Flex>
  )
}

export default AccountProfileForm
