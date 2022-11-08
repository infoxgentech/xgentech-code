const dotenv = require('dotenv')
const path = require('path')

const withTM = require('next-transpile-modules')([
  '@chordcommerce/chord-js-autonomy',
  '@chordcommerce/chord-magic',
  '@chordcommerce/react-autonomy'
])

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
})

dotenv.config()

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  env: {
    CONTENTFUL_SPACE_ID: process.env.CONTENTFUL_SPACE_ID,
    CONTENTFUL_ACCESS_TOKEN: process.env.CONTENTFUL_ACCESS_TOKEN,
    CONTENTFUL_API_URL: process.env.CONTENTFUL_API_URL,
    CONTENTFUL_ENVIRONMENT: process.env.CONTENTFUL_ENVIRONMENT,
    SEGMENT_WRITE_KEY: process.env.SEGMENT_WRITE_KEY,
    SEGMENT_SHOULD_REQUIRE_CONSENT: process.env.SEGMENT_SHOULD_REQUIRE_CONSENT,
    STRIPE_PK_KEY: process.env.STRIPE_PK_KEY,
    STRIPE_CONNECTED_ACCOUNT: process.env.STRIPE_CONNECTED_ACCOUNT,
    CHORD_OMS_API_URL: process.env.CHORD_OMS_API_URL,
    CHORD_OMS_STORE_NAME: process.env.CHORD_OMS_STORE_NAME,
    CHORD_OMS_BRAND_NAME: process.env.CHORD_OMS_BRAND_NAME,
    CHORD_OMS_DEFAULT_CHANNEL: process.env.CHORD_OMS_DEFAULT_CHANNEL,
    CHORD_OMS_STORE_ID: process.env.CHORD_OMS_STORE_ID,
    CHORD_OMS_TENANT_ID: process.env.CHORD_OMS_TENANT_ID,
    CHORD_OMS_ID: process.env.CHORD_OMS_ID,
    FREE_SHIPPING_THRESHOLD: process.env.FREE_SHIPPING_THRESHOLD,
    MAGIC_API_KEY: process.env.MAGIC_API_KEY,
    SIMULATED_TERMINAL_ENABLED: process.env.SIMULATED_TERMINAL_ENABLED
  },
  trailingSlash: true,
  productionBrowserSourceMaps: true,
  i18n: {
    locales: ['en'],
    defaultLocale: 'en'
  },
  images: {
    domains: ['images.ctfassets.net', 'd1dglrf9v97u7a.cloudfront.net'],
    deviceSizes: [320, 640, 660, 768, 1024, 1600]
  },
  compiler: {
    styledComponents: true
  },
  webpack: (config, { webpack }) => {
    config.resolve.alias['~'] = path.resolve(__dirname, 'src')

    config.module.rules.push({
      test: /\.svg$/,
      use: [
        'next-swc-loader',
        {
          loader: '@svgr/webpack',
          options: {
            babel: false,
            svgoConfig: {
              plugins: [
                {
                  removeViewBox: false
                }
              ]
            }
          }
        }
      ]
    })

    config.plugins.push(
      // Ignore tests and mocks
      new webpack.IgnorePlugin({ resourceRegExp: /\.test.[tj]sx?$/ }),
      new webpack.IgnorePlugin({ resourceRegExp: /\/__mocks__\// })
    )

    return config
  }
}

module.exports = withBundleAnalyzer(withTM(nextConfig))
