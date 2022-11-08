const hasURLSearchParams =
  typeof window !== 'undefined' && typeof URLSearchParams !== 'undefined'

const getParam = key => {
  if (!hasURLSearchParams) return null
  const searchParams = new URLSearchParams(window.location.search)
  return searchParams.get(key)
}

export { getParam }
