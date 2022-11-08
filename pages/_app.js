import { useMemo } from 'react'
import { IntlProvider } from 'react-intl'
import { useRouter } from 'next/router'
import Script from 'next/script'
import { ThemeProvider } from 'theme-ui'

import { flattenMessages } from '~/utils/locales'
import Layout from '~/components/Layout'
import PageTracker from '~/components/PageTracker'
import QueryParamProvider from '~/context/query-param-provider'
import ChordProvider from '~/context/chord'

import '../public/fonts/fonts.css'
import theme from '../src/theme'

// import French from '../locales/fr.json'
import English from '../locales/en.json'

import ConsentManagerWrapper from '~/components/Segment/ConsentManager'

const MyApp = ({ Component, pageProps }) => {
  const { locale, defaultLocale } = useRouter()
  const [shortLocale] = locale ? locale.split('-') : ['en']

  const messagesForLocale = useMemo(() => {
    switch (shortLocale) {
      // add other locales as you see fit
      // case 'fr':
      //   return French
      case 'en':
        return English
      default:
        return English
    }
  }, [shortLocale])

  // React Intl v2 no longer supports nested messages objects... I've imported all the messages
  // from the Gatsby project, so I'm just flattening them here for the sake of simplicity for this
  // demo project
  const messages = flattenMessages(messagesForLocale)

  return (
    <ChordProvider pageProps={pageProps}>
      <Script
        id="show-banner"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `!function(){var analytics=window.analytics=window.analytics||[];if(!analytics.initialize)if(analytics.invoked)window.console&&console.error&&console.error("Segment snippet included twice.");else{analytics.invoked=!0;analytics.methods=["trackSubmit","trackClick","trackLink","trackForm","pageview","identify","reset","group","track","ready","alias","debug","page","once","off","on","addSourceMiddleware","addIntegrationMiddleware","setAnonymousId","addDestinationMiddleware"];analytics.factory=function(e){return function(){var t=Array.prototype.slice.call(arguments);t.unshift(e);analytics.push(t);return analytics}};for(var e=0;e<analytics.methods.length;e++){var key=analytics.methods[e];analytics[key]=analytics.factory(key)}analytics.load=function(key,e){var t=document.createElement("script");t.type="text/javascript";t.async=!0;t.src="https://cdn.segment.com/analytics.js/v1/" + key + "/analytics.min.js";var n=document.getElementsByTagName("script")[0];n.parentNode.insertBefore(t,n);analytics._loadOptions=e};;analytics.SNIPPET_VERSION="4.13.2";
          }}();`
        }}
      />

      <QueryParamProvider>
        <IntlProvider
          locale={locale}
          defaultLocale={defaultLocale}
          messages={messages}
        >
          <ThemeProvider theme={theme}>
            <ConsentManagerWrapper>
              <PageTracker>
                <Layout>
                  <Component {...pageProps} />
                </Layout>
              </PageTracker>
            </ConsentManagerWrapper>
          </ThemeProvider>
        </IntlProvider>
      </QueryParamProvider>
    </ChordProvider>
  )
}

export default MyApp
