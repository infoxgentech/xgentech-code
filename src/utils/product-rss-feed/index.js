import {
  getContentfulProducts,
  getVariantsWithAvailability
} from './lib/datasources'

import { createNodes } from '@chordcommerce/product-rss-feed/dist/nodes'
import { buildXML, writeFeed } from '@chordcommerce/product-rss-feed/dist/feed'
import { mergeOptions } from '@chordcommerce/product-rss-feed/dist/options'
import Resolver, {
  defaultOptions
} from '@chordcommerce/product-rss-feed/dist/resolvers/autonomy'

import { defaultReporter as reporter } from '@chordcommerce/product-rss-feed/dist/reporter'
import config from '~/../site-config'

class AugmentedResolver extends Resolver {
  constructor(variant, feedOptions) {
    super(variant, feedOptions)
  }
  image_link({ key }) {
    if (key !== 'image_link') {
      return `Invalid key ${key} for image_link`
    }
    return `https:${this.variant.mainImage?.url}` ?? ''
  }
}

const options = {
  feedEnabled: process.env.PRODUCT_FEED_ENABLED,
  feedURL: config.siteMetadata.siteUrl,
  feedFilename: process.env.PRODUCT_FEED_FILENAME || 'product.rss',
  feedAttributes: [
    {
      key: 'brand',
      type: 'vendor'
    }
  ],
  contentfulCatalogSlug:
    process.env.PRODUCT_FEED_CONTENTFUL_CATALOG_SLUG || 'catalog',
  chordApiUrl: process.env.CHORD_OMS_API_URL
}

export const generateProductFeed = async () => {
  // Determine if the feed generation is actually enabled
  const { feedEnabled } = options

  if (!feedEnabled || feedEnabled === 'false') {
    reporter.warn('Product merchant feed generation has been disabled.')
    return
  }

  // Merge plugin options from starter's gatsby-config.js with our default plugin options
  const feedOptions = mergeOptions(options, defaultOptions, reporter)

  // Fetch the contents of our Contentful catalog
  const { contentfulCatalogSlug: slug } = feedOptions

  reporter.info(`Creating product merchant feed...`)

  // Get all the product from our catalog
  const contentfulProducts = await getContentfulProducts({ reporter }, slug)

  // Fetch corresponding variant availabilities from Chord OMS API
  const enrichedVariants = await getVariantsWithAvailability({
    baseApiUrl: feedOptions.chordApiUrl,
    products: contentfulProducts
  })

  if (enrichedVariants.length === 0) {
    reporter.panic('There is no variant to generate the feed from.')
  }

  // Build the product feed's nodes
  const nodes = await createNodes(
    { options: feedOptions, reporter, Resolver: AugmentedResolver },
    enrichedVariants
  )

  if (nodes.length === 0) {
    reporter.panic('There is no node to generate the feed from.')
  }

  // Transform the feed into valid XML
  const feedXML = await buildXML({ options: feedOptions, reporter }, nodes)

  // Finally, write the results to file
  await writeFeed({ options: feedOptions, reporter }, feedXML)

  reporter.success(
    `Product feed available at: ./public/${feedOptions.feedFilename}`
  )
}
