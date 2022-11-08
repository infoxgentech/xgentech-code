/** @jsxImportSource theme-ui */
import { Fragment, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Box, Button, Flex, Spinner, Text } from 'theme-ui'
import { useProduct, useUser } from '@chordcommerce/react-autonomy'
import FormInputWithLabel from '~/components/Generic/Form/InputWithLabel'
import { useTranslate } from '~/hooks'
import { serializeProductOrKit } from '~/utils/chord/serialize'

const ProductOutOfStock = ({ product }) => {
  const { user } = useUser()
  const translate = useTranslate()
  const { createStockRequest } = useProduct()
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const { register, handleSubmit, errors } = useForm()

  const onSubmit = async data => {
    setLoading(true)
    try {
      await createStockRequest({
        email: data.email,
        product: serializeProductOrKit(product)
      })
      setSubmitted(true)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Flex sx={{ flexDirection: 'column' }}>
      {!submitted && (
        <Fragment>
          <Box
            sx={{
              textAlign: 'center',
              padding: '2rem',
              marginBottom: '1rem'
            }}
          >
            <Text variant="text.body">
              {translate('product.notify_when_available')}
            </Text>
          </Box>

          <Box as="form" onSubmit={handleSubmit(onSubmit)}>
            <Flex
              sx={{
                flexDirection: ['column', 'row'],
                justifyContent: 'space-between'
              }}
            >
              <Box
                sx={{
                  marginRight: [0, '1rem'],
                  marginBottom: '1rem',
                  width: ['100%', '80%']
                }}
              >
                <FormInputWithLabel
                  sx={{ backgroundColor: 'white' }}
                  title={translate('your_email')}
                  label={translate('your_email')}
                  aria-label={translate('your_email')}
                  placeholder={translate('your_email')}
                  ref={register({
                    required: true,
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: translate('validation.invalid_email')
                    }
                  })}
                  name="email"
                  type="email"
                  defaultValue={user.data.email}
                />
              </Box>
              <Button>
                {loading && <Spinner size="15" color="inherit" />}
                {!loading && <Text>{translate('product.notify_me')}</Text>}
              </Button>
            </Flex>
            {errors &&
              errors['email'] &&
              errors['email'].type === 'required' && (
                <Text color="errorDark">
                  {translate('validation.required_field')}
                </Text>
              )}
            {errors &&
              errors['email'] &&
              errors['email'].type === 'pattern' && (
                <Text color="errorDark">
                  {translate('validation.invalid_email')}
                </Text>
              )}
          </Box>
        </Fragment>
      )}

      {submitted && (
        <Box
          sx={{
            textAlign: 'center',
            padding: '2rem',
            marginBottom: '1rem'
          }}
        >
          <Text variant="text.body">
            {translate('product.notify_when_available_thank_you')}
          </Text>
        </Box>
      )}
    </Flex>
  )
}

export default ProductOutOfStock
