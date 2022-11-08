/** @jsxImportSource theme-ui */
import { Heading } from 'theme-ui'
import { useTranslate } from '~/hooks'

const Author = ({ name }) => {
  const translate = useTranslate()

  return (
    <Heading
      as="h3"
      variant="h3"
      sx={{
        width: '100%',
        padding: ['1rem 0'],
        textAlign: ['center', null, 'left']
      }}
    >
      {translate('articles.author_by')} {name}
    </Heading>
  )
}

export default Author
