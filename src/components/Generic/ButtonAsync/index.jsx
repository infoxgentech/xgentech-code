/** @jsxImportSource theme-ui */
import { useState } from 'react'
import { Button, Text, Spinner } from 'theme-ui'

const ButtonAsync = ({ children, onClick, onError, ...props }) => {
  const [isLoading, setIsLoading] = useState(false)

  const handleClick = async () => {
    if (isLoading) return
    setIsLoading(true)
    try {
      await onClick()
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      if (onError) {
        onError(error)
      } else {
        console.error(error)
      }
    }
  }

  return (
    <Button type="button" onClick={handleClick} {...props}>
      {isLoading && <Spinner size="15" color="inherit" />}
      {!isLoading && <Text variant="link">{children}</Text>}
    </Button>
  )
}

export default ButtonAsync
