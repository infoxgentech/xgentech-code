import React from 'react'
import ImageHero from '~/components/Generic/ImageHero'

const ContentHero = ({ heading, subheading, image, gradient = false }) => {
  return (
    <ImageHero
      heading={heading}
      subheading={subheading}
      image={image}
      gradient={gradient}
    />
  )
}

export default ContentHero
