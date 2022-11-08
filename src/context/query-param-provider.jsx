import React, { memo, useMemo } from 'react'
import { useRouter } from 'next/router'
import { QueryParamProvider as ContextProvider } from 'use-query-params'

export const QueryParamProvider = props => {
  const { children, ...rest } = props
  const router = useRouter()

  const location = useMemo(() => {
    if (process.browser) {
      return window.location
    }
    return {
      search: router.asPath.replace(/[^?]+/u, ''),
      pathname: router.asPath
    }
  }, [router.asPath])

  const history = useMemo(
    () => ({
      push: ({ search }) => {
        const href = router.pathname
        const as = `${location.pathname}${search}`
        router.push(href, as, { shallow: true })
      },
      replace: ({ search }) => {
        const href = router.pathname
        const as = `${location.pathname}${search}`
        router.replace(href, as, { shallow: true })
      }
    }),
    [router, location.pathname]
  )
  return (
    <ContextProvider {...rest} history={history} location={location}>
      {children}
    </ContextProvider>
  )
}

export default memo(QueryParamProvider)
