/** @jsxImportSource theme-ui */
import { useTranslate } from '~/hooks'
import { Button, Text } from 'theme-ui'
import { useState } from 'react'

const UpdateOrderButton = ({ handleClick, disabled = false }) => {
  const translate = useTranslate()
  const [loading, setLoading] = useState(false)

  const onClick = async () => {
    try {
      setLoading(true)
      await handleClick()
      setLoading(false)
    } catch (error) {
      setLoading(false)
    }
  }

  return (
    <Button
      type="button"
      onClick={onClick}
      disabled={loading || disabled}
      aria-disabled={loading || disabled}
      sx={{
        marginTop: '1rem',
        width: '100%'
      }}
    >
      <Text variant="link">
        {loading
          ? translate('checkout.updating_order')
          : translate('checkout.update_order')}
      </Text>
    </Button>
  )
}

export default UpdateOrderButton
