/** @jsxImportSource theme-ui */
import { Box, Container, Heading, Text } from 'theme-ui'
import ArticleList from '~/components/Article/List'
import ReactMarkdown from 'react-markdown'

const ArticleSection = ({ title, description, articles }) => {
  return (
    <Container
      sx={{
        flexDirection: 'column'
      }}
    >
      <Box
        sx={{
          marginBottom: ['0', null, '24px'],
          padding: ['32px 0 16px', null, '64px 0 32px']
        }}
      >
        <Heading
          as="h3"
          sx={{
            variant: 'text.h1',
            textAlign: 'center',
            color: 'accent',
            width: ['100%', '65%'],
            margin: 'auto'
          }}
        >
          {title}
        </Heading>
        {description && (
          <Text
            sx={{
              variant: 'text.body',
              color: 'primary',
              textAlign: 'center'
            }}
          >
            <ReactMarkdown>{description}</ReactMarkdown>
          </Text>
        )}
      </Box>
      <ArticleList articles={articles} />
    </Container>
  )
}

export default ArticleSection
