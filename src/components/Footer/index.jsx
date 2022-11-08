/** @jsxImportSource theme-ui */
import { Box, Container, Flex } from 'theme-ui'
import FooterLegal from '~/components/Footer/Legal'
import FooterLinks from '~/components/Footer/Links'
import FooterSocial from '~/components/Footer/Social'
import FooterNewsletterSignup from '~/components/Footer/NewsletterSignup'
import config from '~/../site-config.js'

export const Footer = () => {
  const { links, legal } = config.footer

  return (
    <Box as="footer" sx={{ padding: ['2.5rem 0 4rem 0', null, '4.5rem 0'] }}>
      <Container>
        <Flex
          sx={{
            paddingBottom: [null, null, '4.5rem'],
            flexDirection: ['column', null, 'row']
          }}
        >
          <FooterNewsletterSignup />
          <FooterLinks links={links} />
        </Flex>
        <Flex
          sx={{
            justifyContent: 'space-between',
            flexDirection: ['column', null, 'row'],
            paddingTop: ['1.5rem', null, '0']
          }}
        >
          <FooterSocial />
          <FooterLegal links={legal} />
        </Flex>
      </Container>
    </Box>
  )
}

export default Footer
