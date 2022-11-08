import React from 'react'
import { SvgWrapper } from './styles'
import Image from 'next/image'

const SVG = ({ svg, file, alt, color = 'primary' }) => {
  // Use image placeholder with alt text only as default
  let img = <Image src="" alt={alt} />

  if (file.contentType === 'image/svg+xml') {
    if (svg && svg.content) {
      img = <div dangerouslySetInnerHTML={{ __html: svg.content }} />
    } else {
      img = <Image src={file.url} alt={alt} />
    }
  }

  return <SvgWrapper color={color}>{img}</SvgWrapper>
}

export default SVG
