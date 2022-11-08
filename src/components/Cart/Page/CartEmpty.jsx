/** @jsxImportSource theme-ui */
import { useTranslate } from '~/hooks'
import Link from '~/components/Generic/Link'
import { Box, Button, Heading } from 'theme-ui'
import CartContainer from '~/components/Cart/Page/CartContainer'

const CartEmpty = () => {
  const translate = useTranslate()

  return (
    <CartContainer>
      <Box
        sx={{
          textAlign: 'center',
          width: '100%',
          backgroundColor: 'white',
          padding: ['10rem 1.25rem', '12rem 1.25rem'],
          marginRight: [null, '1rem'],
          marginBottom: ['1rem', null]
        }}
      >
        <Heading as="h4" mb="2rem" mt="0.5rem">
          {translate('cart.empty')}
        </Heading>
        <Button as={Link} href="/shop">
          {translate('cart.shop_button')}
        </Button>
      </Box>
    </CartContainer>
  )
}

export default CartEmpty
