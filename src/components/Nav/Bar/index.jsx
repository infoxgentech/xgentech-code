/** @jsxImportSource theme-ui */
import { Box } from 'theme-ui'
import NavMenu from '~/components/Nav/Menu'
import NavMenuDesktop from '~/components/Nav/MenuDesktop'
import config from '~/../site-config.js'

export const NavBar = ({ itemCount }) => {
  const { pages } = config.navigation
  return (
    <Box
      as="nav"
      role="navigation"
      sx={{
        backgroundColor: 'background',
        overflow: 'visible',
        width: '100%'
      }}
    >
      <NavMenu pages={pages} itemCount={itemCount} />
      <NavMenuDesktop pages={pages} itemCount={itemCount} />
    </Box>
  )
}

export default NavBar
