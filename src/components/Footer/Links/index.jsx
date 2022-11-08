/** @jsxImportSource theme-ui */
import Link from '~/components/Generic/Link'
import { Flex, Text } from 'theme-ui'
import { useTranslate } from '~/hooks'

const FooterLinks = ({ links }) => {
  const translate = useTranslate()

  return (
    <Flex
      sx={{
        borderBottom: [null, '1px solid', 'none'],
        flexDirection: ['column', 'row'],
        textAlign: ['center', 'left'],
        width: ['100%', null, '50%']
      }}
    >
      <Flex
        sx={{
          borderBottom: ['1px solid', 'none'],
          lineHeight: ['35px', 'inherit'],
          padding: ['1.5rem 0', null, '0'],
          width: '100%',
          flexDirection: 'column'
        }}
      >
        <Text variant="link" sx={{ marginBottom: '1rem' }}>
          {translate('footer.shop.title')}
        </Text>
        <Text sx={{ marginBottom: '0.25rem' }}>
          <Link href="/shop">{translate('footer.shop.shop_all')}</Link>
        </Text>
      </Flex>
      <Flex
        sx={{
          borderBottom: ['1px solid', 'none'],
          lineHeight: ['35px', 'inherit'],
          padding: ['1.5rem 0', null, '0'],
          width: '100%',
          flexDirection: 'column'
        }}
      >
        <Text variant="link" sx={{ marginBottom: '1rem' }}>
          {translate('footer.company.title')}
        </Text>
        {links.map(({ name, slug }) => {
          return (
            <Text key={slug} sx={{ marginBottom: '0.25rem' }}>
              <Link href={`/${slug}/`}>{name}</Link>
            </Text>
          )
        })}
      </Flex>
      <Flex
        sx={{
          borderBottom: ['1px solid', 'none'],
          lineHeight: ['25px', 'inherit'],
          padding: ['1.5rem 0', null, '0'],
          minWidth: 'fit-content',
          width: '100%',
          flexDirection: 'column'
        }}
      >
        <Text variant="link" sx={{ marginBottom: '1rem' }}>
          {translate('footer.contact.title')}
        </Text>
        <Text sx={{ marginBottom: '0.25rem' }}>
          {translate('footer.contact.general_inquiries')}
        </Text>
        <Text sx={{ marginBottom: '1.25rem' }}>
          <a href="mailto:hello@chord.co">hello@chord.co</a>
        </Text>
        <Text sx={{ marginBottom: '0.25rem' }}>
          {translate('footer.contact.press_inquiries')}
        </Text>
        <Text>
          <a href="mailto:press@chord.co">press@chord.co</a>
        </Text>
      </Flex>
    </Flex>
  )
}

export default FooterLinks
