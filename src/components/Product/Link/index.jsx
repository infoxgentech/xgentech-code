/** @jsxImportSource theme-ui */
import { useAnalytics } from '@chordcommerce/react-autonomy'
import Link from '~/components/Generic/Link'
import { serializeProduct } from '~/utils/chord/serialize'

/**
 * Creates a link to a product with Chord tracking attached.
 *
 * @param {Object} props
 * @param {Object} props.product The product being linked to.
 * @param {Object?} sx Styles to be applied to the link
 * @param {React.ReactNode | React.ReactNode[] | string} children The contents
 * inside the link.
 */
const ProductLink = ({ product, children, sx, ...props }) => {
  const serializedProduct = serializeProduct(product)
  const { trackProductClicked } = useAnalytics()
  const pathPrefix = serializedProduct.variant.sku?.includes('|')
    ? 'bundles'
    : 'products'
  const url = `/${pathPrefix}/${product?.slug}/`

  return (
    <Link
      href={url}
      onClick={() => trackProductClicked({ product: serializedProduct })}
      sx={{
        ...sx
      }}
      {...props}
    >
      {children}
    </Link>
  )
}

export default ProductLink
