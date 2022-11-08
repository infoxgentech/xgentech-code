/** @jsxImportSource theme-ui */
import { useState } from 'react'
import { Container, Grid } from 'theme-ui'
import { useTranslate } from '~/hooks'
import CollectionFilterBarTitle from './Title'
import CollectionFilterBarTitleDesktop from './TitleDesktop'
import CollectionFilterBarProductCount from './ProductCount'
import CollectionFilterBarFilters from './Filters'

const CollectionFilterBar = ({
  collections,
  currentCollection,
  onChange,
  sx,
  ...props
}) => {
  const translate = useTranslate()

  const [menuOpen, setMenuOpen] = useState(false)

  const onFilterClick = slug => () => {
    setMenuOpen(false)
    onChange(slug)
  }

  const onTitleClick = () => setMenuOpen(!menuOpen)

  const options = [
    {
      title: translate('product.all_collections'),
      slug: null
    }
  ].concat(collections.map(c => ({ title: c.title, slug: c.slug })))

  return (
    <Container
      sx={{
        padding: [0, '0 1rem', '0 4rem'],
        maxWidth: '1440px',
        ...sx
      }}
      {...props}
    >
      <Grid
        gap={[0, 2, 3]}
        columns={['1', '1fr 2fr 1fr', '1fr 2fr 1fr']}
        sx={{
          width: '100%',
          padding: ['0', '24px 0', '28px 0']
        }}
        variant="text.link"
      >
        <CollectionFilterBarTitle
          onClick={onTitleClick}
          currentCollection={currentCollection}
          menuOpen={menuOpen}
        />

        <CollectionFilterBarTitleDesktop />

        <CollectionFilterBarFilters
          menuOpen={menuOpen}
          options={options}
          onClick={onFilterClick}
          currentCollection={currentCollection}
        />

        <CollectionFilterBarProductCount
          collections={collections}
          currentCollection={currentCollection}
        />
      </Grid>
    </Container>
  )
}

export default CollectionFilterBar
