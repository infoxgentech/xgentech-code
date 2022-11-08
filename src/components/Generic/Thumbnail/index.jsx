/** @jsxImportSource theme-ui */
import ResponsiveImage from '~/components/Generic/Image'
import { Box } from 'theme-ui'

const Thumbnail = ({ image, handleClick, selected = false }) => {
  return (
    <Box
      sx={{
        cursor: 'pointer',
        opacity: selected ? 1 : 0.5,
        borderWidth: selected ? 1 : 0,
        borderColor: selected ? 'primary' : '',
        borderStyle: selected ? 'solid' : 'none',
        '&:hover': {
          opacity: 1
        }
      }}
      onClick={() => handleClick(image)}
    >
      {image && <ResponsiveImage key={image.sys.id} image={image} />}
    </Box>
  )
}

export default Thumbnail
