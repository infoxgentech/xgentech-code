import React from 'react'

const ErrorMessage = ({ error }) => {
  const message =
    error.response && error.response.data
      ? error.response.data.message
      : error.message

  return <div>{message}</div>
}

export default ErrorMessage
