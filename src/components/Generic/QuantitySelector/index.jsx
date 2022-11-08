/** @jsxImportSource theme-ui */
import { useForm } from 'react-hook-form'
import { Flex, Select, Spinner } from 'theme-ui'

const QuantitySelector = ({ handleChange, options = [], ...props }) => {
  const { register, getValues } = useForm()

  const onChange = () => {
    const quantity = getValues('quantity')
    if (handleChange) handleChange(quantity)
  }

  return (
    <Flex
      sx={{
        flexDirection: 'column',
        justifyContent: 'center',
        minWidth: '80px'
      }}
    >
      {props.isLoading && <Spinner color="inherit" />}
      {!props.isLoading && (
        <Select
          sx={{
            height: ['48px', null, '4rem']
          }}
          name="quantity"
          onChange={onChange}
          ref={register}
          {...props}
        >
          {options.map(({ name, value }) => (
            <option key={value} value={value}>
              {name || value}
            </option>
          ))}
        </Select>
      )}
    </Flex>
  )
}

export default QuantitySelector
