/** @jsxImportSource theme-ui */
import ResponsiveImage from '~/components/Generic/Image'
import { Box, Flex, Heading, Text } from 'theme-ui'
import ReactMarkdown from 'react-markdown'

const ContentCardSection = ({ contentCards }) => {
  return (
    <Flex
      sx={{
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: ['16px', null, '48px']
      }}
    >
      {contentCards.map(card => {
        const { title, description, label, media } = card
        const { id } = card.sys
        return (
          <Flex
            key={id}
            sx={{
              maxWidth: '1200px',
              marginBottom: ['16px', null, '32px'],
              flexDirection: ['column', null, 'row'],
              ':nth-of-type(even)': {
                flexDirection: [null, null, 'row-reverse']
              }
            }}
          >
            <Flex sx={{ width: ['100%', null, '50%'] }}>
              {media && <ResponsiveImage image={media} />}
            </Flex>
            <Flex
              sx={{
                flexDirection: 'column',
                width: ['100%', null, '50%'],
                padding: ['48px 28px', '48px 36px', '64px 96px 64px 64px'],
                justifyContent: 'center'
              }}
            >
              <Text variant="link" sx={{ marginBottom: '0.5rem' }}>
                {label}
              </Text>
              <Heading as="h3" variant="h3">
                {title}
              </Heading>
              <Box>
                <ReactMarkdown>{description}</ReactMarkdown>
              </Box>
            </Flex>
          </Flex>
        )
      })}
    </Flex>
  )
}

export default ContentCardSection
