/** @jsxImportSource theme-ui */
import ResponsiveImage from '~/components/Generic/Image'
import { useState } from 'react'
import { Box, Grid } from 'theme-ui'
import Thumbnail from '~/components/Generic/Thumbnail'

const KitImages = ({ images = [] }) => {
  const [selectedImage, setSelectedImage] = useState(
    images.length > 0 ? images[0] : null
  )

  return (
    <Box sx={{ position: 'relative' }}>
      <Box
        mb={2}
        sx={{
          marginLeft: 'calc(10% + 12px)',
          marginRight: '40px'
        }}
      >
        {selectedImage && <ResponsiveImage image={selectedImage} />}
      </Box>
      <Grid
        gap={'12px'}
        columns={1}
        sx={{
          width: '10%',
          position: 'absolute',
          top: '0',
          left: '0'
        }}
      >
        {images.map((image, index) => (
          <Thumbnail
            key={index}
            image={image}
            handleClick={setSelectedImage}
            selected={selectedImage.sys.id === image.sys.id}
          />
        ))}
      </Grid>
    </Box>
  )
}

export default KitImages
