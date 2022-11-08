/** @jsxImportSource theme-ui */
import { useAnalytics } from '@chordcommerce/react-autonomy'
import Link from '~/components/Generic/Link'

/**
 * Link to a collection with Chord eventing wired up.
 *
 * @param {Object} props
 * @param {string} props.title
 * @param {string} props.slug
 * @param {import('theme-ui').ThemeUIStyleObject} sx
 */
const CollectionLink = ({ title, slug, children, sx, ...props }) => {
  const { trackCollectionClicked } = useAnalytics()

  const url = `/shop/?collection=${slug}`

  return (
    <Link
      href={url}
      onClick={() =>
        trackCollectionClicked({
          collection: {
            collectionId: slug,
            title,
            url: window.location.origin + url
          }
        })
      }
      sx={{
        ...sx
      }}
      {...props}
    >
      {children}
    </Link>
  )
}

export default CollectionLink
