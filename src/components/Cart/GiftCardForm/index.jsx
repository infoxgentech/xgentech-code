import { Flex, Input, Text } from 'theme-ui'
import { useForm } from 'react-hook-form'
import { useTranslate } from '~/hooks'
import { Fragment } from 'react'

const textStyle = {
  textAlign: 'left',
  marginRight: '3rem',
  flex: 1
}

const GiftCardForm = ({ setGiftCardFormInput, giftCardDetails }) => {
  const translate = useTranslate()
  const defaultValues = giftCardDetails.reduce(
    (acc, item) => ({
      ...acc,
      [item.id]: item
    }),
    {}
  )

  const { register, handleSubmit } = useForm({ defaultValues })

  const onSubmit = updatedValues =>
    setGiftCardFormInput(prevState => ({
      ...prevState,
      ...updatedValues
    }))

  return (
    <Flex
      as="form"
      onChange={handleSubmit(onSubmit)}
      sx={{ flexDirection: 'column', margin: '0.5rem' }}
    >
      {giftCardDetails
        .sort((a, b) => a.id - b.id)
        .map((giftCard, index) => {
          const id = giftCard.id
          return (
            <Fragment key={id}>
              <Text
                sx={{
                  ...textStyle,
                  marginY: '0.5rem'
                }}
              >
                {translate('cart.gift_card')} {index + 1}
              </Text>

              <Text sx={textStyle}>{translate('gift_card.email')}</Text>
              <Input
                mt="0.5rem"
                type="email"
                ref={register()}
                name={`${id}.recipientEmail`}
                required
              />

              <Text sx={textStyle}>{translate('gift_card.gift_message')}</Text>
              <Input
                mt="0.5rem"
                type="text"
                ref={register()}
                name={`${id}.giftMessage`}
              />

              <Text sx={textStyle}>{translate('gift_card.date')}</Text>

              <Input
                mt="0.5rem"
                type="date"
                ref={register()}
                name={`${id}.sendEmailAt`}
              />

              <Input
                value={defaultValues[id].id}
                ref={register()}
                name={`${id}.id`}
                type="hidden"
              />
            </Fragment>
          )
        })}
    </Flex>
  )
}

export default GiftCardForm
