/** @jsxImportSource theme-ui */
import { Button, Flex } from 'theme-ui'
import { useTranslate } from '~/hooks'
import ProductLink from '~/components/Product/Link'

const ProductChooseVariantButton = ({
  disabled = false,
  product,
  ...props
}) => {
  const translate = useTranslate()

  return (
    <Button
      disabled={disabled}
      {...props}
      p={0}
      type="submit"
      sx={{
        width: '100%',
        display: 'block',
        fontSize: ['13px', null, '16px']
      }}
    >
      <Flex sx={{ height: '100%' }}>
        <Flex
          sx={{
            alignItems: 'center',
            flexGrow: 1,
            height: '100%',
            justifyContent: 'center',
            padding: ['0 16px', null, '0 32px']
          }}
        >
          <ProductLink product={product}>
            {translate('product.choose_variant')}
          </ProductLink>
        </Flex>
      </Flex>
    </Button>
  )
}

export default ProductChooseVariantButton
