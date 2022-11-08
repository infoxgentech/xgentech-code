const IMAGE_FRAGMENT = `
  __typename
  contentType
  sys {
    id
  }
  title
  url
  width
  height
  rawPlaceholderUrl: url(transform: {
    width: 300,
    quality: 50
  })
`
export { IMAGE_FRAGMENT }
