const METADATA_FRAGMENT = `
  defaultPageMetadata {
    description
    image {
      url
    }
    path
    title
  }
  pageMetadataCollection(limit: 20) {
    items {
      description
      image {
        url
      }
      path
      title
    }
  }
`
export { METADATA_FRAGMENT }
