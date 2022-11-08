import { useTranslate } from '~/hooks'
import { Button, Text } from 'theme-ui'

const GiftRecipientsButton = ({ setShowGiftCardForms }) => {
  const translate = useTranslate()

  const handleClick = () => {
    setShowGiftCardForms(true)
  }

  return (
    <Button
      onClick={handleClick}
      sx={{
        marginTop: '1rem',
        width: '100%'
      }}
    >
      <Text>{translate('gift_card.gift_recipients')}</Text>
    </Button>
  )
}

export default GiftRecipientsButton
