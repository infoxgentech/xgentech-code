/** @jsxImportSource theme-ui */
import { useTranslate } from '~/hooks'
import { Button, Text } from 'theme-ui'

const DisconnectButton = ({ handleClick }) => {
  const translate = useTranslate()

  return (
    <Button
      type="button"
      onClick={handleClick}
      sx={{
        marginTop: '1rem',
        width: '100%'
      }}
    >
      <Text variant="link">{translate('checkout.disconnect')}</Text>
    </Button>
  )
}

export default DisconnectButton
