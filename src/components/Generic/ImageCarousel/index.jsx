import React from 'react'
import ResponsiveImage from '~/components/Generic/Image'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { CarouselWrapper } from './styles'

const ImageCarousel = ({ images, infiniteLoop = true }) => {
  return (
    <CarouselWrapper>
      <Carousel
        showIndicators={images.length > 1}
        showStatus={false}
        showArrows={false}
        showThumbs={false}
        autoPlay={false}
        infiniteLoop={infiniteLoop && images.length > 1}
      >
        {images.map((image, index) => (
          <ResponsiveImage key={index} image={image} />
        ))}
      </Carousel>
    </CarouselWrapper>
  )
}

export default ImageCarousel
