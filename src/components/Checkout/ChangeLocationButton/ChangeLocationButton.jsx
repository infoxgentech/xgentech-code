/** @jsxImportSource theme-ui */
import { useTranslate } from '~/hooks'
import { Button, Text } from 'theme-ui'

const ChangeLocationButton = ({ handleClick }) => {
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
      <Text variant="link">{translate('checkout.change_location')}</Text>
    </Button>
  )
}

export default ChangeLocationButton
