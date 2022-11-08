/** @jsxImportSource theme-ui */
import Link from '~/components/Generic/Link'
import { Box } from 'theme-ui'

const NavMenuDesktopLink = ({ page }) => {
  return (
    <Box sx={{ textAlign: 'center', width: '200px' }}>
      <Link
        href={`/${page.slug}/`}
        sx={{
          color: 'inherit',
          variant: 'text.navLink'
        }}
      >
        {page.name}
      </Link>
    </Box>
  )
}

export default NavMenuDesktopLink
