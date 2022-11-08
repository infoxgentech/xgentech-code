const config = require('./site-config')

const siteUrl = config.siteMetadata.siteUrl

/**
 * https://github.com/iamvishnusankar/next-sitemap#configuration-options
 */
module.exports = {
  siteUrl: siteUrl,
  generateRobotsTxt: true,
  sitemapSize: 7000,
  exclude: ['/server-sitemap.xml', '/500'],
  robotsTxtOptions: {
    policies: [{ userAgent: '*', allow: '/' }],
    additionalSitemaps: [
      `${siteUrl}/sitemap.xml`,
      `${siteUrl}/server-sitemap.xml`
    ]
  }
}
