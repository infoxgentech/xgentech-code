const getVariantAvailability = ({ baseApiUrl, sku }) => {
  const url = `${baseApiUrl}/api/variants/${sku}/stock_availabilities`

  return fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(async response => {
    if (response.status >= 400) {
      const body = await response.json()
      throw new Error(`Error executing request: ${JSON.stringify(body)}`)
    }

    return response.json()
  })
}

export default getVariantAvailability
