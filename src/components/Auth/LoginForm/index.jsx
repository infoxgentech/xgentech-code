/** @jsxImportSource theme-ui */
import { Flex, Button, Input } from 'theme-ui'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import { useAuth } from '@chordcommerce/react-autonomy'
import { useTranslate } from '~/hooks'

const AuthLoginForm = () => {
  const translate = useTranslate()
  const router = useRouter()
  const { login } = useAuth()

  const { register, handleSubmit } = useForm()

  const [error, setError] = useState(null)

  const onLogin = async ({ email }) => {
    setError(null)
    try {
      await login({ email, showUI: true, redirectURI: window.location.origin })
      router.push('/account')
    } catch (error) {
      setError(error)
    }
  }
  return (
    <Flex
      as="form"
      onSubmit={handleSubmit(onLogin)}
      sx={{ flexDirection: 'column' }}
    >
      <Input ref={register()} name="email" mb="2" />
      <Button type="submit" mb="4">
        {translate('login.sign_in')}
      </Button>
      {error && <p className="error">{error.message}</p>}
    </Flex>
  )
}
export default AuthLoginForm
