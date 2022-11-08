export const fetchGraphQL = async query => {
  const space = process.env.CONTENTFUL_SPACE_ID
  const environment = process.env.CONTENTFUL_ENVIRONMENT
  const token = process.env.CONTENTFUL_ACCESS_TOKEN

  const fetchUrl = `https://graphql.contentful.com/content/v1/spaces/${space}/environments/${environment}`

  const fetchOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ query })
  }

  try {
    const data = await fetch(fetchUrl, fetchOptions).then(response =>
      response.json()
    )

    if (data.errors && data.errors.length > 0) {
      data.errors.map(error => {
        console.error(error, { query: fetchOptions.body })
      })
    }

    return data
  } catch (error) {
    throw new Error(`Could not fetch data from Contentful: ${error.message}`)
  }
}
