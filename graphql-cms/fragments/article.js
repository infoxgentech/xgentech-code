import { IMAGE_FRAGMENT } from './image'

const ARTICLE_FRAGMENT = `
  sys {
    id
  }
  title
  slug
  author {
    name
  }
  body
  description
  image {
    ${IMAGE_FRAGMENT}
  }
`
export { ARTICLE_FRAGMENT }
