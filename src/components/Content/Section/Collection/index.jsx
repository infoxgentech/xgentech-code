/** @jsxImportSource theme-ui */
import { Box, Flex, Grid, Heading, Text } from 'theme-ui'
import CollectionCard from '~/components/Collection/Card'
import ReactMarkdown from 'react-markdown'

const CollectionSection = ({ title, description, collections }) => {
  return (
    <Flex sx={{ flexDirection: 'column' }}>
      <Box
        sx={{
          width: ['100%', '80%', '70%'],
          margin: 'auto',
          marginTop: '36px',
          marginBottom: '36px'
        }}
      >
        <Heading
          as="h1"
          variant="h1"
          sx={{
            textAlign: 'center',
            color: 'lightdark',
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
              color: 'lightdark',
              textAlign: 'center'
            }}
          >
            <ReactMarkdown>{description}</ReactMarkdown>
          </Text>
        )}
      </Box>

      <Grid
        columns={[1, 2]}
        gap={['12px', '25px']}
        p={['0 1.5rem 2rem 1.5rem', '0 1 0 1']}
      >
        {collections.map(collection => (
          <CollectionCard key={collection.sys.id} collection={collection} />
        ))}
      </Grid>
    </Flex>
  )
}

export default CollectionSection
