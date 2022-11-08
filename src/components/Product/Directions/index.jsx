/** @jsxImportSource theme-ui */
import { Flex } from 'theme-ui'
import CollapsiblePanel from '~/components/Generic/CollapsiblePanel'
import { useTranslate } from '~/hooks'
import ReactMarkdown from 'react-markdown'

const ProductDirections = ({ directions, initiallyCollapsed = true }) => {
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
        marginBottom: '10px'
      }}
    >
      <CollapsiblePanel
        title={translate('product.how_to_use')}
        initiallyCollapsed={initiallyCollapsed}
      >
        <ReactMarkdown>{directions}</ReactMarkdown>
      </CollapsiblePanel>
    </Flex>
  )
}

export default ProductDirections
