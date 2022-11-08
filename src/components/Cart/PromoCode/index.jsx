/** @jsxImportSource theme-ui */
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Box, Button, Flex, Spinner, Text } from 'theme-ui'
import { useCart } from '@chordcommerce/react-autonomy'
import FormInputWithLabel from '~/components/Generic/Form/InputWithLabel'
import { useTranslate } from '~/hooks'

const PromoCode = ({ promotion }) => {
  const translate = useTranslate()
  const { addPromoCode, removePromoCode } = useCart()

  const { register, handleSubmit, errors } = useForm({
    defaultValues: {
      promoCode: promotion ? promotion.code : ''
    }
  })

  const [isFetchingPromoCode, setIsFetchingPromoCode] = useState(false)
  const [apiError, setApiError] = useState(null)
  const [isFormActive, setIsFormActive] = useState(promotion ? true : false)

  const onSubmit = async (data, e) => {
    try {
      setApiError(null)
      setIsFetchingPromoCode(true)

      if (promotion) {
        await removePromoCode({ promoCode: promotion.code })
        e.target.reset()
      } else {
        await addPromoCode({ promoCode: data.promoCode })
      }
    } catch (error) {
      setApiError(error)
    } finally {
      setIsFetchingPromoCode(false)
    }
  }

  const activatePromoCodeForm = event => {
    if (event) event.preventDefault()
    setIsFormActive(true)
  }

  if (!isFormActive) {
    return (
      <Flex sx={{ flexDirection: 'column', my: '1rem' }}>
        <Box as="form" onSubmit={e => activatePromoCodeForm(e)}>
          <Button sx={{ width: '100%' }}>
            <Text>{translate('cart.apply_promo_code')}</Text>
          </Button>
        </Box>
      </Flex>
    )
  }

  return (
    <Flex sx={{ flexDirection: 'column', my: '1rem' }}>
      <Box as="form" onSubmit={handleSubmit(onSubmit)}>
        <Flex
          sx={{
            flexDirection: 'row',
            justifyContent: 'space-between'
          }}
        >
          <Box
            sx={{
              width: '80%',
              marginRight: '1rem'
            }}
          >
            <FormInputWithLabel
              label={translate('cart.promo_code')}
              title={translate('cart.promo_code')}
              aria-label={translate('cart.promo_code')}
              placeholder={translate('cart.promo_code')}
              name="promoCode"
              disabled={promotion}
              ref={register({ required: true })}
            />
          </Box>
          <Button>
            {isFetchingPromoCode && <Spinner size="15" color="inherit" />}
            {!isFetchingPromoCode && (
              <Text>
                {promotion
                  ? translate('cart.remove_promo_code_button')
                  : translate('cart.apply_promo_code_button')}
              </Text>
            )}
          </Button>
        </Flex>
      </Box>
      {apiError && (
        <Text
          variant="formError"
          sx={{
            color: 'errorDark',
            backgroundColor: 'errorLight',
            px: '16px',
            py: '8px'
          }}
        >
          {apiError.message}
        </Text>
      )}
      {errors.promoCode && (
        <Text
          variant="formError"
          sx={{
            color: 'errorDark',
            backgroundColor: 'errorLight',
            px: '16px',
            py: '8px'
          }}
        >
          {translate('validation.required_field')}
        </Text>
      )}
    </Flex>
  )
}

export default PromoCode
