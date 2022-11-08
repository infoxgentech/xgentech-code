const OPTION_TYPE_FRAGMENT = `
  name
  slug
  presentation
  optionValuesCollection(limit: 5) {
    items {
      name
      slug
      presentation
      linkedFrom {
        optionTypeCollection(limit: 1) {
          items {
            slug
          }
        }
      }
    }
  }
`
export { OPTION_TYPE_FRAGMENT }
