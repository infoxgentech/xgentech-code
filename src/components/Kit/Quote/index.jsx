/** @jsxImportSource theme-ui */
import { Container } from 'theme-ui'
import Quote from '~/components/Generic/Quote'

const KitQuote = ({ quote }) => {
  return (
    <Container
      variant="fullWidth"
      sx={{
        backgroundColor: 'altBackground'
      }}
    >
      <Container>
        <Quote quote={quote} />
      </Container>
    </Container>
  )
}

export default KitQuote
