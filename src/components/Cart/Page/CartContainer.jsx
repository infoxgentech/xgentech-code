/** @jsxImportSource theme-ui */
import { useTranslate } from '~/hooks'
import { Container, Flex, Heading } from 'theme-ui'

const CartContainer = ({ children }) => {
  const translate = useTranslate()

  return (
    <Container>
      <Flex
        sx={{
          flexDirection: 'column',
          marginBottom: ['1.5rem', null, '4.5rem'],
          marginTop: ['0', null, '42px']
        }}
      >
        <Heading
          as="h1"
          sx={{
            variant: 'responsive.desktop',
            lineHeight: '1em',
            textAlign: 'left',
            paddingBottom: '1rem',
            marginBottom: '16px',
            marginLeft: '32px'
          }}
        >
          {translate('cart.title')}
        </Heading>
        {children}
      </Flex>
    </Container>
  )
}

export default CartContainer
