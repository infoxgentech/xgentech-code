/** @jsxImportSource theme-ui */
import { Flex } from 'theme-ui'
import CollectionFilterBarFilter from './Filter'

const CollectionFilterBarFilters = ({
  menuOpen = false,
  options,
  onClick,
  currentCollection,
  sx,
  ...props
}) => {
  return (
    <Flex
      sx={{
        display: [menuOpen ? 'flex' : 'none', 'flex'],
        flexDirection: ['column', 'row'],
        ...sx
      }}
      {...props}
    >
      {options.map(({ title, slug }) => (
        <CollectionFilterBarFilter
          key={slug}
          slug={slug}
          currentCollection={currentCollection}
          title={title}
          onClick={onClick(slug)}
        />
      ))}
    </Flex>
  )
}

export default CollectionFilterBarFilters
