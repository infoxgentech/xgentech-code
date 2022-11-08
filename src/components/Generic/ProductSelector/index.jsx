/** @jsxImportSource theme-ui */
import { useForm } from 'react-hook-form'
import { Flex, Select } from 'theme-ui'

const ProductSelector = ({ handleChange, options = [] }) => {
  const { register, getValues } = useForm()

  const onChange = () => {
    const product = getValues('product')
    if (handleChange) handleChange(product)
  }

  return (
    <Flex
      sx={{
        width: '100%',
        '& > div': {
          width: 'inherit'
        }
      }}
    >
      <Select
        sx={{
          height: ['2.5rem', '4rem'],
          width: 'inherit'
        }}
        name="product"
        onChange={onChange}
        ref={register}
      >
        {options.map(({ name, value }) => (
          <option key={value} value={value}>
            {name || value}
          </option>
        ))}
      </Select>
    </Flex>
  )
}

export default ProductSelector
