import { getDefaultNotificationsForApp } from './queries/notification'

const createNextContentWrapper = () => {
  /**
   * Higher order wrapper function for Next.js's `getStaticProps` that inserts
   * data needed for the application site wide.
   *
   * @param {import('next').GetStaticProps} callback
   * @returns {import('next').GetStaticProps}
   */
  const getStaticProps = callback => {
    /**
     * @param {import('next').GetStaticPropsContext} ctx
     */
    const wrapped = async ctx => {
      const returnedValue = await callback(ctx)

      if (!('props' in returnedValue)) {
        return returnedValue
      }

      return {
        ...returnedValue,
        props: {
          ...returnedValue.props,
          notifications: await getDefaultNotificationsForApp()
        }
      }
    }

    return wrapped
  }

  /**
   * Higher order wrapper function for Next.js's `getServerSideProps` that
   * inserts data needed for the application site wide.
   *
   * @param {import('next').GetServerSideProps} callback
   * @returns {import('next').GetServerSideProps}
   */
  const getServerSideProps = callback => {
    /**
     * @param {import('next').GetServerSidePropsContext} ctx
     */
    const wrapped = async ctx => {
      const returnedValue = await callback(ctx)

      if (!('props' in returnedValue)) {
        return returnedValue
      }

      return {
        ...returnedValue,
        props: {
          ...returnedValue.props,
          notifications: await getDefaultNotificationsForApp()
        }
      }
    }

    return wrapped
  }

  return { getStaticProps, getServerSideProps }
}

/**
 * nextContentWrapper provides higher order wrapper functions for Next.js's data
 * fetching methods. These methods are helpful when you have a component that is
 * on all pages and needs the same props across the site.
 *
 * By default, these methods are used to insert Notifications from Contentful
 * into all pages across the site. Feel free to update these methods to include
 * similar data across your application.
 */
const nextContentWrapper = createNextContentWrapper()

export default nextContentWrapper
