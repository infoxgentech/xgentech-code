/** @jsxImportSource theme-ui */
import { Box } from 'theme-ui'

const CollectionFilterBarFilter = ({
  title,
  slug,
  onClick,
  currentCollection
}) => {
  return (
    <Box
      onClick={onClick}
      sx={{
        borderTop: ['1px solid', 'none'],
        textDecoration:
          currentCollection && currentCollection.slug === slug
            ? 'underline'
            : 'none',
        cursor: 'pointer',
        textAlign: ['left', 'center'],
        padding: ['20px 20px', '0 20px 0 0']
      }}
    >
      {title}
    </Box>
  )
}

export default CollectionFilterBarFilter
