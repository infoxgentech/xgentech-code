import Metadata from '~/components/Metadata'
import KitPage from '~/components/Kit/Page'
import { getKit, getCatalog } from 'graphql-cms/queries'
import nextContentWrapper from 'graphql-cms/nextContentWrapper'

export async function getStaticPaths() {
  const catalog = await getCatalog({ slug: 'catalog' })

  const kits = catalog.collections.flatMap(
    collection => collection.kitsCollection.items
  )

  const paths = kits.map(k => `/bundles/${k.slug}`) || []

  return {
    paths,
    fallback: false
  }
}

export const getStaticProps = nextContentWrapper.getStaticProps(
  async ({ params }) => {
    const slug = params.slug
    return {
      props: {
        kit: await getKit({ slug }),
        key: slug
      }
    }
  }
)

const Kit = props => {
  const { kit } = props

  if (!kit) return null

  return (
    <>
      <Metadata title={kit.name} description={kit.shortDescription} />
      <KitPage kit={kit} />
    </>
  )
}

export default Kit
