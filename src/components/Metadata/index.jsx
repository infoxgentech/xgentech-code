import React from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import config from '~/../site-config.js'

function Metadata({ title, description = "Chord Commerce's Next.js starter" }) {
  const { pathname } = useRouter()

  const metaTitle = title ? title : config.siteMetadata.title

  const metaUrl = `${config.siteMetadata.siteUrl}${
    pathname === '/' ? '' : pathname
  }`

  const metaImage = config.siteMetadata.image

  const metaDescription = description
    ? description
    : `${metaTitle} | Chord Commerce's Next.js starter`

  return (
    <Head>
      <title>{metaTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:site_name" content={metaTitle} />
      <meta property="og:image" content={metaImage} />

      <meta property="og:url" content={metaUrl} />
      <meta property="twitter:url" content={metaUrl} />

      <meta property="twitter:card" content="summary" />
      <meta
        property="twitter:creator"
        content={`@${config.siteMetadata.social.twitter}`}
      />
      <meta property="twitter:title" content={metaTitle} />
      <meta property="twitter:description" content={metaDescription} />

      <link rel="icon" href="/favicon.ico" />
    </Head>
  )
}

export default Metadata
