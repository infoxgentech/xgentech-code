const SUBSCRIPTION_FRAGMENT = `
  sys {
    id
  }
  name
  slug
  presentation
  discountPercentage
  intervalsCollection {
    items {
      sys {
        id
      }
      name
      slug
      presentation
      length
      unit
    }
  }
`

export { SUBSCRIPTION_FRAGMENT }
