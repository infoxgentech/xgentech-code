import React from 'react'
import { useRouter } from 'next/router'
import { useAnalytics } from '@chordcommerce/react-autonomy'

const PageTracker = ({ children }) => {
  const router = useRouter()
  const { chordAnalytics } = useAnalytics()

  // In Next.js, an empty useEffect in a component mounted in _app.js will only
  // be called when the application first loads. This effect does the initial
  // page load tracking for Segment.
  React.useEffect(() => {
    window.analytics?.ready?.(() => {
      chordAnalytics.page()
    })
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [])

  /**
   * Track client-side page views with Segment
   *
   * Note: this page call won't be fired if:
   * - <ConsentManagerWrapper /> is configured to wait for user consent prior tracking.
   * - Users have requested not to be tracked using <ConsentManagerWrapper /> preferences.
   *
   * See `pages/_app.js` and `components/Segment/ConsentManager/index.jsx`
   * for more details.
   */
  React.useEffect(() => {
    router.events.on('routeChangeComplete', () => {
      window.analytics?.ready(() => {
        chordAnalytics.page()
      })
    })
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [])

  return children
}

export default PageTracker
