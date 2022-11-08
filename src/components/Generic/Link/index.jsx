import * as React from 'react'
import { default as NextLink } from 'next/link'
import { Link as ThemeUILink } from 'theme-ui'

const Link = ({ href, ...props }) => {
  return (
    <NextLink href={href} passHref>
      <ThemeUILink {...props} />
    </NextLink>
  )
}

export default Link
