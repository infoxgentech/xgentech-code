/** @jsxImportSource theme-ui */
import { Box, Spinner } from 'theme-ui'
import CartContainer from '~/components/Cart/Page/CartContainer'

const CartLoading = () => {
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
        <Spinner size="50" />
      </Box>
    </CartContainer>
  )
}

export default CartLoading
