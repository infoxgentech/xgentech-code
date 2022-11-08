/** @jsxImportSource theme-ui */
import { Heading } from 'theme-ui'
import React from 'react'

const DisplayStatus = ({ status }) => {
  return (
    <Heading
      as="h3"
      variant="h3"
      sx={{
        marginBottom: ['0.5rem', null, '2rem'],
        textAlign: ['center', null, 'left']
      }}
    >
      {status}
    </Heading>
  )
}

export default DisplayStatus
