/** @jsxImportSource theme-ui */
import { Link, Flex } from 'theme-ui'
import FacebookIcon from '~/assets/images/icons/facebook.svg'
import InstagramIcon from '~/assets/images/icons/instagram.svg'
import PinterestIcon from '~/assets/images/icons/pinterest.svg'
import config from '~/../site-config.js'

const FooterSocialButton = ({ children, ...props }) => {
  return (
    <Link
      {...props}
      sx={{
        borderRadius: '100%',
        height: '33px',
        width: '33px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: '10px',
        ':last-child': {
          marginRight: '0'
        },
        '& > svg': {
          height: '18px'
        }
      }}
    >
      {children}
    </Link>
  )
}

const FooterSocial = () => {
  const { facebook, instagram, pinterest } = config.siteMetadata.social

  return (
    <Flex
      sx={{
        borderBottom: ['1px solid', 'none'],
        paddingBottom: ['1.5rem', '0'],
        justifyContent: ['center', null, 'left'],
        marginBottom: ['1.5rem', null, '0']
      }}
    >
      <FooterSocialButton
        href={`https://www.facebook.com/${facebook}`}
        target="_blank"
        aria-label="Facebook"
        rel="noreferrer"
      >
        <FacebookIcon />
      </FooterSocialButton>

      <FooterSocialButton
        href={`https://www.instagram.com/${instagram}`}
        target="_blank"
        aria-label="Instagram"
        rel="noreferrer"
      >
        <InstagramIcon />
      </FooterSocialButton>

      <FooterSocialButton
        href={`https://www.pinterest.com/${pinterest}`}
        target="_blank"
        aria-label="Pinterest"
        rel="noreferrer"
      >
        <PinterestIcon />
      </FooterSocialButton>
    </Flex>
  )
}

export default FooterSocial
