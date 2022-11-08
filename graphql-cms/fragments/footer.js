const FOOTER_FRAGMENT = `
  pagesCollection(limit: 20) {
    items {
      sys {
        id
      }
      slug
      name
    }
  }
`
export { FOOTER_FRAGMENT }
