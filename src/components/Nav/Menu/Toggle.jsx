/** @jsxImportSource theme-ui */
import { Text } from 'theme-ui'

const NavMenuToggle = ({ children, onClick }) => {
  return (
    <Text
      key="menu"
      onClick={onClick}
      sx={{
        cursor: 'pointer',
        flexShrink: 0,
        variant: 'text.navLink',
        marginRight: '1rem',
        display: ['block', 'none']
      }}
    >
      {children}
    </Text>
  )
}

export default NavMenuToggle
