/** @jsxImportSource theme-ui */
import { Fragment } from 'react'
import { Box, Container, Flex } from 'theme-ui'

import dynamic from 'next/dynamic'

const KitImages = dynamic(() => import('~/components/Kit/Images'))
const KitDetails = dynamic(() => import('~/components/Kit/Details'))
const KitQuote = dynamic(() => import('~/components/Kit/Quote'))

const ImageCarousel = dynamic(() =>
  import('~/components/Generic/ImageCarousel')
)

const RelatedProducts = dynamic(() =>
  import('~/components/Generic/RelatedProducts')
)

const KitPage = ({ kit }) => {
  const { quote, mainImage } = kit
  const { items: relatedProducts } = kit.relatedProductsCollection
  const { items: additionalKitImages } = kit.imagesCollection

  // main kit image + additional kit images
  const images = [mainImage, ...additionalKitImages]

  const uniqueImages = images.reduce((acc, image = {}) => {
    return acc.find(item => item.sys.id === image.sys.id)
      ? acc
      : [...acc, image]
  }, [])

  return (
    <Fragment>
      <Container p={0}>
        <Flex
          sx={{
            flexDirection: ['column', 'column', 'row'],
            marginTop: ['0', null, '32px']
          }}
        >
          <Box
            sx={{
              variant: 'responsive.mobileTablet',
              width: ['92%', '60%'],
              margin: 'auto',
              '& .carousel-slider': {
                overflow: 'visible'
              },
              '& .slider-wrapper': {
                overflow: 'visible'
              }
            }}
          >
            <ImageCarousel images={uniqueImages} />
          </Box>
          <Box sx={{ variant: 'responsive.desktop', width: '100%' }}>
            <KitImages images={uniqueImages} />
          </Box>
          <KitDetails
            kit={kit}
            sx={{
              maxWidth: ['100%', '100%', '50%'],
              paddingLeft: ['1rem', null, '2rem'],
              paddingRight: ['1rem', null, '2rem']
            }}
          />
        </Flex>
      </Container>

      <Container variant="fullWidth">
        {quote && <KitQuote quote={quote} />}
      </Container>

      <Container>
        {relatedProducts && relatedProducts.length > 0 && (
          <RelatedProducts products={relatedProducts} />
        )}
      </Container>
    </Fragment>
  )
}

export default KitPage
