/** @jsxImportSource theme-ui */
import ResponsiveImage from '~/components/Generic/Image'
import { Box, Button, Card, Flex, Heading, Text } from 'theme-ui'
import { useTranslate } from '~/hooks'
import CollectionLink from '~/components/Collection/Link'
import ReactMarkdown from 'react-markdown'

const CollectionCard = ({ collection }) => {
  const { slug, title, description, mainImage } = collection
  const { id } = collection.sys

  const translate = useTranslate()

  return (
    <Card
      sx={{
        padding: ['0', '0', '0'],
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <CollectionLink
        id={id}
        title={title}
        slug={slug}
        description={description}
        imageurl={mainImage.url}
      >
        {mainImage && <ResponsiveImage image={mainImage} />}
      </CollectionLink>
      <Flex
        sx={{
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'center',
          flexDirection: 'column',
          flexGrow: 1,
          px: ['16px', null, '24px'],
          py: ['16px', '24px', '32px']
        }}
      >
        <CollectionLink
          id={id}
          title={title}
          slug={slug}
          description={description}
          imageurl={mainImage.url}
          sx={{
            textTransform: 'none',
            textAlign: 'center'
          }}
        >
          <Text
            variant="textLink"
            sx={{
              paddingBottom: ['8px', null, '12px'],
              paddingTop: ['8px', null, null]
            }}
          >
            {translate('collections.title')}
          </Text>

          <Heading
            as="h2"
            variant="h2"
            sx={{
              paddingBottom: ['8px', null, '12px']
            }}
          >
            {title}
          </Heading>
        </CollectionLink>
        <Flex
          color="white"
          sx={{
            flexDirection: 'column',
            textAlign: 'center',
            flexGrow: 1,
            justifyContent: 'space-between'
          }}
        >
          {description && (
            <Box
              sx={{
                variant: ['text.h4', 'text.h4', 'text.h4'],
                textAlign: 'center',
                '& p': {
                  margin: 2
                }
              }}
            >
              <ReactMarkdown>{description}</ReactMarkdown>
            </Box>
          )}
          <CollectionLink
            id={id}
            title={title}
            slug={slug}
            description={description}
            imageurl={mainImage.url}
          >
            <Button
              sx={{
                color: 'white',
                backgroundColor: 'lightdark',
                '&:hover': {
                  color: 'primary',
                  backgroundColor: 'altBackground'
                },
                width: '100%'
              }}
            >
              {translate('collections.shop_button')}
            </Button>
          </CollectionLink>
        </Flex>
      </Flex>
    </Card>
  )
}

export default CollectionCard
