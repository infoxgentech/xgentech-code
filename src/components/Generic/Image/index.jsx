/** @jsxImportSource theme-ui */
import { default as NextImage } from 'next/image'
import { Box } from 'theme-ui'

/**
 * @image a mapped Contentful Asset, see ./cms/utils/mappers/image.js
 * @quality a value that can be used to override the default image quality of 75
 */
const ResponsiveImage = ({ image, quality = 75 }) => {
  const { url, title, width, height, placeholder } = image

  return (
    <Box sx={{ width: '100%' }}>
      <NextImage
        alt={title}
        src={url}
        blurDataURL={placeholder ?? undefined}
        placeholder={placeholder ? 'blur' : 'empty'}
        layout="responsive"
        width={width}
        height={height}
        quality={quality}
      />
    </Box>
  )
}

export default ResponsiveImage
