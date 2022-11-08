/** @jsxImportSource theme-ui */
import Link from '~/components/Generic/Link'

const NavMenuLink = ({ page }) => {
  return (
    <Link
      href={`/${page.slug}/`}
      sx={{
        variant: 'text.navLink',
        color: 'inherit',
        borderTop: ['1px solid', 'none'],
        lineHeight: '3rem',
        width: ['100%', 'auto'],
        padding: ['0 1rem', '0'],
        '&:last-child': {
          borderBottom: ['1px solid', 'none']
        }
      }}
    >
      {page.name}
    </Link>
  )
}

export default NavMenuLink
