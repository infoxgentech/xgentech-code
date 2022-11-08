/** @jsxImportSource theme-ui */
import { Flex, Heading, Text } from 'theme-ui'
import ProductList from '~/components/Product/List'
import ReactMarkdown from 'react-markdown'

const ProductSection = ({ title, description, products }) => {
  return (
    <Flex
      sx={{
        flexDirection: 'column',
        marginTop: '36px',
        marginBottom: '36px',
        textAlign: 'center'
      }}
    >
      <Heading
        as="h1"
        variant="h1"
        sx={{
          textAlign: 'center',
          color: 'primary',
          variant: ['text.h2', 'text.h2', 'text.h1'],
          marginTop: ['16px', null, '36px'],
          marginBottom: ['8px', null, '32px']
        }}
      >
        {title}
      </Heading>
      {description && (
        <Text
          sx={{
            variant: 'text.link',
            color: 'primary',
            textAlign: 'center',
            paddingBottom: '1rem'
          }}
        >
          <ReactMarkdown>{description}</ReactMarkdown>
        </Text>
      )}
      <ProductList products={products} />
    </Flex>
  )
}

export default ProductSection
