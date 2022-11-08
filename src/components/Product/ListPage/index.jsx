import React, { Fragment, useState, useEffect } from 'react'
import { StringParam, useQueryParam } from 'use-query-params'
import CollectionFilterBar from '~/components/Collection/FilterBar'
import CollectionList from '~/components/Collection/List'
import ContentHero from '~/components/Content/Hero'

const ProductListPage = ({ page, collections = [] }) => {
  const [currentCollectionParam, setCurrentCollectionParam] = useQueryParam(
    'collection',
    StringParam
  )

  const [currentCollectionSlug, setCurrentCollectionSlug] = useState(
    currentCollectionParam
  )

  // if the collection in the URL changes via external means (e.g. a footer link was clicked), update the component
  useEffect(() => {
    setCurrentCollectionSlug(currentCollectionParam || null)
  }, [currentCollectionParam])

  const onFilter = slug => {
    // setCurrentCollectionParam updates the URL but does not update currentCollectionParam
    setCurrentCollectionParam(slug || undefined, 'replaceIn')
    setCurrentCollectionSlug(slug)
  }

  const currentCollection = currentCollectionSlug
    ? collections.find(c => c.slug === currentCollectionSlug)
    : null

  const collectionsToShow = currentCollection
    ? [currentCollection]
    : collections

  const { hero } = page
  const { heading, subheading, image } = hero

  return (
    <Fragment>
      <ContentHero
        heading={heading}
        subheading={subheading}
        image={image}
        gradient={false}
      />

      <CollectionFilterBar
        collections={collections}
        currentCollection={currentCollection}
        onChange={onFilter}
      />

      {collectionsToShow &&
        collectionsToShow.map(collection => (
          <CollectionList key={collection.slug} collection={collection} />
        ))}
    </Fragment>
  )
}

export default ProductListPage
