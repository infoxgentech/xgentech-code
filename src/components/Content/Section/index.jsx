/** @jsxImportSource theme-ui */
import { Container, Flex } from 'theme-ui'
import ArticleSection from './Article'
import CollectionSection from './Collection'
import ContentCardSection from './ContentCard'
import ProductSection from './Product'
import QuoteSection from './Quote'
import TextSection from './Text'

const ContentSection = ({ section }) => {
  const { items: media } = section.mediaCollection || []

  return (
    <Flex
      backgroundColor="background"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
      }}
    >
      <Container>
        {media.length > 0 ? (
          <div>
            {media[0].__typename === 'Product' && (
              <ProductSection
                products={media}
                title={section.title}
                description={section.description}
                cta={section.cta}
              />
            )}

            {media[0].__typename === 'Collection' && (
              <CollectionSection
                collections={media}
                title={section.title}
                description={section.description}
              />
            )}

            {media[0].__typename === 'Quote' && <QuoteSection quotes={media} />}

            {media[0].__typename === 'ContentCard' && (
              <TextSection
                key={section.sys.id}
                title={section.title}
                description={section.description}
                cta={section.cta}
              >
                <ContentCardSection contentCards={media} />
              </TextSection>
            )}

            {media[0].__typename === 'Article' && (
              <ArticleSection
                title={section.title}
                description={section.description}
                articles={media}
              />
            )}
          </div>
        ) : (
          <TextSection
            title={section.title}
            description={section.description}
            cta={section.cta}
          />
        )}
      </Container>
    </Flex>
  )
}

export default ContentSection
