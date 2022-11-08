import { ChordProvider as BaseChordProvider } from '@chordcommerce/react-autonomy'
import { MagicClient } from '@chordcommerce/chord-magic'

import NotificationsContext from './notifications'

/**
 * ChordProvider is a context provider that provides Chord related
 * functionality.
 *
 * @param {Object} props
 * @param {Record<string, any>} props.pageProps `pageProps` provided in Next's `_app.js`.
 * @param {React.ReactNode | React.ReactNode[]} props.children React elements wrapped by this provider.
 */
export const ChordProvider = ({ children, pageProps }) => {
  const magicClient = new MagicClient(process.env.MAGIC_API_KEY)

  return (
    <BaseChordProvider
      config={{
        brandName: process.env.CHORD_OMS_BRAND_NAME,
        storeId: process.env.CHORD_OMS_STORE_ID,
        omsId: process.env.CHORD_OMS_ID,
        tenantId: process.env.CHORD_OMS_TENANT_ID,
        domain: process.env.CHORD_OMS_API_URL,
        currency: 'USD',
        locale: 'en-US'
      }}
      auth={magicClient}
    >
      <NotificationsContext.Provider value={pageProps.notifications ?? {}}>
        {children}
      </NotificationsContext.Provider>
    </BaseChordProvider>
  )
}

export default ChordProvider
