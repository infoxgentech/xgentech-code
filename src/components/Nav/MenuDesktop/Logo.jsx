/** @jsxImportSource theme-ui */
import Link from '~/components/Generic/Link'
import Logo from '~/assets/images/logos/logo.svg'

const NavMenuDesktopLogo = () => {
  return (
    <Link
      href="/"
      sx={{
        flexShrink: 0,
        padding: '0 2rem',
        '& svg': { height: '4rem', width: 'auto' }
      }}
      aria-label="Home"
    >
      <Logo sx={{ marginTop: '-16px' }}></Logo>
    </Link>
  )
}

export default NavMenuDesktopLogo
