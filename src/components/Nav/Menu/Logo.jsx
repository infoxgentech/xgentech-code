/** @jsxImportSource theme-ui */
import Link from '~/components/Generic/Link'
import Logo from '~/assets/images/logos/logo.svg'

const NavMenuLogo = () => {
  return (
    <Link
      href="/"
      sx={{
        flexShrink: 0,
        '& svg': { height: '2rem', width: 'auto' }
      }}
      aria-label="Home"
    >
      <Logo />
    </Link>
  )
}

export default NavMenuLogo
