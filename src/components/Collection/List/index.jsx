/** @jsxImportSource theme-ui */
import { Box, Container, Flex, Heading } from 'theme-ui'
import ProductList from '~/components/Product/List'
import KitList from '~/components/Kit/List'
import ReactMarkdown from 'react-markdown'

const CollectionList = ({ collection }) => {
  const { title, description } = collection
  const { items: products } = collection.productsCollection
  const { items: kits } = collection.kitsCollection

  return (
    <Container
      sx={{
        borderTop: ['1px solid', 'none'],
        maxWidth: '1440px',
        paddingTop: ['12px', '0', null]
      }}
    >
      <Flex
        sx={{
          alignItems: 'center',
          borderTop: ['none', '1px solid'],
          flexDirection: ['column', 'row'],
          justifyContent: 'space-between',
          padding: ['16px 24px', null, '32px 0'],
          width: '100%'
        }}
      >
        <Heading
          as="h2"
          sx={{
            lineHeight: '1em',
            paddingRight: [null, '5rem'],
            textAlign: ['center', 'left'],
            marginBottom: ['8px', 0, null]
          }}
        >
          {title}
        </Heading>
        {description && (
          <Box
            sx={{
              textAlign: ['center', 'right'],
              '& p': {
                margin: 0
              }
            }}
            variant="text.subhead"
          >
            <ReactMarkdown>{description}</ReactMarkdown>
          </Box>
        )}
      </Flex>
      {products && products.length > 0 && <ProductList products={products} />}
      {kits && kits.length > 0 && <KitList kits={kits} />}
    </Container>
  )
}

export default CollectionList
