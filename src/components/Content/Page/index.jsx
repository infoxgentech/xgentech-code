import { Fragment } from 'react'
import ContentHero from '~/components/Content/Hero'
import ContentSection from '~/components/Content/Section'

const ContentPage = ({ page }) => {
  const { items: sections } = page.sectionsCollection || []

  return (
    <Fragment>
      {page.hero && (
        <ContentHero
          heading={page.hero.heading}
          subheading={page.hero.subheading}
          image={page.hero.image}
        />
      )}
      {sections.map(section => (
        <ContentSection key={section.sys.id} section={section} />
      ))}
    </Fragment>
  )
}

export default ContentPage
