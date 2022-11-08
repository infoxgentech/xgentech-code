/** @jsxImportSource theme-ui */
import { Text, Box, Heading } from 'theme-ui'
import ReactMarkdown from 'react-markdown'

const Quote = ({ quote }) => {
  const { author, location, body } = quote
  return (
    <Box
      sx={{
        py: '1.25rem',
        display: 'flex',
        flex: '1 1 0%',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        margin: ['20px', '40px', '80px']
      }}
    >
      <Box sx={{ textAlign: 'center' }}>
        <Heading
          as="h3"
          sx={{
            color: 'onDark',
            '& p': {
              fontSize: ['22px', '22px', '50px'],
              lineHeight: ['30px', '30px', '60px'],
              letterSpacing: '2px',
              marginTop: ['16px', null, '32px'],
              marginBottom: ['16px', null, '48px']
            }
          }}
        >
          <ReactMarkdown>{body}</ReactMarkdown>
        </Heading>
        <Text variant="subhead" color="onDark">
          {author} {'\u2022'} {location}
        </Text>
      </Box>
    </Box>
  )
}

export default Quote
