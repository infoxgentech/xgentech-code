/** @jsxImportSource theme-ui */
import React from 'react'
import { Button, Text } from 'theme-ui'

const DisplayLocations = ({ locations, handleSelect }) => {
  return (
    <div>
      {locations?.map(location => (
        <Button
          key={location.id}
          type="button"
          onClick={() => handleSelect(location)}
          sx={{
            marginTop: '1rem',
            width: '100%'
          }}
        >
          <Text variant="link">{location.display_name}</Text>
        </Button>
      ))}
    </div>
  )
}

export default DisplayLocations
