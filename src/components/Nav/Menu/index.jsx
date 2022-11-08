/** @jsxImportSource theme-ui */
import { useState } from 'react'
import { Flex } from 'theme-ui'
import { useTranslate } from '~/hooks'
import NavMenuLogo from './Logo'
import CartLink from '../CartLink'
import NavMenuLinks from './Links'
import NavMenuLink from './Link'
import NavMenuControls from './Controls'
import NavMenuToggle from './Toggle'

const NavMenu = ({ pages, itemCount }) => {
  const translate = useTranslate()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Flex
      sx={{
        alignItems: 'center',
        color: 'inherit',
        display: [null, null, 'none'],
        justifyContent: 'space-between',
        padding: ['0 1rem', '0 1.5rem', '0'],
        width: '100%',
        height: '4rem'
      }}
    >
      <NavMenuLogo />
      <NavMenuLinks isOpen={isOpen}>
        {pages.map(page => (
          <NavMenuLink page={page} key={page.slug} />
        ))}
      </NavMenuLinks>
      <NavMenuControls>
        <NavMenuToggle onClick={() => setIsOpen(!isOpen)}>
          {translate('navigation.menu')}
        </NavMenuToggle>
        <CartLink itemCount={itemCount} />
      </NavMenuControls>
    </Flex>
  )
}

export default NavMenu
