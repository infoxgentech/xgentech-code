/** @jsxImportSource theme-ui */
import Link from '~/components/Generic/Link'
import { Flex, Text } from 'theme-ui'
import { openConsentManager } from '@segment/consent-manager'
import { useTranslate } from '~/hooks'

const FooterLegal = ({ links }) => {
  const translate = useTranslate()

  return (
    <Flex
      sx={{
        flexDirection: ['column', 'row'],
        fontSize: 14,
        justifyContent: 'center',
        lineHeight: ['25px', 'inherit'],
        textAlign: ['center', 'left']
      }}
    >
      {links.map(({ name, slug }) => {
        return (
          <Text key={slug} sx={{ margin: ['0 0 1rem 0', '0 0.75rem'] }}>
            <Link href={`/${slug}/`}>{name}</Link>
          </Text>
        )
      })}
      <Text
        sx={{ margin: ['0 0 1rem 0', '0 0 0 0.75rem'], cursor: 'pointer' }}
        onClick={openConsentManager}
      >
        {translate('footer.dataconsent.title')}
      </Text>

      <Text sx={{ margin: ['0 0 1rem 0', '0 0 0 0.75rem'] }}>
        © Chord Commerce {new Date().getFullYear()}
      </Text>
    </Flex>
  )
}

export default FooterLegal
