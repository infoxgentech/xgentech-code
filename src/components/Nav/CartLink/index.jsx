/** @jsxImportSource theme-ui */
import PropTypes from 'prop-types'
import Link from '~/components/Generic/Link'
import { Box } from 'theme-ui'

const CartLink = ({ children, itemCount }) => {
  const showItemCount = typeof itemCount === 'number'
  return (
    <Link
      key="cart"
      href="/cart/"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        width: [null, null, '200px']
      }}
    >
      <Box sx={{ marginRight: '8px' }}>
        {children}
      </Box>
      <Box
        sx={{
          visibility: showItemCount ? null : 'hidden',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '1.75rem',
          width: '1.75rem',
          boxSizing: 'border-box',
          border: '1px solid',
          borderRadius: '100%',
          borderColor: 'inherit',
        }}
      >
        {itemCount || 0}
      </Box>
    </Link>
  )
}

CartLink.propTypes = {
  itemCount: PropTypes.number
}

export default CartLink
