const FAQ_FRAGMENT = `
  name
  slug
  topicsCollection(limit: 5) {
    items {
      sys {
        id
      }
      name
      questionsCollection(limit: 20) {
        items {
          sys {
            id
          }
          question
          answer
        }
      }
    }
  }
`
export { FAQ_FRAGMENT }
