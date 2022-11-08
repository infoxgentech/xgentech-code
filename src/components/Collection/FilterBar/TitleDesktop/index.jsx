/** @jsxImportSource theme-ui */
import { Box } from 'theme-ui'
import { useTranslate } from '~/hooks'

const CollectionFilterBarTitleDesktop = ({ sx, ...props }) => {
  const translate = useTranslate()

  return (
    <Box
      sx={{
        display: ['none', 'flex'],
        ...sx
      }}
      {...props}
    >
      {translate('product.filter_collections')}
    </Box>
  )
}

export default CollectionFilterBarTitleDesktop
