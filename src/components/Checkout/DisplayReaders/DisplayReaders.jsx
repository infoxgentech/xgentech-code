/** @jsxImportSource theme-ui */
import React from 'react'
import { Button, Text } from 'theme-ui'

const DisplayReaders = ({ readers, handleSelect }) => {
  return (
    <div>
      {readers?.map(reader => (
        <Button
          key={reader.id}
          type="button"
          onClick={() => handleSelect(reader)}
          sx={{
            marginTop: '1rem',
            width: '100%'
          }}
        >
          <Text variant="link">{reader.label}</Text>
        </Button>
      ))}
    </div>
  )
}

export default DisplayReaders
