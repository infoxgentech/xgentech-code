/** @jsxImportSource theme-ui */
import { Card, Heading, Text } from 'theme-ui'
import { useTranslate } from '~/hooks'

const OrderConfirmationContact = () => {
  const translate = useTranslate()

  return (
    <Card
      sx={{
        width: '100%',
        marginBottom: '1.5rem',
        padding: ['32px 18px', '2.5rem']
      }}
    >
      <Heading as="p" variant="link" sx={{ marginBottom: '0.5rem' }}>
        {translate('confirmation.contact.title')}
      </Heading>

      <Text as="p">
        {translate('confirmation.contact.text')}{' '}
        <a
          sx={{
            textDecoration: 'underline'
          }}
          href="mailto:hello@chord.co"
        >
          hello@chord.co
        </a>
      </Text>
    </Card>
  )
}

export default OrderConfirmationContact
