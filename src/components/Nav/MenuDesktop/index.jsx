/** @jsxImportSource theme-ui */
import { Container, Flex } from 'theme-ui'
import { useTranslate } from '~/hooks'
import NavMenuDesktopLink from './Link'
import CartLink from '../CartLink'
import NavMenuDesktopLogo from './Logo'

const NavMenuDesktop = ({ pages, itemCount }) => {

  // const leftLinks = pages.slice(0, Math.round(pages.length / 2));
  const leftLinks = pages;
  // const rightLinks = pages.slice(Math.round(pages.length / 2), pages.length);
  const translate = useTranslate();

  return (
    <Container
      variant="fullWidth"
      sx={{
        alignItems: 'center',
        display: ['none', null, 'flex'],
        padding: '1rem 0',
        width: '100%',
        transition: 'height .25s ease, box-shadow .25s ease',
        height: '128px',
        boxShadow: 'none'
      }}
    >
    <NavMenuDesktopLogo />

      <Flex sx={{ justifyContent: 'flex-end', width: '100%' }}>
        {leftLinks.map(page => (
          <NavMenuDesktopLink page={page} key={page.slug} />
        ))}
         <CartLink itemCount={itemCount}>
          {translate('navigation.cart')}{' '}
        </CartLink>
      </Flex>

      {/* <Flex sx={{ justifyContent: 'flex-start', width: '50%' }}>
        {rightLinks.map(page => (
          <NavMenuDesktopLink page={page} key={page.slug} />
        ))}
      </Flex> */}

    </Container>
  )
}

export default NavMenuDesktop
