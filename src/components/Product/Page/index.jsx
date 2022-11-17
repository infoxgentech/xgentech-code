/** @jsxImportSource theme-ui */
import { Fragment, useState } from 'react'
import { Box, Container, Flex } from 'theme-ui'

import dynamic from 'next/dynamic'

const ProductImages = dynamic(() => import('~/components/Product/Images'))
const ProductDetails = dynamic(() => import('~/components/Product/Details'))
const ProductQuote = dynamic(() => import('~/components/Product/Quote'))

const ImageCarousel = dynamic(() =>
  import('~/components/Generic/ImageCarousel')
)

const RelatedProducts = dynamic(() =>
  import('~/components/Generic/RelatedProducts')
)

const ProductPage = ({ product }) => {
  const { mainImage, quote } = product
  const { items: relatedProducts } = product.relatedProductsCollection
  const { items: variants } = product.variantsCollection

  // each product have at least one variant (enforced by Contentful model)
  const [variant, setVariant] = useState(variants[0])

  const { items: additionalProductImages } = product.imagesCollection

  // main product image + additional product images + variant main
  const images = [mainImage, ...additionalProductImages, variant.mainImage]

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
            <ProductImages images={uniqueImages} />
          </Box>
          <ProductDetails
            product={product}
            sx={{
              maxWidth: ['100%', '100%', '50%'],
              paddingLeft: ['1rem', null, '2rem'],
              paddingRight: ['1rem', null, '2rem']
            }}
            handleVariantChange={variant => setVariant(variant)}
          />
          
        </Flex>
      </Container>
      <Container variant="fullWidth">
        {quote && <ProductQuote quote={quote} />}
      </Container>
      <Container>
        {relatedProducts && relatedProducts.length > 0 && (
          <RelatedProducts products={relatedProducts} />
        )}
      </Container>
    </Fragment>
  )
}

export default ProductPage
