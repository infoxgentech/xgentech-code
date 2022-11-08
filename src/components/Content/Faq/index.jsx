/** @jsxImportSource theme-ui */
import { Box, Container, Heading } from 'theme-ui'
import ContentFaqTopic from '~/components/Content/Faq/Topic'
import ReactMarkdown from 'react-markdown'

const ContentFaq = ({ faq, page }) => {
  const { items: sections } = page.sectionsCollection || []
  const { items: topics } = faq.topicsCollection || []

  return (
    <Box
      color="primary"
      sx={{
        backgroundColor: 'background',
        padding: ['2.5rem 0', null, '6rem 0']
      }}
    >
      <Container sx={{ textAlign: 'center' }}>
        {sections.map((section, index) => {
          return (
            <Box key={index} sx={{ marginBottom: '4rem' }}>
              <Heading as="h1" variant="h1">
                {section.title}
              </Heading>
              <Box
                sx={{
                  margin: '0 auto',
                  maxWidth: '650px',
                  '& a': {
                    color: 'accent',
                    textDecoration: 'underline',
                    ':hover': { color: 'primary' }
                  },
                  variant: 'text.subhead'
                }}
              >
                <ReactMarkdown>{section.description}</ReactMarkdown>
              </Box>
            </Box>
          )
        })}
      </Container>
      <Container sx={{ maxWidth: '1200px' }}>
        {topics.map((topic, index) => {
          return <ContentFaqTopic key={index} topic={topic} />
        })}
      </Container>
    </Box>
  )
}

export default ContentFaq
