const NAVIGATION_BAR_FRAGMENT = `
  name
  slug
  pagesCollection(limit: 25) {
    items {
      sys {
        id
      }
      slug
      name
    }
  }
`
export { NAVIGATION_BAR_FRAGMENT }
