/** @jsxImportSource theme-ui */
import { Flex } from 'theme-ui'
import Quote from '~/components/Generic/Quote'

const QuoteSection = ({ quotes }) => {
  return (
    <Flex
      sx={{
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: 'altBackground'
      }}
    >
      {quotes.map((quote, index) => {
        return <Quote key={index} quote={quote} />
      })}
    </Flex>
  )
}

export default QuoteSection
