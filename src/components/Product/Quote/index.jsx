/** @jsxImportSource theme-ui */
import { Container } from 'theme-ui'
import Quote from '~/components/Generic/Quote'

const ProductQuote = ({ quote }) => {
  return (
    <Container
      variant="fullWidth"
      sx={{
        backgroundColor: 'altBackground',
        marginBottom: ['32px', null, '48px'],
        marginTop: ['20px', '24px', '48px']
      }}
    >
      <Container>
        <Quote quote={quote} />
      </Container>
    </Container>
  )
}

export default ProductQuote
