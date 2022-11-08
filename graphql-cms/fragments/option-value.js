const OPTION_VALUE_FRAGMENT = `
  name
  slug
  presentation
  linkedFrom {
    optionTypeCollection(limit: 3) {
      items {
        slug
      }
    }
  }
`
export { OPTION_VALUE_FRAGMENT }
