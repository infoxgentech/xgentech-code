import Link from '~/components/Generic/Link'
import React from 'react'
import { StyledH1, StyledHeader, TitleContainer } from './styles'

const Header = ({ siteTitle = '' }) => (
  <StyledHeader>
    <TitleContainer>
      <StyledH1>
        <Link href="/">{siteTitle}</Link>
      </StyledH1>
    </TitleContainer>
  </StyledHeader>
)

export default Header
