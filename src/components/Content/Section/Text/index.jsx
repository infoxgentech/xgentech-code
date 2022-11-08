/** @jsxImportSource theme-ui */
import { Box, Flex, Heading } from 'theme-ui'
import ReactMarkdown from 'react-markdown'

const TextSection = ({ title, description, children }) => {
  return (
    <Flex
      sx={{
        flexDirection: 'column',
        width: ['100%', '90%', '80%'],
        margin: 'auto',
        marginTop: ['24px', '24px', '96px'],
        marginBottom: ['24px', '24px', '96px']
      }}
    >
      <Heading
        as="h2"
        sx={{
          textAlign: 'center',
          color: 'primary',
          variant: ['text.h3', 'text.h3', 'text.h2'],
          marginTop: ['16px', '16px', '36px'],
          marginBottom: ['16px', null, '32px']
        }}
      >
        {title}
      </Heading>
      {description && (
        <Box
          sx={{
            textAlign: 'center',
            '& p': {
              maxWidth: ['100%', null, '70%'],
              margin: 'auto',
              marginBottom: ['24px', null, '48px']
            },
            a: {
              variant: 'text.link'
            }
          }}
        >
          <ReactMarkdown>{description}</ReactMarkdown>
        </Box>
      )}
      {children}
    </Flex>
  )
}

export default TextSection
