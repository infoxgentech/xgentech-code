/** @jsxImportSource theme-ui */
import { useTranslate } from '~/hooks'
import { Button, Text } from 'theme-ui'

const TerminalButton = ({ handleClick }) => {
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
      <Text variant="link">{translate('cart.checkout_terminal')}</Text>
    </Button>
  )
}

export default TerminalButton
