/** @jsxImportSource theme-ui */
import { Flex } from 'theme-ui'

const NavMenuLinks = ({ children, isOpen }) => {
  return (
    <Flex
      sx={{
        alignItems: 'center',
        justifyContent: ['end', 'space-around'],
        padding: ['0', '0 2rem'],
        width: '100%',
        height: ['auto', '100%'],
        position: ['absolute', 'relative'],
        top: ['4rem', 'auto'],
        flexDirection: ['column', 'row'],
        left: [0, 'auto'],
        display: [isOpen ? 'flex' : 'none', 'flex'],
        backgroundColor: 'background',
        zIndex: 1
      }}
    >
      {children}
    </Flex>
  )
}

export default NavMenuLinks
