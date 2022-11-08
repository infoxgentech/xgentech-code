/** @jsxImportSource theme-ui */
import React from 'react'
import { Box, Input, Label } from 'theme-ui'

const FormInputWithLabel = React.forwardRef(
  ({ name, label, ...props }, ref) => {
    return (
      <Box sx={{ position: 'relative', height: '100%', width: '100%' }}>
        <Input
          sx={{
            fontSize: ['13px', null, '16px'],
            letterSpacing: '1px',
            width: '100%',
            marginBottom: ['0.75rem', null, '0'],
            paddingLeft: [null, null, '1rem'],
            variant: 'text.body',
            '::placeholder': {
              variant: 'text.link'
            },
            ':not(:placeholder-shown)': {
              paddingTop: ['15px', null, '30px']
            },
            ':not(:placeholder-shown) + label': {
              opacity: '.75'
            }
          }}
          name={name}
          ref={ref}
          {...props}
        />
        <Label
          htmlFor={name}
          sx={{
            position: 'absolute',
            top: ['8px', null, '12px'],
            left: '15px',
            opacity: '0',
            letterspacing: '1px',
            pointerEvents: 'none'
          }}
        >
          {label}
        </Label>
      </Box>
    )
  }
)
export default FormInputWithLabel
