import React from 'react'
import { Container, Heading, Text } from 'theme-ui'
import Author from '~/components/Article/Author'
import ReactMarkdown from 'react-markdown'

const ArticlePage = ({ article }) => {
  const { title, author, body } = article

  return (
    <Container
      sx={{
        padding: [0, '0 1rem', '0 4rem'],
        maxWidth: '1440px'
      }}
    >
      <Heading
        as="h2"
        variant="h2"
        sx={{
          textAlign: ['center', null, 'left'],
          color: 'primary',
          variant: ['text.h3', 'text.h3', 'text.h2'],
          marginTop: ['16px', null, '36px'],
          marginBottom: ['8px', null, '32px']
        }}
      >
        {title}
      </Heading>

      {author && <Author name={author.name} />}

      <Text
        sx={{
          variant: 'text.body',
          color: 'primary',
          textAlign: ['center', null, 'left'],
          '& p': {
            img: {
              width: '100%'
            }
          }
        }}
      >
        <ReactMarkdown>{body}</ReactMarkdown>
      </Text>
    </Container>
  )
}

export default ArticlePage
