/** @jsxImportSource theme-ui */
import { Box, Heading } from 'theme-ui'
import ContentFaqQuestion from '~/components/Content/Faq/Question'

const ContentFaqTopic = ({ topic }) => {
  const { items: questions } = topic.questionsCollection
  return (
    <Box>
      <Heading
        as="h2"
        sx={{ marginBottom: '2rem', variant: ['text.h3', null, 'text.h2'] }}
      >
        {topic.name}
      </Heading>
      <Box sx={{ marginBottom: '4.5rem' }}>
        {questions.map((question, index) => {
          return <ContentFaqQuestion key={index} faq={question} />
        })}
      </Box>
    </Box>
  )
}

export default ContentFaqTopic
