/** @jsxImportSource theme-ui */
import { Flex } from 'theme-ui'
import CollapsiblePanel from '~/components/Generic/CollapsiblePanel'
import { useTranslate } from '~/hooks'
import ReactMarkdown from 'react-markdown'

const ProductIngredients = ({ ingredients, initiallyCollapsed = true }) => {
  const translate = useTranslate()

  return (
    <Flex
      sx={{
        border: '1px solid',
        backgroundColor: 'white',
        py: 10,
        minHeight: ['72px', '80px'],
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '10px',
        '& img': {
          maxWidth: '100%'
        }
      }}
    >
      <CollapsiblePanel
        title={translate('product.ingredients_list')}
        initiallyCollapsed={initiallyCollapsed}
      >
        <ReactMarkdown>{ingredients}</ReactMarkdown>
      </CollapsiblePanel>
    </Flex>
  )
}

export default ProductIngredients
