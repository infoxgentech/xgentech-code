/** @jsxImportSource theme-ui */
import { useForm } from 'react-hook-form'
import { Flex, Select } from 'theme-ui'

const ProductOptionSelector = ({
  title,
  type,
  values = [],
  selectedValue = '',
  handleChange,
  ...props
}) => {
  const { register, getValues } = useForm()

  const onChange = () => {
    if (handleChange) {
      const option = values.filter(v => v.slug === getValues(type))

      if (option.length > 0) handleChange(option[0])
    }
  }

  return (
    <Flex
      sx={{
        width: '100%',
        '& > div': {
          width: 'inherit',
          minWidth: '200px'
        },
        flexDirection: 'column',
        marginRight: '0.75rem'
      }}
      {...props}
    >
      {title}
      <Select
        sx={{
          height: '2.5rem',
          width: 'inherit'
        }}
        name={type}
        onChange={onChange}
        ref={register}
        value={selectedValue}
      >
        {values.map(({ slug, presentation }, index) => (
          <option key={`${index}-${slug}`} value={slug}>
            {presentation}
          </option>
        ))}
      </Select>
    </Flex>
  )
}

export default ProductOptionSelector
