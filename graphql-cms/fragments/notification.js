export const NOTIFICATION_FRAGMENT = `
  slug
  description
`

export const NOTIFICATION_BAR_FRAGMENT = `
  name
  slug
  notification {
    ${NOTIFICATION_FRAGMENT}
  }
`
