/** @jsxImportSource theme-ui */
import dynamic from 'next/dynamic'
import { Fragment } from 'react'
import Link from '~/components/Generic/Link'

const ConsentManager = dynamic(async () =>
  import('@segment/consent-manager').then(
    ({ ConsentManager }) => ConsentManager
  )
)

const bannerContent = (
  <span>
    We use cookies (and other similar technologies) to collect data to improve
    your experience on our site.
    <br />
    By using our website, you’re agreeing to the collection of data as described
    in our{' '}
    <Link href="/privacy-policy" target="_blank">
      Website Data Collection Policy
    </Link>
    .
  </span>
)

const bannerActionsBlock = ({ acceptAll, denyAll }) => (
  <div>
    <button
      type="button"
      onClick={acceptAll}
      sx={{
        backgroundColor: 'white',
        color: 'black',
        mr: '5px',
        padding: '5px 10px',
        border: 'none',
        borderRadius: '2px',
        cursor: 'pointer'
      }}
    >
      Allow all
    </button>
    <button
      type="button"
      onClick={denyAll}
      sx={{
        backgroundColor: 'white',
        color: 'black',
        padding: '5px 10px',
        border: 'none',
        borderRadius: '2px',
        cursor: 'pointer'
      }}
    >
      Deny all
    </button>
  </div>
)

const preferencesDialogContent = (
  <div>
    <p>
      We use data collected by cookies and JavaScript libraries to improve your
      browsing experience, analyze site traffic, deliver personalized
      advertisements, and increase the overall performance of our site.
    </p>
    <p>
      By using our website, you’re agreeing to our{' '}
      <Link href="/privacy-policy" target="_blank">
        Website Data Collection Policy
      </Link>
      .
    </p>
    <p>
      The table below outlines how we use this data by category. To opt out of a
      category of data collection, select “No” and save your preferences.
    </p>
  </div>
)

const cancelDialogContent = (
  <div>
    Your preferences have not been saved. By continuing to use our website,
    you’re agreeing to our{' '}
    <Link href="/privacy-policy" target="_blank">
      Website Data Collection Policy
    </Link>
    .
  </div>
)

const onError = error => {
  console.log('ConsentManagerBanner error', error)
}

const shouldRequireConsent = async () => {
  if (process.env.SEGMENT_SHOULD_REQUIRE_CONSENT === 'true') {
    return true
  }

  // Code splitting this into a runtime import as it imports a timezone
  // database, which is quite large. By having it in it's own bundle, a second
  // touch from the customer should result in a cache hit, even if the app
  // updated.
  const inEU = (await import('@segment/in-eu')).default
  return inEU()
}

/**
 * This file integrates Segment's consent-manager to protect our visitors privacy.
 *
 * See https://github.com/segmentio/consent-manager
 */
const ConsentManagerWrapper = ({ children }) => {
  return (
    <Fragment>
      {children}

      <div
        sx={{
          position: 'sticky',
          bottom: 0,
          left: 0,
          width: '100%',
          zIndex: 999,
          '& > div > div': {
            pl: '8px',
            pr: '40px'
          },
          '[title="Close"]': {
            right: '8px',
            left: 'auto'
          }
        }}
      >
        <ConsentManager
          writeKey={process.env.SEGMENT_WRITE_KEY}
          shouldRequireConsent={shouldRequireConsent}
          implyConsentOnInteraction={false}
          bannerContent={bannerContent}
          bannerSubContent="You can manage your preferences here!"
          bannerActionsBlock={bannerActionsBlock}
          bannerHideCloseButton={false}
          bannerAsModal={false}
          bannerTextColor="#FFFFFF"
          bannerBackgroundColor="#38A169"
          preferencesDialogTitle="Website Data Collection Preferences"
          preferencesDialogContent={preferencesDialogContent}
          cancelDialogTitle="Are you sure you want to cancel?"
          cancelDialogContent={cancelDialogContent}
          onError={onError}
        />
      </div>
    </Fragment>
  )
}

export default ConsentManagerWrapper
