/** @jsxImportSource theme-ui */
import Link from '~/components/Generic/Link'
import ResponsiveImage from '~/components/Generic/Image'
import { Flex, Heading, Text } from 'theme-ui'
import ReactMarkdown from 'react-markdown'

const ArticleCard = ({ article }) => {
  const { title, slug, description, image, source } = article
  return (
    <Link href={`/articles/${slug}`}>
      <Flex
        sx={{
          flexDirection: ['column']
        }}
      >
        {image && <ResponsiveImage image={image} />}
        {source && (
          <Text
            sx={{
              variant: 'text.body',
              color: 'primary',
              textAlign: ['center', null, 'left'],
              marginTop: ['8px', null, '16px']
            }}
          >
            POSTED BY {source.name}
          </Text>
        )}
        <Heading
          as="h2"
          variant="h2"
          sx={{
            textAlign: ['center', null, 'left'],
            color: 'primary',
            variant: ['text.h3', 'text.h3', 'text.h2'],
            marginTop: ['16px', null, '36px'],
            marginBottom: ['8px', null, '32px']
          }}
        >
          {title}
        </Heading>
        {description && (
          <Text
            sx={{
              variant: 'text.body',
              color: 'primary',
              textAlign: ['center', null, 'left']
            }}
          >
            <ReactMarkdown>{description}</ReactMarkdown>
          </Text>
        )}
      </Flex>
    </Link>
  )
}

export default ArticleCard
