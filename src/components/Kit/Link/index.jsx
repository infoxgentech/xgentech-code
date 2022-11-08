/** @jsxImportSource theme-ui */
import { useAnalytics } from '@chordcommerce/react-autonomy'
import Link from '~/components/Generic/Link'
import { serializeKit } from '~/utils/chord/serialize'

const KitLink = ({ kit, children, sx, ...props }) => {
  const { trackProductClicked } = useAnalytics()
  const url = `/bundles/${kit.slug}/`

  return (
    <Link
      href={url}
      onClick={() => trackProductClicked({ product: serializeKit(kit) })}
      sx={{
        ...sx
      }}
      {...props}
    >
      {children}
    </Link>
  )
}

export default KitLink
