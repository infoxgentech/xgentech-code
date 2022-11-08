/** @jsxImportSource theme-ui */
import { Flex } from 'theme-ui'
import Chevron from '~/assets/images/icons/chevron.svg'
import { useTranslate } from '~/hooks'

const CollectionFilterBarTitle = ({
  onClick,
  currentCollection,
  menuOpen = false,
  sx,
  ...props
}) => {
  const translate = useTranslate()

  return (
    <Flex
      onClick={onClick}
      sx={{
        display: [null, 'none'],
        alignItems: 'center',
        cursor: 'pointer',
        justifyContent: 'space-between',
        padding: ['20px 20px', 0],
        ...sx
      }}
      {...props}
    >
      {currentCollection && !menuOpen
        ? currentCollection.title
        : translate('product.filter_collections')}
      <Chevron />
    </Flex>
  )
}

export default CollectionFilterBarTitle
